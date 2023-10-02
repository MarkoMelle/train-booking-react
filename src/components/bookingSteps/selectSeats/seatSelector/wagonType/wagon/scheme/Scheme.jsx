import { useState } from "react";
import PropTypes from "prop-types";
import "./Scheme.css";

const arr = Array(32)
  .fill(null)
  .map(() => Math.random() > 0.5);

const Place = ({
  placeIndex,
  placeNumber,
  isSelected,
  isOccupied,
  type,
  onClick,
  offset,
}) => {
  return (
    <div
      className={`scheme__place
          scheme__place--${type}
          scheme__place--${type}--${placeIndex + offset}
          ${isOccupied ? "scheme__place--occupied" : ""}
          ${isSelected ? "scheme__place--selected" : ""}`}
      onClick={() => {
        if (!isOccupied) {
          onClick(placeIndex);
        }
      }}
    >
      {placeNumber + 1}
    </div>
  );
};

export default function Scheme({ number = "07", type, places = arr }) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleClick = (placeNumber) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeNumber)
        ? prev.filter((p) => p !== placeNumber)
        : [...prev, placeNumber]
    );
  };

  const renderPlaces = (
    count,
    offset,
    columnIndex,
    multiplier,
    startPlaceNumber = 0
  ) => {
    return Array(count)
      .fill()
      .map((_, placeIndex) => {
        const placeNumber =
          columnIndex * multiplier + placeIndex + startPlaceNumber;
        const isSelected = selectedPlaces.includes(placeNumber);
        return (
          <Place
            key={placeIndex}
            placeIndex={placeIndex}
            placeNumber={placeNumber}
            isSelected={isSelected}
            isOccupied={!places[placeNumber]}
            type={type}
            onClick={handleClick}
            offset={offset}
          />
        );
      });
  };

  return (
    <div className={`scheme scheme--${type}`}>
      <div className="scheme__number">{number}</div>
      {Array(8)
        .fill()
        .map((_, columnIndex) => (
          <div
            key={columnIndex}
            className={`scheme__column scheme__column--${columnIndex + 1}`}
          >
            {type === "coupe" && renderPlaces(4, 1, columnIndex, 4)}
            {type === "platzcart" && (
              <>
                {renderPlaces(4, 1, columnIndex, 4)}
                {renderPlaces(2, 5, columnIndex, 2, 32)}
              </>
            )}
            {type === "lux" && renderPlaces(2, 1, columnIndex, 2)}
            {type === "sitting" && (
              <>
                {renderPlaces(4, 1, columnIndex, 4)}
                {renderPlaces(
                  4,
                  5,
                  columnIndex,
                  2,
                  columnIndex === 0 ? 32 : 31
                )}
              </>
            )}
          </div>
        ))}
    </div>
  );
}

Scheme.propTypes = {
  number: PropTypes.string,
  type: PropTypes.string.isRequired,
  places: PropTypes.array,
};

Place.propTypes = {
  placeIndex: PropTypes.number.isRequired,
  placeNumber: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isOccupied: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};