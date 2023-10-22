import React, { useState, useRef } from "react";
import SelectComponent from "../../selectComponent/SelectComponent";
import { errorIcon } from "../iconSvg";

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
}) {
  const [documentType, setDocumentType] = useState("passport");
  const seriesInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const numberInputForeignRef = useRef(null);
  const numberInputBirthCertificateRef = useRef(null);

  const validateSeries = (value) => {
    // if (documentType === "passport") {
    //   return value.length === 4 && /^[0-9]{4}$/.test(value)
    //     ? ""
    //     : "Неверная серия";
    // } else if (documentType === "birthCertificate") {
    //   return value.length === 6 &&
    //     /^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])\b-?[А-Я]{2}$/.test(
    //       value
    //     )
    //     ? ""
    //     : "Неверная серия";
    // }
  };

  const validateNumber = (value) => {
    // switch (documentType) {
    //   case "passport":
    //     return value.length === 6 && /^[0-9]{6}$/.test(value)
    //       ? ""
    //       : "Неверный номер";
    //   case "foreignPassport":
    //     return /^[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{3}$/.test(value)
    //       ? ""
    //       : "Неверный номер загранпаспорта";
    //   case "birthCertificate":
    //     return value ? "" : "Неверный номер свидетельства о рождении";
    //   default:
    //     return "";
    // }
  };

  const handleDocumentTypeChange = (event, value) => {
    setDocumentType(value);
  };
  const handleSeriesChange = (e) => {
    const value = e.target.value;
    setPassportSeries(value);
    setErrors({ ...errors, series: validateSeries(value) });
    if (value.length === 4) {
      seriesInputRef.current.blur();
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    switch (documentType) {
      case "passport":
        setPassportNumber(value);
        if (value.length === 6) {
          numberInputRef.current.blur();
        }
        break;
      case "foreignPassport":
        setPassportForeignNumber(value);
        if (value.length === 10) {
          numberInputForeignRef.current.blur();
        }
        break;
      case "birthCertificate":
        setBirthCertificateNumber(value);
        if (value.length === 12) {
          numberInputBirthCertificateRef.current.blur();
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, number: validateNumber(value) });
  };

  const getDocumentOptions = () => {
    if (age === "adult") {
      return [
        { label: "Паспорт РФ", value: "passport" },
        { label: "Загран паспорт РФ", value: "foreignPassport" },
      ];
    } else if (age === "children") {
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
  console.log(errors);
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
              value={passportSeries}
              onChange={handleSeriesChange}
              placeholder="____"
              maxLength={4}
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
              placeholder="______"
              maxLength={6}
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
            placeholder="__ _______"
            maxLength={10}
          />
        </label>
      ) : (
        <label className="passenger-card__label passenger-card__label-document">
          Номер
          <input
            ref={numberInputBirthCertificateRef}
            className="booking-steps__input passenger-card__input-document passenger-card__input-document--number-birthCertificate"
            type="text"
            value={birthCertificateNumber}
            onChange={handleNumberChange}
            placeholder="____________"
            maxLength={12}
          />
        </label>
      )}
      <div
        className={`passenger-card__document-validation ${
          errors.series || errors.number
            ? "passenger-card__document-validation--error"
            : ""
        }`}
      >
        {errors.series || errors.number ? errorIcon : ""}
        <div className="passenger-card__document-validation-text">
          <span>
            {errors.series
              ? `Серия ${
                  documentType === "passport"
                    ? "паспорта"
                    : "свидетельства о рождении"
                }
          указана некорректно`
              : errors.number
              ? `Номер ${
                  documentType === "passport"
                    ? "паспорта"
                    : documentType === "foreignPassport"
                    ? "загранпаспорта"
                    : "свидетельства о рождении"
                }
           указан некорректно`
              : ""}
          </span>
          <p>
            Пример:{" "}
            <span className="passenger-card__document-validation-text--example">
              1234 567890
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
