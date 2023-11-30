/* eslint-disable react-hooks/exhaustive-deps */
// import SelectComponent from "../selectComponent/SelectComponent";
import "./PassengerCard.css";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import BirthDatePicker from "./birthDatePicker/BirthDatePicker";
import Header from "./header/Header";
import NameForm from "./nameForm/NameForm";
import GenderForm from "./genderForm/GenderForm";
import DocumentForm from "./documentForm/DocumentForm";
import { errorIcon, validIcon } from "./iconSvg";
import { useSelector, useDispatch } from "react-redux";
import { updatePassenger } from "../../../../redux/features/orderSlice";
import { stringifyDate } from "../../../../utils";
import PropTypes from "prop-types";

function findFirstNonEmptyField(obj) {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      return obj[key];
    }
  }
  return null;
}

export default function PassengerCard({ seat, number, onFormValidityChange }) {
  const passenger = useSelector((state) => state.order.passengers[number - 1]);
  const [firstName, setFirstName] = useState(passenger.firstName || "");
  const [lastName, setLastName] = useState(passenger.lastName || "");
  const [patronymic, setPatronymic] = useState(passenger.patronymic || "");
  const [birthDate, setBirthDate] = useState(
    passenger.birthDate ? new Date(passenger.birthDate) : ""
  );
  const [gender, setGender] = useState(passenger.gender || "");
  const [passportSeries, setPassportSeries] = useState(
    passenger.passportSeries || ""
  );
  const [passportNumber, setPassportNumber] = useState(
    passenger.passportNumber || ""
  );
  const [passportForeignNumber, setPassportForeignNumber] = useState(
    passenger.passportForeignNumber || ""
  );
  const [birthCertificateNumber, setBirthCertificateNumber] = useState(
    passenger.birthCertificateNumber || ""
  );
  const ageType = seat.type;
  const [documentType, setDocumentType] = useState(
    passenger.documentType || ageType === "adult"
      ? "passport"
      : "birthCertificate"
  );
  const [errors, setErrors] = useState({ series: "", number: "" });
  const [isOpened, setIsOpened] = useState(true);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setValidationAttempted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, errors]);

  const validateSeries = (value) => {
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
    // if (isSeriesValidated || documentType === "foreignPassport") {
    //   setValidationAttempted(true);
    // }
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
    console.log(errors);
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
        break;
      case "foreignPassport":
        value = value.replace(/[^\d]/g, "").replace(/(\d{2})(\d)/, "$1 $2");
        if (value.length <= 10) {
          setPassportForeignNumber(value);
        }
        break;
      case "birthCertificate":
        if (value.length <= 6) {
          setBirthCertificateNumber(value);
        }
        break;
      default:
        break;
    }
    const numberError = validateNumber(value);
    setErrors({ ...errors, number: numberError });
  };

  const validateForm = () => {
    let newErrors = {
      firstName: !firstName.trim() ? "Введите имя" : "",
      lastName: !lastName.trim() ? "Введите фамилию" : "",
      patronymic: !patronymic.trim() ? "Введите отчество" : "",
      birthDate: !birthDate ? "Введите дату рождения" : "",
      gender: !gender.trim() ? "Выберите пол" : "",
      series:
        documentType === "passport" || documentType === "birthCertificate"
          ? validateSeries(passportSeries)
          : "",
      number:
        documentType === "passport" || documentType === "birthCertificate"
          ? validateNumber(passportNumber)
          : documentType === "foreignPassport"
          ? validateNumber(passportForeignNumber)
          : "",
    };

    setErrors(newErrors);

    const firstError = findFirstNonEmptyField(newErrors);
    if (firstError) {
      setErrorMessage(firstError);
      onFormValidityChange(false);
      return false;
    } else {
      setErrorMessage("");
      onFormValidityChange(true);
      return true;
    }
  };

  useEffect(() => {
    const updatedData = {
      firstName,
      lastName,
      patronymic,
      birthDate: birthDate ? stringifyDate(birthDate) : "",
      gender,
      documentType,
      passportSeries,
      passportNumber,
      passportForeignNumber,
      birthCertificateNumber,
      ageType,
    };
    dispatch(updatePassenger({ index: number - 1, data: updatedData }));
    const isFormValid = validateForm();
    if (!isFormValid) {
      const firstError = findFirstNonEmptyField(errors);
      if (firstError) {
        setErrorMessage(firstError);
      }
    } else {
      setErrorMessage("");
    }
  }, [
    firstName,
    lastName,
    patronymic,
    birthDate,
    gender,
    documentType,
    passportSeries,
    passportNumber,
    passportForeignNumber,
    birthCertificateNumber,
  ]);

  const handleSubmit = (event) => {
    console.log(errors);
    event.preventDefault();
    setValidationAttempted(true);
    if (!validateForm()) {
      const firstError = findFirstNonEmptyField(errors);
      if (firstError) {
        setErrorMessage(firstError);
      }
      return;
    }
    const passengerData = {
      firstName,
      lastName,
      patronymic,
      birthDate: birthDate ? stringifyDate(birthDate) : "",
      gender,
      documentType,
      passportSeries,
      passportNumber,
      passportForeignNumber,
      birthCertificateNumber,
      ageType,
    };
    dispatch(updatePassenger({ index: number - 1, data: passengerData }));
  };

  const duration = 250;

  const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out`,
    maxHeight: 0,
    overflow: "hidden",
  };

  const transitionStyles = {
    entering: { maxHeight: "0px" },
    entered: { maxHeight: "1000px" },
    exiting: { maxHeight: "1000px" },
    exited: { maxHeight: "0px" },
  };

  const handleToggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  // const handleAgeChange = (event, value) => {
  //   setAge(value);
  // };

  return (
    <form
      className="booking-steps__container passenger-card"
      onSubmit={handleSubmit}
    >
      <Header
        isOpened={isOpened}
        handleToggleOpen={handleToggleOpen}
        number={number}
      />

      <Transition in={isOpened} timeout={250}>
        {(state) => (
          <div
            className={`passenger-card__body passenger-card__body--${state}`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="passenger-card__content">
              {/* <SelectComponent
                className="passenger-card__select"
                value={age}
                onChange={handleAgeChange}
                option={[
                  { label: "Взрослый", value: "adult" },
                  { label: "Детский", value: "children" },
                ]}
              /> */}
              <span className="passenger-card__age-type">
                {ageType === "adult" ? "Взрослый" : "Детский"}
              </span>
              <NameForm
                lastName={lastName}
                firstName={firstName}
                patronymic={patronymic}
                setLastName={setLastName}
                setFirstName={setFirstName}
                setPatronymic={setPatronymic}
              />
              <div className="passenger-card__group">
                <GenderForm
                  gender={gender}
                  setGender={setGender}
                  index={number}
                />

                <label className="passenger-card__label">
                  Дата рождения:
                  <BirthDatePicker
                    date={birthDate}
                    setDate={setBirthDate}
                    className="passenger-card__input"
                  />
                </label>
              </div>
              {/* <label className="passenger-card__label passenger-card__accessibility">
                <input
                  className="passenger-card__checkbox"
                  type="checkbox"
                  name="accessibility"
                />
                <span className="passenger-card__accessibility-text">
                  ограниченная подвижность
                </span>
              </label> */}
              <>
                <DocumentForm
                  passportSeries={passportSeries}
                  passportNumber={passportNumber}
                  setPassportSeries={setPassportSeries}
                  setPassportNumber={setPassportNumber}
                  passportForeignNumber={passportForeignNumber}
                  setPassportForeignNumber={setPassportForeignNumber}
                  birthCertificateNumber={birthCertificateNumber}
                  setBirthCertificateNumber={setBirthCertificateNumber}
                  age={ageType}
                  errors={errors}
                  setErrors={setErrors}
                  setValidationAttempted={setValidationAttempted}
                  documentType={documentType}
                  setDocumentType={setDocumentType}
                  handleNumberChange={handleNumberChange}
                  handleNumberOnBlur={handleNumberOnBlur}
                  handleSeriesChange={handleSeriesChange}
                  handleSeriesBlur={handleSeriesBlur}
                />
                {validationAttempted && (
                  <div
                    className={`passenger-card__document-validation ${
                      errorMessage || errors.series || errors.number
                        ? "passenger-card__document-validation--error"
                        : ""
                    }`}
                  >
                    {errorMessage || errors.series || errors.number
                      ? errorIcon
                      : validIcon}
                    <div className="passenger-card__document-validation-text">
                      <span>
                        {errorMessage
                          ? errorMessage
                          : errors.series || errors.number
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
                      {errorMessage ? null : errors.series || errors.number ? (
                        <p>
                          Пример:{" "}
                          <span className="passenger-card__document-validation-text--example">
                            {documentType === "passport"
                              ? "4500 123456"
                              : documentType === "foreignPassport"
                              ? "75 1234567"
                              : "VI-АЯ 123456"}
                          </span>
                        </p>
                      ) : (
                        <p className="passenger-card__document-validation-text--valid">
                          Готово
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
              <button
                className={`secondary-btn passenger-card__next-btn `}
                type="submit"
              >
                Следующий пассажир
              </button>
            </div>
          </div>
        )}
      </Transition>
    </form>
  );
}

PassengerCard.propTypes = {
  seat: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  onFormValidityChange: PropTypes.func.isRequired,
};
