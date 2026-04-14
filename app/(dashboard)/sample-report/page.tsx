import { redirect } from "next/navigation";

export default function SampleReportPage() {
  // Sample report is intentionally disabled for the public site.
  redirect("/");
}
