import { FormikContext, useFormik } from "formik";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import {
  useCreateZoneMutation,
  useGetSingleZoneQuery,
  useUpdateSingleZoneMutation,
} from "../zone-api-slice";
import { InitialValues, ZoneFormSchema, getInitialValues } from "./form.config";
import { ZoneForm } from "./zone-create-form.component";

const breadcrumbItems = [
  { name: "Zone", url: "/zone" },
  { name: "Zone Create", url: "/zone/create" },
];

export const ZoneCreate = () => {
  const [createZone, { data, isLoading, isSuccess, isError, error }] =
    useCreateZoneMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [
    updateZone,
    {
      data: zoneUpdateData,
      isSuccess: isZoneUpdateSuccess,
      isLoading: isZoneLoading,
      error: updateError,
      isError: isUpdateError,
    },
  ] = useUpdateSingleZoneMutation();
  const { data: singleZone, isSuccess: isSingleZoneSuccess } =
    useGetSingleZoneQuery(id, {
      skip: !id,
    });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && isSingleZoneSuccess
        ? getInitialValues(singleZone?.data || {})
        : InitialValues, //@TODO: This are pending.
    validationSchema: ZoneFormSchema,
    onSubmit: async (values) => {
      const payload = cloneDeep(values);
      delete payload.autocompleteInput;
      payload.cityId = values.cityId.value;

      payload.latLong = {
        ...values.latLong,
        coordinates: values.latLong.coordinates.map((latLong) => [
          latLong.lat,
          latLong.lng,
        ]),
      };
      const hasKMWiseDeliveryCharge =
        payload.kilometerWiseDeliveryCharges.every(
          (km) => km.kilometer && km.charge
        );

      if (!hasKMWiseDeliveryCharge) {
        payload.kilometerWiseDeliveryCharges = [];
      }

      id ? await updateZone({ id, body: payload }) : await createZone(payload);
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message || "Create Successfully");
      navigate("/zone");
    }
  }, [data]);
  useEffect(() => {
    if (zoneUpdateData && isZoneUpdateSuccess) {
      toast.success(zoneUpdateData?.message || "Update Successfully");
      navigate("/zone");
    }
  }, [zoneUpdateData]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to create");
    } else if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update.");
    }
  }, [isError, isUpdateError]);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/zone" btnName="Back" />}
      title="Create New Zone"
    >
      <FormikContext.Provider value={formik}>
        <ZoneForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
