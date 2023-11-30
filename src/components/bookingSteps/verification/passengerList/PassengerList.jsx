import Passenger from "./passenger/Passenger";
import PropTypes from "prop-types";

export default function PassengerList({
  passengers,
  totalPrice,
  handlePassengerChange,
}) {
  return (
    <div className="passenger-list booking-steps__container">
      <div className="passenger-list__header verification__header">
        <h2 className="passenger-list__title verification__title">
          Список пассажиров
        </h2>
      </div>
      <div className="passenger-list__wrapper">
        <div className="passenger-list__container">
          {passengers.map((passenger, index) => (
            <Passenger key={index} {...{ passenger }} />
          ))}
        </div>
        <div className="verification__aside">
          <p className="passenger-list__total-price">
            Всего{" "}
            <span className="passenger-list__total-price--bold">
              {totalPrice}
            </span>
          </p>
          <button
            className="secondary-btn passenger-list__btn verification__btn"
            onClick={handlePassengerChange}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
}

PassengerList.propTypes = {
  passengers: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.string.isRequired,
  handlePassengerChange: PropTypes.func.isRequired,
};
