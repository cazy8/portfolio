import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to the Linux resume view (landing should be Linux view)
  redirect("/resume?view=linux");
  return null;
}
