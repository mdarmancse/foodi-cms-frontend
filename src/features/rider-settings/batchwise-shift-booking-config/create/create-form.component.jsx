import { Formik, Form } from "formik";
import { Modal, Button } from "react-bootstrap";
import { initialValues, batchwiseShiftSchema } from "./form.config";
import { FormikInputField, FormikSelectField } from "@/features/ui";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetBatchLevelQuery,
  useGetWeekDayQuery,
  useAddBatchwiseShiftMutation,
  useEditBatchwiseShiftMutation,
  useGetBatchwiseByIdQuery,
} from "../batchwise-shift-booking-api";

import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";

export const BatchwiseShiftBookingForm = ({
  isModal,
  onHide,
  id,
  setCreateModal,
}) => {
  const [addBatchwiseShift, { isSuccess: addSuccess, isError: addError }] =
    useAddBatchwiseShiftMutation();

  const [
    editBatchwiseShift,
    { data, isSuccess: editSuccess, isError: editError },
  ] = useEditBatchwiseShiftMutation();

  const { data: editData, isSuccess: editDataSuccess } =
    useGetBatchwiseByIdQuery(id, { skip: !id });

  const { data: batch } = useGetBatchLevelQuery();
  const { data: weekDay } = useGetWeekDayQuery();

  console.log("BATCH", batch);
  console.log("WEEKDAY", weekDay);

  const [getList] = useLazyGetTableListQuery();

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  console.log("edit", editData?.data);

  const handleSubmit = (values) => {
    console.log("values", values);
    console.log(values.startTime.length);
    setCreateModal(false);
    let params = {
      ...values,
      batchLevelId: Number(values.batchLevelId),
      weekDayId: Number(values.weekDayId),
      startTime:
        values.startTime.length == 8
          ? values.startTime
          : values.startTime + ":00",
      endTime:
        values.endTime.length == 8 ? values.endTime : values.endTime + ":00",
    };
    let req = id ? { id, params } : params;
    id ? editBatchwiseShift(req) : addBatchwiseShift(req);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/BatchWiseShiftBookingConfig",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (addError || editError) {
      toast.error(id ? "Error updating" : "Error creating");
    }
  }, [addSuccess, addError, editSuccess, editError]);

  return (
    <Modal show={isModal} centered>
      <Modal.Header>
        <Modal.Title>
          {id
            ? "Update Batchwise Shift Booking"
            : "Add Batchwise Shift Booking"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={
          id
            ? {
                batchLevelId: editData?.data?.batchLevelId,
                weekDayId: editData?.data?.weekDayId,
                startTime: editData?.data?.startTime,
                endTime: editData?.data?.endTime,
              }
            : initialValues
        }
        validationSchema={id ? "" : batchwiseShiftSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* <p>{JSON.stringify(values)}</p> */}
            <Modal.Body>
              <div className="vstack gap-3">
                <FormikSelectField
                  name="batchLevelId"
                  selectFieldProps={{
                    label: "Batch Level",
                    options: batch?.items || [],
                    required: true,
                  }}
                  value={values.batchLevelId}
                  onChange={handleChange}
                />
                <FormikSelectField
                  name="weekDayId"
                  selectFieldProps={{
                    label: "Week Day",
                    options: weekDay?.items || [],
                    required: true,
                  }}
                  value={values.weekDayId}
                  onChange={handleChange}
                />
                <FormikInputField
                  name="startTime"
                  inputFieldProps={{
                    label: "Start Time",
                    type: "time",
                  }}
                  value={values.startTime}
                  onChange={handleChange}
                />
                <FormikInputField
                  name="endTime"
                  inputFieldProps={{ label: "End Time", type: "time" }}
                  value={values.endTime}
                  onChange={handleChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex hstack gap-3 justify-content-end">
                <Button onClick={onHide}>Close</Button>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
