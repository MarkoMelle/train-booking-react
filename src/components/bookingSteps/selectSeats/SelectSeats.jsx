import { useState } from "react";
import PropTypes from "prop-types";
import "./SelectSeats.css";
import SeatSelector from "./seatSelector/SeatSelector";
import { useSelector, useDispatch } from "react-redux";
import {
  setSeatsInfo,
  setSeatsInfoBack,
  setSelectedSeats,
  setSelectedSeatsBack,
  resetRoute,
  setPassengersInfo,
} from "../../../redux/features/seatsSlice";
import { initializePassengers } from "../../../redux/features/orderSlice";
import { calculateTicketInfo } from "../../../utils";
import { showSnackBar } from "../../../redux/features/notificationsSlice";

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
  const [selectedSeatsLocal, setSelectedSeatsLocal] = useState([]);
  const [selectedSeatsLocalBack, setSelectedSeatsLocalBack] = useState([]);
  const [passengerCounts, setPassengerCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const dispatch = useDispatch();

  function calculatePassengerCounts() {
    let total = 0;
    Object.values(passengerCounts).forEach((count) => {
      total += count;
    });
    return total;
  }

  const handleSubmit = () => {
    if (calculatePassengerCounts() === 0) {
      dispatch(showSnackBar({ message: "Выберите количество пассажиров" }));
      return;
    }
    if (selectedSeatsLocal.length === 0) {
      dispatch(showSnackBar({ message: "Выберите места" }));
      return;
    }
    if (
      selectedSeatsLocal.length ===
        passengerCounts.adults + passengerCounts.children &&
      (!routeIdBack ||
        selectedSeatsLocalBack.length ===
          passengerCounts.adults + passengerCounts.children)
    ) {
      dispatch(
        setSelectedSeats({
          departure: selectedSeatsLocal,
          arrival: selectedSeatsLocalBack,
        })
      );
      setActiveStep(2);
      const element = document.getElementById("progress-bar");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      dispatch(initializePassengers(selectedSeatsLocal));
      dispatch(
        setPassengersInfo(
          calculateTicketInfo({
            departure: selectedSeatsLocal,
            arrival: selectedSeatsLocalBack,
          })
        )
      );
    } else {
      dispatch(showSnackBar({ message: "Выберите места" }));
      return;
    }
  };

  return (
    <div className="select-seats">
      <h2 className="select-seats__title">Выбор мест</h2>
      <SeatSelector
        {...{
          direction: "departure",
          setActiveStep,
          currentRoute,
          routeId,
          seatsFilter,
          seatsInfo,
          selectedSeats,
          setSeatsInfo,
          setSelectedSeats: setSelectedSeatsBack,
          resetRoute,
          selectedSeatsLocal,
          setSelectedSeatsLocal,
          passengerCounts,
          setPassengerCounts,
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
            selectedSeatsLocal: selectedSeatsLocalBack,
            setSelectedSeatsLocal: setSelectedSeatsLocalBack,
            passengerCounts,
            setPassengerCounts,
          }}
        />
      )}
      <button
        className="select-seats__button
      primary-btn primary-btn--white
      "
        onClick={handleSubmit}
      >
        Далее
      </button>
    </div>
  );
}

SelectSeats.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};
