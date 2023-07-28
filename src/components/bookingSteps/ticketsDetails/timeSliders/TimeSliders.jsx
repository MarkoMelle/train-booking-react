import * as React from "react";
import SliderComponent from "../sliderComponent";
import "./TimeSliders.css";
import PropTypes from "prop-types";

const TimeSlider = ({ value, handleChange }) => (
  <SliderComponent
    type={"time"}
    value={value}
    handleChange={handleChange}
    min={0}
    max={24}
    step={1}
    marks={[
      {
        value: value[0],
        label: `${value[0]}:00`,
      },
      {
        value: value[1],
        label: `${value[1]}:00`,
      },
      {
        value: value[1] < 22 ? 24 : value[1],
        label: value[1] < 22 ? "24:00" : "",
      },
    ]}
  />
);

export default function TimeSliders({ direction }) {
  const [departureTime, setDepartureTime] = React.useState([0, 24]);
  const [arrivalTime, setArrivalTime] = React.useState([0, 24]);

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  const handleArrivalTimeChange = (event, newValue) => {
    setArrivalTime(newValue);
  };

  return (
    <div className="time-sliders">
      <h3 className="time-sliders__title">
        {direction === "departure" ? "Туда" : "Обратно"}
      </h3>
      <div className="time-sliders__slider">
        <p className="time-sliders__slider-title">Время отбытия</p>
        <TimeSlider
          value={departureTime}
          handleChange={handleDepartureTimeChange}
        />
      </div>
      <div className="time-sliders__slider">
        <p className="time-sliders__slider-title">Время прибытия</p>
        <TimeSlider
          value={arrivalTime}
          handleChange={handleArrivalTimeChange}
        />
      </div>
    </div>
  );
}

TimeSlider.propTypes = {
  value: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

TimeSliders.propTypes = {
  direction: PropTypes.string.isRequired,
};
