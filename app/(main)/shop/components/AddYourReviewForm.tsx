import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { setReviews } from "@/app/redux/shopSlice";
import { ReduxStoreState } from "@/app/redux/store";

import { addReview } from "@/app/actions/shop/add-review";

import { useAuth } from "@/contexts/AuthContext";

import FormButton from "@/app/components/ui/FormButton";
import FormInput from "@/app/components/ui/FormInput";
import SetRating from "@/app/components/ui/SetRating";

import { FaCheck } from "react-icons/fa6";

interface AddYourReviewFormProps {
  itemId: number;
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddYourReviewForm({
  itemId,
  setIsFormSubmitted,
}: AddYourReviewFormProps) {
  //Redux dipatch function
  const dispatch = useAppDispatch();

  //Reviews from redux state
  const dynamicReviews = useAppSelector(
    (state: ReduxStoreState) => state.shop.reviews
  );

  //Variable from auth context
  const { user } = useAuth();

  //User credentials
  const userId = user?.id;
  const userAvatar = user?.avatar;

  //Type of the error state of the login form
  type AddYourReviewFormErrors = {
    name?: string[];
    title?: string[];
    description?: string[];
  } | null;

  //State of the input and error states
  const [rating, setRating] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<AddYourReviewFormErrors>(null); // To store validation errors

  //State for anonymous review checkbox
  const [isAnonymousReview, setIsAnonymousReview] = useState<boolean>(false);

  //Error states of form
  const nameInputError = errors?.name?.at(0);
  const titleInputError = errors?.title?.at(0);
  const descriptionInputError = errors?.description?.at(0);

  //Function when rating changes
  function handleRatingChange(newRating: number) {
    setRating(newRating);
  }

  //Loading state of adding a review
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);

  //Function to submit review form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Set Loading state to true and delay execution of the rest
    setIsAddingReview(true);

    setTimeout(() => {
      // Collect form data
      const formData = new FormData();
      formData.append("itemId", itemId.toString());
      formData.append("userId", String(userId));
      formData.append("name", name);
      formData.append("rating", rating.toString());
      formData.append("title", title);
      formData.append("description", description);
      formData.append("createdAt", new Date().toISOString());

      // Set avatar based on anonymous review
      formData.append("avatar", isAnonymousReview ? "" : String(userAvatar));

      // Call the add review function
      const result = addReview(formData);

      // Set errors if they exist; otherwise, clear errors
      if (result?.errors) {
        setErrors(result.errors);
      } else {
        setErrors(null);
      }

      //New review
      const newReview = result?.data;

      //Dispatch new review to the store
      if (newReview) {
        dispatch(setReviews([...dynamicReviews, newReview]));
        setIsFormSubmitted(true);
      }

      // Set Loading state to false
      setIsAddingReview(false);
    }, 2000); // Delay for 2 seconds for better user experience
  };

  return (
    <div className="w-full space-y-3 text-black !mt-5">
      {/** Header */}
      <header>
        <h5 className="text-[17px] font-semibold md:text-[19px]">
          Add Your Review
        </h5>
      </header>

      {/** Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/*** Rating */}
        <section className="space-y-2">
          <h6 className="text-[16px] md:text-[18px]">Your Rating</h6>

          <SetRating ratingValue={rating} onRatingChange={handleRatingChange} />
        </section>

        {/** Name input */}
        <FormInput label="Name" error={nameInputError}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic and non-space characters
              setName(filteredValue);
            }}
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey md:text-lg md:p-4 md:placeholder:text-lg ${
              nameInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/** Title input */}
        <FormInput label="Title" error={titleInputError}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title of your review"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full h-[44px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey md:text-lg md:p-4 md:placeholder:text-lg ${
              titleInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/** Description input */}
        <FormInput label="Description" error={descriptionInputError}>
          <textarea
            //type="text"
            name="description"
            id="description"
            placeholder="Share your thoughts and experience with this product..."
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full h-[150px] rounded-[10px] outline-none border-black border-[1.5px] p-2 text-base text-black placeholder:text-base placeholder:text-grey  md:text-lg md:placeholder:text-lg md:p-4 resize-none lg:h-[250px] ${
              descriptionInputError && "!border-errorRed"
            }`}
          />
        </FormInput>

        {/*** Anonymous review checkbox */}
        <section className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-x-2" htmlFor="agreeToTerms">
            {/*** Hidden input */}
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={isAnonymousReview}
              onChange={(e) => setIsAnonymousReview(e.target.checked)}
              className="hidden peer"
            />

            {/* Custom Checkbox */}
            <span className="flex items-center justify-center h-4 w-4 border-2 border-black rounded-sm peer-checked:bg-black">
              <FaCheck className="text-white text-[0.6rem]" />
            </span>

            <span className="md:text-lg">
              <span>Post my review</span>
              <span className="ml-1 font-semibold">anonymously</span>
            </span>
          </label>
        </section>

        {/***** Submit button */}
        <FormButton
          className="!w-[100px] !px-5 !py-2 md:!h-max md:!w-[150px] md:!px-6 md:!py-3"
          loading={isAddingReview}
          disabled={isAddingReview}
        >
          Submit
        </FormButton>
      </form>
    </div>
  );
}
