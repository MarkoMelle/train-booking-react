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

const testTrip = {
  trainNumber: "116С",
  direction: ["Москва", "Санкт-Петербург"],
  departureTime: ["00:10", "09:52"],
  departureStation: ["Курский вокзал", "Ладожский вокзал"],
  arrivalTime: ["00:10", "09:52"],
  arrivalStation: ["Курский вокзал", "Ладожский вокзал"],
  sitClasses: [
    {
      name: "Сидячий",
      available: { all: 88, upper: 22, lower: 66 },
      price: { from: 1920, upper: 1920, lower: 2130 },
    },
    {
      name: "Плацкарт",
      available: { all: 52, upper: 12, lower: 40 },
      price: { from: 3820, upper: 3820, lower: 4130 },
    },
    {
      name: "Купе",
      available: { all: 24, upper: 19, lower: 5 },
      price: { from: 6820, upper: 6820, lower: 7130 },
    },
    {
      name: "Люкс",
      available: { all: 18, upper: 11, lower: 7 },
      price: { from: 11820, upper: 11820, lower: 12130 },
    },
  ],
};

export default function BookingSteps() {
  const [activeStep, setActiveStep] = useState(1);
  const [isSelectSeats, setIsSelectSeats] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(testTrip);
  return (
    <div className="booking-steps wrapper">
      <ProgressBar activeStep={activeStep} />
      <aside className="booking-steps__aside">
        <TicketsDetails activeStep={activeStep} currentTrip={currentTrip} />
        <LastTickets />
      </aside>
      <main className="booking-steps__main">
        {activeStep === 1 && !isSelectSeats && (
          <SearchResults {...{ setIsSelectSeats, setCurrentTrip }} />
        )}
        {activeStep === 1 && isSelectSeats && (
          <SelectSeats {...{ setActiveStep, currentTrip }} />
        )}
        {activeStep === 2 && <SelectPassenger {...{ setActiveStep }} />}
        {activeStep === 3 && <Payment {...{ setActiveStep }} />}
        {activeStep === 4 && <Verification />}
      </main>
    </div>
  );
}
