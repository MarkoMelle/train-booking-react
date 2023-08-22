import * as React from "react";
import "./PriceSlider.css";
import SliderComponent from "../sliderComponent";

const marks = [
  {
    value: 1920,
    label: "1920",
  },
  {
    value: 7000,
    label: "7000",
  },
];

export default function PriceSlider() {
  const [value, setValue] = React.useState([1920, 7000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      className={`price-slider ${
        marks[0].value / value[0] === 1 ? "" : "mark-not-null"
      }`}
    >
      <h3 className="price-slider__title">Стоимость</h3>
      <SliderComponent
        type={"price"}
        value={value}
        handleChange={handleChange}
        min={1920}
        max={7000}
        step={10}
        marks={[
          {
            value: marks[0].value / value[0] === 1 ? 0 : marks[0].value,
            label: marks[0].value / value[0] > 0.7 ? `` : marks[0].label,
          },
          {
            value: value[0],
            label: `${value[0]}`,
          },
          {
            value: value[1],
            label: `${value[1]}`,
          },
          {
            value: marks[1].value / value[1] === 1 ? 0 : marks[1].value,
            label: marks[1].value / value[1] < 1.15 ? `` : marks[1].label,
          },
        ]}
      />
    </div>
  );
}
