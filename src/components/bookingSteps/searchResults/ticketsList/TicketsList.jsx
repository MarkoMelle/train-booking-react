import { useState } from "react";
import Ticket from "./ticket/Ticket";
import "./TicketsList.css";
import Pagination from "./pagination/Pagination";
import PropTypes from "prop-types";

const tickets = [
  {
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
  },
];

export default function TicketsList({ setIsSelectSeats }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="tickets-list">
      {tickets.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} {...{ setIsSelectSeats }} />
      ))}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}


TicketsList.propTypes = {
  setIsSelectSeats: PropTypes.func.isRequired,
};