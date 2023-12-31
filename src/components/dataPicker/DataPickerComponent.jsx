import DataPicker, { registerLocale } from "react-datepicker";
import { useState } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
import "./DataPickerComponent.css";
registerLocale("ru", ru);

const handleDateChange = (newDate, setDate) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  if (newDate) {
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const newDay = newDate.getDate();

    if (newYear < currentYear) {
      setDate(new Date(currentYear, newMonth, newDay));
    } else {
      setDate(new Date(newYear, newMonth, newDay));
    }
  } else {
    setDate(null);
  }
};

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const monthName = format(date, "LLLL", { locale: ru });

  return (
    <>
      <button
        type="button"
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
        type="button"
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

export default function DataPickerComponent({
  direction = "departure",
  date,
  setDate,
  block,
  minDate,
  maxDate,
}) {
  const [hoveredDate, setHoveredDate] = useState(null);

  const onDayMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const onDayMouseLeave = () => {
    setHoveredDate(null);
  };

  const dayClassNames = (date, departureDate) => {
    if (
      hoveredDate &&
      departureDate &&
      date >= departureDate - 86400000 &&
      date <= hoveredDate
    ) {
      return "highlighted-range";
    }
    return "";
  };

  return (
    <DataPicker
      popperClassName={`${block}__popper`}
      className={`${block}__input input--date form-input`}
      placeholderText="ДД/ММ/ГГГГ"
      name="departureDate"
      autoComplete="off"
      selected={date}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(date) => handleDateChange(date, setDate)}
      dateFormat="dd.MM.yyyy"
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
      dayClassName={(date) =>
        dayClassNames(date, direction === "departure" ? null : minDate)
      }
      onDayMouseEnter={onDayMouseEnter}
      onDayMouseLeave={onDayMouseLeave}
    />
  );
}

CustomHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired,
};

DataPickerComponent.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  setDate: PropTypes.func.isRequired,
  block: PropTypes.string.isRequired,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  direction: PropTypes.string,
};
