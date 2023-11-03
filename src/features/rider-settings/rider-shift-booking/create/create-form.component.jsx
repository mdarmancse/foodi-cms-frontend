import { initialValues, riderShiftValidationSchema } from "./form.config";
import { CommonLayout } from "@/features/layouts";
import { Formik, Form } from "formik";
import {
  LinkButton,
  FormikSelectField,
  FormikInputField,
  FormikCheckBox,
} from "@/features/ui";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  useGetRiderQuery,
  useGetRiderShiftDutyQuery,
  useGetShiftSwapQuery,
  useAddRiderShiftBookingMutation,
  useEditRiderShiftBookingMutation,
  useGetRiderShiftByIdQuery,
} from "../rider-shift-booking-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const RiderShiftBookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: rider } = useGetRiderQuery();
  const { data: shift } = useGetShiftSwapQuery();
  const { data: duty } = useGetRiderShiftDutyQuery();

  const [addShiftBooking, { isSuccess: addSuccess, isError: addError }] =
    useAddRiderShiftBookingMutation();
  const [editShiftBooking, { isSuccess: editSuccess, isError: editError }] =
    useEditRiderShiftBookingMutation();

  const { data: editData } = useGetRiderShiftByIdQuery(id, { skip: !id });

  console.log("edit", editData?.data);

  //   console.log("rider", rider);
  //   console.log("shift", shift);
  //   console.log("duty", duty);

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmit = (values) => {
    // console.log("values", values);
    let params = id
      ? {
          ...values,
          actualStartTime:
            values?.actualStartTime?.length == 8
              ? values.actualStartTime
              : values.actualStartTime + ":00",
          actualEndTime:
            values?.actualEndTime?.length == 8
              ? values.actualEndTime
              : values.actualEndTime + ":00",
          lateTime:
            values?.lateTime?.length == 8
              ? values.lateTime
              : values?.lateTime?.length
              ? values.lateTime + ":00"
              : null,
          riderId: Number(values.riderId),
          riderShitDutySetupId: Number(values.riderShitDutySetupId),
          shiftSwapStatusId: Number(values.shiftSwapStatusId),
        }
      : {
          ...values,
          actualStartTime: values.actualStartTime + ":00",
          actualEndTime: values.actualEndTime + ":00",
          lateTime: values?.lateTime?.length ? values.lateTime + ":00" : null,
          riderId: Number(values.riderId),
          riderShitDutySetupId: Number(values.riderShitDutySetupId),
          shiftSwapStatusId: Number(values.shiftSwapStatusId),
        };
    // console.log("params", params);
    id ? editShiftBooking(params) : addShiftBooking(params);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/RiderShiftBooking",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/rider-shift-booking");
    }

    if (addError || editError) {
      toast.error(id ? "Error updating" : "Error creating");
    }
  }, [addSuccess, editSuccess, addError, editError]);

  return (
    <div>
      <CommonLayout
        title={id ? "Rider Shift Booking Update" : "Rider Shift Booking Create"}
        BtnComp={<LinkButton btnName="Back" to="/rider-shift-booking" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    id,
                    riderId: editData?.data?.riderId,
                    riderShitDutySetupId: editData?.data?.riderShitDutySetupId,
                    shiftSwapStatusId: editData?.data?.shiftSwapStatusId,
                    date: editData?.data?.date,
                    actualStartTime: editData?.data?.actualStartTime,
                    actualEndTime: editData?.data?.actualEndTime,
                    isBooked: editData?.data?.isBooked,
                    isPresent: editData?.data?.isPresent,
                    isInLeave: editData?.data?.isInLeave,
                    isInBreak: editData?.data?.isInBreak,
                    isExtendable: editData?.data?.isExtendable,
                    breakCount: editData?.data?.breakCount,
                    lateTime: editData?.data?.lateTime,
                  }
                : initialValues
            }
            validationSchema={id ? "" : riderShiftValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}
                <Row>
                  <Col md={6} sm={12}>
                    <FormikSelectField
                      name="riderId"
                      selectFieldProps={{
                        required: true,
                        label: "Rider",
                        options: rider?.items || [],
                      }}
                      value={values.riderId}
                      onChange={(e) => {
                        setFieldValue("riderId", e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikSelectField
                      name="riderShitDutySetupId"
                      selectFieldProps={{
                        required: true,
                        label: "Shift Duty Number",
                        options: duty?.items || [],
                      }}
                      value={values.riderShitDutySetupId}
                      onChange={(e) => {
                        setFieldValue("riderShitDutySetupId", e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikSelectField
                      name="shiftSwapStatusId"
                      selectFieldProps={{
                        required: true,
                        label: "Shift Swap Status",
                        options: shift?.items || [],
                      }}
                      value={values.shiftSwapStatusId}
                      onChange={(e) => {
                        setFieldValue("shiftSwapStatusId", e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="date"
                      inputFieldProps={{
                        required: true,
                        label: "Date",
                        type: "date",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="actualStartTime"
                      inputFieldProps={{
                        label: "Actual Start Time",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="actualEndTime"
                      inputFieldProps={{
                        label: "Actual End Time",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="breakCount"
                      inputFieldProps={{
                        label: "Break Count",
                        type: "number",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="lateTime"
                      inputFieldProps={{
                        label: "Late Time",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={2}>
                    <FormikCheckBox
                      name="isBooked"
                      checkBoxProps={{
                        label: "Booked",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={2}>
                    <FormikCheckBox
                      name="isPresent"
                      checkBoxProps={{
                        label: "Present",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={2}>
                    <FormikCheckBox
                      name="isInLeave"
                      checkBoxProps={{
                        label: "In Leave",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={2}>
                    <FormikCheckBox
                      name="isInBreak"
                      checkBoxProps={{
                        label: "In Break",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={2}>
                    <FormikCheckBox
                      name="isExtendable"
                      checkBoxProps={{
                        label: "Extendable",
                      }}
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};
