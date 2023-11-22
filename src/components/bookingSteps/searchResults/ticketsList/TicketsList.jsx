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

export default function TicketsList({
  setIsSelectSeats,
  setCurrentTrip,
  currentPage,
  handlePageChange,
  itemsPerPage,
  totalItems,
  items,
}) {
  return (
    <div className="tickets-list">
      {
        items.map((item, index) => (
          <div key={index}>
            {item.departure._id}
          </div>
        ))
      }
      {tickets.map((ticket, index) => (
        <Ticket
          key={index}
          ticket={ticket}
          {...{ setIsSelectSeats, setCurrentTrip }}
        />
      ))}
      {(totalItems / itemsPerPage) > 1 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

TicketsList.propTypes = {
  setIsSelectSeats: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
};

// {
//   "have_first_class": false,
//   "have_second_class": false,
//   "have_third_class": false,
//   "have_fourth_class": false,
//   "have_wifi": false,
//   "have_air_conditioning": false,
//   "is_express": false,
//   "min_price": 2547,
//   "available_seats": 128,
//   "available_seats_info": {
//       "second": 32,
//       "third": 96
//   },
//   "departure": {
//       "_id": "64103df95c49ea004637cac5",
//       "have_first_class": false,
//       "have_second_class": true,
//       "have_third_class": true,
//       "have_fourth_class": false,
//       "have_wifi": true,
//       "have_air_conditioning": true,
//       "is_express": false,
//       "min_price": 2547,
//       "duration": 205860,
//       "available_seats": 128,
//       "available_seats_info": {
//           "second": 32,
//           "third": 96
//       },
//       "train": {
//           "_id": "641037f05c49ea004632f83f",
//           "name": "Зевс - 18"
//       },
//       "from": {
//           "railway_station_name": "Ярославский",
//           "city": {
//               "_id": "641037eb5c49ea004632ee6e",
//               "name": "москва"
//           },
//           "datetime": 1700701881
//       },
//       "to": {
//           "railway_station_name": "Московский",
//           "city": {
//               "_id": "641037eb5c49ea004632ee6f",
//               "name": "санкт-петербург"
//           },
//           "datetime": 1700907741
//       },
//       "price_info": {
//           "second": {
//               "top_price": 2547,
//               "bottom_price": 2844
//           },
//           "third": {
//               "top_price": 4550,
//               "bottom_price": 3870,
//               "side_price": 2760
//           }
//       }
//   }
// },
