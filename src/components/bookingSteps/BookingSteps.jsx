import "./BookingSteps.css";
import ProgressBar from "./progressBar/ProgressBar";
import TicketsDetails from "./ticketsDetails/TicketsDetails";

export default function BookingSteps() {
  return (
    <main className="booking-steps wrapper">
      <ProgressBar />
      <aside className="booking-steps__aside">
        <TicketsDetails />
      </aside>
    </main>
  );
}
