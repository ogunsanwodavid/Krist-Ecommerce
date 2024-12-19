import { Slider, styled } from "@mui/material";
import { useState } from "react";

interface ShopPriceRangeFilterProps {
  min: number;
  max: number;
  handleMinChange: (min: string | undefined) => void;
  handleMaxChange: (max: string | undefined) => void;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const customBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#131118",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
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
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&::before": {
      display: "none",
    },
    "& *": {
      //background: "#e5e7eb",
      color: "#000",
      ...theme.applyStyles("dark", {
        color: "#131118",
      }),
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 5,
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

export default function ShopPriceRangeFilter({
  min,
  max,
  handleMinChange,
  handleMaxChange,
}: ShopPriceRangeFilterProps) {
  const [value, setValue] = useState<number[] | number>([min, max]);

  const handleChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    setValue(newValue);

    // Safely handle newValue if it's an array
    if (Array.isArray(newValue)) {
      handleMinChange(newValue.length ? newValue[0].toString() : undefined);
      handleMaxChange(newValue.length ? newValue[1].toString() : undefined);
    } else {
      handleMinChange(undefined);
      handleMaxChange(undefined);
    }
  };

  return (
    <CustomSlider
      getAriaLabel={() => "Price range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      min={min}
      max={max}
    />
  );
}
