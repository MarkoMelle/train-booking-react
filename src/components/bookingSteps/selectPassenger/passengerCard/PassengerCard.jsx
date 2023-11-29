import "./PassengerCard.css";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
// import SelectComponent from "../selectComponent/SelectComponent";
import BirthDatePicker from "./birthDatePicker/BirthDatePicker";
import Header from "./header/Header";
import NameForm from "./nameForm/NameForm";
import GenderForm from "./genderForm/GenderForm";
import DocumentForm from "./documentForm/DocumentForm";
import { errorIcon, validIcon } from "./iconSvg";

export default function PassengerCard({ seat, number }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportForeignNumber, setPassportForeignNumber] = useState("");
  const [birthCertificateNumber, setBirthCertificateNumber] = useState("");
  const [errors, setErrors] = useState({ series: "", number: "" });
  const [isOpened, setIsOpened] = useState(true);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const ageType = seat.type;
  const [documentType, setDocumentType] = useState(
    ageType === "adult" ? "passport" : "birthCertificate"
  );
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setValidationAttempted(false);
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);
  const validateForm = () => {
    setValidationAttempted(true);
    let formIsValid = true;
    setErrorMessage("");
    let newErrors = {};

    if (!firstName.trim()) {
      setErrorMessage("Введите имя");
      formIsValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!lastName.trim()) {
      setErrorMessage("Введите фамилию");
      formIsValid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!patronymic.trim()) {
      setErrorMessage("Введите отчество");
      formIsValid = false;
    } else {
      newErrors.patronymic = "";
    }

    if (!birthDate) {
      setErrorMessage("Введите дату рождения");
      formIsValid = false;
    } else {
      newErrors.birthDate = "";
    }
    if (!gender.trim()) {
      setErrorMessage("Выберите пол");
      formIsValid = false;
    } else {
      newErrors.gender = "";
    }
    if (errors.series || errors.number) {
      formIsValid = false;
    }
    setErrors(newErrors);
    console.log(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log(
      `Фамилия: ${lastName}, Имя: ${firstName}, Отчество: ${patronymic}, Дата рождения: ${birthDate}, Пол: ${gender}, Паспорт: ${passportSeries} ${passportNumber}
        Ограниченная подвижность: ${event.target.accessibility.checked}
        `
    );
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
              <label className="passenger-card__label passenger-card__accessibility">
                <input
                  className="passenger-card__checkbox"
                  type="checkbox"
                  name="accessibility"
                />
                <span className="passenger-card__accessibility-text">
                  ограниченная подвижность
                </span>
              </label>
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
                  validationAttempted={validationAttempted}
                  setValidationAttempted={setValidationAttempted}
                  documentType={documentType}
                  setDocumentType={setDocumentType}
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
                className={`secondary-btn passenger-card__next-btn passenger-card__next-btn--${
                   errors.series || errors.number
                    ? "disabled"
                    : "active"
                }`}
                disabled={errors.series || errors.number}
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
