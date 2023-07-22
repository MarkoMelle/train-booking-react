import { useState, useEffect } from "react";
import DataPicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SelectionForm.css";
import swapIcon from "../../../assets/icons/swap-icon.svg";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
registerLocale("ru", ru);

const locations = ["Aнгарск", "Астрахань", "Барнаул", "Москва"];

export default function SelectionForm() {
  const block = "selection-form";
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromInputFocus, setFromInputFocus] = useState(false);
  const [toInputFocus, setToInputFocus] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isRotated, setIsRotated] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Отправлено");
  };

  const handleInputChange = (event, setInput) => {
    setInput(event.target.value);
  };

  const handleDateChange = (date, setDate) => {
    setDate(date);
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

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    const monthName = format(date, "LLLL", { locale: ru });

    return (
      <>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--previous"
        >
          <svg
            className="react-datepicker__navigation-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
        </button>
        <h3>{monthName}</h3>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--next"
        >
          <svg
            className="react-datepicker__navigation-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
        </button>
      </>
    );
  };

  return (
    <form className={block} onSubmit={handleSubmit}>
      <div className={`${block}__group`}>
        <h3 className={`${block}__group-title`}>Направление</h3>
        <div className={`${block}__input-container`}>
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
        </div>
        <button
          className={`${block}__swap-btn ${isRotated ? 'rotating' : ''}`}
          type="button"
          onClick={handleSwapButtonClick}
        >
          <img src={swapIcon} alt="swap" />
        </button>
        <div className={`${block}__input-container`}>
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
      </div>
      <div className={`${block}__group`}>
        <h3 className={`${block}__group-title`}>Дата</h3>
        <DataPicker
          className={`${block}__input ${block}__input--date form-input`}
          name="departureDate"
          selected={departureDate}
          onChange={(date) => handleDateChange(date, setDepartureDate)}
          locale="ru"
          renderCustomHeader={CustomHeader}
          popperModifiers={[
            {
              name: "eventListeners",
              options: {
                scroll: false,
                resize: false,
              },
            },
          ]}
        />
        <DataPicker
          className={`${block}__input ${block}__input--date form-input`}
          name="returnDate"
          selected={returnDate}
          onChange={(date) => handleDateChange(date, setReturnDate)}
          locale="ru"
          renderCustomHeader={CustomHeader}
          popperModifiers={[
            {
              name: "eventListeners",
              options: {
                scroll: false,
                resize: false,
              },
            },
          ]}
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
