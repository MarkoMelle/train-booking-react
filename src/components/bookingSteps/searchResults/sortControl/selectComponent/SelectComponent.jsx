import * as React from "react";
import Select, { selectClasses } from "@mui/base/Select";
import Option, { optionClasses } from "@mui/base/Option";
import Popper from "@mui/base/Popper";
import { styled } from "@mui/system";
import PropTypes from "prop-types";

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

export default function SelectComponent({
  defaultValue,
  handleChange,
  options,
}) {
  return (
    <CustomSelect 
    
    defaultValue={defaultValue} onChange={handleChange}>
      {options.map((option) => (
        <StyledOption key={option} value={option}>
          {option}
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

SelectComponent.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

CustomSelect.propTypes = {
  slots: PropTypes.object,
};

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: Roboto, sans-serif;
  font-size: 1.125rem;
  box-sizing: border-box;
  padding-left: 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: transparent;
  border: none;
  color:  #292929;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '';
    }
  }

  &::after {
    content: '';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: Roboto, sans-serif;
  font-size: 1.125rem;
  box-sizing: border-box;
  margin: 12px 0;
  overflow: auto;
  outline: 0px;
  background: #F7F5F9;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  cursor: default;

  &:not(last-of-type) {
    border-bottom: 1px solid #E5E5E5;
  }

  &.${optionClasses.selected} {
    background-color: transparent;
  }

  &.${optionClasses.highlighted} {
    background-color: transparent;
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: transparent;
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(Popper)`
  top: -3rem !important;
  z-index: 1;
`;
