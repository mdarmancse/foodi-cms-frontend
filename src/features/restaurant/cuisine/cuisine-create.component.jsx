import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { FormikContext, useFormik } from "formik";
import { CuisineCreateForm } from "./cuisine-create-form.component";
import { useParams } from "react-router-dom";
import {
  useCreateCuisineMutation,
  useLazyGetSingleCuisineQuery,
  useUpdateCuisineMutation,
} from "./cuisine-api-slice";
import { useEffect } from "react";
import { InitialValues, ValidationSchema } from "./form.config";
import { PageLoader } from "@/features/ui/page-loader.component";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";

export const CuisineCreate = () => {
  const { id } = useParams();

  const [
    triggerGetById,
    { data: getByIdData, isSuccess: getByIdSuccess, isLoading: getByIdLoading },
  ] = useLazyGetSingleCuisineQuery();

  useEffect(() => {
    if (id) {
      triggerGetById(id);
    }
  }, [id]);

  const [create, { data: createData, isSuccess }] = useCreateCuisineMutation();

  const [update, { data: updateData, isSuccess: isUpdateSuccess }] =
    useUpdateCuisineMutation();

  const handleSubmit = async (values, formikHelpers) => {
    const payload = cloneDeep(values);
    if (id) {
      await update(payload);
    } else {
      await create(payload);
    }
  };

  const formik = useFormik({
    initialValues: id ? getByIdData?.data : InitialValues,
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(createData?.message || "Created Successfully.");
      navigate(routeNames.cuisine);
    }
  }, [createData]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.message || "Updated Successfully.");
      navigate(routeNames.cuisine);
    }
  }, [updateData]);

  if (id && getByIdLoading) return <PageLoader />;

  const breadcrumbItems = [
    { name: `${lang("cuisine")}`, url: routeNames.cuisine },
    { name: lang(id ? "edit" : "add") },
  ];

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to={routeNames.cuisine} btnName={lang("back")} />}
      title={`${lang(id ? "edit" : "add")} ${lang("cuisine")}`}
    >
      <FormikContext.Provider value={formik}>
        <CuisineCreateForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
