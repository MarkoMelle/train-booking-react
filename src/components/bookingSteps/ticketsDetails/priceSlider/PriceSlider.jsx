/* eslint-disable react-hooks/exhaustive-deps */
import "./PriceSlider.css";
import { useState, useEffect, useCallback } from "react";
import SliderComponent from "../sliderComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  fetchRoutes,
  resetPagination,
} from "../../../../redux/features/searchResultsSlice";
import { debounce } from "../../../../utils";

export default function PriceSlider() {
  const filters = useSelector((state) => state.searchResults);
  const { minPrice, maxPrice, priceFrom, priceTo } = useSelector(
    (state) => state.searchResults
  );
  const [value, setValue] = useState([
    priceFrom || minPrice,
    priceTo || maxPrice,
  ]);
  console.log(minPrice, maxPrice, priceFrom, priceTo);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const debouncedFetchRoutes = useCallback(
    debounce((updatedFilters) => {
      dispatch(resetPagination());
      dispatch(fetchRoutes({ ...updatedFilters, offset: 0 }));
    }, 500),
    []
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setFilter({ priceFrom: newValue[0], priceTo: newValue[1] }));
    const updatedFilters = {
      ...filters,
      priceFrom: newValue[0],
      priceTo: newValue[1],
    };
    debouncedFetchRoutes(updatedFilters);
  };

  const marks = [
    {
      value: minPrice,
      label: `${minPrice}`,
    },
    {
      value: maxPrice,
      label: `${maxPrice}`,
    },
  ];
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
        min={minPrice}
        max={maxPrice}
        step={10}
        marks={[
          {
            value: marks[0].value / value[0] === 1 ? 0 : marks[0].value,
            label:
              marks[0].value / value[0] > 0.7
                ? ""
                : value[0] === 0 || marks[1].value / 10 > value[0]
                ? ""
                : marks[0].label,
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
            label: marks[1].value / value[1] < 1.2 ? `` : marks[1].label,
          },
        ]}
      />
    </div>
  );
}
