import "./BookingSteps.css";
import  { useState } from "react";
import ProgressBar from "./progressBar/ProgressBar";
import TicketsDetails from "./ticketsDetails/TicketsDetails";
import LastTickets from "./lastTickets/LastTickets";
import SearchResults from "./searchResults/SearchResults";
import SelectSeats from "./selectSeats/SelectSeats";



export default function BookingSteps() {
  const [activeStep, setActiveStep] = useState(1);
  const [isSelectSeats, setIsSelectSeats] = useState(false);
  return (
    <div className="booking-steps wrapper">
      <ProgressBar activeStep={activeStep} />
     <aside className="booking-steps__aside">
          <TicketsDetails />
          <LastTickets />
        </aside>
      <main className="booking-steps__main">
       {activeStep === 1 && !isSelectSeats && <SearchResults {...{ setIsSelectSeats}} />}
       {activeStep === 1 && isSelectSeats && <SelectSeats {...{ setActiveStep}} />}
      </main>
    </div>
  );
}
