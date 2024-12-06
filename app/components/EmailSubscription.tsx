import { useState } from "react";

import { toast } from "react-toastify";

import { CiMail } from "react-icons/ci";
import { HiArrowRight } from "react-icons/hi2";

export default function EmailSubscription() {
  //States of the input and error state
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  //Function to submit form
  function handleSubmitForm() {
    //Return if no email input
    if (!email) {
      setError("Empty input");
      return;
    }

    //Check  validity of email
    if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) {
      setError("Invalid email address");
      return;
    }

    //Toast success message
    toast.success("You have succesfully subscribed!");

    //Reset form and error
    setEmail("");
    setError("");
  }

  return (
    <div className="w-full max-w-[300px] mx-auto flex flex-col items-center gap-y-2 sm:mx-0 sm:items-start ">
      <h4 className="font-semibold text-lg md:text-xl">Subscribe</h4>

      <p className="text-center sm:text-left">
        Enter your email below to be the first to know about new collections and
        product launches.
      </p>

      {/*** Email input form box */}
      <form
        className={`w-full border-[1.5px] border-white rounded-[8px] p-2 flex items-center gap-x-2 ${
          error && "!border-errorRed"
        }`}
      >
        <CiMail className="text-white text-xl md:text-[22px]" />

        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent  placeholder:text-white md:placeholder:text-lg "
        />

        <HiArrowRight
          className="text-white text-lg md:text-[22px]"
          onClick={handleSubmitForm}
        />
      </form>
    </div>
  );
}
