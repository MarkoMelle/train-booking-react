import { useState } from "react";
import PropTypes from "prop-types";
import "./SelectionForm.css";
import DataPickerComponent from "../../dataPicker/DataPickerComponent";
import swapIcon from "../../../assets/icons/swap-icon.svg";
import { useNavigate } from "react-router-dom";
import InputWithSuggestions from "./inputWithSuggestions/InputWithSuggestions";
import { setFilter } from "../../../redux/features/filtersSlice";
import { useSelector, useDispatch } from "react-redux";


export default function SelectionForm({ modifier }) {
  const block = "selection-form";
  const navigate = useNavigate();
  const {fromCity, toCity, dateStart, dateEnd} = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const [departureDate, setDepartureDate] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [returnDate, setReturnDate] = useState("");
  const [isRotated, setIsRotated] = useState(false);


  const setFromCity = (cityId, cityName) => {
    dispatch(setFilter({
      fromCity: {
        id: cityId,
        name: cityName
      }
    }));
  };
  
  const setToCity = (cityId, cityName) => {
    dispatch(setFilter({
      toCity: {
        id: cityId,
        name: cityName
      }
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // setState((prevState) => ({
    //   ...prevState,
    //   departureDate: departureDate,
    //   returnDate: returnDate,
    // }));
    navigate("/tickets");
  };

  const handleSwapButtonClick = () => {
    console.log(fromCity, toCity);
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
          date={dateStart}
          setDate={setDepartureDate}
          block={block}
        />
        <DataPickerComponent
          date={dateEnd}
          setDate={setReturnDate}
          block={block}
          minDate={departureDate}
        />
      </div>
      <button
        className={`${block}__submit-btn primary-btn primary-btn--big--black`}
        type="submit"
      >
        Найти билеты
      </button>
    </form>
  );
}

SelectionForm.propTypes = {
  modifier: PropTypes.string.isRequired,
};
