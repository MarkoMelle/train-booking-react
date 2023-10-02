import PropTypes from "prop-types";
import "./SelectSeats.css";
import SeatSelector from "./seatSelector/SeatSelector";

export default function SelectSeats({ setActiveStep, currentTrip }) {
  return (
    <div className="select-seats">
      <h2 className="select-seats__title">Выбор мест</h2>
      <SeatSelector {...{ setActiveStep, currentTrip }} />
      <button
        className="select-seats__button
      primary-btn primary-btn--white
      "
        onClick={() => setActiveStep(2)}
      >
        Далее
      </button>
    </div>
  );
}

SelectSeats.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  currentTrip: PropTypes.object.isRequired,
};
