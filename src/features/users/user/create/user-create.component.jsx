import { FormikContext, useFormik } from "formik";
import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import { InitialValues, UserSchema, UserSchemaForEdit } from "./form.config";
import { UserForm } from "./user-create-form.component";
import {
  useAddUserMutation,
  useEditUserMutation,
  useLazyGetByIdUserQuery,
} from "../user-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoader } from "@/features/ui/page-loader.component";

export const UserCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { name: "User", url: "/users" },
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
  ] = useAddUserMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetByIdUserQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      isError: editErrorStatus,
      error: editErrorData,
    },
  ] = useEditUserMutation();

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: id && getByIdSuccess ? getByIdData : InitialValues,
    validationSchema: id ? UserSchemaForEdit : UserSchema,
    async onSubmit(values) {
      if (!id) {
        const newData = {
          ...values,
          userType: values.userType.value,
        };
        await addAction(newData);
      } else {
        await editAction({ id, data: values });
      }
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      navigate("/users");
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      navigate("/users");
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/users" btnName="Back" />}
      title={id ? "Edit User" : "Create New User"}
    >
      {getByIdFetching ? (
        <PageLoader />
      ) : (
        <FormikContext.Provider value={formik}>
          <UserForm />
        </FormikContext.Provider>
      )}
    </CommonLayout>
  );
};
