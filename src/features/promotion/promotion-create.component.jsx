import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { FormikContext, useFormik } from "formik";
import { InitialValues, ValidationSchema } from "./form.config";
import { PromotionCreateForm } from "./promotion-create-form.component";
import {
  useCreatePromotionMutation,
  useLazyGetSinglePromotionQuery,
  useUpdatePromotionMutation,
} from "./promotion-api-slice";
import { cloneDeep } from "lodash";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { PageLoader } from "../ui/page-loader.component";
import { toast } from "react-toastify";

export const PromotionCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [
    triggerGetSingleData,
    {
      data: singleData,
      isSuccess: isSingleSuccess,
      isLoading: isSingleLoading,
      isError,
    },
  ] = useLazyGetSinglePromotionQuery();

  const [create, { data: createData, isSuccess }] =
    useCreatePromotionMutation();

  const [update, { data: updateData, isSuccess: isUpdateSuccess }] =
    useUpdatePromotionMutation();

  const handleSubmit = async (values, formikHelpers) => {
    const payload = cloneDeep(values);
    payload.startDate = moment(payload.startDate).valueOf();
    payload.endDate = moment(payload.endDate).valueOf();
    payload.branchAndPromotions = payload.branchAndPromotions?.map((item) => ({
      branchId: item.value,
    }));
    if (id) {
      await update(payload);
    } else {
      await create(payload);
    }
  };

  useEffect(() => {
    if (id) {
      triggerGetSingleData(id);
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(createData?.message || "Created Successfully.");
      navigate(routeNames.promotion);
    }
  }, [createData]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.message || "Updated Successfully.");
      navigate(routeNames.promotion);
    }
  }, [updateData]);

  const formik = useFormik({
    initialValues: id ? singleData?.data : InitialValues,
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const breadcrumbItems = [
    { name: `${lang("promotion")}`, url: routeNames.promotion },
    { name: lang(id ? "edit" : "add") },
  ];

  if (id && isSingleLoading) return <PageLoader />;

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to={routeNames.promotion} btnName={lang("back")} />}
      title={`${lang(id ? "edit" : "add")} ${lang("promotion")}`}
    >
      <FormikContext.Provider value={formik}>
        <PromotionCreateForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
