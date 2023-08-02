import { useState } from "react";
import PropTypes from "prop-types";

export default function InputWithSuggestions ({ block, inputValue, setInputValue, placeholder, locations })  {
  const [inputFocus, setInputFocus] = useState(false);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (location) => {
    setInputValue(location);
  };

  const renderSuggestions = () => {
    if (!inputValue || !inputFocus) return null;

    const suggestions = locations.filter((location) =>
      location.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (
      suggestions.length === 1 &&
      suggestions[0].toLowerCase() === inputValue.toLowerCase()
    ) {
      return;
    }

    return (
      <ul className={`${block}__suggestions`}>
        {suggestions.map((suggestion) => (
          <li
            className={`${block}__suggestion`}
            key={suggestion}
            onMouseDown={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`${block}__group-input`}>
      <input
        className={`${block}__input ${block}__input--text form-input`}
        type="text"
        value={inputValue}
        onInput={handleInputChange}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        placeholder={placeholder}
      />
      {renderSuggestions()}
    </div>
  );
}

InputWithSuggestions.propTypes = {
  block: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};


