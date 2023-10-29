import { useState } from "react";
import { optionsSvg } from "../../../../lastTickets/lastTicket/iconsSvg";
import PropTypes from "prop-types";

export default function SitClassInfo({
  sitClasses,
  setIsSelectSeats,
  setCurrentTrip,
  ticket,
  isVerification = false,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSitClassClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <ul className="ticket__sit-classes">
        {sitClasses.map((sitClass, index) => (
          <li
            key={index}
            className="ticket__sit-class"
            onClick={() => handleSitClassClick(index)}
          >
            <span className="ticket__sit-class__name">{sitClass.name}</span>
            <span className="ticket__sit-class__available">
              {sitClass.available.all}
            </span>
            {activeIndex === index && (
              <ul className="available-sits">
                <li className="available-sits__item">
                  <span className="ticket__sit-class__name">Верхние</span>
                  <span className="ticket__sit-class__available">
                    {sitClass.available.upper}
                  </span>
                  <span className="available-sits__item-price">
                    {sitClass.price.upper}
                  </span>
                </li>
                <li className="available-sits__item">
                  <span className="available-sits__item__name">Нижние</span>
                  <span className="ticket__sit-class__available">
                    {sitClass.available.lower}
                  </span>
                  <span className="available-sits__item-price">
                    {sitClass.price.lower}
                  </span>
                </li>
              </ul>
            )}
            <span className="ticket__sit-class__price">
              {sitClass.price.from}
            </span>
          </li>
        ))}
      </ul>
      <div className="ticket__sit-class__options">{optionsSvg}</div>
     {!isVerification ? <button
        className="primary-btn primary-btn--white ticket__select-button"
        onClick={() => {
          setIsSelectSeats(true);
          setCurrentTrip(ticket);
        }}
      >
        Выбрать места
      </button> : <button className="secondary-btn ticket__select-button">Изменить</button>}
    </>
  );
}

SitClassInfo.propTypes = {
  sitClasses: PropTypes.array.isRequired,
  setIsSelectSeats: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};
