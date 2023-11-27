import PropTypes from "prop-types";
import "./SelectSeats.css";
import SeatSelector from "./seatSelector/SeatSelector";
import {  useSelector } from "react-redux";
import {
  setSeatsInfo,
  setSeatsInfoBack,
  setSelectedSeats,
  setSelectedSeatsBack,
  resetRoute,
} from "../../../redux/features/seatsSlice";

export default function SelectSeats({ setActiveStep }) {
  const {
    routeId,
    routeIdBack,
    currentRoute,
    currentRouteBack,
    seatsFilter,
    seatsFilterBack,
    seatsInfo,
    seatsInfoBack,
    selectedSeats,
    selectedSeatsBack,
  } = useSelector((state) => state.seats);

  return (
    <div className="select-seats">
      <h2 className="select-seats__title">Выбор мест</h2>
      <SeatSelector
        {...{
          setActiveStep,
          currentRoute,
          routeId,
          seatsFilter,
          seatsInfo,
          selectedSeats,
          setSeatsInfo,
          setSelectedSeats: setSelectedSeatsBack,
          resetRoute,
        }}
      />
      {routeIdBack && (
        <SeatSelector
          {...{
            direction: "arrival",
            setActiveStep,
            currentRoute: currentRouteBack,
            routeId: routeIdBack,
            seatsFilter: seatsFilterBack,
            seatsInfo: seatsInfoBack,
            selectedSeats: selectedSeatsBack,
            setSeatsInfo: setSeatsInfoBack,
            setSelectedSeats,
            resetRoute,
          }}
        />
      )}
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
