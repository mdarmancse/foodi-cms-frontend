import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
const breadcrumbItems = [
  { name: `${lang("campaign")}`, url: routeNames.campaign },
  { name: lang("add") },
];

import { FormikContext, useFormik } from "formik";
import { InitialValues, ValidationSchema } from "./form.config";
import { CouponCreateForm } from "./coupon-create-form.component";

export const CouponCreate = () => {
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
      BtnComp={<LinkButton to={routeNames.campaign} btnName={lang("back")} />}
      title={`${lang("add")} ${lang("campaign")}`}
    >
      <FormikContext.Provider value={formik}>
        <CouponCreateForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
