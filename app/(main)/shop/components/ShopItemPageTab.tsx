import { useState } from "react";

import { ShopItem as ShopItemModel } from "@/app/models/shop";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ShopItemReviews from "./ShopItemReviews";

export default function ShopItemPageTab({
  shopItem,
}: {
  shopItem: ShopItemModel;
}) {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //Useful Shop item key-values
  const itemColorsAvailable = shopItem?.colorsAvailable;
  const itemSizesAvailable = shopItem?.sizesAvailable;

  return (
    <Box
      className="shopitem-page-tab font-jost"
      sx={{ width: "100%", typography: "body1", marginTop: "28px" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            textColor="inherit"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Reviews" value="1" />
            <Tab label="Additional Information" value="2" />
          </TabList>
        </Box>

        {/** Reviews tab */}
        <TabPanel value="1">
          <ShopItemReviews shopItem={shopItem} />
        </TabPanel>

        {/** Additional Information tab */}
        <TabPanel value="2">
          <div className="space-y-3">
            {/*** Colors */}
            <section className="flex flex-wrap">
              <span className="mr-2 font-medium">Color:</span>
              {Array.isArray(itemColorsAvailable) &&
                itemColorsAvailable.length > 0 &&
                itemColorsAvailable.map((color, index) => (
                  <span className="mr-2 capitalize" key={index}>
                    {color}
                    {index < itemColorsAvailable.length - 1 && ","}
                  </span>
                ))}
            </section>

            {/** Sizes */}
            <section className=" flex flex-wrap">
              <span className="mr-2 font-medium">Sizes:</span>
              {Array.isArray(itemSizesAvailable) &&
                itemSizesAvailable.length > 0 &&
                itemSizesAvailable.map((size, index) => (
                  <span className="mr-2 uppercase" key={index}>
                    {size}
                    {index < itemSizesAvailable.length - 1 && ","}
                  </span>
                ))}
            </section>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
