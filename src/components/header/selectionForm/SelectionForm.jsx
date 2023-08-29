import { useState } from "react";
import DataPickerComponent from "../../dataPicker/DataPickerComponent";
import "./SelectionForm.css";
import swapIcon from "../../../assets/icons/swap-icon.svg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import InputWithSuggestions from "./inputWithSuggestions/InputWithSuggestions";

const locations = ["Aнгарск", "Астрахань", "Барнаул", "Москва"];

export default function SelectionForm({ modifier }) {
  const block = "selection-form";
  const navigate = useNavigate();
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isRotated, setIsRotated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/tickets");
  };

  const handleSwapButtonClick = () => {
    const temp = fromInput;
    setFromInput(toInput);
    setToInput(temp);

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
          inputValue={fromInput}
          setInputValue={setFromInput}
          placeholder="Откуда"
          locations={locations}
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
          inputValue={toInput}
          setInputValue={setToInput}
          placeholder="Куда"
          locations={locations}
        />
      </div>
      <div className={`${block}__group ${block + `__group--${modifier}`}`}>
        <h3 className={`${block}__group-title`}>Дата</h3>
        <DataPickerComponent
          date={departureDate}
          setDate={setDepartureDate}
          block={block}
          
        />
        <DataPickerComponent
          date={returnDate}
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
