import { useState } from "react";

import { useItemVariationModal } from "../contexts/ItemVariationModalContext"; // Import useModal hook

import { CartProduct } from "@/app/models/cart"; // Assuming CartProduct type is already defined

export default function ItemVariationModal() {
  const { isVariationModalOpen, closeVariationModal, selectedItem } =
    useItemVariationModal();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  // If no item is selected, don't render modal
  if (
    !isVariationModalOpen
    //|| !selectedItem
  )
    return null;

  // Handle color and size change
  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSize(size);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

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
    <div className="fixed top-0 left-0 h-screen w-screen  bg-[rgba(0,0,0,0.4)] z-[300]">
      {/* Modal Content */}
      <main></main>
    </div>
  );
}
