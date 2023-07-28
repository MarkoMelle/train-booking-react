import { useState } from "react";
import DataPickerComponent from "../../dataPicker/DataPickerComponent";
import "./SelectionForm.css";
import swapIcon from "../../../assets/icons/swap-icon.svg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const locations = ["Aнгарск", "Астрахань", "Барнаул", "Москва"];

export default function SelectionForm({ modifier }) {
  const block = "selection-form";
  const navigate = useNavigate();
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromInputFocus, setFromInputFocus] = useState(false);
  const [toInputFocus, setToInputFocus] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isRotated, setIsRotated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/tickets");
  };

  const handleInputChange = (event, setInput) => {
    setInput(event.target.value);
  };

  const handleSuggestionClick = (location, setInput) => {
    setInput(location);
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

  const renderSuggestions = (input, setInput, inputFocus) => {
    if (!input || !inputFocus) return null;

    const suggestions = locations.filter((location) =>
      location.toLowerCase().includes(input.toLowerCase())
    );
    if (suggestions.length === 0) {
      return;
    } else if (
      suggestions.length === 1 &&
      suggestions[0].toLowerCase() === input.toLowerCase()
    ) {
      return;
    }
    return (
      <ul className={`${block}__suggestions`}>
        {suggestions.map((suggestion) => (
          <li
            className={`${block}__suggestion`}
            key={suggestion}
            onMouseDown={() => handleSuggestionClick(suggestion, setInput)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form className={`${block} ${block}--${modifier}`} onSubmit={handleSubmit}>
      <div className={`${block}__group ${block + `__group--${modifier}`}`}>
        <h3 className={`${block}__group-title`}>Направление</h3>
        <input
          className={`${block}__input ${block}__input--text form-input`}
          type="text"
          name="from"
          value={fromInput}
          onInput={(e) => handleInputChange(e, setFromInput)}
          onFocus={() => setFromInputFocus(true)}
          onBlur={() => setFromInputFocus(false)}
          placeholder="Откуда"
        />
        {renderSuggestions(fromInput, setFromInput, fromInputFocus)}
        <button
          className={`${block}__swap-btn ${isRotated ? "rotating" : ""}`}
          type="button"
          onClick={handleSwapButtonClick}
        >
          <img src={swapIcon} alt="swap" />
        </button>
        <input
          className={`${block}__input ${block}__input--text form-input`}
          type="text"
          name="to"
          value={toInput}
          onChange={(e) => handleInputChange(e, setToInput)}
          onFocus={() => setToInputFocus(true)}
          onBlur={() => setToInputFocus(false)}
          placeholder="Куда"
        />
        {renderSuggestions(toInput, setToInput, toInputFocus)}
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
