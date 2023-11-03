import { Formik, FormikContext, useFormik } from "formik";
import { CommonLayout } from "../../../layouts";
import { LinkButton, useLazyGetTableListQuery } from "../../../ui";
import { AddonsCategorySchema, InitialValues } from "./form.config";
import { AddonsCategoryForm } from "./create-form.component";
import {
  useAddAddOnCategoryMutation,
  useGetAddOnsCategoryByIdQuery,
  useEditAddOnCategoryMutation
} from "../addons-category-api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Api } from "@/constants";

const breadcrumbItems = [
  { name: "Add-ons Category", url: "/addons-category" },
  { name: "Create" },
];

export const AddonsCategoryCreate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [addAddonsCategory, {data:postData, isSuccess: addOnCategoryAdded }] = useAddAddOnCategoryMutation();
  const [editAddonCategory, {data:putData, isSuccess : addOnCategoryEdited }] = useEditAddOnCategoryMutation();
  const { data: addOnCategoryValue, isSuccess: gotValue,isFetching  } = useGetAddOnsCategoryByIdQuery(params?.id, { skip: !params?.id });
  const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state.commonTable);
  const [getList] = useLazyGetTableListQuery();


  useEffect(() => {
    if (addOnCategoryAdded && postData) {
      toast.success(postData?.message);
      getList({
        url : Api.GetAddOnsCategoryList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive,
        }
      })
      navigate("/addons-category")
    }
  }, [postData]);

  useEffect(() => {
    if (addOnCategoryEdited && putData) {
      toast.success(putData?.message);
      getList({
        url : Api.GetAddOnsCategoryList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive,
        }
      })
      navigate("/addons-category")
    }
  }, [putData]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/addons-category" btnName="Back" />}
      title="Create New Add-ons Category"
    >
      {isFetching ? (
        ""
      ) : (
        <Formik
          initialValues={
            params?.id
              ? {
                  name: addOnCategoryValue?.data?.name,
                  description: addOnCategoryValue?.data?.description,
                  maxChoice: addOnCategoryValue?.data?.maxChoice,
                  isCategoryMultiple: addOnCategoryValue?.data?.isCategoryMultiple,
                  presetAddOns: addOnCategoryValue?.data?.presetAddOns,
                }
              : InitialValues
          }
          validationSchema={params?.id ? "" : AddonsCategorySchema}
          onSubmit={(values) => {
            console.log({ values });
            params.id ?  editAddonCategory({...values, id: params?.id}) : addAddonsCategory(values);
          }}
        >
          {() => <AddonsCategoryForm />}
        </Formik>
      )}
    </CommonLayout>
  );
};
