import { switchClasses } from "@mui/base/Switch";

export default function SwitchStyles() {
  return (
    <style>
      {`
       .option__switch {
         font-size: 0;
         position: relative;
         display: inline-block;
         width: 72px;
         height: 19px;
         margin: 10px;
         cursor: pointer;
       }
 
       .option__switch.${switchClasses.disabled} {
         opacity: 0.4;
         cursor: not-allowed;
       }
 
       .option__switch-track {
         background: #FFFFFF;
         border-radius: 10px;
         display: block;
         height: 100%;
         width: 100%;
         position: absolute;
       }
 
       .option__switch-thumb {
         display: block;
         width: 28px;
         height: 28px;
         top: -4.5px;
          left: -1px;
         border-radius: 50%;
         background-color: #C4C4C4;
         position: relative;
         
         transition-property: all;
         transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
         transition-duration: 120ms;
       }
 
       .option__switch.${switchClasses.focusVisible} .option__switch-thumb {
         background-color: #C4C4C4;
         box-shadow: 0 0 1px 8px rgba(13, 84, 99, 0.35);
       }
 
       .option__switch.${switchClasses.checked} .option__switch-thumb {
         left: 45px;
         top: -4.5px;
         background-color: #FFA800;
       }
 
       .option__switch.${switchClasses.checked} .option__switch-track {
         background: #FCDC9D;
       }
 
       .option__switch-input {
         cursor: inherit;
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         opacity: 0;
         z-index: 1;
         margin: 0;
       }
     
     `}
    </style>
  );
}
