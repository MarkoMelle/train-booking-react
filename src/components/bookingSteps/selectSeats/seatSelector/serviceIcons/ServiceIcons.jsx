import PropTypes from "prop-types";
import { climate, wifi, linen, drinks } from "./icons";

export default function ServiceIcons({ services }) {
  const serviceItems = Object.entries(services).map(([service, display]) => {
    return {
      type: service,
      display,
    };
  });

  return (
    <ul className="seat-selector__options-list">
      {serviceItems.map((item) => (
        <li
          key={item.type}
          className={`seat-selector__options-item service-icon service-icon--${item.display}`}
        >
          <ServiceIcon type={item.type} />
        </li>
      ))}
    </ul>
  );
}

function ServiceIcon({ type }) {
  return (
    <>
      {type === "climate" && climate}
      {type === "wifi" && wifi}
      {type === "linen" && linen}
      {type === "drinks" && drinks}
    </>
  );
}

ServiceIcons.propTypes = {
  services: PropTypes.object.isRequired,
};
