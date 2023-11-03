import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { convertToFormData } from "@/helper";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreatePromoCodeMutation,
  useGetSinglePromoCodeQuery,
} from "../promo-code-api-slice";
import { InitialPCValues, ValidationSchema } from "./form.config";
import { generatePayload } from "./helpers";
import { PromoCodeForm } from "./promo-code-form.component";
import { useGetInitialValue } from "./use-get-initial-value.hook";

const Title = "Promo Code Create";
const BreadcrumbItem = [
  {
    name: "Promo Code",
    url: "/promo-code",
  },
  {
    name: "Promo Code Create",
    url: "/promo-code/create",
  },
];

export function PromoCodeCreate() {
  const [createPromoCode, { data, isSuccess, isError, error }] =
    useCreatePromoCodeMutation();
  const { id } = useParams();
  const {
    data: SinglePromoCode,
    isSuccess: promoCodeSuccess,
    isLoading: pLoading,
  } = useGetSinglePromoCodeQuery(id, {
    skip: !id ? true : false,
  });
  const navigate = useNavigate();
  const getInitialValues = useGetInitialValue(SinglePromoCode?.data || {});

  const formik = useFormik({
    initialValues: id && promoCodeSuccess ? getInitialValues : InitialPCValues,
    validationSchema: ValidationSchema,
    async onSubmit(values, helpers) {
      const payload = generatePayload(values);
      const cnvertFormData = convertToFormData(payload);
      await createPromoCode(cnvertFormData);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
      navigate("/promo-code");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (id && pLoading) {
    return (
      <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
        <Spinner variant="warning" />
      </div>
    );
  }

  console.log({ SinglePromoCode });
  return (
    <CommonLayout
      breadcrumbItems={BreadcrumbItem}
      title={Title}
      BtnComp={<LinkButton btnName="Back" to="/promo-code" />}
    >
      <FormikContext.Provider value={formik}>
        <PromoCodeForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
}
