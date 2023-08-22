import * as React from "react";
import "./TimeSliders.css";
import PropTypes from "prop-types";
import TimeSlider from "./timeSlider/TimeSlider";
import { plusIcon, minusIcon } from "./iconsSvg/iconsSvg";
import { Transition } from "react-transition-group";

export default function TimeSliders({ direction }) {
  const [departureTime, setDepartureTime] = React.useState([0, 24]);
  const [arrivalTime, setArrivalTime] = React.useState([0, 24]);
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

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  const handleArrivalTimeChange = (event, newValue) => {
    setArrivalTime(newValue);
  };

  const handleToggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <div
      className={`time-sliders ${
        direction === "departure"
          ? "time-sliders--departure"
          : "time-sliders--arrival"
      }
      ${isOpened ? "time-sliders--opened" : ""}`}
    >
      <div className="time-sliders__header">
        <h3
          className={`time-sliders__title ${
            direction === "departure"
              ? "time-sliders__title--departure"
              : "time-sliders__title--arrival"
          }`}
        >
          {direction === "departure" ? "Туда" : "Обратно"}
        </h3>
        <button
          className="time-sliders__button"
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
            <div className="time-sliders__slider">
              <p className="time-sliders__slider-title time-sliders__slider-title--departure">
                Время отбытия
              </p>
              <TimeSlider
                value={departureTime}
                handleChange={handleDepartureTimeChange}
                slotsClass={{ markLabel: `time-sliders__mark-label` }}
              />
            </div>
            <div className="time-sliders__slider">
              <p className="time-sliders__slider-title time-sliders__slider-title--arrival">
                Время прибытия
              </p>
              <TimeSlider
                value={arrivalTime}
                handleChange={handleArrivalTimeChange}
                slotsClass={{ markLabel: `time-sliders__mark-label` }}
              />
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

TimeSliders.propTypes = {
  direction: PropTypes.string.isRequired,
};
