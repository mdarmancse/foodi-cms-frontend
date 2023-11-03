import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { FormikContext, useFormik } from "formik";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateRestaurantMenuMutation,
  useLazyGetSingleRestaurantMenuQuery,
  useUpdateRestaurantMenuMutation,
} from "../restaurant-api-slice";
import {
  RMenuCreateValidationSchema,
  RMenuInitialValue,
  getRMenuInitialData,
} from "./form.config";
import { RestaurantMenuForm } from "./restaurant-menu-form.component";

const Title = "Restaurant Menu";
const BreadcrumbItem = [
  { name: "Restaurant Menu", url: "/restaurant-menu" },
  { name: "Restaurant Menu Create", url: "/restaurant-menu/create" },
];

export const RestaurantMenuCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [
    trigger,
    {
      data: singleRMenu,
      isSuccess: isSingleRSuccess,
      isLoading: isSLoading,
      isError,
    },
  ] = useLazyGetSingleRestaurantMenuQuery();

  const [createRMenu, { data: createdMenuData, isSuccess }] =
    useCreateRestaurantMenuMutation();
  const [updateTrigger, { isSuccess: isUpdateSuccess, data: updateData }] =
    useUpdateRestaurantMenuMutation();

  const formik = useFormik({
    initialValues:
      id && isSingleRSuccess
        ? getRMenuInitialData(singleRMenu?.data)
        : RMenuInitialValue,
    validationSchema: RMenuCreateValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      const payload = cloneDeep(values);
      payload.hasVariation = values.hasVariation ? 1 : 0;
      payload.branchId = values.branchId.value;
      payload.categoryId = values.categoryId.value;

      if (payload.hasVariation) {
        payload.variations = values.variations.map((vr) => {
          const row = {
            ...vr,
            addOn: values.hasVariation,
          };

          if (id) {
            row.menuItemId = payload.id;
          }

          return row;
        });
      } else {
        delete payload.variations;
      }
      delete payload.initialVariationCategory;
      delete payload.categoryAddOns;

      const formData = new FormData();
      if (id) {
        payload.menuAvailableTimes = values.menuAvailableTimes.map((time) => ({
          ...time,
          menuItemId: payload.id,
        }));
        payload.id = id;
        Object.keys(payload).forEach((each) => {
          formData.append(each, payload[each]);
        });
        await updateTrigger({
          payload: formData,
          id,
        });
      } else {
        Object.keys(payload).forEach((each) => {
          formData.append(each, payload[each]);
        });
        await createRMenu(formData);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(createdMenuData?.message || "Created Successfully.");
      navigate("/restaurant-menu");
    }
  }, [createdMenuData]);

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.message || "Data update successfully.");
      navigate("/restaurant-menu");
    }
  }, [updateData]);

  return (
    <CommonLayout
      title={`${Title} ${id ? "Update" : "Create"}`}
      breadcrumbItems={BreadcrumbItem}
      BtnComp={<LinkButton btnName="Back" to="/restaurant-menu" />}
    >
      {id && isSLoading ? (
        <div
          style={{
            minHeight: "500px",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <FormikContext.Provider value={formik}>
          <RestaurantMenuForm />
        </FormikContext.Provider>
      )}
    </CommonLayout>
  );
};
