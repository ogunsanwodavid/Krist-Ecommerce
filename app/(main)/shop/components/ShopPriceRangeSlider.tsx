import { useState } from "react";

import { Slider, styled } from "@mui/material";

interface ShopPriceRangeFilterProps {
  min: number;
  max: number;
  minDistance?: number;
  initialLowerValue: number | null;
  initialHigherValue: number | null;
  handleLowerValueChange: (min: string | undefined) => void;
  handleHigherValueChange: (max: string | undefined) => void;
}

/* function valuetext(value: number) {
  return `${value}°C`;
} */

const customBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#131118",
  height: 3,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#131118",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: customBoxShadow,
      },
    },
    "&:before": {
      boxShadow:
        "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "#131118",
    //color: theme.palette.text.primary,
    color: "red",
    "&::before": {
      display: "none",
    },
    "& *": {
      //background: "#e5e7eb",
      color: "#fff",
      ...theme.applyStyles("dark", {
        color: "#131118",
      }),
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 3,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    boxShadow: "inset 0px 0px 4px -2px #000",
    backgroundColor: "#131118",
  },
  ...theme.applyStyles("dark", {
    color: "#131118",
  }),
}));

export default function ShopPriceRangeSlider({
  min,
  max,
  minDistance,
  initialLowerValue,
  initialHigherValue,
  handleLowerValueChange,
  handleHigherValueChange,
}: ShopPriceRangeFilterProps) {
  //Minimum distance between lower and higher value in the slider
  const rangeMinDistance = Number(minDistance);

  //Min and max values of the slider
  const [value, setValue] = useState<number[] | number>([
    Number(initialLowerValue) || min || 300,
    Number(initialHigherValue) || max || 400,
  ]);

  //Function to handle slider change
  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue) && Array.isArray(value)) {
      if (activeThumb === 0) {
        setValue([
          Math.min(newValue[0], value[1] - rangeMinDistance),
          value[1],
        ]);
      } else {
        setValue([
          value[0],
          Math.max(newValue[1], value[0] + rangeMinDistance),
        ]);
      }
    }

    // Safely handle newValue if it's an array
    if (Array.isArray(newValue)) {
      handleLowerValueChange(
        newValue.length ? newValue[0].toString() : undefined
      );
      handleHigherValueChange(
        newValue.length ? newValue[1].toString() : undefined
      );
    } else {
      handleLowerValueChange(undefined);
      handleHigherValueChange(undefined);
    }
  };

  return (
    <CustomSlider
      getAriaLabel={() => "Price range"}
      value={value}
      onChange={handleChange}
      //valueLabelDisplay="auto"
      //getAriaValueText={valuetext}
      min={min}
      max={max}
      disableSwap
    />
  );
}
