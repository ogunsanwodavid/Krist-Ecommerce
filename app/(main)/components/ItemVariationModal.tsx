import { useState } from "react";

import { useItemVariationModal } from "../contexts/ItemVariationModalContext"; // Import useModal hook

import { CartProduct } from "@/app/models/cart"; // Assuming CartProduct type is already defined

import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

import { CgClose } from "react-icons/cg";
import { FaMinus, FaPlus } from "react-icons/fa6";
import MainButton from "@/app/components/ui/MainButton";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    fontFamily: "Jost, sans-serif",
    display: "flex",
    gap: "10px",
  },
  "& .MuiSvgIcon-root.MuiSelect-icon": {
    fill: "#131118",
  },
}));

export default function ItemVariationModal() {
  const {
    isVariationModalOpen,
    closeVariationModal,
    selectedItem,
    quantity: itemQuantity,
  } = useItemVariationModal();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(itemQuantity ?? 1);

  // If no item is selected, don't render modal
  if (
    !isVariationModalOpen
    //|| !selectedItem
  )
    return null;

  //Available sizes and colors
  const sizes = selectedItem?.sizesAvailable;
  const colors = selectedItem?.colorsAvailable;

  const handleAddToCart = () => {
    if (!size || !color) {
      alert("Please select both size and color.");
      return;
    }

    const newCartProduct: CartProduct = {
      quantity,
      item: selectedItem,
      size,
      color,
    };
  };

  return (
    <div className="fixed top-0 left-0 min-h-screen w-screen bg-[rgba(0,0,0,0.4)] z-[300] flex items-center justify-center p-3">
      {/* Modal Content */}
      <main className="w-full max-w-[500px] mx-auto bg-white rounded-xl p-4 text-black space-y-1 md:space-y-3 md:p-7">
        {/** Close icon */}
        <CgClose
          className="text-lg ml-auto md:text-xl"
          onClick={() => closeVariationModal()}
        />

        {/** Header */}
        <h4 className="font-medium text-[17px] md:text-[19px]">
          Please Select a Variation
        </h4>

        {/** Item quantity */}
        <section className="space-y-1 md:flex md:items-center md:justify-between">
          <p className="text-base md:text-lg">Quantity</p>
          <div className="h-[40px] w-full rounded-[8px] py-1 px-2 border-[2px] border-black flex items-center justify-between md:h-[44px] md:w-[250px]">
            <FaMinus
              className="text-black text-[12px]"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            />

            <span className="text-[15px] md:text-[17px]">{quantity}</span>

            <FaPlus
              className="text-black text-[12px]"
              onClick={() => setQuantity((prev) => prev + 1)}
            />
          </div>
        </section>

        {/** Item size select input */}
        {sizes && sizes.length > 0 && (
          <section className="space-y-1 md:flex md:items-center md:justify-between">
            <p className="text-base md:text-lg">Size</p>

            <FormControl
              className="w-full h-[40px] rounded-[8px] py-1 px-2 border-[2px] border-black md:h-[44px] md:w-[250px]"
              variant="standard"
            >
              <Select
                value={size ?? ""}
                onChange={(e) => setSize(e.target.value)}
                input={<BootstrapInput />}
                className="h-[40px] rounded-[8px] py-1 px-2 border-[2px] border-black"
              >
                {sizes.map((size) => {
                  return (
                    <MenuItem
                      value={size}
                      className="!font-jost !text-base md:!text-lg"
                      key={size}
                    >
                      {size}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </section>
        )}

        {/** Item color select input */}
        {colors && colors.length > 0 && (
          <section className="space-y-1 md:flex md:items-center md:justify-between">
            <p className="text-base md:text-lg">Color</p>

            <FormControl
              className="w-full h-[40px] rounded-[8px] py-1 px-2 border-[2px] border-black md:h-[44px] md:w-[250px]"
              variant="standard"
            >
              <Select
                value={color ?? ""}
                onChange={(e) => setColor(e.target.value)}
                input={<BootstrapInput />}
                className="h-[40px] rounded-[8px] py-1 px-2 border-[2px] border-black capitalize"
              >
                {colors.map((color) => {
                  return (
                    <MenuItem
                      value={color}
                      className="!font-jost !text-base md:!text-lg !capitalize !flex !items-center !gap-3"
                      key={color}
                    >
                      <div
                        className="w-[20px] h-[20px] border-[1px] border-black rounded-[5px]"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span>{color}</span>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </section>
        )}

        {/** Buttons */}
        <section className="!mt-5 md:flex md:items-center md:gap-3">
          {/** Continue Shopping */}
          <button
            className="hidden w-full h-max px-4 py-2 text-black border-[2px] border-black items-center justify-center rounded-[7px] z-10 md:w-1/2 md:text-lg md:flex"
            // onClick={() => closeVariationModal()}
          >
            Continue Shopping
          </button>

          {/** Add Item to Cart */}
          <button className="w-full h-max px-4 py-2 text-white bg-black  border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:w-1/2 md:text-lg">
            Add item
          </button>
        </section>
      </main>
    </div>
  );
}
