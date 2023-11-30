import { addIcon } from "./iconsSvg";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import PassengerCard from "./passengerCard/PassengerCard";
import "./SelectPassenger.css";
import { useSelector, useDispatch } from "react-redux";
import { showSnackBar } from "../../../redux/features/notificationsSlice";

export default function SelectPassenger({ setActiveStep }) {
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.seats);
  const departureSeats = selectedSeats.departure || [];
  const [validForms, setValidForms] = useState(Array(departureSeats.length).fill(false));

  const handleFormValidity = useCallback((index, isValid) => {
    setValidForms((currentValidForms) => {
      const updatedValidForms = [...currentValidForms];
      updatedValidForms[index] = isValid;
      return updatedValidForms;
    });
  }, []);


  const handleNextClick = () => {
    const invalidFormIndex = validForms.findIndex(isValid => !isValid);
    if (invalidFormIndex !== -1) {
      dispatch(showSnackBar({message : `Ошибка в данных пассажира №${invalidFormIndex + 1}`, type: "error"}));
    } else {
      setActiveStep(3);
    }
  };

  return (
    <div className="select-passenger">
      {departureSeats.map((seat, i) => (
        <PassengerCard key={seat.seatNumber} seat={seat} number={i + 1}
        onFormValidityChange={(isValid) => handleFormValidity(i, isValid)} />
      ))}
      {/* <div
        className="booking-steps__container
      select-passenger__add-passenger"
      >
        Добавить пассажира
        {addIcon}
      </div> */}
      <button
        className={`primary-btn select-passenger__next-btn`}
        type="button"
        onClick={handleNextClick}
      >
        Далее
      </button>
    </div>
  );
}

SelectPassenger.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};
