import "./TicketsDetails.css";
import { useState } from "react";

import DataPickerComponent from "../../dataPicker/DataPickerComponent";
import TicketOptions from "./ticketOptions/TicketOptions";
import PriceSlider from "./priceSlider/PriceSlider";
import TimeSliders from "./timeSliders/TimeSliders";

export default function TicketsDetails() {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  return (
    <div className="tickets-details">
      <div className="tickets-details__header">
        <div className="tickets-details__dates">
          <div className="tickets-details__date">
            <h3 className="tickets-details__title">Дата поездки</h3>
            <DataPickerComponent
              date={departureDate}
              setDate={setDepartureDate}
              block="tickets-details"
            />
          </div>
          <div className="tickets-details__date">
            <h3 className="tickets-details__title">Дата возвращения</h3>
            <DataPickerComponent
              date={returnDate}
              setDate={setReturnDate}
              block="tickets-details"
            />
          </div>
        </div>
        <TicketOptions />
        <PriceSlider />
        <TimeSliders direction="departure" />
        <TimeSliders direction="arrival" />
      </div>
    </div>
  );
}
