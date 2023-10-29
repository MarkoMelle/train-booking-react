import * as React from "react";
import PropTypes from "prop-types";
import { plusIcon, minusIcon } from "../iconsSvg/iconsSvg";
import { Transition } from "react-transition-group";
import "./PassengerDetails.css";

export default function PassengerDetails({
  passengers = {
    adult: 2,
    children: 1,
  },
  price = {
    adult: 5840,
    children: 1920,
  },
}) {
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
      className={`passenger-details
       ${isOpened ? "passenger-details--opened" : ""}`}
    >
      <div className="passenger-details__header">
        <h3 className={`passenger-details__title`}>Пассажиры</h3>
        <button
          className="transition__button"
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
            <div className="passenger-details__container">
              <div className="passenger-details__content">
                <span className="passenger-details__count">
                  {passengers.adult === 1
                    ? `${passengers.adult} Взрослый`
                    : `${passengers.adult} Взрослых`}
                </span>
                <span className="passenger-details__price">{price.adult}</span>
              </div>
              <div className="passenger-details__content">
                <span className="passenger-details__count">
                  {passengers.children === 1
                    ? `${passengers.children} Ребенок`
                    : `${passengers.children} Детей`}
                </span>
                <span className="passenger-details__price">
                  {price.children}
                </span>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

PassengerDetails.propTypes = {
  passengers: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
};
