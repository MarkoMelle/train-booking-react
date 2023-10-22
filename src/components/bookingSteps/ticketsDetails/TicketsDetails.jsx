import "./TicketsDetails.css";
import TicketsDate from "./ticketsDate/TicketsDate";
import TicketsOptions from "./ticketsOptions/TicketsOptions";
import PriceSlider from "./priceSlider/PriceSlider";
import TimeSliders from "./timeSliders/TimeSliders";
import TicketDetails from "./ticketDetails/TicketDetails";
import PassengerDetails from "./passengerDetails/PassengerDetails";
import TotalPrice from "./totalPrice/TotalPrice";

export default function TicketsDetails({ activeStep , currentTrip
}) {
  return (
    <div className="tickets-details">
      {activeStep === 1 && (
        <>
          <TicketsDate />
          <TicketsOptions />
          <PriceSlider />
          <TimeSliders direction="departure" />
          <TimeSliders direction="arrival" />
        </>
      )}
      {(activeStep === 2 || activeStep === 3) && (
        <>
        {console.log(currentTrip)}
        <h2 className="tickets-details__title">Детали поездки</h2>
          <TicketDetails direction="departure" currentTrip={currentTrip} />
          <TicketDetails direction="arrival" currentTrip={currentTrip} />
          <PassengerDetails />
          <TotalPrice />
        </>
      )}
    </div>
  );
}
