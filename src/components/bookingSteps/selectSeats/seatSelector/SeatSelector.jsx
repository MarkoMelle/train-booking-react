import PropTypes from "prop-types";
import arrowBig from "../../../../assets/icons/arrow-seat-big.svg";
import TimeInfo from "../../timeInfo/TimeInfo";
import WagonTypes from "./wagonType/WagonTypes";
import SelectSeatComponent from "./selectSeatComponent/SelectSeatComponent";
import { currency } from "./wagonType/iconsSvg";
import "./SeatSelector.css";

export default function SeatSelector({
  direction = "departure",
  currentTrip,
  wagons,
  services,
}) {
  return (
    <div className="booking-steps__container seat-selector">
      <div
        className={`seat-selector__header seat-selector__header--${direction}`}
      >
        <img
          className={`seat-selector__arrow seat-selector__arrow--${direction}`}
          src={arrowBig}
          alt="arrow"
        />
        <button className="seat-selector__btn">Выбрать другой поезд</button>
      </div>
      <div className="seat-selector__info">
        <div className="seat-selector__info-train">
          <div className="info-train__number">{currentTrip.trainNumber}</div>
          <span className="info-train__direction">
            {currentTrip.direction[0]}&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
            >
              <path
                d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="info-train__direction">
            {currentTrip.direction[1]}
          </span>
        </div>
        <TimeInfo
          modifier="departure"
          time={currentTrip.departureTime}
          city={currentTrip.direction}
          station={currentTrip.departureStation}
          block="seat-selector__info"
        />
      </div>
      <div className="seat-selector__quantity">
        <h3 className="seat-selector__quantity-title">Количество билетов</h3>
        <div className="seat-selector__quantity-container">
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              option={[
                { label: "Взрослых — 0", value: 0 },
                { label: "Взрослых — 1", value: 1 },
                { label: "Взрослых — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 пассажира
            </p>
          </div>
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              option={[
                { label: "Детских — 0", value: 0 },
                { label: "Детских — 1", value: 1 },
                { label: "Детских — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
              взрослых, но дешевле в среднем на 50-65%
            </p>
          </div>
          <div className="seat-selector__quantity-select-group">
            <SelectSeatComponent
              className="seat-selector__quantity-select"
              option={[
                { label: "Детских «без места» — 0", value: 0 },
                { label: "Детских «без места» — 1", value: 1 },
                { label: "Детских «без места» — 2", value: 2 },
              ]}
            />
            <p className="seat-selector__quantity-text">
              Можно добавить еще 3 младенца до 2 лет. Без места. Скидка 100%
            </p>
          </div>
        </div>
      </div>
      <WagonTypes
        currentTrip={currentTrip}
        wagons={wagons}
        services={services}
      />
      <div className="seat-selector__sum">
        <span className="seat-selector__sum-text">8800</span>
        <span className="seat-selector__sum-currency">{currency}</span>
      </div>
    </div>
  );
}

SeatSelector.defaultProps = {
  wagons: ["07", "09"],
  services: {
    climate: "selected",
    wifi: "not-selected",
    linen: "disabled",
    drinks: "not-selected",
  },
};

SeatSelector.propTypes = {
  direction: PropTypes.string,
  currentTrip: PropTypes.object.isRequired,
  wagons: PropTypes.array,
  services: PropTypes.object,
  schemeImg: PropTypes.string,
};
