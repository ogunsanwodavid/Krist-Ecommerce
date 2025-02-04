import { useState } from "react";

import { ReduxStoreState } from "@/app/redux/store";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { addToCart } from "@/app/redux/cartSlice";

import { useItemVariationModal } from "../contexts/ItemVariationModalContext"; // Import useModal hook

import { CartProduct } from "@/app/models/cart"; // Assuming CartProduct type is already defined

import { RemoveItemFromWishlist } from "@/app/actions/wishlist/RemoveItemFromWishlist";

import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

import { CgClose } from "react-icons/cg";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Variables from variation modal context
  const {
    isVariationModalOpen,
    closeVariationModal,
    selectedItem,
    quantity: itemQuantity,
  } = useItemVariationModal();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(itemQuantity ?? 1);

  //Wishlist items from redux state
  const wishlistItems = useAppSelector(
    (state: ReduxStoreState) => state.wishlist.items
  );

  // If no item is selected, don't render modal
  if (!isVariationModalOpen || !selectedItem) return null;

  //Check if item already exists in the wishlist
  const isItemInWishlist = wishlistItems.some(
    (item) => item.id === selectedItem.id
  );

  //Function to remove item from wishlist
  const removeItemFromWishlist = RemoveItemFromWishlist(selectedItem.id);

  //Available sizes and colors
  const sizes = selectedItem?.sizesAvailable;
  const colors = selectedItem?.colorsAvailable;

  //Check if user can add item to cart after selecting size and color
  const canUserAddToCart =
    Array.isArray(sizes) &&
    sizes.length > 0 &&
    Array.isArray(colors) &&
    colors.length > 0
      ? size && color
      : Array.isArray(sizes) && sizes.length > 0 && !colors
      ? size
      : Array.isArray(colors) && colors.length > 0 && !sizes
      ? color
      : true;

  //Function to add product to cart
  const handleAddToCart = () => {
    //New cart product
    const newCartProduct: CartProduct = {
      quantity,
      item: selectedItem,
      size: size ? size : "",
      color: color ? color : "",
    };

    //Dispatch action to add product to cart
    dispatch(addToCart(newCartProduct));

    //Remove from wishlist if it was there
    if (isItemInWishlist) {
      removeItemFromWishlist();
    }

    //Toast success message
    toast.success("Item added to cart");

    //Close variation modal
    closeVariationModal();
  };

  return (
    <div className="fixed top-0 left-0 min-h-screen w-screen bg-[rgba(0,0,0,0.4)] z-[300] flex items-center justify-center p-3">
      {/* Modal Content */}
      <main className="w-full max-w-[500px] max-h-[calc(100vh_-_24px)] overflow-y-auto mx-auto bg-white rounded-xl p-4 text-black space-y-1 md:space-y-3 md:p-7">
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
            onClick={() => closeVariationModal()}
          >
            Continue Shopping
          </button>

          {/** Add Item to Cart */}
          <button
            className={`w-full h-max px-4 py-2 text-white bg-black  border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:w-1/2 md:text-lg ${
              !canUserAddToCart && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canUserAddToCart}
            onClick={handleAddToCart}
          >
            Add item
          </button>
        </section>
      </main>
    </div>
  );
}
