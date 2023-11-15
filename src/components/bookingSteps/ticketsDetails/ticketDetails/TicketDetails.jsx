import "./TicketDetails.css";
import { useSelector, useDispatch } from 'react-redux';

import { plusIcon, minusIcon } from "../iconsSvg/iconsSvg";
import TimeInfo from "../../timeInfo/TimeInfo";
import { formatDate } from "../../../../utils";

import * as React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const today = new Date();
const weekFromToday = new Date();
weekFromToday.setDate(today.getDate() + 7);

const defaultDepartureDate = today;
const defaultReturnDate = weekFromToday;

export default function TicketDetails({ direction, currentTrip }) {
  const state = useSelector(state => state.test.currentTrip);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = React.useState(false);

  const departureDate = state.departureDate || defaultDepartureDate;
  const returnDate = state.returnDate || defaultReturnDate;

  const duration = 250;

  const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out`,
    maxHeight: 0,
    overflow: "hidden",
  };

  const transitionStyles = {
    entering: { maxHeight: "0px" },
    entered: { maxHeight: "500px" },
    exiting: { maxHeight: "500px" },
    exited: { maxHeight: "0px" },
  };

  const handleToggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <div
      className={`ticket-details
        ${
          direction === "departure"
            ? "ticket-details--departure"
            : "ticket-details--arrival"
        }
       ${isOpened ? "ticket-details--opened" : ""}`}
    >
      <div className="ticket-details__header">
        <h3
          className={`ticket-details__title ${
            direction === "departure"
              ? "ticket-details__title--departure"
              : "ticket-details__title--arrival"
          }`}
        >
          {direction === "departure" ? "Туда" : "Обратно"}
        </h3>
        <span className="ticket-details__date">
          {direction === "departure"
            ? formatDate(departureDate)
            : formatDate(returnDate)}
        </span>
        <button
          className="transition__button ticket-details__button"
          type="button"
          onClick={handleToggleOpen}
        >
          {isOpened ? minusIcon : plusIcon}
        </button>
      </div>
      <Transition in={isOpened} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <p className="ticket-details__train-number">
              <span className="ticket-details__train-number-text">
                № Поезда
              </span>
              <span className="ticket-details__train-number-number">
                {currentTrip.trainNumber}
              </span>
            </p>
            <div className="ticket-details__direction">
              <span className="ticket-details__direction-text">Название</span>
              <p className="ticket-details__direction-city">
                <span className="ticket-details__direction-city-text">
                  {currentTrip.direction[0]}
                </span>
                <span className="ticket-details__direction-city-text">
                  {currentTrip.direction[1]}
                </span>
              </p>
            </div>
            <TimeInfo
              time={currentTrip.departureTime}
              station={currentTrip.departureStation}
              city={currentTrip.direction}
              modifier={direction === "departure" ? "departure" : "arrival"}
              date={{
                left: formatDate(departureDate),
                right: formatDate(returnDate),
              }}
              block="ticket-details-time-info"
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

TicketDetails.propTypes = {
  direction: PropTypes.string.isRequired,
  currentTrip: PropTypes.object.isRequired,
};
