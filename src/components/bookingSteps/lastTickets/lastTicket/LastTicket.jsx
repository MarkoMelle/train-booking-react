import PropTypes from "prop-types";
import {
  currencySvg,
  expressSvg,
  wifiSvg,
  airConditionerSvg,
} from "./iconsSvg";
import { useDispatch } from "react-redux";
import {
  setCurrentRoute,
  setRouteId,
  setCurrentTrip,
  setSelectSeats,
} from "../../../../redux/features/seatsSlice";

export default function LastTicket({ ticket }) {
  const dispatch = useDispatch();
  const handleSelectLastTicket = () => {
    dispatch(setCurrentTrip(ticket));
    dispatch(setCurrentRoute(ticket.departure));
    dispatch(setRouteId(ticket.departure._id));
    dispatch(setSelectSeats(true));
  };

  return (
    <div className="last-ticket" onClick={handleSelectLastTicket}>
      <div className="last-ticket__cities">
        <div className="last-ticket__city last-ticket__city--departure">
          <span className="last-ticket__city-name">
            {ticket.departure.from.city.name}
          </span>
          <p className="last-ticket__station">
            <span className="last-ticket__station-text">
              {ticket.departure.from.railway_station_name}
            </span>
            <span className="last-ticket__station-text">вокзал</span>
          </p>
        </div>
        <div className="last-ticket__city last-ticket__city--arrival">
          <span className="last-ticket__city-name">
            {ticket.departure.to.city.name}
          </span>
          <p className="last-ticket__station">
            <span className="last-ticket__station-text">
              {ticket.departure.to.railway_station_name}
            </span>
            <span className="last-ticket__station-text">вокзал</span>
          </p>
        </div>
      </div>
      <ul className="last-ticket__options">
        <li
          className={`last-ticket__option ${
            ticket.departure.have_wifi ? "last-ticket__option--active" : ""
          }`}
        >
          {wifiSvg}
        </li>
        <li
          className={`last-ticket__option ${
            ticket.departure.have_air_conditioning
              ? "last-ticket__option--active"
              : ""
          }`}
        >
          {airConditionerSvg}
        </li>
        <li
          className={`last-ticket__option ${
            ticket.is_express ? "last-ticket__option--active" : ""
          }`}
        >
          {expressSvg}
        </li>
      </ul>
      <div className="last-ticket__price">
        <span className="last-ticket__price-value">
          {ticket.departure.min_price}
        </span>
        <span className="last-ticket__price-currency">{currencySvg}</span>
      </div>
    </div>
  );
}

LastTicket.propTypes = {
  ticket: PropTypes.object.isRequired,
};
