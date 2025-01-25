"use client";

import { useState } from "react";

import Link from "next/link";

import { contactUs } from "@/app/actions/contact-us/contact-us";

import { toast } from "react-toastify";

import FormButton from "@/app/components/ui/FormButton";

import ContactUsMap from "./components/ContactUsMap";

import { CgPhone } from "react-icons/cg";

import {
  FaFax,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaXTwitter,
} from "react-icons/fa6";

import { TbMailFilled } from "react-icons/tb";

export default function ContactUs() {
  //Type of the error state for the contact us form
  type ContactUsFormErrors = {
    email?: string[];
    name?: string[];
    message?: string[];
  } | null;

  //State of the input and error states
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<ContactUsFormErrors>(null); // To store validation errors

  //Error states of form
  const emailInputError = errors?.email?.at(0);
  const nameInputError = errors?.name?.at(0);
  const messageInputError = errors?.message?.at(0);

  //Loading state of form submission
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  //Function to submit contact us form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission

    // Set Loading state to true
    setIsSubmittingForm(true);

    // Collect form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("message", message);

    //Call the contact us function
    const result = await contactUs(formData);

    // Set errors if they exist; otherwise, clear errors
    if (result?.errors) {
      setErrors(result.errors);
    } else {
      setErrors(null);
    }

    //Check for error from server
    if (result?.error) {
      //Toast error
      toast.error(result.error);
    }

    //Check if request is successful
    if (result.success) {
      //Toast success
      toast.success("Your message has been successfully submitted!");

      //Reset all states
      setEmail("");
      setName("");
      setMessage("");
    }

    //Set loading state to false
    setIsSubmittingForm(false);
  }

  return (
    <div>
      {/** Header */}
      <header className="flex items-center justify-center gap-x-4">
        {/** Left white line */}
        <div className="hidden w-full h-[1px] bg-white lg:block"></div>

        <h2 className="shrink-0 text-white text-center text-2xl lg:text-4xl">
          Contact Information
        </h2>

        {/** Right white line */}
        <div className="hidden w-full h-[1px] bg-white lg:block"></div>
      </header>

      {/** Contact Details */}
      <section className="flex items-center justify-center gap-[20px] flex-wrap mt-4 lg:mt-10">
        {/** Main Office */}
        <div className="w-full h-[165px] max-w-[250px] bg-white rounded-lg flex flex-col items-center gap-y-3 p-5 text-black lg:h-[205px]">
          <FaLocationDot className="text-black text-3xl lg:text-4xl" />
          <h5 className="text-[17px] text-center font-medium lg:text-[18px]">
            OUR MAIN OFFICE
          </h5>
          <p className="text-[16px] text-center lg:text-[17px]">
            3891 Ranchview Dr. Richardson, California 62639
          </p>
        </div>

        {/** Phone Number */}
        <div className="w-full h-[165px] max-w-[250px] bg-white rounded-lg flex flex-col items-center gap-y-3 p-5 text-black lg:h-[205px]">
          <CgPhone className="text-black text-3xl lg:text-4xl" />
          <h5 className="text-[17px] text-center font-medium lg:text-[18px]">
            PHONE NUMBER
          </h5>
          <p className="text-[16px] text-center lg:text-[17px]">
            +234 815 986 7285
          </p>
        </div>

        {/** Fax */}
        <div className="w-full h-[165px] max-w-[250px] bg-white rounded-lg flex flex-col items-center gap-y-3 p-5 text-black lg:h-[205px]">
          <FaFax className="text-black text-3xl lg:text-4xl" />
          <h5 className="text-[17px] text-center font-medium lg:text-[18px]">
            FAX
          </h5>
          <p className="text-[16px] text-center lg:text-[17px]">
            1-234-567-8900
          </p>
        </div>

        {/** Email */}
        <div className="w-full h-[165px] max-w-[250px] bg-white rounded-lg flex flex-col items-center gap-y-3 p-5 text-black lg:h-[205px]">
          <TbMailFilled className="text-black text-3xl lg:text-4xl" />
          <h5 className="text-[17px] text-center font-medium lg:text-[18px]">
            EMAIL
          </h5>
          <p className="text-[16px] text-center lg:text-[17px]">
            contact@krist.com
          </p>
        </div>
      </section>

      {/** Middle section */}
      <section className="mt-8 space-y-8 lg:mt-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-[60px]">
        {/** Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-3 lg:gap-y-5"
        >
          {/**** Name input */}
          <label htmlFor="name">
            <span className="text-white text-base md:text-lg">Name</span>

            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
                setName(filteredValue);
              }}
              className={`w-full h-[38px] bg-transparent outline-none border-b-2 border-white p-3 text-base text-white placeholder:text-base placeholder:text-gray-400 ${
                nameInputError && "!border-errorRed"
              }`}
            />

            <span className="text-errorRed text-[14px] md:text-base">
              {nameInputError}
            </span>
          </label>

          {/**** Email input */}
          <label htmlFor="email">
            <span className="text-white text-base md:text-lg">Email</span>

            <input
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter a valid email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-[38px] bg-transparent outline-none border-b-2 border-white p-3 text-base text-white placeholder:text-base placeholder:text-gray-400 ${
                emailInputError && "!border-errorRed"
              }`}
            />

            <span className="text-errorRed text-[14px] md:text-base">
              {emailInputError}
            </span>
          </label>

          {/**** Message input */}
          <label htmlFor="message">
            <span className="text-white text-base md:text-lg">Message</span>

            <textarea
              name="message"
              id="message"
              autoComplete="off"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full h-[100px] bg-transparent outline-none border-b-2 border-white p-3 text-base text-white placeholder:text-base placeholder:text-gray-400 resize-none lg:h-[200px] ${
                messageInputError && "!border-errorRed"
              }`}
            />

            <span className="text-errorRed text-[14px] md:text-base">
              {messageInputError}
            </span>
          </label>

          {/***** Submit button */}
          <FormButton loading={isSubmittingForm} disabled={isSubmittingForm}>
            Submit
          </FormButton>
        </form>

        {/** Get in Touch */}
        <section className="space-y-3 text-white lg:space-y-5">
          <h5 className="text-2xl lg:text-3xl">Get In Touch</h5>

          <p className="text-[16px] font-medium italic lg:text-lg">
            At Krist, we value your experience and are here to make your
            shopping journey seamless. Whether you have questions about our
            trendy clothing, stylish accessories, sizing, or order status, our
            dedicated support team is ready to assist you.
          </p>

          <p className="text-[16px] lg:text-lg">
            We love hearing from you! Your feedback, suggestions, and ideas
            inspire us to keep innovating and curating collections that reflect
            your fashion needs. Whether you have thoughts about our designs,
            suggestions for new products, or simply want to share your shopping
            experience, we&apos;re all ears.
          </p>

          {/** Social logos */}
          <div className="flex items-center gap-x-5">
            {/*** Twitter X icon */}
            <Link href="https://x.com/00xdave" target="blank">
              <FaXTwitter className="text-white text-2xl lg:text-3xl" />
            </Link>

            {/** Instagram icon */}
            <Link href="https://www.instagram.com/00xdave/" target="blank">
              <FaInstagram className="text-white text-2xl lg:text-3xl" />
            </Link>

            {/** Linkedin icon */}
            <Link
              href="https://www.linkedin.com/in/ogunsanwo-david-399817238"
              target="blank"
            >
              <FaLinkedin className="text-white text-2xl lg:text-3xl" />
            </Link>
          </div>
        </section>
      </section>

      {/** Map */}
      <ContactUsMap />
    </div>
  );
}
