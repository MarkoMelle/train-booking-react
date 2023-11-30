import "./Payment.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserInfo } from "../../../redux/features/orderSlice";
import { showSnackBar } from "../../../redux/features/notificationsSlice";

export default function Payment({ setActiveStep }) {
  const user = useSelector((state) => state.order.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [patronymic, setPatronymic] = useState(user.patronymic || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [paymentType, setPaymentType] = useState(user.payment_method || "");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^(\+7|8)?9\d{9}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    let errors = [];

    if (!firstName.trim()) {
      errors.push({ message: "Введите имя", id: "name" });
    }
    if (!lastName.trim()) {
      errors.push({ message: "Введите фамилию", id: "last-name" });
    }
    if (!patronymic.trim()) {
      errors.push({ message: "Введите отчество", id: "patronymic" });
    }
    if (!validateEmail(email)) {
      errors.push({ message: "Некорректный email", id: "email" });
    }
    if (!validatePhone(phone)) {
      errors.push({ message: "Некорректный номер телефона", id: "phone" });
    }
    if (!paymentType) {
      errors.push({ message: "Выберите способ оплаты", id: "card" });
    }
    return errors;
  };

  const handleInputChange = (value, setValue, inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement && inputElement.classList.contains("error-highlight")) {
      inputElement.classList.remove("error-highlight");
    }

    if (/^[a-zA-Z\s]*$/.test(value)) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setValue(capitalizedValue);
    } else {
      dispatch(
        showSnackBar({
          message: "Используйте только латинские буквы",
          type: "info",
        })
      );
    }
  };

  const handlePhoneChange = (e, inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement && inputElement.classList.contains("error-highlight")) {
      inputElement.classList.remove("error-highlight");
    }
    setPhone(e.target.value);
  };

  const handleEmailChange = (e, inputId) => {
    const inputElement = document.getElementById(inputId);
    if (inputElement && inputElement.classList.contains("error-highlight")) {
      inputElement.classList.remove("error-highlight");
    }
    const email = e.target.value;
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (re.test(email)) {
      setEmail(email);
    }
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      dispatch(showSnackBar({ message: formErrors[0].message, type: "error" }));
      const errorField = document.getElementById(formErrors[0].id);
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
        errorField.classList.add("error-highlight");
        return;
      }
    }
    dispatch(
      updateUserInfo({
        firstName,
        lastName,
        patronymic,
        phone,
        email,
        payment_method: paymentType,
      })
    );
    setActiveStep(4);
    const element = document.getElementById("progress-bar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="payment">
      <form
        className="booking-steps__container payment__form"
        onSubmit={handleSubmit}
      >
        <div className="payment__personal-data">
          <div className="payment__header">
            <h2 className="payment__title">Персональные данные</h2>
          </div>
          <div className="payment__name-group">
            <label className="payment__label payment__label--name">
              Имя
              <input
                className="booking-steps__input payment__input"
                id="name"
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) =>
                  handleInputChange(e.target.value, setFirstName, "name")
                }
              />
            </label>
            <label className="payment__label payment__label--name">
              Фамилия
              <input
                className="booking-steps__input payment__input"
                id="last-name"
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) =>
                  handleInputChange(e.target.value, setLastName, "last-name")
                }
              />
            </label>
            <label className="payment__label payment__label--name">
              Отчество
              <input
                className="booking-steps__input payment__input"
                id="patronymic"
                type="text"
                placeholder="Отчество"
                value={patronymic}
                onChange={(e) =>
                  handleInputChange(e.target.value, setPatronymic, "patronymic")
                }
              />
            </label>
          </div>
          <div className="payment__contact-group">
            <label className="payment__label payment__label--contact">
              Контактный телефон
              <input
                className="booking-steps__input payment__input"
                id="phone"
                type="tel"
                placeholder="+7 ___ ___ __ __"
                value={phone}
                onChange={(e) => handlePhoneChange(e, "phone")}
              />
            </label>
            <label className="payment__label payment__label--contact">
              E-mail
              <input
                className="booking-steps__input payment__input"
                id="email"
                type="email"
                placeholder="inbox@gmail.ru"
                value={email}
                onChange={(e) => handleEmailChange(e, "email")}
              />
            </label>
          </div>
        </div>
        <div className="payment__type">
          <div className="payment__header">
            <h2 className="payment__title">Способ оплаты</h2>
          </div>
          <div className="payment__type-group payment__type-group--online">
            <label className="payment__label payment__radio">
              <input
                type="radio"
                name="payment"
                id="card"
                value="online"
                checked={paymentType === "online"}
                onChange={handlePaymentTypeChange}
              />
              <span className="payment__radio-text">Онлайн</span>
              <span className="payment__radio-check"></span>
            </label>
            <ul className="payment__online-methods">
              <li className="payment__online-method">Банковской картой</li>
              <li className="payment__online-method">PayPal</li>
              <li className="payment__online-method">Visa QIWI Wallet</li>
            </ul>
          </div>
          <div className="payment__type-group payment__type-group--cash">
            <label className="payment__label payment__radio">
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                checked={paymentType === "cash"}
                onChange={handlePaymentTypeChange}
              />
              <span className="payment__radio-text">Наличными</span>
              <span className="payment__radio-check"></span>
            </label>
          </div>
        </div>
      </form>
      <button
        className="primary-btn primary-btn--white
        payment__btn"
        type="submit"
        onClick={handleSubmit}
      >
        купить билеты
      </button>
    </div>
  );
}

Payment.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};
