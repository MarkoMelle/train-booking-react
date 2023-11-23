import * as React from "react";
import "./TimeSliders.css";
import PropTypes from "prop-types";
import TimeSlider from "../timeSlider/TimeSlider";
import { plusIcon, minusIcon } from "../iconsSvg/iconsSvg";
import { Transition } from "react-transition-group";
import { setFilter } from "../../../../redux/features/searchResultsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function TimeSliders({
  direction,
  // departureTime,
  // arrivalTime,
  // handleDepartureTimeChange,
  // handleArrivalTimeChange,
}) {
  // const [departureTime, setDepartureTime] = React.useState([0, 24]);
  // const [arrivalTime, setArrivalTime] = React.useState([0, 24]);
  // Opened, setIsOpened] = React.useState(false);
  const dispatch = useDispatch();
  const {
    startDepartureHourFrom,
    startDepartureHourTo,
    startArrivalHourFrom,
    startArrivalHourTo,
    endDepartureHourFrom,
    endDepartureHourTo,
    endArrivalHourFrom,
    endArrivalHourTo,
  } = useSelector((state) => state.searchResults);

  const departureTime =
    direction === "departure"
      ? [startDepartureHourFrom || 0, startDepartureHourTo || 24]
      : [endDepartureHourFrom || 0, endDepartureHourTo || 24];
  const arrivalTime =
    direction === "departure"
      ? [startArrivalHourFrom || 0, startArrivalHourTo || 24]
      : [endArrivalHourFrom || 0, endArrivalHourTo || 24];

  const handleDepartureTimeChange = (e, newValue) => {
    if (direction === "departure") {
      dispatch(
        setFilter({
          startDepartureHourFrom: newValue[0],
          startDepartureHourTo: newValue[1],
        })
      );
    } else {
      dispatch(
        setFilter({
          endDepartureHourFrom: newValue[0],
          endDepartureHourTo: newValue[1],
        })
      );
    }
  };

  const handleArrivalTimeChange = (e, newValue) => {
    if (direction === "departure") {
      dispatch(
        setFilter({
          startArrivalHourFrom: newValue[0],
          startArrivalHourTo: newValue[1],
        })
      );
    }
    dispatch(
      setFilter({
        endArrivalHourFrom: newValue[0],
        endArrivalHourTo: newValue[1],
      })
    );
  };

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

  // const handleDepartureTimeChange = (event, newValue) => {
  //   setDepartureTime(newValue);
  // };

  // const handleArrivalTimeChange = (event, newValue) => {
  //   setArrivalTime(newValue);
  // };

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
  departureTime: PropTypes.array.isRequired,
  arrivalTime: PropTypes.array.isRequired,
};
