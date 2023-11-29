import { useState, useRef } from "react";
import SelectComponent from "../../selectComponent/SelectComponent";

import PropTypes from "prop-types";

export default function DocumentForm({
  passportSeries,
  passportNumber,
  passportForeignNumber,
  birthCertificateNumber,
  setPassportSeries,
  setPassportNumber,
  setPassportForeignNumber,
  setBirthCertificateNumber,
  age,
  errors,
  setErrors,
  validationAttempted,
  setValidationAttempted,
  documentType,
  setDocumentType,
}) {
  const seriesInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const numberInputForeignRef = useRef(null);
  const numberInputBirthCertificateRef = useRef(null);
  const [isSeriesValidated, setIsSeriesValidated] = useState(false);
  const resetData = () => {
    setPassportSeries("");
    setPassportNumber("");
    setPassportForeignNumber("");
    setBirthCertificateNumber("");
    setErrors({ series: "", number: "" });
    setIsSeriesValidated(false);
    setValidationAttempted(false);
  };

  const handleDocumentTypeChange = (event, value) => {
    setDocumentType(value);
    resetData();
  };

  const validateSeries = (value) => {
    setIsSeriesValidated(true);
    if (documentType === "passport") {
      return value.length === 4 && /^[0-9]{4}$/.test(value)
        ? ""
        : "Неверная серия";
    } else if (documentType === "birthCertificate") {
      return /^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])\b-?[А-Я]{2}$/i.test(
        value
      )
        ? ""
        : "Неверная серия";
    }
  };

  const validateNumber = (value) => {
    if (isSeriesValidated || documentType === "foreignPassport") {
      setValidationAttempted(true);
    }
    switch (documentType) {
      case "passport":
        return value.length === 6 && /^[0-9]{6}$/.test(value)
          ? ""
          : "Неверный номер";
      case "foreignPassport":
        return /^[0-9]{2}\s[0-9]{7}$/.test(value)
          ? ""
          : "Неверный номер загранпаспорта";
      case "birthCertificate":
        return value.length === 6 && /^[0-9]{6}$/.test(value)
          ? ""
          : "Неверный номер свидетельства о рождении";
      default:
        return false;
    }
  };

  const handleSeriesChange = (e) => {
    const value = e.target.value;
    switch (documentType) {
      case "passport":
        if (value.length <= 4) {
          setPassportSeries(value);
        }
        if (value.length === 4) {
          const seriesError = validateSeries(value);
          setErrors({ ...errors, series: seriesError });
        }
        break;
      case "birthCertificate":
        if (value.length <= 6) {
          setPassportSeries(value);
        }
        if (value.length <= 6) {
          const seriesError = validateSeries(value);
          setErrors({ ...errors, series: seriesError });
        }
        break;
      default:
        break;
    }
  };

  const handleSeriesBlur = (e) => {
    const value = e.target.value;
    const seriesError = validateSeries(value);
    setErrors({ ...errors, series: seriesError });
  };

  const handleNumberOnBlur = (e) => {
    const value = e.target.value;
    const numberError = validateNumber(value);
    setErrors({ ...errors, number: numberError });
  };

  const handleNumberChange = (e) => {
    let value = e.target.value;
    switch (documentType) {
      case "passport":
        if (value.length <= 6) {
          setPassportNumber(value);
        }
        if (value.length === 6) {
          setErrors({ ...errors, number: validateNumber(value) });
        }
        break;
      case "foreignPassport":
        value = value.replace(/[^\d]/g, "").replace(/(\d{2})(\d)/, "$1 $2");
        if (value.length <= 10) {
          setPassportForeignNumber(value);
        }
        if (value.length === 10) {
          setErrors({ ...errors, number: validateNumber(value) });
        }
        break;
      case "birthCertificate":
        if (value.length <= 6) {
          setBirthCertificateNumber(value);
        }
        if (value.length === 6) {
          setErrors({ ...errors, number: validateNumber(value) });
        }
        break;
      default:
        break;
    }
  };

  

  const getDocumentOptions = () => {
    if (age === "adult") {
      return [
        { label: "Паспорт РФ", value: "passport" },
        { label: "Загран паспорт РФ", value: "foreignPassport" },
      ];
    } else if (age === "child") {
      return [
        { label: "Свидетельство о рождении", value: "birthCertificate" },
        { label: "Загран паспорт РФ", value: "foreignPassport" },
      ];
    }
  };

  const getDocumentWidth = () => {
    switch (documentType) {
      case "passport":
        return "205px";
      case "foreignPassport":
        return "275px";
      case "birthCertificate":
        return "365px";
      default:
        return "205px";
    }
  };
  return (
    <div className="passenger-card__document">
      <label className="passenger-card__label passenger-card__label-document">
        Тип документа:
        <SelectComponent
          className="passenger-card__document-select"
          option={getDocumentOptions()}
          value={documentType}
          onChange={handleDocumentTypeChange}
          width={getDocumentWidth()}
        />
      </label>
      {documentType === "passport" ? (
        <>
          <label className="passenger-card__label passenger-card__label-document">
            Серия
            <input
              ref={seriesInputRef}
              className="booking-steps__input passenger-card__input-document passenger-card__input-document--series"
              type="number"
              maxLength="4"
              onBlur={handleSeriesBlur}
              value={passportSeries}
              onChange={handleSeriesChange}
              placeholder="____"
            />
          </label>
          <label className="passenger-card__label passenger-card__label-document">
            Номер
            <input
              ref={numberInputRef}
              className="booking-steps__input passenger-card__input-document passenger-card__input-document--number"
              type="number"
              value={passportNumber}
              onChange={handleNumberChange}
              onBlur={handleNumberOnBlur}
              placeholder="______"
              maxLength="6"
            />
          </label>
        </>
      ) : documentType === "foreignPassport" ? (
        <label className="passenger-card__label passenger-card__label-document">
          Номер
          <input
            ref={numberInputForeignRef}
            className="booking-steps__input passenger-card__input-document passenger-card__input-document--number-foreign"
            type="text"
            value={passportForeignNumber}
            onChange={handleNumberChange}
            onBlur={handleNumberOnBlur}
            placeholder="__ _______"
            maxLength="10"
          />
        </label>
      ) : (
        <>
          <label className="passenger-card__label passenger-card__label-document">
            Серия
            <input
              ref={seriesInputRef}
              className="booking-steps__input passenger-card__input-document passenger-card__input-document--series-birthCertificate"
              type="text"
              maxLength="6"
              value={passportSeries}
              onBlur={handleSeriesBlur}
              onChange={handleSeriesChange}
              placeholder="______"
            />
          </label>
          <label className="passenger-card__label passenger-card__label-document">
            Номер
            <input
              ref={numberInputBirthCertificateRef}
              className="booking-steps__input passenger-card__input-document passenger-card__input-document--number-birthCertificate"
              type="number"
              value={birthCertificateNumber}
              onChange={handleNumberChange}
              onBlur={handleNumberOnBlur}
              placeholder="______"
              maxLength="6"
            />
          </label>
        </>
      )}
      
    </div>
  );
}

DocumentForm.propTypes = {
  passportSeries: PropTypes.string.isRequired,
  passportNumber: PropTypes.string.isRequired,
  passportForeignNumber: PropTypes.string.isRequired,
  birthCertificateNumber: PropTypes.string.isRequired,
  setPassportSeries: PropTypes.func.isRequired,
  setPassportNumber: PropTypes.func.isRequired,
  setPassportForeignNumber: PropTypes.func.isRequired,
  setBirthCertificateNumber: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
};
