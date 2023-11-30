/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import Wagon from "./wagon/Wagon";

export default function WagonTypes({
  seatsInfo,
  seatsFilter,
  handleSelectSeat,
  handleDeselectSeat,
  selectedSeats,
  services,
  updateService,
  changePrice,
  activeType,
  setActiveType,
  activeWagonId,
  setActiveWagonId,
  filteredWagonTypes,
}) {
  const handleTypeClick = (type) => {
    const selectedType = filteredWagonTypes.find(
      (wagonType) => wagonType.type === type
    );
    const firstWagonOfSelectedType = seatsInfo.find(
      (wagon) => wagon.coach.class_type === type
    );
    setActiveType(selectedType);
    setActiveWagonId(
      firstWagonOfSelectedType ? firstWagonOfSelectedType.coach._id : null
    );
  };

  useEffect(() => {
    if (
      activeType &&
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
  }, [filteredWagonTypes, seatsInfo, activeType]);

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
                onClick={() => handleTypeClick(type.type)}
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
                  className={`seat-selector__wagons-number ${
                    activeWagonId === wagon.coach._id
                      ? "seat-selector__wagons-number--active"
                      : ""
                  }`}
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
                changePrice={changePrice}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

WagonTypes.propTypes = {
  seatsInfo: PropTypes.array.isRequired,
  seatsFilter: PropTypes.object.isRequired,
  handleSelectSeat: PropTypes.func.isRequired,
  handleDeselectSeat: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  services: PropTypes.object.isRequired,
  updateService: PropTypes.func.isRequired,
  changePrice: PropTypes.func.isRequired,
  activeType: PropTypes.object.isRequired,
  setActiveType: PropTypes.func.isRequired,
  activeWagonId: PropTypes.string,
  setActiveWagonId: PropTypes.func.isRequired,
  filteredWagonTypes: PropTypes.array.isRequired,
  wagonTypes: PropTypes.array.isRequired,
};
