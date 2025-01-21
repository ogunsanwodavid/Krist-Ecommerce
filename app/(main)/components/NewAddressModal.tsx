import { useState } from "react";

import { useNewAddressModal } from "../contexts/NewAddressModalContext";

import { useAppDispatch } from "@/app/hooks/redux";

import { addAddress } from "@/app/redux/addressesSlice";

import {
  nigerianStatesAndLGAs,
  StateObject,
} from "@/app/(main)/data/nigerianStatesAndLGAs";

import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

import FormInput from "@/app/components/ui/FormInput";

import { CircularProgress } from "@mui/material";

import { CgClose } from "react-icons/cg";

import { FaCheck } from "react-icons/fa6";
import { Address } from "@/app/models/addresses";

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

export default function NewAddressModal() {
  //New address modal variables
  const { closeNewAddressModal, isAddingNewAddress, setIsAddingNewAddress } =
    useNewAddressModal();

  //States and LGAs
  const statesAndLGAs: StateObject[] = nigerianStatesAndLGAs;

  //Form inputs states
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [LGA, setLGA] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

  // Current LGA options in the select input
  const currentLGAOptions: string[] = state
    ? statesAndLGAs.find((stateObj) => stateObj.state === state)?.lgas || []
    : [];

  //Check if user can add address
  const canUserAddAddress =
    name && mobileNumber && state && LGA && houseNumber && zipCode;

  //Address object
  const newAddress: Address = {
    id: Date.now().toString(),
    name,
    mobileNumber,
    state,
    lga: LGA,
    houseNumber,
    zipCode,
    default: defaultAddress,
  };

  //Dispatch function
  const dispatch = useAppDispatch();

  //Handle adding new address
  function handleAddAddress() {
    //Set isAddingAddress true
    setIsAddingNewAddress(true);

    // Wait for 2 seconds
    setTimeout(() => {
      //Add address to redux state
      dispatch(addAddress(newAddress));

      //Close modal
      closeNewAddressModal();

      //Set isAddingAddress false
      setIsAddingNewAddress(false);
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 min-h-screen w-screen bg-[rgba(0,0,0,0.4)] z-[300] flex items-center justify-center p-3">
      {/* Modal Content */}
      <main className="w-full max-w-[500px] max-h-[calc(100vh_-_24px)] overflow-y-auto mx-auto bg-white rounded-xl p-4 text-black space-y-1 md:space-y-3 md:p-7">
        {/** Close icon */}
        <CgClose
          className="text-lg ml-auto md:text-xl"
          onClick={() => closeNewAddressModal()}
        />

        {/** Header */}
        <h4 className="font-medium text-[17px] md:text-[19px]">
          Add a New Address
        </h4>

        {/** Form */}
        <form className="w-full space-y-1 lg:space-y-3">
          {/**** Name input */}
          <FormInput label="Full Name">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
                setName(filteredValue);
              }}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey`}
            />
          </FormInput>

          {/**** Mobile number input */}
          <FormInput label="Mobile Number">
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              autoComplete="off"
              inputMode="numeric"
              value={mobileNumber}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^+\d\s]/g, ""); // Allows only digits, +, and spaces
                setMobileNumber(filteredValue);
              }}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey`}
            />
          </FormInput>

          {/**** State input */}
          <section className="space-y-1 !mb-2">
            <span className={`text-black text-base md:text-[18px]`}>State</span>

            <FormControl
              className="w-full h-[36px] rounded-[10px] py-1 px-2 border-[1.5px] border-black"
              variant="standard"
            >
              <Select
                value={state ?? ""}
                onChange={(e) => setState(e.target.value)}
                input={<BootstrapInput />}
                className="h-[36px] rounded-[8px] py-1 px-2 border-[1.5px] border-black"
                displayEmpty
              >
                <MenuItem
                  value=""
                  className="!hidden !font-jost !text-base md:!text-lg"
                  disabled
                >
                  Select a State
                </MenuItem>

                {statesAndLGAs
                  .sort((a, b) => a.state.localeCompare(b.state)) // Sort alphabetically by state key
                  .map((stateObj) => (
                    <MenuItem
                      value={stateObj.state}
                      className="!font-jost !text-base md:!text-lg"
                      key={stateObj.alias}
                    >
                      {stateObj.state}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </section>

          {/** LGA Input */}
          <section className="space-y-1 !mb-2">
            <span className={`text-black text-base md:text-[18px]`}>
              Local Government Area
            </span>

            <FormControl
              className="w-full h-[36px] rounded-[10px] py-1 px-2 border-[1.5px] border-black"
              variant="standard"
            >
              <Select
                value={LGA ?? ""}
                onChange={(e) => setLGA(e.target.value)}
                input={<BootstrapInput />}
                className="h-[36px] rounded-[8px] py-1 px-2 border-[1.5px] border-black"
                displayEmpty
                disabled={currentLGAOptions.length === 0}
              >
                <MenuItem
                  value=""
                  className="!hidden !font-jost !text-base md:!text-lg"
                  disabled
                >
                  Select an LGA
                </MenuItem>

                {currentLGAOptions.length > 0 &&
                  currentLGAOptions
                    .sort((a, b) => a.localeCompare(b)) // Sort alphabetically by state key
                    .map((lga) => (
                      <MenuItem
                        value={lga}
                        className="!font-jost !text-base md:!text-lg"
                        key={lga}
                      >
                        {lga}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </section>

          {/**** House number input */}
          <FormInput label="Flat, House no., Street, Building">
            <input
              type="text"
              name="houseNumber"
              id="houseNumber"
              autoComplete="off"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey`}
            />
          </FormInput>

          {/**** ZIP Code input */}
          <FormInput label="ZIP Code">
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              autoComplete="off"
              inputMode="numeric"
              value={zipCode}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/\D/g, ""); // Removes non-digit characters
                setZipCode(filteredValue);
              }}
              className={`w-full h-[36px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey`}
            />
          </FormInput>

          {/*** Default address checkbox */}
          <section className="flex items-center justify-between !mt-1">
            <label
              className="flex items-center gap-x-2"
              htmlFor="defaultAddress"
            >
              {/*** Hidden input */}
              <input
                type="checkbox"
                name="defaultAddress"
                id="defaultAddress"
                checked={defaultAddress}
                onChange={(e) => setDefaultAddress(e.target.checked)}
                className="hidden peer"
              />

              {/* Custom Checkbox */}
              <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
                <FaCheck className="text-white text-[0.6rem]" />
              </span>

              <span className="md:text-lg">
                <span>Use as my default address</span>
              </span>
            </label>
          </section>
        </form>

        {/** Buttons */}
        <section className="!mt-5 md:flex md:items-center md:gap-3">
          {/** Cancel */}
          <button
            className="hidden w-full h-max px-4 py-2 text-black border-[2px] border-gray-200 bg-gray-200 items-center justify-center rounded-[7px] z-10 md:w-1/2 md:h-[47px] md:text-lg md:flex"
            onClick={() => closeNewAddressModal()}
          >
            Cancel
          </button>

          {/** Add address */}
          <button
            className={`w-full h-[43px] px-4 py-2 text-white bg-black  border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:w-1/2 md:h-[47px] md:text-lg ${
              !canUserAddAddress && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canUserAddAddress || isAddingNewAddress}
            onClick={handleAddAddress}
          >
            {isAddingNewAddress ? (
              <CircularProgress color="inherit" size={17} />
            ) : (
              "Add Address"
            )}
          </button>
        </section>
      </main>
    </div>
  );
}
