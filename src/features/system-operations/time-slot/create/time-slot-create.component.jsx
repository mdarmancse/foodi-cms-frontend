import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { TimeSlotForm } from "./time-slot-create-form.component";
const breadcrumbItems = [{ name: "Foodi" }, { name: "Time slot create" }];
const title = "Time slot create";
export const TimeSlotCreate = () => {
  return (
    <CommonLayout
      title={title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/systemOperation/time-slot" btnName="Back" />}
    >
        <TimeSlotForm/>
    </CommonLayout>
  );
};
