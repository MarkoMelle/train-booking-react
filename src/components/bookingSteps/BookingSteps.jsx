import "./BookingSteps.css";
import { useState } from "react";
import ProgressBar from "./progressBar/ProgressBar";
import TicketsDetails from "./ticketsDetails/TicketsDetails";
import LastTickets from "./lastTickets/LastTickets";
import SearchResults from "./searchResults/SearchResults";
import SelectSeats from "./selectSeats/SelectSeats";
import SelectPassenger from "./selectPassenger/SelectPassenger";
import Payment from "./payment/Payment";
import Verification from "./verification/Verification";
import {  setSelectSeats } from "../../redux/features/seatsSlice";
import { useDispatch, useSelector } from "react-redux";


export default function BookingSteps() {
  const [activeStep, setActiveStep] = useState(1);
  // const [isSelectSeats, setIsSelectSeats] = useState(false);
  const dispatch = useDispatch();
  const isSelectSeats = useSelector((state) => state.seats.isSelectSeats);

  const setIsSelectSeats = () => {
    dispatch(setSelectSeats(true));
  }

  return (
    <div className="booking-steps wrapper">
      <ProgressBar activeStep={activeStep} setActiveStep={setActiveStep} />
      <aside className="booking-steps__aside">
        <TicketsDetails activeStep={activeStep}/>
        <LastTickets />
      </aside>
      <main className="booking-steps__main">
        {activeStep === 1 && !isSelectSeats && (
          <SearchResults {...{setIsSelectSeats }} />
        )}
        {activeStep === 1 && isSelectSeats && (
          <SelectSeats {...{ setActiveStep }} />
        )}
        {activeStep === 2 && <SelectPassenger {...{ setActiveStep }} />}
        {activeStep === 3 && <Payment {...{ setActiveStep }} />}
        {activeStep === 4 && <Verification />}
      </main>
    </div>
  );
}
