import FormButton from "@/app/components/ui/FormButton";

import { FaRegEdit } from "react-icons/fa";

import { BsSave } from "react-icons/bs";

interface EditProfileButtonProps {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  isEditingProfile: boolean;
  handleEditProfile: (e: React.FormEvent) => Promise<void>;
  handleUpdateProfile: (e: React.FormEvent) => Promise<void>;
}

export default function EditProfileButton({
  className,
  disabled,
  loading,
  isEditingProfile,
  handleEditProfile,
  handleUpdateProfile,
}: EditProfileButtonProps) {
  //Handle edit button click
  function handleButtonClick(e: React.FormEvent) {
    if (!isEditingProfile) {
      handleEditProfile(e);
    } else {
      handleUpdateProfile(e);
    }
  }

  return (
    <FormButton
      onClick={handleButtonClick}
      loading={loading}
      disabled={disabled}
      className={`!h-[44px] !flex !items-center !gap-x-2 !px-5 !py-2 ${className}`}
    >
      {!isEditingProfile ? (
        <FaRegEdit className="text-[14px] text-white" />
      ) : (
        <BsSave className="text-[14px] text-white " />
      )}

      <p className="leading-[16px]">
        {!isEditingProfile ? "Edit Profile" : "Update Profile"}
      </p>
    </FormButton>
  );
}
