import { useRef } from "react";
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
  setErrors,
  documentType,
  setDocumentType,
  handleSeriesChange,
  handleNumberChange,
  handleSeriesBlur,
  handleNumberOnBlur,
}) {
  const seriesInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const numberInputForeignRef = useRef(null);
  const numberInputBirthCertificateRef = useRef(null);
  const resetData = () => {
    setPassportSeries("");
    setPassportNumber("");
    setPassportForeignNumber("");
    setBirthCertificateNumber("");
    setErrors({ series: "", number: "" });
  };

  const handleDocumentTypeChange = (event, value) => {
    setDocumentType(value);
    resetData();
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
  setErrors: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  setDocumentType: PropTypes.func.isRequired,
  handleSeriesChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleSeriesBlur: PropTypes.func.isRequired,
  handleNumberOnBlur: PropTypes.func.isRequired,
};
