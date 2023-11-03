import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";

import { FormikContext, useFormik } from "formik";
import { CampaignCreateForm } from "./campaign-create-form.component";
import { InitialValues, ValidationSchema } from "./form.config";

import { PageLoader } from "@/features/ui/page-loader.component";
import { convertToFormData } from "@/helper";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateCampaignMutation,
  useLazyGetSingleCampaignQuery,
  useUpdateCampaignMutation,
} from "../campaign-api-slice";

export const CampaignCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { name: `${lang("campaign")}`, url: routeNames.campaign },
    { name: id ? lang("edit") : lang("add") },
  ];
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      isError: addErrorStatus,
      error: addErrorData,
    },
  ] = useCreateCampaignMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetSingleCampaignQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      isError: editErrorStatus,
      error: editErrorData,
    },
  ] = useUpdateCampaignMutation();

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
    validationSchema: ValidationSchema,

    async onSubmit(values, helpers) {
      const branchAndCampaigns =
        values.branchAndCampaigns?.length > 0
          ? values.branchAndCampaigns.map((item) => {
              return {
                branchId: item.value,
              };
            })
          : [];

      const newData = {
        name: values.name,
        description: values.description,
        image: values.image,
        isDelivery: values.isDelivery,
        isPickup: values.isPickup,
        isDine: values.isDine,
        isFlower: values.isFlower,
        startDate: moment(values.startDate).toISOString(),
        endDate: moment(values.endDate).toISOString(),
        foodiPercentage: 0,
        restaurantPercentage: 0,
        branchAndCampaigns: branchAndCampaigns,
        deletedIds: id ? branchAndCampaigns : [],
      };

      const formData = convertToFormData(newData);

      id ? await editAction({ id, data: formData }) : await addAction(formData);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      navigate("/campaigns");
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      navigate("/campaigns");
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to={routeNames.campaign} btnName={lang("back")} />}
      title={
        id
          ? `${lang("edit")} ${lang("campaign")}`
          : `${lang("add")} ${lang("campaign")}`
      }
    >
      {getByIdFetching ? (
        <PageLoader />
      ) : (
        <FormikContext.Provider value={formik}>
          <CampaignCreateForm />
        </FormikContext.Provider>
      )}
    </CommonLayout>
  );
};
