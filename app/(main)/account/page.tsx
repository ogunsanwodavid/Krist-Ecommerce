import { redirect } from "next/navigation";

export default function AccountPage() {
  //Redirect to personal info subroute on page visit
  redirect("/account/personal-info");
}
