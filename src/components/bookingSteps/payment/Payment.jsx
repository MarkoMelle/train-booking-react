import React from "react";
import "./Payment.css";

export default function Payment({ setActiveStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправлено");
    setActiveStep(4);
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
              />
            </label>
            <label className="payment__label payment__label--name">
              Фамилия
              <input
                className="booking-steps__input payment__input"
                id="surname"
                type="text"
                placeholder="Фамилия"
              />
            </label>
            <label className="payment__label payment__label--name">
              Отчество
              <input
                className="booking-steps__input payment__input"
                id="patronymic"
                type="text"
                placeholder="Отчество"
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
              />
            </label>
            <label className="payment__label payment__label--contact">
              E-mail
              <input
                className="booking-steps__input payment__input"
                id="email"
                type="email"
                placeholder="inbox@gmail.ru"
              />
            </label>
          </div>
        </div>
        <div className="payment__type">
          <div className="payment__header">
            <h2 className="payment__title">Способ оплаты</h2>
          </div>
          <div
            className="payment__type-group payment__type-group--online">
            <label className="payment__label payment__radio">
              <input type="radio" name="payment" id="card" value="card" />
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
              <input type="radio" name="payment" id="cash" value="cash" />
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
