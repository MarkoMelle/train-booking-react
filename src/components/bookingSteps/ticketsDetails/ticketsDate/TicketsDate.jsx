import DataPickerComponent from "../../../dataPicker/DataPickerComponent";
import { useState } from "react";
import "./TicketsDate.css";

export default function TicketsDate() {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  return (
    <div className="tickets-details__dates">
      <div className="tickets-details__date">
        <h3 className="tickets-details__date-title">Дата поездки</h3>
        <DataPickerComponent
          date={departureDate}
          setDate={setDepartureDate}
          block="tickets-details"
        />
      </div>
      <div className="tickets-details__date">
        <h3 className="tickets-details__date-title">Дата возвращения</h3>
        <DataPickerComponent
          date={returnDate}
          setDate={setReturnDate}
          block="tickets-details"
        />
      </div>
    </div>
  );
}
