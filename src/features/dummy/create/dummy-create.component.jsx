import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { FormikContext, useFormik } from "formik";
import { DummyUserForm } from "./dummy-create-form.component";
import { AdminisitrativeUserSchema, InitialValues } from "./form.config";

const breadcrumbItems = [
  { name: "Administrative User", url: "/users" },
  { name: "Create" },
];

export const DummyCreate = () => {
  const id = 10;
  const formik = useFormik({
    initialValues: id ? {} : InitialValues,
    validationSchema: AdminisitrativeUserSchema,
    onSubmit: (values, formikHelpers) => {
      console.log({ values });
      console.log(values.image[0]);
    },
  });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/dummy" btnName="Back" />}
      title="Create New Dummy User"
    >
      <FormikContext.Provider value={formik}>
        <DummyUserForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
