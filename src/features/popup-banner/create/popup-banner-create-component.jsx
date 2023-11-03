import { FormikContext, useFormik } from "formik";

import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { PageLoader } from "@/features/ui/page-loader.component";
import { convertToFormData } from "@/helper";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddPopupBannerMutation,
  useEditPopupBannerMutation,
  useLazyGetByIdPopupBannerQuery,
} from "../popup-banner-api";
import { InitialValues, PopupBannerSchema } from "./form.config";
import { PopupBannerForm } from "./popup-banner-form-component";

export const PopupBannerCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { name: "Popup Banner", url: "/popup-banner" },
    { name: id ? "Edit" : "Create" },
  ];
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      isError: addErrorStatus,
      error: addErrorData,
    },
  ] = useAddPopupBannerMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetByIdPopupBannerQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      isError: editErrorStatus,
      error: editErrorData,
    },
  ] = useEditPopupBannerMutation();

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            ...getByIdData.data,
            startDate: moment(getByIdData.data.startDate).format(
              "YYYY-MM-DDTHH:mm"
            ),
            endDate: getByIdData.data.endDate.slice(0, 16),
          }
        : InitialValues,
    validationSchema: PopupBannerSchema,
    async onSubmit(values) {
      const newData = {
        ...values,
        redirectType: values.redirectType.value,
        campaignId:
          values.redirectType.value == "campaign"
            ? values.campaignId.value
            : "",
        restaurantId:
          values.redirectType.value == "restaurant"
            ? values.restaurantId.value
            : "",
        startDate: moment(values.startDate).toISOString(),
        endDate: moment(values.endDate).toISOString(),
      };

      const formData = convertToFormData(newData);

      id ? await editAction({ id, data: formData }) : await addAction(formData);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);

      navigate("/popup-banner");
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);

      navigate("/popup-banner");
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/popup-banner" btnName="Back" />}
      title={id ? "Edit Popup Banner" : "Create New Popup Banner"}
    >
      {getByIdFetching ? (
        <PageLoader />
      ) : (
        <FormikContext.Provider value={formik}>
          <PopupBannerForm />
        </FormikContext.Provider>
      )}
    </CommonLayout>
  );
};
