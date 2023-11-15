import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiClient } from "../../../../api/apiClient";

export default function InputWithSuggestions({
  block,
  city,
  setCity,
  placeholder,
}) {
  const [inputValue, setInputValue] = useState(city.name);
  const [inputFocus, setInputFocus] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.length !== 0 && inputFocus) {
      const loadSuggestions = async () => {
        try {
          const cities = await apiClient.searchCities(inputValue);
          if (Array.isArray(cities)) {
            setSuggestions(
              cities.map((citySgs) => ({ id: citySgs._id, name: citySgs.name }))
            );
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Failed to load suggestions:", error);
          setSuggestions([]);
        }
      };
      loadSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue, inputFocus]);

  useEffect(() => {
    setInputValue(city.name);
  }, [city.name]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.id, suggestion.name);
    setInputValue(suggestion.name);
    setInputFocus(false);
  };

  const renderSuggestions = () => {
    if (!inputFocus || suggestions.length === 0) return null;

    if (
      suggestions.length === 1 &&
      suggestions[0].name.toLowerCase() === inputValue.toLowerCase()
    ) {
      return;
    }

    return (
      <ul className={`${block}__suggestions`}>
        {suggestions.map((suggestion) => (
          <li
            className={`${block}__suggestion`}
            key={suggestion.id}
            onMouseDown={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.name}
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
        onChange={handleInputChange}
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
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setCity: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
