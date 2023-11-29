import PropTypes from "prop-types";
import { currency } from "../iconsSvg";
import ServiceIcons from "../../serviceIcons/ServiceIcons";
import Scheme from "./scheme/Scheme";

export default function Wagon({
  wagon,
  type,
  seatsFilter,
  handleSelectSeat,
  handleDeselectSeat,
  selectedSeats,
  services,
  updateService,
  changePrice,
}) {

  const countAvailableSeats = (wagon) => {
    let count = 0;
    wagon.seats.forEach((seat) => {
      if (seat.available) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className="seat-selector__wagon wagon">
      <div className="wagon__number-container">
        <span className="wagon__number">{wagon.coach.name.match(/\d+/g)}</span>
        <span className="wagon__number-text">Вагон</span>
      </div>
      <div className="seat-selector__details">
        <div className="seat-selector__details-group">
          <p className="seat-selector__details-group-title">
            <span>Места</span>
            <span className="seat-selector__seats-title-number">
              {countAvailableSeats(wagon)}
            </span>
          </p>

          {wagon.coach.top_price !== 0 && (
            <p className="seat-selector__seat-group">
              <span className="seat-selector__seat-text">
                {type === "fourth" ? "В проходе" : "Верхние"}
                </span>
              <span className="seat-selector__seat-number">
              {wagon.coach.upper_available_seats}
            </span>
            </p>
          )}
          {wagon.coach.bottom_price !== 0 && (
            <p className="seat-selector__seat-group">
              <span className="seat-selector__seat-text">
                {type === "fourth" ? "У окна" : "Нижние"}
                </span>
              <span className="seat-selector__seat-number">
              {wagon.coach.lower_available_seats}
            </span>
            </p>
          )}
          {wagon.coach.side_price !== 0 && (
            <p className="seat-selector__seat-group">
              <span className="seat-selector__seat-text">Боковые</span>
              <span className="seat-selector__seat-number">
              {wagon.coach.side_available_seats}
            </span>
            </p>
          )}
        </div>
        <div className="seat-selector__details-group">
          <span className="seat-selector__details-group-title">Стоимость</span>
          {wagon.coach.top_price !== 0 && (
            <div className="seat-selector__price">
              <span className="seat-selector__price-number">
                {wagon.coach.bottom_price}
              </span>
              <span className="seat-selector__price-currency">{currency}</span>
            </div>
          )}
          {wagon.coach.bottom_price !== 0 && (
            <div className="seat-selector__price">
              <span className="seat-selector__price-number">
                {wagon.coach.top_price}
              </span>
              <span className="seat-selector__price-currency">{currency}</span>
            </div>
          )}
          {wagon.coach.side_price !== 0 && (
            <div className="seat-selector__price">
              <span className="seat-selector__price-number">
                {wagon.coach.side_price}
              </span>
              <span className="seat-selector__price-currency">{currency}</span>
            </div>
          )}
        </div>
        <div className="seat-selector__details-group">
          <div className="seat-selector__details-group-title">
            <span>Обслуживание</span>
            <span className="seat-selector__details-group-title-services">
              ФПК
            </span>
          </div>
          <ServiceIcons
            wagon={wagon.coach}
            services={services}
            updateService={updateService}
            seatsFilter={seatsFilter}
            changePrice={changePrice}
          />
        </div>
      </div>
      <div className="seat-selector__scheme">
        <Scheme
          type={type}
          wagon={wagon}
          handleSelectSeat={handleSelectSeat}
          handleDeselectSeat={handleDeselectSeat}
          selectedSeats={selectedSeats}
          changePrice={changePrice}
        />
      </div>
    </div>
  );
}

Wagon.propTypes = {
  currentTrip: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};


