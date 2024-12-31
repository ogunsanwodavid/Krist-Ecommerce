import Image from "next/image";
import Link from "next/link";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import FormatCurrencyNaira from "@/app/components/ui/FormatCurrencyNaira";

interface RelatedProductProps {
  shopItem: ShopItemModel;
}

export default function RelatedProduct({ shopItem }: RelatedProductProps) {
  //SHop item image supabase url
  const itemImageUrl = formatToSupabaseImageUrl(
    "productImages",
    shopItem.image
  );

  //Shop item id
  const shopItemId = shopItem.id;

  return (
    <Link
      href={`/shop/${shopItemId}`}
      className="w-full max-w-[277.5px] space-y-6 lg:max-w-[227.5px]"
    >
      {/**** Item box */}
      <section
        className="relative w-full h-[350px] bg-gray-200  p-3 flex flex-col overflow-hidden"
        style={{
          boxShadow:
            "1px 1px 3px rgba(0, 0, 0, 0.2), -1px 1px 3px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/**** Category image */}
        <div className="absolute top-0 left-[50%] -translate-x-[50%] h-full w-full shrink-0">
          <Image
            src={itemImageUrl}
            fill // This allows the image to fill its parent container
            style={{ objectFit: "cover" }} // Use style prop for object-fit
            alt={shopItem.title}
            sizes="100%"
          />
        </div>
      </section>

      {/** Item details */}
      <section className="w-full space-y-1 text-black">
        <h4 className="w-full text-base font-medium  whitespace-nowrap text-ellipsis overflow-hidden md:text-lg">
          {shopItem.title}
        </h4>

        <h5 className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden md:text-base">
          {shopItem.description}
        </h5>

        {/*** Price */}
        {/*** Show discounted price only when available */}
        <div className="w-full text-sm whitespace-nowrap text-ellipsis overflow-hidden flex gap-x-2 md:text-base">
          <div className="font-medium">
            {shopItem.discount > 0 ? (
              <FormatCurrencyNaira
                amount={shopItem.price - shopItem.discount}
              />
            ) : (
              <FormatCurrencyNaira amount={shopItem.price} />
            )}
          </div>
          <div className="text-gray-400 line-through">
            {shopItem.discount > 0 && (
              <FormatCurrencyNaira amount={shopItem.price} />
            )}
          </div>
        </div>
      </section>
    </Link>
  );
}
