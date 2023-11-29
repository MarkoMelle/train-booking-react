import { addIcon } from "./iconsSvg";
import { useState } from "react";
import PropTypes from "prop-types";
import PassengerCard from "./passengerCard/PassengerCard";
import "./SelectPassenger.css";
import { useSelector, useDispatch } from "react-redux";

export default function SelectPassenger({ setActiveStep }) {
  const [disabled] = useState(false);
  const { selectedSeats } = useSelector((state) => state.seats);
  const departureSeats = selectedSeats.departure || [];

  return (
    <div className="select-passenger">
      {departureSeats.map((seat, i) => (
        <PassengerCard key={seat.seatNumber} seat={seat} number={i + 1} />
      ))}
      {/* <div
        className="booking-steps__container
      select-passenger__add-passenger"
      >
        Добавить пассажира
        {addIcon}
      </div> */}
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
