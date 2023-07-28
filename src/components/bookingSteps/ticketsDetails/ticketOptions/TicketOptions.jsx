import "./TicketOptions.css";
import Switch from "@mui/base/Switch";

export default function TicketOptions() {
  return (
    <ul className="options">
      <li className="option">
        <span className="option__text">Купе</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
      <li className="option">
        <span className="option__text">Плацкарт</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
      <li className="option">
        <span className="option__text">Сидячий</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
      <li className="option">
        <span className="option__text">Люкс</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
      <li className="option">
        <span className="option__text">Wi-Fi</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
      <li className="option">
        <span className="option__text">Экспресс</span>
        <Switch
          className="option__switch"
          slotProps={{
            thumb: { className: "option__switch-thumb" },
            track: { className: "option__switch-track" },
            input: { className: "option__switch-input" },
          }}
        />
      </li>
    </ul>
  );
}
