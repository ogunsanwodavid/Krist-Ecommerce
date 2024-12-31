import { useState } from "react";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ShopItemReviews from "./ShopItemReviews";

interface ShopItemPageTabProps {
  shopItem: ShopItemModel;
  setItemAverageRating: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfItemReviews: React.Dispatch<React.SetStateAction<number>>;
}

export default function ShopItemPageTab({
  shopItem,
  setItemAverageRating,
  setNumberOfItemReviews,
}: ShopItemPageTabProps) {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //Useful Shop item key-values
  const itemColorsAvailable = shopItem?.colorsAvailable;
  const itemSizesAvailable = shopItem?.sizesAvailable;

  //Is there additional information to display
  const isThereAdditionalInfo =
    (Array.isArray(itemColorsAvailable) && itemColorsAvailable.length > 0) ||
    (Array.isArray(itemSizesAvailable) && itemSizesAvailable.length > 0);

  return (
    <Box
      className="shopitem-page-tab font-jost mt-[28px] lg:mt-[50px]"
      sx={{ width: "100%", typography: "body1" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            textColor="inherit"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Customer Reviews" value="1" />
            <Tab label="Additional Information" value="2" />
            <Tab label="Description" value="3" />
          </TabList>
        </Box>

        {/** Reviews tab */}
        <TabPanel value="1">
          <ShopItemReviews
            shopItem={shopItem}
            setItemAverageRating={setItemAverageRating}
            setNumberOfItemReviews={setNumberOfItemReviews}
          />
        </TabPanel>

        {/** Additional Information tab */}
        <TabPanel value="2" className="min-h-[200px]">
          {isThereAdditionalInfo ? (
            <div className="space-y-3 md:space-y-5 md:text-lg">
              {/*** Colors */}
              {Array.isArray(itemColorsAvailable) &&
                itemColorsAvailable.length > 0 && (
                  <section className="flex flex-wrap">
                    <span className="mr-2 font-medium">Colors:</span>
                    {itemColorsAvailable.map((color, index) => (
                      <span className="mr-2 capitalize" key={index}>
                        {color}
                        {index < itemColorsAvailable.length - 1 && ","}
                      </span>
                    ))}
                  </section>
                )}

              {/** Sizes */}
              {Array.isArray(itemSizesAvailable) &&
                itemSizesAvailable.length > 0 && (
                  <section className=" flex flex-wrap">
                    <span className="mr-2 font-medium">Sizes:</span>
                    {itemSizesAvailable.map((size, index) => (
                      <span className="mr-2 uppercase" key={index}>
                        {size}
                        {index < itemSizesAvailable.length - 1 && ","}
                      </span>
                    ))}
                  </section>
                )}
            </div>
          ) : (
            <div className="md:text-lg">No information to display</div>
          )}
        </TabPanel>

        {/** Description tab */}
        <TabPanel value="3" className="min-h-[200px]">
          <p className="md:text-lg">{shopItem?.description}</p>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
