import { useState } from "react";
import PropTypes from "prop-types";
import "./SelectionForm.css";
import DataPickerComponent from "../../dataPicker/DataPickerComponent";
import swapIcon from "../../../assets/icons/swap-icon.svg";
import { useNavigate } from "react-router-dom";
import InputWithSuggestions from "./inputWithSuggestions/InputWithSuggestions";
import { setFilter } from "../../../redux/features/filtersSlice";
import { fetchRoutes } from "../../../redux/features/filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import { stringifyDate } from "../../../utils";

export default function SelectionForm({ modifier }) {
  const block = "selection-form";
  const navigate = useNavigate();
  const { fromCity, toCity, dateStart, dateEnd } = useSelector(
    (state) => state.filters
  );
  const filters = useSelector((state) => state.filters);
  const dateStartObj = dateStart ? new Date(dateStart) : "";
  const dateEndObj = dateEnd ? new Date(dateEnd) : "";
  const dispatch = useDispatch();
  const [isRotated, setIsRotated] = useState(false);

  const setFromCity = (cityId, cityName) => {
    dispatch(
      setFilter({
        fromCity: {
          id: cityId,
          name: cityName,
        },
      })
    );
  };

  const setToCity = (cityId, cityName) => {
    dispatch(
      setFilter({
        toCity: {
          id: cityId,
          name: cityName,
        },
      })
    );
  };

  const setDepartureDate = (date) => {
    dispatch(
      setFilter({
        dateStart: stringifyDate(date),
      })
    );
  };

  const setReturnDate = (date) => {
    dispatch(
      setFilter({
        dateEnd: stringifyDate(date),
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/tickets");
    dispatch(fetchRoutes(filters));
  };

  const handleSwapButtonClick = () => {
    const temp = { ...fromCity };
    setFromCity(toCity.id, toCity.name);
    setToCity(temp.id, temp.name);
    setIsRotated(true);
    setTimeout(() => {
      setIsRotated(false);
    }, 300);
  };

  return (
    <form className={`${block} ${block}--${modifier}`} onSubmit={handleSubmit}>
      <div className={`${block}__group ${block + `__group--${modifier}`}`}>
        <h3 className={`${block}__group-title`}>Направление</h3>
        <InputWithSuggestions
          block={block}
          city={fromCity}
          setCity={setFromCity}
          placeholder="Откуда"
        />
        <button
          className={`${block}__swap-btn ${isRotated ? "rotating" : ""}`}
          type="button"
          onClick={handleSwapButtonClick}
        >
          <img src={swapIcon} alt="swap" />
        </button>
        <InputWithSuggestions
          block={block}
          city={toCity}
          setCity={setToCity}
          placeholder="Куда"
        />
      </div>
      <div className={`${block}__group ${block + `__group--${modifier}`}`}>
        <h3 className={`${block}__group-title`}>Дата</h3>
        <DataPickerComponent
          date={dateStartObj}
          setDate={setDepartureDate}
          block={block}
        />
        <DataPickerComponent
          date={dateEndObj}
          setDate={setReturnDate}
          block={block}
          minDate={dateStartObj || new Date()}
        />
      </div>
      <button
        className={`${block}__submit-btn primary-btn primary-btn--big--black`}
        type="submit"
        onClick={handleSubmit}
      >
        Найти билеты
      </button>
    </form>
  );
}

SelectionForm.propTypes = {
  modifier: PropTypes.string.isRequired,
};
