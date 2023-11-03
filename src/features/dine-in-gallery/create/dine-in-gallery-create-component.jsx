import { PageLoader } from "@/features/ui/page-loader.component";
import { convertToFormData } from "@/helper";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";
import {
  useAddDineInGalleryMutation,
  useEditDineInGalleryMutation,
  useLazyGetByIdDineInGalleryQuery,
} from "../dine-in-gallery-api";
import { DineinGalleryForm } from "./dine-in-gallery-create-form";
import { DineInGalleryCreateSchema, initialValue } from "./form.config";

export const DineInGalleryCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { name: "Dine in Gallery", url: "/dine-in-gallery" },
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
  ] = useAddDineInGalleryMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetByIdDineInGalleryQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      isError: editErrorStatus,
      error: editErrorData,
    },
  ] = useEditDineInGalleryMutation();

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
            thumbnailImage: `${import.meta.env.VITE_APP_BASE_URL}${
              getByIdData.data.thumbnailImage
            }`,
          }
        : initialValue,

    validationSchema: DineInGalleryCreateSchema,
    async onSubmit(values) {
      const newData = {
        ...values,
        branchId: values.branchId.value,
      };

      const formData = convertToFormData(newData);
      id ? await editAction({ id, data: formData }) : await addAction(formData);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      navigate("/dine-in-gallery");
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      navigate("/dine-in-gallery");
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/dine-in-gallery" btnName="Back" />}
      title={id ? "Edit Dine In Gallery" : "Add Dine In Gallery"}
    >
      {getByIdFetching ? (
        <PageLoader />
      ) : (
        <FormikContext.Provider value={formik}>
          <DineinGalleryForm />
        </FormikContext.Provider>
      )}
    </CommonLayout>
  );
};
