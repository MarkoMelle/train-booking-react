import "./TicketDetails.css";
import { plusIcon, minusIcon } from "../iconsSvg/iconsSvg";
import TimeInfo from "../../timeInfo/TimeInfo";
// import { formatDate } from "../../../../utils";
import * as React from "react";
import { Transition } from "react-transition-group";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};



export default function TicketDetails({ direction, currentRoute }) {
  const [isOpened, setIsOpened] = React.useState(false);

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
            ? formatDate(currentRoute.from.datetime)
            : formatDate(currentRoute.to.datetime)}
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
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <p className="ticket-details__train-number">
            <span className="ticket-details__train-number-text">№ Поезда</span>
            <span className="ticket-details__train-number-number">
              {currentRoute.train.name}
            </span>
          </p>
          <div className="ticket-details__direction">
            <span className="ticket-details__direction-text">Название</span>
            <p className="ticket-details__direction-city">
              <span className="ticket-details__direction-city-text">
                {currentRoute.from.city.name}
              </span>
              <span className="ticket-details__direction-city-text">
                {currentRoute.to.city.name}
              </span>
            </p>
          </div>
          <TimeInfo
            time={[ currentRoute.from.datetime, currentRoute.to.datetime ]}
            station={[ currentRoute.from.railway_station_name, currentRoute.to.railway_station_name ]}
            city={[ currentRoute.from.city.name, currentRoute.to.city.name ]}
            modifier={direction === "departure" ? "departure" : "arrival"}
            duration={currentRoute.duration}
            date={{
              left: formatDate(currentRoute.from.datetime),
              right: formatDate(currentRoute.to.datetime),
            }}
            block="ticket-details-time-info"
          />
        </div>
        )}
      </Transition>
    </div>
  );
}

