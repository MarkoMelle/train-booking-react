// <button
//   type="button"
//   onClick={decreaseMonth}
//   disabled={prevMonthButtonDisabled}
//   className="react-datepicker__navigation react-datepicker__navigation--previous"
// >
//   <svg
//     className="react-datepicker__navigation-icon"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//   >
//     <path d="M24 22h-24l12-20z" />
//   </svg>
// </button>
import DatePicker, { registerLocale } from "react-datepicker";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { getYear, getMonth } from "date-fns";
import "./BirthDatePicker.css";
registerLocale("ru", ru);

const handleDateChange = (date, setDate) => {
  setDate(date);
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
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const years = Array.from(new Array(100)).map(
    (_, i) => getYear(new Date()) - i
  );

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
      <select
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(Number(value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        value={monthNames[getMonth(date)]}
        onChange={({ target: { value } }) =>
          changeMonth(monthNames.indexOf(value))
        }
      >
        {monthNames.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
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

export default function BirthDatePicker({ date, setDate }) {
  return (
    <DatePicker
      popperClassName="birth-date__popper"
      className="booking-steps__input passenger-card__input birth-date__input"
      placeholderText="ДД/ММ/ГГГГ"
      selected={date}
      onChange={(date) => {
        handleDateChange(date, setDate);
      }}
      dateFormat="dd.MM.yyyy"
      locale="ru"
      renderCustomHeader={(props) => <CustomHeader {...props} />}
      maxDate={new Date()}
      shouldCloseOnSelect={true}
    />
  );
}

CustomHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  changeYear: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired,
};

BirthDatePicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};
