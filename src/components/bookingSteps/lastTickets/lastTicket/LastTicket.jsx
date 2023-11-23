import PropTypes from "prop-types";
import { currencySvg } from "./iconsSvg";

export default function LastTicket({
  departureCity: departureInfo,
  arrivalCity,
  price,
}) {
  return (
    <div className="last-ticket">
      <div className="last-ticket__cities">
        <div className="last-ticket__city last-ticket__city--departure">
          <span className="last-ticket__city-name">{departureInfo.city}</span>
          <p className="last-ticket__station">
            <span className="last-ticket__station-text">
              {departureInfo.station}
            </span>
            <span className="last-ticket__station-text">вокзал</span>
          </p>
        </div>
        <div className="last-ticket__city last-ticket__city--arrival">
          <span className="last-ticket__city-name">{arrivalCity.city}</span>
          <p className="last-ticket__station">
            <span className="last-ticket__station-text">
              {arrivalCity.station}
            </span>
            <span className="last-ticket__station-text">вокзал</span>
          </p>
        </div>
      </div>
      {/* <div className="last-ticket__options">{optionsSvg}</div> */}
      <div className="last-ticket__price">
        <span className="last-ticket__price-value">{price}</span>
        <span className="last-ticket__price-currency">{currencySvg}</span>
      </div>
    </div>
  );
}

LastTicket.propTypes = {
  departureCity: PropTypes.object.isRequired,
  arrivalCity: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
