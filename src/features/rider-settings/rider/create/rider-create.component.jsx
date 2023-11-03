import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import { RiderCreateForm } from "./rider-create-form.component";
import { useParams } from "react-router-dom";

const breadcrumbItems = [{ name: "Rider", url: "/rider" }, { name: "Create" }];

export const RiderCreate = () => {
  const { id } = useParams();
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/rider" btnName="Back" />}
      title={id ? "Update Rider" : "Create Rider"}
    >
      <RiderCreateForm />
    </CommonLayout>
  );
};
