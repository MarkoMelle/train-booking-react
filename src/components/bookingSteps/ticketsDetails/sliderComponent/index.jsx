import { styled, alpha } from "@mui/system";
import Slider, { sliderClasses } from "@mui/base/Slider";
import PropTypes from "prop-types";

export default function SliderComponent({
  type = "price",
  value,
  handleChange,
  min,
  max,
  step = 10,
  marks,
  markLabel,
  className,
}) {
  return (
    <StyledSlider
      className={className ? className : ""}
      slots={{
        markLabel: `div`,
      }}
      slotProps={{
        markLabel: markLabel ? { className: markLabel } : {},
      }}
      type={type}
      value={value}
      onChange={handleChange}
      getAriaLabel={() => "Price range"}
      min={min}
      max={max}
      step={step}
      marks={marks}
    />
  );
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  300: "#66B2FF",
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

const StyledSlider = styled(Slider)(
  ({ theme, type }) => `
   height: ${type === "price" ? "19px" : "10px"};
   width: 100%;
   display: inline-block;
   position: relative;
   cursor: pointer;
   touch-action: none;
   -webkit-tap-highlight-color: transparent;
 
   &:hover {
     opacity: 1;
   }
   ${
     type === "price"
       ? `
   &:after {
       content: "От";
       position: absolute;
       top: calc(-100% - 8px);
       left: 0;
       color: #FFF;
       font-size: 18px;
       font-weight: 400;
   }
 
    &:before {
       content: "До";
       position: absolute;
       top: calc(-100% - 8px);
       right: 0;
       color: #FFF;
       font-size: 18px;
       font-weight: 400;
    }
    `
       : ``
   }
 
 
   &.${sliderClasses.disabled} { 
     pointer-events: none;
     cursor: default;
     color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
     opacity: 0.5;
   }
 
   & .${sliderClasses.rail} {
     display: block;
     position: absolute;
     width: 100%;
     height: ${type === "price" ? "19px" : "10px"};
     border-radius: 8px;
 border: 1px solid #C4C4C4;
     background-color: transparent;
   }
 
   & .${sliderClasses.track} {
     display: block;
     position: absolute;
     height: ${type === "price" ? "19px" : "10px"};
     border-radius: 8px;
     background-color: #FFA800;
   }
 
   & .${sliderClasses.thumb} {
     position: absolute;
     width: ${type === "price" ? "24px" : "18px"};
     height: ${type === "price" ? "24px" : "18px"};
     top: ${type === "price" ? "-2.5px" : "-4px"};
    //  margin-left: ${type === "price" ? "-6px" : "-4.5px"};
    //  transform: translateX(25%);
     box-sizing: border-box;
     border-radius: 50%;
     outline: 0;
     background-color: #fff;

 
     &.${sliderClasses.active} {
       box-shadow: 0 0 0 0.25rem ${alpha(
         theme.palette.mode === "light" ? blue[200] : blue[300],
         0.3
       )};
     }
   }
 
   & .${sliderClasses.mark} {
     display: none;
   }
 
   & .${sliderClasses.markActive} {
     
   }
   & .${sliderClasses.markLabel} {
       position: absolute;
       bottom: calc(-100% - 16px);
       transform: translateX(calc(-100% + ${type === "price" ? "6px" : "0px"}));
       white-space: nowrap;
       color: #E5E5E5;
       font-family: Roboto;
       font-size: 16px;
       font-style: normal;  
       font-weight: 400;
       line-height: normal;
       pointer-events: none;
    }
 
 `
);

SliderComponent.propTypes = {
  type: PropTypes.string,
  value: PropTypes.array,
  handleChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ),
  markLabel: PropTypes.string,
  className: PropTypes.string,
};
