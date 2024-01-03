import { DashboardHeader } from "@/app/dashboard/components/header";
import { DashboardFooter } from "./components/footer";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </>
  );
}
