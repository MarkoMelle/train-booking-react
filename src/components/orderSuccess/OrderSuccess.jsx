import { order as orderInfo } from "../../tempoDate";
import "./orderSuccess.css";
import ticketsOnEmail from "../../assets/images/tickets-on-email.svg";
import tickets from "../../assets/images/tickets.svg";
import controlPerson from "../../assets/images/control-person.svg";
import { useState } from "react";
import PropTypes from "prop-types";

const starSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="44"
    viewBox="0 0 46 44"
    fill="currentColor"
  >
    <path
      d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default function OrderSuccess({ order = orderInfo }) {
  const [rating, setRating] = useState(0);
  return (
    <main className="order-success wrapper">
      <div className="order-success__content">
        <h2 className="order-success__title">Благодарим Вас за заказ!</h2>
        <div className="order-success__card">
          <div className="order-success__order-info">
            <span className="order-success__order-info--bold">
              №Заказа {order.number}
            </span>
            <p className="order-success__order-info--text">
              сумма
              <span className="order-success__order-info--sum">
                {order.totalPrice}
              </span>
            </p>
          </div>
          <div className="order-success__instruction">
            <div className="order-success__instruction-item">
              <img
                className="order-success__instruction-item--img"
                src={ticketsOnEmail}
                alt="ticket on email"
              />
              <p className="order-success__instruction-item--text">
                билеты будут
                <br />
                отправлены
                <br />
                на ваш <strong>email</strong>
              </p>
            </div>
            <div className="order-success__instruction-item">
              <img
                className="order-success__instruction-item--img"
                src={tickets}
                alt="tickets"
              />
              <p className="order-success__instruction-item--text">
                <strong>распечатайте</strong> и сохраняйте билеты до даты
                поездки
              </p>
            </div>
            <div className="order-success__instruction-item">
              <img
                className="order-success__instruction-item--img"
                src={controlPerson}
                alt="control person"
              />
              <p className="order-success__instruction-item--text">
                <strong>предъявите</strong> распечатанные билеты при посадке
              </p>
            </div>
          </div>
          <div className="order-success__confirmation">
            <h3 className="order-success__customer-name">Ирина Эдуардовна!</h3>
            <p className="order-success__message">
              <span>Ваш заказ успешно оформлен.</span>
              <span>
                В ближайшее время с вами свяжется наш оператор для
                подтверждения.
              </span>
            </p>
            <p className="order-success__message--bold">
              Благодарим Вас за оказанное доверие и желаем приятного
              путешествия!
            </p>
          </div>
          <div className="order-success__footer">
            <div className="order-success__rating">
              <span>Оценить сервис</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`star ${star <= rating ? "active" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    {starSvg}
                  </div>
                ))}
              </div>
            </div>
            <button
              className="secondary-btn order-success__btn"
              onClick={() => {}}
            >
              вернуться на главную
            </button>
          </div>
        </div>
        <div className="order-success__after--decor"></div>
      </div>
    </main>
  );
}

OrderSuccess.propTypes = {
  order: PropTypes.object.isRequired,
};
