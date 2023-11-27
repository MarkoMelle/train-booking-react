import PropTypes from "prop-types";
import { climate, wifi, linen, drinks } from "./icons";

export default function ServiceIcons({
  wagon,
  services,
  updateService,
  seatsFilter,
  // setSeatsFilter,
}) {
  return (
    <ul className="seat-selector__options-list">
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.have_air_conditioning ? "selected--disabled" : "disabled"
        }`}
      >
        {climate}
      </li>
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.have_wifi
            ? services.wifi
              ? "selected"
              : "not-selected"
            : "disabled"
        }`}
        onClick={
          wagon.have_wifi ? () => updateService("wifi", !services.wifi) : null
        }
      >
        {wifi}
      </li>
      <li
        className={`seat-selector__options-item service-icon service-icon--${
          wagon.is_linens_included ? "selected--disabled" : services.linens ? "selected" : "not-selected"
        }`}
        onClick={
          !wagon.is_linens_included
            ? () => updateService("linens", !services.linens)
            : null
        }
      >
        {linen}
      </li>
      {/* {type === "drinks" && drinks} */}
    </ul>
  );
}
