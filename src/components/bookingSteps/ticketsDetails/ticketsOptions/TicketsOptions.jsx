import "./TicketsOptions.css";
import Switch from "@mui/base/Switch";

export default function TicketsOptions() {
  return (
    <ul className="options">
      <li className="option">
        <span className="option__text option__text--kupe">Купе</span>
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
        <span className="option__text option__text--plackart">Плацкарт</span>
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
        <span className="option__text option__text--sitting">Сидячий</span>
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
        <span className="option__text option__text--lux">Люкс</span>
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
        <span className="option__text option__text--wifi">Wi-Fi</span>
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
        <span className="option__text option__text--express">Экспресс</span>
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
