import "./TicketsDetails.css";
import TicketsDate from "./ticketsDate/TicketsDate";
import TicketsOptions from "./ticketsOptions/TicketsOptions";
import PriceSlider from "./priceSlider/PriceSlider";
import TimeSliders from "./timeSliders/TimeSliders";

export default function TicketsDetails() {
  
  return (
    <div className="tickets-details">
        <TicketsDate />
        <TicketsOptions />
        <PriceSlider />
        <TimeSliders direction="departure" />
        <TimeSliders direction="arrival" />
      
    </div>
  );
}
