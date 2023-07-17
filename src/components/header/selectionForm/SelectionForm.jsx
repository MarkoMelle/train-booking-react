import { useState } from "react";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SelectionForm.css";
import swapIcon from "../../../assets/icons/swap-icon.svg";

const locations = ["Aнгарск", "Астрахань", "Барнаул", "Москва"];

export default function SelectionForm() {
  const block = "selection-form";
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Отправлено");
  };

  const handleInputChange = (event, setInput) => {
    setInput(event.target.value);
  };

  const handleDateChange = (event, setDate) => {
    setDate(event.target.value);
  };

  const handleSuggestionClick = (location, setInput) => {
    setInput(location);
  };

  const handleSwapButtonClick = () => {
    const temp = fromInput;
    setFromInput(toInput);
    setToInput(temp);
  };

  const renderSuggestions = (input, setInput) => {
    if (!input) return null;

    const suggestions = locations.filter((location) =>
      location.toLowerCase().includes(input.toLowerCase())
    );
    if (suggestions.length === 0) {
      return (
        <ul>
          <li>Такое направление не найдено</li>
        </ul>
      );
    }
    return (
      <ul className={`${block}__suggestions`}>
        {suggestions.map((suggestion) => (
          <li
            className={`${block}__suggestion`}
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion, setInput)}
          >
            {suggestion.toLocaleUpperCase()}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form className={block} onSubmit={handleSubmit}>
      <div className={`${block}__group`}>
        <h3 className={`${block}__group-title`}>Направление</h3>
        <input
          className={`${block}__input ${block}__input--text`}
          type="text"
          name="from"
          value={fromInput}
          onChange={(e) => handleInputChange(e, setFromInput)}
          placeholder="Откуда"
        />
        {renderSuggestions(fromInput, setFromInput)}
        <button
          className={`${block}__swap-btn`}
          type="button"
          onClick={handleSwapButtonClick}
        >
          <img src={swapIcon} alt="swap" />
        </button>
        <input
          className={`${block}__input ${block}__input--text`}
          type="text"
          name="to"
          value={toInput}
          onChange={(e) => handleInputChange(e, setToInput)}
          placeholder="Куда"
        />
        {renderSuggestions(toInput, setToInput)}
      </div>
      <div className={`${block}__group`}>
        <h3 className={`${block}__group-title`}>Дата</h3>
        <DataPicker
          className={`${block}__input ${block}__input--date`}
          name="departureDate"
          selected={departureDate}
          onChange={(e) => handleDateChange(e, setDepartureDate)}
        />
        <DataPicker
          className={`${block}__input ${block}__input--date`}
          name="returnDate"
          selected={returnDate}
          onChange={(e) => handleDateChange(e, setReturnDate)}
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
