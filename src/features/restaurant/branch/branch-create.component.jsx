import React from "react";
import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { FormikContext, useFormik } from "formik";
import { InitialValues, ValidationSchema } from "./form.config";
import { BranchCreateForm } from "./branch-create-form.component";
const breadcrumbItems = [
  { name: `${lang("branch")}`, url: routeNames.branch },
  { name: lang("add") },
];

export const BranchCreate = () => {
  const handleSubmit = (values, formikHelpers) => {
    return;
  };

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to={routeNames.branch} btnName={lang("back")} />}
      title={`${lang("add")} ${lang("branch")}`}
    >
      <FormikContext.Provider value={formik}>
        <BranchCreateForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
