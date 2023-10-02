import { useState } from "react";
import PropTypes from "prop-types";
import Wagon from "./wagon/Wagon";
import { sitting, platzcart, coupe, lux } from "./iconsSvg";

export default function WagonTypes({ currentTrip, wagons, services }) {
  const wagonTypes = [
    { type: "sitting", icon: sitting, title: "Сидячий" },
    { type: "platzcart", icon: platzcart, title: "Плацкарт" },
    { type: "coupe", icon: coupe, title: "Купе" },
    { type: "lux", icon: lux, title: "Люкс" },
  ];
  const [activeType, setActiveType] = useState(wagonTypes[2]);
  return (
    <div className="seat-selector__wagons">
      <h3 className="seat-selector__wagons-title">Тип вагона</h3>
      <ul className="seat-selector__wagons-list">
        {wagonTypes.map((type) => (
          <li
            key={type.title}
            className={`seat-selector__wagons-item ${
              activeType.title === type.title
                ? "seat-selector__wagons-item--active"
                : ""
            }`}
            onClick={() => setActiveType(type)}
          >
            {type.icon}
            <span className="seat-selector__wagons-item-title">
              {type.title}
            </span>
          </li>
        ))}
      </ul>
      <div className="seat-selector__scheme">
        <div className="seat-selector__wagons-numbers">
          <span className="seat-selector__wagons-text">Вагоны&nbsp;</span>
          {wagons.map((num) =>
            num === "07" ? (
              <span
                key={num}
                className="seat-selector__wagons-number seat-selector__wagons-number--active"
              >
                {num}&nbsp;
              </span>
            ) : (
              <span key={num} className="seat-selector__wagons-number">
                {num}&nbsp;
              </span>
            )
          )}

          <span className="seat-selector__wagons-text--small">
            Нумерация вагонов начинается с головы поезда
          </span>
        </div>
        <Wagon
          currentTrip={currentTrip}
          services={services}
          type={activeType.type}
        />
      </div>
    </div>
  );
}

WagonTypes.propTypes = {
  currentTrip: PropTypes.object.isRequired,
  wagons: PropTypes.array.isRequired,
  services: PropTypes.object.isRequired,
};
