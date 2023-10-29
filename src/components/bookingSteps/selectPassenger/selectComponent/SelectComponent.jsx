import * as React from "react";
import PropTypes from "prop-types";
import Select, { selectClasses } from "@mui/base/Select";
import Option, { optionClasses } from "@mui/base/Option";
import Popper from "@mui/base/Popper";
import { styled } from "@mui/system";

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
  option,
  className,
  onChange,
  value,
  width = "280px",
}) {
  return (
    <CustomSelect
      className={className}
      value={value}
      onChange={onChange}
      width={width}
    >
      {option.map((item) => (
        <StyledOption key={item.value} value={item.value} width={width}>
          {item.label}
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

CustomSelect.propTypes = {
  slots: PropTypes.shape({
    root: PropTypes.object,
    listbox: PropTypes.object,
    popper: PropTypes.object,
  }),
};

SelectComponent.propTypes = {
  option: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
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
  ({ theme, width }) => `
  font-family: Roboto, sans-serif;
  font-size: 1.5rem;
  width: ${width};
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: left;
  background: #fff;
  border: 1px solid #928F94;
  color: #292929;
font-weight: 400;

  transition-property: background-color, border-color, color;
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

&::after {
   content: '▾';
   color: transparent;  
   float: right;
   background-repeat: no-repeat;
   background-position: center right;
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='5' viewBox='0 0 12 5' fill='none'%3E%3Cpath d='M6 4.58333L0 0H11.5L6 4.58333Z' fill='%23928F94'/%3E%3C/svg%3E");
}

  `
);

const StyledListbox = styled("ul")(
  ({ width }) => `
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  width: ${width};
  border-radius: 5px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  outline: 1px solid #928F94;
  color: #292929;
  `
);

const StyledOption = styled(Option)(
  ({ theme, width }) => `
  list-style: none;
  padding: 8px;
  border-radius: 5px;
  cursor: default;
  width: calc(${width} - 12px);
  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
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
  z-index: 1;
`;
