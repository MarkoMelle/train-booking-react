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
  departureCity: PropTypes.object.isRequired,
  arrivalCity: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

// {
//   "have_first_class": false,
//   "have_second_class": false,
//   "have_third_class": false,
//   "have_fourth_class": false,
//   "have_wifi": false,
//   "have_air_conditioning": false,
//   "is_express": false,
//   "min_price": 2575,
//   "available_seats": 66,
//   "available_seats_info": {
//       "first": 18,
//       "third": 48
//   },
//   "departure": {
//       "_id": "64103e3f5c49ea0046380273",
//       "have_first_class": true,
//       "have_second_class": false,
//       "have_third_class": true,
//       "have_fourth_class": false,
//       "have_wifi": false,
//       "have_air_conditioning": true,
//       "is_express": false,
//       "min_price": 2575,
//       "duration": 246000,
//       "available_seats": 66,
//       "available_seats_info": {
//           "first": 18,
//           "third": 48
//       },
//       "train": {
//           "_id": "641037ef5c49ea004632f7a7",
//           "name": "Зевс - 48"
//       },
//       "from": {
//           "railway_station_name": "Астрахань",
//           "city": {
//               "_id": "641037eb5c49ea004632ee70",
//               "name": "астрахань"
//           },
//           "datetime": 1700160271
//       },
//       "to": {
//           "railway_station_name": "Адлер",
//           "city": {
//               "_id": "641037eb5c49ea004632ee72",
//               "name": "адлер"
//           },
//           "datetime": 1700406271
//       },
//       "price_info": {
//           "first": {
//               "price": 2875,
//               "top_price": 3835,
//               "bottom_price": 4320
//           },
//           "third": {
//               "top_price": 2760,
//               "bottom_price": 4590,
//               "side_price": 2575
//           }
//       }
//   }
// }
