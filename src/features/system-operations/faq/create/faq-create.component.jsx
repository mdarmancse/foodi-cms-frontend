import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { Formik } from "formik";
import { FaqCreateSchema, initialValue } from "./form.config";
import { FaqCreateForm } from "./create-form.component";
import { useParams } from "react-router-dom";
const breadCrumbsItem = [{ name: "Foodi" }, { name: "Faq" }];
const Title = "Create FAQ";

export const FaqCreate = () => {
    const params = useParams();

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadCrumbsItem}
      BtnComp={<LinkButton to="/faq" btnName="Back" />}
    >
      <FaqCreateForm id={params?.id}/>
    </CommonLayout>
  );
};
