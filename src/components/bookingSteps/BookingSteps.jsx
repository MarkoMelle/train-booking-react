import "./BookingSteps.css";
import ProgressBar from "./progressBar/ProgressBar";
import TicketsDetails from "./ticketsDetails/TicketsDetails";
import LastTickets from "./lastTickets/LastTickets";
import SearchResults from "./searchResults/SearchResults";

export default function BookingSteps() {
  return (
    <>
      <ProgressBar />
      <main className="booking-steps wrapper">
        <aside className="booking-steps__aside">
          <TicketsDetails />
          <LastTickets />
        </aside>
        <SearchResults />
      </main>
    </>
  );
}
