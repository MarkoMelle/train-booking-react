import PropTypes from "prop-types";
import { currency } from "../iconsSvg";
import ServiceIcons from "../../serviceIcons/ServiceIcons";
import Scheme from "./scheme/Scheme";

export default function Wagon({ currentTrip, services, type }) {
  return (
    <div className="seat-selector__wagon wagon">
      <div className="wagon__number-container">
        <span className="wagon__number">07</span>
        <span className="wagon__number-text">Вагон</span>
      </div>
      <div className="seat-selector__details">
        <div className="seat-selector__details-group">
          <p className="seat-selector__details-group-title">
            <span>Места</span>
            <span className="seat-selector__seats-title-number">
              {currentTrip.sitClasses[1].available.all}
            </span>
          </p>

          <p className="seat-selector__seat-group">
            <span className="seat-selector__seat-text">Верхние</span>
            <span className="seat-selector__seat-number">
              {currentTrip.sitClasses[1].available.upper}
            </span>
          </p>
          <p className="seat-selector__seat-group">
            <span className="seat-selector__seat-text">Нижние</span>
            <span className="seat-selector__seat-number">
              {currentTrip.sitClasses[1].available.lower}
            </span>
          </p>
        </div>
        <div className="seat-selector__details-group">
          <span className="seat-selector__details-group-title">Стоимость</span>
          <div className="seat-selector__price">
            <span className="seat-selector__price-number">
              {currentTrip.sitClasses[1].price.upper}
            </span>
            <span className="seat-selector__price-currency">{currency}</span>
          </div>
          <div className="seat-selector__price">
            <span className="seat-selector__price-number">
              {currentTrip.sitClasses[1].price.lower}
            </span>
            <span className="seat-selector__price-currency">{currency}</span>
          </div>
        </div>
        <div className="seat-selector__details-group">
          <div className="seat-selector__details-group-title">
            <span>Обслуживание</span>
            <span className="seat-selector__details-group-title-services">
              ФПК
            </span>
          </div>
          <ServiceIcons services={services} />
        </div>
      </div>
      <div className="seat-selector__scheme">
        <Scheme type={type} />
      </div>
    </div>
  );
}

Wagon.propTypes = {
  currentTrip: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
