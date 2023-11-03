import { initialValues, setupDutySchema } from "./form.config";
import { CommonLayout } from "@/features/layouts";
import { Formik, Form } from "formik";
import {
  LinkButton,
  FormikSelectField,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Card, Row, Col } from "react-bootstrap";
import {
  useGetZoneQuery,
  useGetWeekDayQuery,
  useEditShiftDutySetupMutation,
  useGetShifyDutyByIdQuery,
  useAddShiftDutySetupMutation,
} from "../shift-duty-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const ShiftDutySetupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: zone } = useGetZoneQuery();
  const { data: weekDay } = useGetWeekDayQuery();

  // console.log("zones", zone?.items);

  const [getList] = useLazyGetTableListQuery();

  const [addShiftDuty, { isSuccess: addSuccess, isError: addError }] =
    useAddShiftDutySetupMutation();

  const [editShiftDuty, { isSuccess: editSuccess, isError: editError }] =
    useEditShiftDutySetupMutation();

  const { data: editData } = useGetShifyDutyByIdQuery(id, { skip: !id });

  // console.log("edit", editData?.data);

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  const handleSubmit = async (values) => {
    // console.log(values);

    let params = {
      ...values,
      weekDayId: Number(values.weekDayId),
      zoneId: Number(values.zoneId),
      startTime: values.startTime + ":00",
      endTime: values.endTime + ":00",
      swapRequestTimeout: values.swapRequestTimeout + ":00",
    };

    // console.log("params", params);

    id ? await editShiftDuty(params) : await addShiftDuty(params);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/RiderShiftDutySetup",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/shift-duty-setup");
    }
    if (addError) {
      toast.error(id ? "Error updating" : "Error creating");
    }
  }, [addSuccess, addError, editSuccess, , editError]);
  return (
    <div>
      <CommonLayout
        title="Shift Duty Setup Create"
        BtnComp={<LinkButton btnName="Back" to="/shift-duty-setup" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    id,
                    zoneId: editData?.data?.zoneId,
                    weekDayId: editData?.data?.weekDayId,
                    startTime: editData?.data?.startTime,
                    endTime: editData?.data?.endTime,
                    swapRequestTimeout: editData?.data?.swapRequestTimeout,
                    numberOfRider: editData?.data?.numberOfRider,
                  }
                : initialValues
            }
            validationSchema={id ? "" : setupDutySchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}
                <Row>
                  <Col md={6} sm={12} lg={4}>
                    <FormikSelectField
                      name="zoneId"
                      selectFieldProps={{
                        required: true,
                        label: "Zone",
                        options: zone?.items || [],
                      }}
                      value={values.isModule}
                      onChange={(item) => {
                        setFieldValue("zoneId", e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <FormikSelectField
                      name="weekDayId"
                      selectFieldProps={{
                        required: true,
                        label: "Week Day",
                        options: weekDay?.items || [],
                      }}
                      value={values.isModule}
                      onChange={(item) => {
                        setFieldValue("weekDayId", e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <FormikInputField
                      name="swapRequestTimeout"
                      inputFieldProps={{
                        label: "Swap Request Timeout",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <FormikInputField
                      name="startTime"
                      inputFieldProps={{
                        label: "Start Time",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <FormikInputField
                      name="endTime"
                      inputFieldProps={{
                        label: "End Time",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12} lg={4}>
                    <FormikInputField
                      name="numberOfRider"
                      inputFieldProps={{
                        label: "Number of Rider",
                        type: "number",
                      }}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end pt-2">
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};
