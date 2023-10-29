import "./PassengerCard.css";
import { useState } from "react";
import { Transition } from "react-transition-group";
import SelectComponent from "../selectComponent/SelectComponent";
import BirthDatePicker from "./birthDatePicker/BirthDatePicker";
import Header from "./header/Header";
import NameForm from "./nameForm/NameForm";
import GenderForm from "./genderForm/GenderForm";
import DocumentForm from "./documentForm/DocumentForm";

export default function PassengerCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportForeignNumber, setPassportForeignNumber] = useState("");
  const [birthCertificateNumber, setBirthCertificateNumber] = useState("");
  const [errors, setErrors] = useState({ series: "", number: "" });
  const [age, setAge] = useState("adult");
  const [isOpened, setIsOpened] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Фамилия: ${lastName}, Имя: ${firstName}, Отчество: ${middleName}, Дата рождения: ${birthDate}, Пол: ${gender}, Паспорт: ${passportSeries} ${passportNumber}
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

  const handleAgeChange = (event, value) => {
    setAge(value);
  };

  return (
    <form
      className="booking-steps__container passenger-card"
      onSubmit={handleSubmit}
    >
      <Header isOpened={isOpened} handleToggleOpen={handleToggleOpen} />

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
              <SelectComponent
                className="passenger-card__select"
                value={age}
                onChange={handleAgeChange}
                option={[
                  { label: "Взрослый", value: "adult" },
                  { label: "Детский", value: "children" },
                ]}
              />

              <NameForm
                lastName={lastName}
                firstName={firstName}
                middleName={middleName}
                setLastName={setLastName}
                setFirstName={setFirstName}
                setMiddleName={setMiddleName}
              />
              <div className="passenger-card__group">
                <GenderForm gender={gender} setGender={setGender} />

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
              <DocumentForm
                passportSeries={passportSeries}
                passportNumber={passportNumber}
                setPassportSeries={setPassportSeries}
                setPassportNumber={setPassportNumber}
                passportForeignNumber={passportForeignNumber}
                setPassportForeignNumber={setPassportForeignNumber}
                birthCertificateNumber={birthCertificateNumber}
                setBirthCertificateNumber={setBirthCertificateNumber}
                age={age}
                errors={errors}
                setErrors={setErrors}
              />
              <button
                className={`secondary-btn passenger-card__next-btn passenger-card__next-btn--${
                  errors.series || errors.number ? "disabled" : "active"
                }`}
                type="submit"
                disabled={errors.series || errors.number}
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
