import { useState } from "react";
import {
  wifiSvg,
  expressSvg,
  airConditionerSvg,
} from "../../../../lastTickets/lastTicket/iconsSvg";
import {
  setCurrentRoute,
  setCurrentRouteBack,
  setRouteId,
  setRouteIdBack,
  setCurrentTrip,
} from "../../../../../../redux/features/seatsSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

export default function SitClassInfo({
  handleSeatSelection,
  ticket,
  isVerification = false,
  handleTripChange,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const handleSitClassClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const sitClassMapping = {
    first: "Люкс",
    second: "Купе",
    third: "Плацкарт",
    fourth: "Сидячий",
  };

  const sitClasses = Object.entries(ticket.departure.available_seats_info).map(
    ([key, value]) => {
      return {
        name: sitClassMapping[key],
        available: value,
        price: ticket.departure.price_info[key]
          ? {
              upper: ticket.departure.price_info[key].top_price,
              lower: ticket.departure.price_info[key].bottom_price,
            }
          : { from: "Цена не указана" },
      };
    }
  );
  // const handleSelectButtonClick = () => {
  //   if (Object.prototype.hasOwnProperty.call(ticket, "arrival")) {
  //     dispatch(setCurrentRoute(ticket.departure));
  //     dispatch(setRouteId(ticket.departure._id));
  //     dispatch(setCurrentRouteBack(ticket.arrival));
  //     dispatch(setRouteIdBack(ticket.arrival._id));
  //   } else {
  //     if (currentRoute) {
  //       if (ticket.departure.from.city.name === currentRoute.to.city.name && ticket.departure.from.datetime > currentRoute.to.datetime) {
  //         dispatch(setCurrentRouteBack(ticket.departure));
  //         dispatch(setRouteIdBack(ticket.departure._id));
  //       }
  //     } else if (currentRouteBack) {
  //       if (ticket.departure.to.city.name === currentRouteBack.from.city.name && ticket.departure.to.datetime < currentRouteBack.from.datetime) {
  //         dispatch(setCurrentRoute(ticket.departure));
  //         dispatch(setRouteId(ticket.departure._id));
  //       }
  //     } else {
  //       dispatch(setCurrentRoute(ticket.departure));
  //       dispatch(setRouteId(ticket.departure._id));
  //     }
  //   }
  //   handleSeatSelection();
  // };

  const handleSelectButtonClick = () => {
    dispatch(setCurrentTrip(ticket));
    dispatch(setCurrentRoute(ticket.departure));
    dispatch(setRouteId(ticket.departure._id));
    if (Object.prototype.hasOwnProperty.call(ticket, "arrival")) {
      dispatch(setCurrentRouteBack(ticket.arrival));
      dispatch(setRouteIdBack(ticket.arrival._id));
    }
    handleSeatSelection(true);
  };

  return (
    <>
      <ul className="ticket__sit-classes">
        {sitClasses.map((sitClass, index) => (
          <li
            key={index}
            className="ticket__sit-class"
            onClick={() => handleSitClassClick(index)}
          >
            <span className="ticket__sit-class__name">{sitClass.name}</span>
            <span className="ticket__sit-class__available">
              {sitClass.available}
            </span>
            {activeIndex === index && (
              <ul className="available-sits">
                <li className="available-sits__item">
                  <span className="ticket__sit-class__name">Верхние</span>
                  {/* <span className="ticket__sit-class__available">
                    {sitClass.available.upper}
                  </span> */}
                  <span className="available-sits__item-price">
                    {sitClass.price.upper}
                  </span>
                </li>
                <li className="available-sits__item">
                  <span className="available-sits__item__name">Нижние</span>
                  {/* <span className="ticket__sit-class__available">
                    {sitClass.available.lower}
                  </span> */}
                  <span className="available-sits__item-price">
                    {sitClass.price.lower}
                  </span>
                </li>
              </ul>
            )}
            <span className="ticket__sit-class__price">
              {sitClass.price.upper}
            </span>
          </li>
        ))}
      </ul>
      <ul className="ticket__sit-class__options">
        <li
          className={`ticket__sit-class__option ${
            ticket.departure.have_wifi
              ? "ticket__sit-class__option--active"
              : ""
          }`}
        >
          {wifiSvg}
        </li>
        <li
          className={`ticket__sit-class__option ${
            ticket.departure.have_air_conditioning
              ? "ticket__sit-class__option--active"
              : ""
          }`}
        >
          {airConditionerSvg}
        </li>
        <li
          className={`ticket__sit-class__option ${
            ticket.is_express ? "ticket__sit-class__option--active" : ""
          }`}
        >
          {expressSvg}
        </li>
      </ul>
      {!isVerification ? (
        <button
          className="primary-btn primary-btn--white ticket__select-button"
          onClick={handleSelectButtonClick}
        >
          Выбрать места
        </button>
      ) : (
        <button
          className="secondary-btn ticket__select-button"
          onClick={handleTripChange}
        >
          Изменить
        </button>
      )}
    </>
  );
}

SitClassInfo.propTypes = {
  sitClasses: PropTypes.array.isRequired,
  handleSeatSelection: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  isVerification: PropTypes.bool,
  handleTripChange: PropTypes.func.isRequired,
};
