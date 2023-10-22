import SliderComponent from "../sliderComponent";
import PropTypes from "prop-types";

export default function TimeSlider({ value, handleChange, slotsClass }) {
  return (
    <SliderComponent
      className={`${value[0] !== 0 ? "mark-not-start" : ""} ${
        value[1] !== 24 ? "mark-not-end" : ""
      }`}
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
          value: value[1] < 20 ? 24 : value[1],
          label: value[1] < 20 ? "24:00" : "",
        },
      ]}
      {...slotsClass}
    />
  );
}

TimeSlider.propTypes = {
  value: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  slotsClass: PropTypes.object,
};
