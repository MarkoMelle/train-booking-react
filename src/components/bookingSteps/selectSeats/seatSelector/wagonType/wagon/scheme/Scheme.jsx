import PropTypes from "prop-types";
import "./Scheme.css";

const Place = ({
  placeIndex,
  placeNumber,
  isSelected,
  isOccupied,
  type,
  onClick,
  offset,
  placePrice,
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
          onClick(placeNumber + 1, placePrice);
        }
      }}
    >
      {placeNumber + 1}
    </div>
  );
};

export default function Scheme({
  wagon,
  type,
  handleSelectSeat,
  handleDeselectSeat,
  selectedSeats,
}) {
  const places = wagon.seats.reduce((acc, seat) => {
    acc[seat.index - 1] = {
      available: seat.available,
      price: seat.price,
    };
    return acc;
  }, []);
  const handleClick = (placeNumber, placePrice) => {
    const wagonId = wagon.coach._id;
    if (
      selectedSeats.some(
        (seat) => seat.seatNumber === placeNumber && seat.wagonId === wagonId
      )
    ) {
      handleDeselectSeat(placeNumber, wagonId, placePrice);
    } else {
      handleSelectSeat(placeNumber, wagonId, placePrice);
    }
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
        const isSelected = selectedSeats.some(
          (seat) =>
            seat.seatNumber === placeNumber + 1 &&
            seat.wagonId === wagon.coach._id
        );
        const placeInfo = places[placeNumber];

        const isOccupied = !placeInfo.available;

        return (
          <Place
            key={placeIndex}
            placeIndex={placeIndex}
            placeNumber={placeNumber}
            isSelected={isSelected}
            isOccupied={isOccupied}
            type={type}
            onClick={handleClick}
            offset={offset}
            placePrice={placeInfo.price}
          />
        );
      });
  };

  return (
    <div className={`scheme scheme--${type}`}>
      <div className="scheme__number">{wagon.coach.name.match(/\d+/g)}</div>
      {Array(8)
        .fill()
        .map((_, columnIndex) => (
          <div
            key={columnIndex}
            className={`scheme__column scheme__column--${columnIndex + 1}`}
          >
            {type === "second" && renderPlaces(4, 1, columnIndex, 4)}
            {type === "third" && (
              <>
                {renderPlaces(4, 1, columnIndex, 4)}
                {renderPlaces(2, 5, columnIndex, 2, 32)}
              </>
            )}
            {type === "first" && renderPlaces(2, 1, columnIndex, 2)}
            {type === "fourth" && (
              <>
                {renderPlaces(4, 1, columnIndex, 4)}
                {type === "fourth" && (
                  <>
                    {renderPlaces(4, 1, columnIndex, 4)}
                    {renderPlaces(
                      columnIndex === 0 || columnIndex === 7 ? 3 : 4,
                      5,
                      columnIndex,
                      0,
                      columnIndex === 0 ? 32 : columnIndex * 4 + 31
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
    </div>
  );
}

Scheme.propTypes = {
  wagon: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleSelectSeat: PropTypes.func.isRequired,
  handleDeselectSeat: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  changePrice: PropTypes.func.isRequired,
};

Place.propTypes = {
  placeIndex: PropTypes.number.isRequired,
  placeNumber: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isOccupied: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  placePrice: PropTypes.number.isRequired,
};
