import DataPicker, { registerLocale } from "react-datepicker";
import { useState } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
import "./DataPickerComponent.css";
registerLocale("ru", ru);

const handleDateChange = (date, setDate) => {
  setDate(date);
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
      date >= departureDate &&
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
      dayClassName={(date) => dayClassNames(date, minDate)}
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
};

// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const YourComponent = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [highlightedDates, setHighlightedDates] = useState([]);

//   useEffect(() => {
//     const newHighlightedDates = [/* массив дат */];
//     setHighlightedDates(newHighlightedDates);
//   }, [/* зависимости */]);

//   const isHighlighted = (date) => {
//     return highlightedDates.some(highlightedDate =>
//       date.getDate() === highlightedDate.getDate() &&
//       date.getMonth() === highlightedDate.getMonth() &&
//       date.getFullYear() === highlightedDate.getFullYear()
//     );
//   };

//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       dayClassName={(date) =>
//         isHighlighted(date) ? 'highlighted-range' : undefined
//       }
//     />
//   );
// };

// export default YourComponent;
