import LastTicket from "./lastTicket/LastTicket";
import "./LastTickets.css";
import { apiClient } from "../../../api/apiClient";
import { useEffect, useState } from "react";

export default function LastTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    apiClient
      .getLastRoutes()
      .then((res) => {
        if (Array.isArray(res)) {
          setTickets(res);
        } else {
          console.error("Response is not an array:", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="last-tickets">
      <h2 className="last-tickets__title">Последние билеты</h2>
      <div className="last-tickets__list">
        {tickets.slice(0, 3).map((ticket, index) => (
          <LastTicket key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
