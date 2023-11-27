import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Wagon from "./wagon/Wagon";
import { sitting, platzcart, coupe, lux } from "./iconsSvg";

const getAvailableWagonTypes = (wagons) => {
  const availableTypes = new Set();
  wagons.forEach((wagon) => {
    availableTypes.add(wagon.coach.class_type);
  });
  return Array.from(availableTypes);
};

export default function WagonTypes({
  seatsInfo,
  seatsFilter,
  handleSelectSeat,
  handleDeselectSeat,
  selectedSeats,
  services,
  updateService,
}) {
  const wagonTypes = [
    { type: "fourth", icon: sitting, title: "Сидячий" },
    { type: "third", icon: platzcart, title: "Плацкарт" },
    { type: "second", icon: coupe, title: "Купе" },
    { type: "first", icon: lux, title: "Люкс" },
  ];
  const availableWagonTypes = getAvailableWagonTypes(Object.values(seatsInfo));
  const filteredWagonTypes = wagonTypes.filter((wagonType) =>
    availableWagonTypes.includes(wagonType.type)
  );

  const [activeType, setActiveType] = useState(
    filteredWagonTypes[0] || wagonTypes[0]
  );
  const [activeWagonId, setActiveWagonId] = useState(null);

  useEffect(() => {
    const firstAvailableType = filteredWagonTypes[0] || wagonTypes[0];
    setActiveType(firstAvailableType);

    const wagonsOfFirstType = seatsInfo.filter(
      (wagon) => wagon.coach.class_type === firstAvailableType.type
    );
    setActiveWagonId(
      wagonsOfFirstType.length > 0 ? wagonsOfFirstType[0].coach._id : null
    );
  }, []);

  useEffect(() => {
    if (
      filteredWagonTypes.length > 0 &&
      !filteredWagonTypes.find((wagon) => wagon.type === activeType.type)
    ) {
      const newActiveType = filteredWagonTypes[0];
      setActiveType(newActiveType);

      const wagonsOfNewActiveType = seatsInfo.filter(
        (wagon) => wagon.coach.class_type === newActiveType.type
      );
      setActiveWagonId(
        wagonsOfNewActiveType.length > 0
          ? wagonsOfNewActiveType[0].coach._id
          : null
      );
    }
  }, [filteredWagonTypes, seatsInfo, activeType.type]);
  
  const handleWagonClick = (wagonId) => {
    setActiveWagonId(wagonId);
  };

  const activeWagons = seatsInfo.filter(
    (wagon) => wagon.coach.class_type === activeType.type
  );
  const activeWagon = activeWagons.find(
    (wagon) => wagon.coach._id === activeWagonId
  );

  return (
    <div className="seat-selector__wagons">
      {filteredWagonTypes.length === 0 ? (
        <h3 className="seat-selector__wagons-title seat-selector__wagons-title--center">
          Нет доступных вагонов по вашему запросу
        </h3>
      ) : (
        <>
          <h3 className="seat-selector__wagons-title">Тип вагона</h3>
          <ul className="seat-selector__wagons-list">
            {filteredWagonTypes.map((type) => (
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
              {activeWagons.map((wagon) => (
                <span
                  key={wagon.coach._id}
                  className="seat-selector__wagons-number"
                  onClick={() => handleWagonClick(wagon.coach._id)}
                >
                  {wagon.coach.name.match(/\d+/g)}&nbsp;
                </span>
              ))}
              <span className="seat-selector__wagons-text--small">
                Нумерация вагонов начинается с головы поезда
              </span>
            </div>
            {activeWagon && (
              <Wagon
                key={activeWagon.coach._id}
                wagon={activeWagon}
                type={activeType.type}
                seatsFilter={seatsFilter}
                handleSelectSeat={handleSelectSeat}
                handleDeselectSeat={handleDeselectSeat}
                selectedSeats={selectedSeats}
                services={services}
                updateService={updateService}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
