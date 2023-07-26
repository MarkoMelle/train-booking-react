import DataPicker, { registerLocale } from "react-datepicker";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { format } from "date-fns";
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

export default function DataPickerComponent({ date, setDate, block }) {
  return (
    <DataPicker
      className={`${block}__input ${block}__input--date form-input`}
      name="departureDate"
      selected={date}
      onChange={(date) => handleDateChange(date, setDate)}
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
   date: PropTypes.instanceOf(Date).isRequired,
   setDate: PropTypes.func.isRequired,
   block: PropTypes.string.isRequired,
 };
