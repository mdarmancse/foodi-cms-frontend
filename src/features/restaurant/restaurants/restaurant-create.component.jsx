import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { FormikContext, useFormik } from "formik";
import { RestaurantCreateForm } from "./restaurant-create-form.component";
import { InitialValues, ValidationSchema } from "./form.config";
import { cloneDeep } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { PageLoader } from "@/features/ui/page-loader.component";
import { toast } from "react-toastify";
import {
  useLazyGetSingleRestaurantQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} from "./restaurant-api-slice";

export const RestaurantCreate = () => {
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
  ] = useLazyGetSingleRestaurantQuery();

  const [create, { data: createData, isSuccess }] =
    useCreateRestaurantMutation();

  const [update, { data: updateData, isSuccess: isUpdateSuccess }] =
    useUpdateRestaurantMutation();

  const handleSubmit = async (values, formikHelpers) => {
    const payload = cloneDeep(values);
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
      navigate(routeNames.restaurant);
    }
  }, [createData]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.message || "Updated Successfully.");
      navigate(routeNames.restaurant);
    }
  }, [updateData]);

  const formik = useFormik({
    initialValues: id ? singleData?.data : InitialValues,
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (id && isSingleLoading) return <PageLoader />;

  const BackBtn = () => (
    <LinkButton to={routeNames.restaurant} btnName={lang("back")} />
  );

  const breadcrumbItems = [
    { name: `${lang("restaurant")}`, url: routeNames.restaurant },
    { name: lang(id ? "edit" : "add") },
  ];
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<BackBtn />}
      title={`${lang(id ? "edit" : "add")} ${lang("restaurant")}`}
    >
      <FormikContext.Provider value={formik}>
        <RestaurantCreateForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
