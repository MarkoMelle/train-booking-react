import PropTypes from "prop-types";
import "./SelectSeats.css";
import SeatSelector from "./seatSelector/SeatSelector";

export default function SelectSeats({ setActiveStep, currentTrip }) {
  return (
    <div className="select-seats">
      <h2 className="select-seats__title">Выбор мест</h2>
      <SeatSelector {...{ setActiveStep, currentTrip }} />
    </div>
  );
}

SelectSeats.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  currentTrip: PropTypes.object.isRequired,
};
