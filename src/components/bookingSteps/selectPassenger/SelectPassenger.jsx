import { useState } from "react";
import PropTypes from "prop-types";
import PassengerCard from "./passengerCard/PassengerCard";
import "./SelectPassenger.css";

const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
  >
    <path
      d="M7.98836 1.50727L7.98836 7.98839L1.50724 7.98839C0.904343 7.98839 0.452171 8.44056 0.452171 9.04346C0.452171 9.64635 0.904343 10.0985 1.50724 10.0985L7.98836 10.0985L7.98836 16.5796C7.98836 17.1825 8.44053 17.6347 8.96807 17.5594L9.11879 17.5594C9.72169 17.5594 10.1739 17.1072 10.0985 16.5796L10.0985 10.0985L16.4289 10.0985C17.0318 10.0985 17.484 9.64635 17.484 9.04346C17.484 8.44056 17.0318 7.98839 16.4289 7.98839L10.0985 7.98839L10.0985 1.50727C10.0985 0.904371 9.64632 0.4522 9.11879 0.527562L8.96807 0.527561C8.36517 0.527561 7.913 0.979733 7.98836 1.50727Z"
      fill="#FFA800"
    />
  </svg>
);

export default function SelectPassenger({ setActiveStep }) {
  const [disabled] = useState(false);

  return (
    <div className="select-passenger">
      <PassengerCard />
      <PassengerCard />
      <div
        className="booking-steps__container
      select-passenger__add-passenger"
      >
        Добавить пассажира
        {addIcon}
      </div>
      <button
        className={`primary-btn select-passenger__next-btn  ${
          disabled ? "primary-btn--disabled" : ""
        }`}
        type="button"
        onClick={() => setActiveStep(3)}
        disabled={disabled}
      >
        Далее
      </button>
    </div>
  );
}

SelectPassenger.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};
