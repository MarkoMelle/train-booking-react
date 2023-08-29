import LastTicket from "./lastTicket/LastTicket";
import "./lastTickets.css";

export default function LastTickets() {
  return (
    <div className="last-tickets">
      <h2 className="last-tickets__title">Последние билеты</h2>
      <div className="last-tickets__list">
        <LastTicket
          departureCity={{
            city: "Москва",
            station: "Казанский",
          }}
          arrivalCity={{
            city: "Санкт-Петербург",
            station: "Московский",
          }}
          price="1 200"
          options={["Бесплатный Wi-Fi", "Питание", "Проходит через Москву"]}
        />
        <LastTicket
          departureCity={{
            city: "Москва",
            station: "Казанский",
          }}
          arrivalCity={{
            city: "Санкт-Петербург",
            station: "Московский",
          }}
          price="1 200"
          options={["Бесплатный Wi-Fi", "Питание", "Проходит через Москву"]}
        />
        <LastTicket
          departureCity={{
            city: "Москва",
            station: "Казанский",
          }}
          arrivalCity={{
            city: "Санкт-Петербург",
            station: "Московский",
          }}
          price="1 200"
          options={["Бесплатный Wi-Fi", "Питание", "Проходит через Москву"]}
        />
      </div>
    </div>
  );
}