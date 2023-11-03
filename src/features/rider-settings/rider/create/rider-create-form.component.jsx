import { Form, Formik } from "formik";
import { Row, Button } from "react-bootstrap";
import { InitialValues, RiderSchema } from "./form.config";
import { PersonalDteials } from "./personal-details";
import { VerificationDetails } from "./verification-details";
import { ReferenceDetails } from "./reference-details";
import {
  useAddRiderMutation,
  useEditRiderMutation,
  useGetRiderByIdQuery,
} from "../rider-api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { FormikSubmitButton } from "../../../ui";

export function RiderCreateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getList] = useLazyGetTableListQuery();

  const [addRider, { isSuccess: addSuccess, isError: addError }] =
    useAddRiderMutation();

  const [editRider, { isSuccess: editSuccess, isError: editError }] =
    useEditRiderMutation();

  const { data: editData } = useGetRiderByIdQuery(id, {
    skip: !id,
  });

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  // console.log("edit", editData?.data);
  const handleSubmit = async (values) => {
    let formData = new FormData();
    // formData.append("riderTypeId", values.riderTypeId);
    // formData.append("firstName", values.firstName);
    // formData.append("lastName", values.lastName);
    // formData.append("mobileNumber", values.mobileNumber);
    // formData.append("riderStartDate", values.riderStartDate);
    // formData.append("email", values.email);
    // formData.append("vehicleTypeId", values.vehicleTypeId);
    // formData.append("batchLevelId", values.batchLevelId);
    // formData.append("bagTypeId", values.bagTypeId);
    // formData.append("image", values.image);
    // formData.append("nidFront", values.nidFront);
    // formData.append("nidBack", values.nidBack);
    // formData.append("mac", values.mac);
    // formData.append("imei", values.imei);
    // formData.append("bkashNo", values.bkashNo);
    // formData.append("nagadNo", values.nagadNo);
    // formData.append("cityId", values.cityId);
    // formData.append("electricityBill", values.electricityBill);
    // formData.append("guardianNidFront", values.guardianNidFront);
    // formData.append("guardianNidBack", values.guardianNidBack);
    // formData.append("houseNameplate", values.houseNameplate);
    // formData.append("isApprove", values.isApprove);
    // formData.append("permanentAddress", values.permanentAddress);
    // formData.append("presentAddress", values.presentAddress);
    // formData.append("deviceId", values.deviceId);
    // formData.append("birthDate", values.birthDate);
    // formData.append("drivingLicenseId", values.drivingLicenseId);
    // formData.append("drivingLicenseImage", values.drivingLicenseImage);
    // formData.append("nidNo", values.nidNo);
    // formData.append("referrerUrl", values.referrerUrl);
    // formData.append("vehicleRegistrationId", values.vehicleRegistrationId);
    // formData.append(
    //   "vehicleRegistrationImage",
    //   values.vehicleRegistrationImage
    // );
    // console.log(values);

    let params = id ? { id: id, values } : values;

    id ? await editRider(params) : await addRider(params);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/Rider",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/rider");
    }

    if (addError || editError) {
      toast.error(id ? "Error updating" : "Error creating");
    }
  }, [addSuccess, editSuccess, addError, editError]);

  return (
    <Formik
      enableReinitialize
      initialValues={
        id
          ? {
              referredCode: editData?.data?.referredCode,
              riderTypeId: editData?.data?.riderTypeId,
              firstName: editData?.data?.firstName,
              lastName: editData?.data?.lastName,
              mobileNumber: editData?.data?.mobileNumber,
              riderStartDate: editData?.data?.riderStartDate?.slice(0, 10),
              email: editData?.data?.email,
              vehicleTypeId: editData?.data?.vehicleTypeId,
              batchLevelId: editData?.data?.batchLevelId,
              bagTypeId: editData?.data?.bagTypeId,
              image: editData?.data?.image,
              nidFront: editData?.data?.nidFront,
              nidBack: editData?.data?.nidBack,
              mac: editData?.data?.mac,
              imei: editData?.data?.imei,
              bkashNo: editData?.data?.bkashNo,
              nagadNo: editData?.data?.nagadNo,
              cityId: editData?.data?.cityId,
              electricityBill: editData?.data?.electricityBill,
              guardianNidFront: editData?.data?.guardianNidFront,
              guardianNidBack: editData?.data?.guardianNidBack,
              houseNameplate: editData?.data?.houseNameplate,
              isApprove: editData?.data?.isApprove,
              permanentAddress: editData?.data?.permanentAddress,
              presentAddress: editData?.data?.presentAddress,
              deviceId: editData?.data?.deviceId,
              birthDate: editData?.data?.birthDate?.slice(0, 10),
              drivingLicenseId: editData?.data?.drivingLicenseId,
              drivingLicenseImage: editData?.data?.drivingLicenseImage,
              nidNo: editData?.data?.nidNo,
              referrerUrl: editData?.data?.referrerUrl,
              vehicleRegistrationId: editData?.data?.vehicleRegistrationId,
              vehicleRegistrationImage:
                editData?.data?.vehicleRegistrationImage,
            }
          : InitialValues
      }
      validationSchema={id ? "" : RiderSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          {/* <p>{JSON.stringify(values)}</p> */}

          <Row>
            <PersonalDteials values={values} id={id} />
            <VerificationDetails values={values} id={id} />
            <ReferenceDetails values={values} id={id} />
          </Row>

          <div className="d-flex justify-content-end">
            {/* <Button variant="primary" type="submit">
              Submit
            </Button> */}
            <FormikSubmitButton>Submit</FormikSubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
