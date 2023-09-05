import { useState } from "react";
import schemeImg from "../../../../../assets/images/kupe-scheme.png";
import Wagon from "./wagon/Wagon";
import { sitting, plazcart, coupe, lux } from "./iconsSvg";

export default function WagonTypes({ currentTrip, wagons, services }) {
  const [activeType, setActiveType] = useState("Купе");
  const wagonTypes = [
    { icon: sitting, title: "Сидячий" },
    { icon: plazcart, title: "Плацкарт" },
    { icon: coupe, title: "Купе" },
    { icon: lux, title: "Люкс" },
  ];
  return (
    <div className="seat-selector__wagons">
      <h3 className="seat-selector__wagons-title">Тип вагона</h3>
      <ul className="seat-selector__wagons-list">
        {wagonTypes.map((type) => (
          <li
            key={type.title}
            className={`seat-selector__wagons-item ${
              activeType === type.title
                ? "seat-selector__wagons-item--active"
                : ""
            }`}
            onClick={() => setActiveType(type.title)}
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
          <span className="seat-selector__wagons-text">Вагоны</span>
          {wagons.map((num) => (
            <span key={num} className="seat-selector__wagons-number">
              {num}
            </span>
          ))}
        </div>
        <Wagon
          currentTrip={currentTrip}
          services={services}
          schemeImg={schemeImg}
        />
      </div>
    </div>
  );
}
