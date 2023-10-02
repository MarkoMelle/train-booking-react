import { useState } from "react";
import PropTypes from "prop-types";
import "./Scheme.css";

const arr = Array(32)
  .fill(null)
  .map(() => Math.random() > 0.5);

export default function Scheme({ number = "07", type, places = arr }) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleClick = (placeNumber) => {
    if (selectedPlaces.includes(placeNumber)) {
      setSelectedPlaces((prev) => prev.filter((p) => p !== placeNumber));
    } else {
      setSelectedPlaces((prev) => [...prev, placeNumber]);
    }
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
            {type === "coupe" &&
              Array(4)
                .fill()
                .map((_, placeIndex) => {
                  const placeNumber = columnIndex * 4 + placeIndex;
                  const isSelected = selectedPlaces.includes(placeNumber);
                  return (
                    <div
                      key={placeIndex}
                      className={`
                        scheme__place 
                        scheme__place--${type} 
                        scheme__place--${type}--${placeIndex + 1} 
                        ${places[placeNumber] ? "" : "scheme__place--occupied"}
                        ${isSelected ? "scheme__place--selected" : ""}
                      `}
                      onClick={() => {
                        if (places[placeNumber]) {
                          handleClick(placeNumber);
                        }
                      }}
                    >
                      {placeNumber + 1}
                    </div>
                  );
                })}
            {type === "platzcart" && (
              <>
                {Array(4)
                  .fill()
                  .map((_, placeIndex) => {
                    const placeNumber = columnIndex * 4 + placeIndex;
                    const isSelected = selectedPlaces.includes(placeNumber);
                    return (
                      <div
                        key={placeIndex}
                        className={`
                          scheme__place 
                          scheme__place--${type} 
                          scheme__place--${type}--${placeIndex + 1} 
                          ${
                            places[placeNumber] ? "" : "scheme__place--occupied"
                          }
                          ${isSelected ? "scheme__place--selected" : ""}
                        `}
                        onClick={() => {
                          if (places[placeNumber]) {
                            handleClick(placeNumber);
                          }
                        }}
                      >
                        {placeNumber + 1}
                      </div>
                    );
                  })}
                {Array(2)
                  .fill()
                  .map((_, placeIndex) => {
                    const placeNumber = columnIndex * 2 + placeIndex + 32;
                    const isSelected = selectedPlaces.includes(placeNumber);
                    return (
                      <div
                        key={placeIndex}
                        className={`
                          scheme__place 
                          scheme__place--${type} 
                          scheme__place--${type}--${placeIndex + 5} 
                          ${
                            places[placeNumber] ? "" : "scheme__place--occupied"
                          }
                          ${isSelected ? "scheme__place--selected" : ""}
                        `}
                        onClick={() => {
                          if (places[placeNumber]) {
                            handleClick(placeNumber);
                          }
                        }}
                      >
                        {placeNumber + 1}
                      </div>
                    );
                  })}
              </>
            )}
            {type === "lux" && (
              <>
                {Array(2)
                  .fill()
                  .map((_, placeIndex) => {
                    const placeNumber = columnIndex * 2 + placeIndex;
                    const isSelected = selectedPlaces.includes(placeNumber);
                    return (
                      <div
                        key={placeIndex}
                        className={`
              scheme__place
              scheme__place--${type}
              scheme__place--${type}--${placeIndex + 1}
              ${places[placeNumber] ? "" : "scheme__place--occupied"}
              ${isSelected ? "scheme__place--selected" : ""}
            `}
                        onClick={() => {
                          if (places[placeNumber]) {
                            handleClick(placeNumber);
                          }
                        }}
                      >
                        {placeNumber + 1}
                      </div>
                    );
                  })}
              </>
            )}
            {type === "sitting" && (
              <>
                {Array(4)
                  .fill()
                  .map((_, placeIndex) => {
                    const placeNumber = columnIndex * 4 + placeIndex;
                    const isSelected = selectedPlaces.includes(placeNumber);
                    return (
                      <div
                        key={placeIndex}
                        className={`
              scheme__place
              scheme__place--${type}
              scheme__place--${type}--${placeIndex + 1}
              ${places[placeNumber] ? "" : "scheme__place--occupied"}
              ${isSelected ? "scheme__place--selected" : ""}
            `}
                        onClick={() => {
                          if (places[placeNumber]) {
                            handleClick(placeNumber);
                          }
                        }}
                      >
                        {placeNumber + 1}
                      </div>
                    );
                  })}
                {(() => {
                  let displayedPlaceCounter =
                    columnIndex === 0
                      ? columnIndex * 4 + 32
                      : columnIndex * 4 + 31;
                  return Array(4)
                    .fill()
                    .map((_, placeIndex) => {
                      if (columnIndex === 0 && placeIndex === 0) {
                        return null;
                      } else if (columnIndex === 7 && placeIndex === 3) {
                        return null;
                      }
                      const placeNumber = displayedPlaceCounter;
                      const isSelected = selectedPlaces.includes(placeNumber);
                      displayedPlaceCounter++;
                      return (
                        <div
                          key={placeIndex}
                          className={`
                scheme__place
                scheme__place--${type}
                scheme__place--${type}--${placeIndex + 5}
                ${places[placeNumber] ? "" : "scheme__place--occupied"}
                ${isSelected ? "scheme__place--selected" : ""}
              `}
                          onClick={() => {
                            if (places[placeNumber]) {
                              handleClick(placeNumber);
                            }
                          }}
                        >
                          {placeNumber + 1}
                        </div>
                      );
                    });
                })()}
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
