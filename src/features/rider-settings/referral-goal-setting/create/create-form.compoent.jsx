import { Formik, Form } from "formik";
import { Modal, Button } from "react-bootstrap";
import { initialValues, referrerValidationSchema } from "./form.config";
import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { useAddReferrerGoalMutation } from "../referrer-goal-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetReferrerGoalByIdQuery,
  useEditReferrerGoalMutation,
} from "../referrer-goal-api";

import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";

export const ReferrerGoalForm = ({ isModal, onHide, id }) => {
  const [addReferrerGoal, { isSuccess: addSuccess, isError: addError }] =
    useAddReferrerGoalMutation();

  const [
    editReferrerGoal,
    { data, isSuccess: editSuccess, isError: editError },
  ] = useEditReferrerGoalMutation();

  const { data: editData, isSuccess: editDataSuccess } =
    useGetReferrerGoalByIdQuery(id, { skip: !id });

  const [getList] = useLazyGetTableListQuery();

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  // console.log("edit", editData?.data);

  const handleSubmit = async (values) => {
    id ? await editReferrerGoal(values) : await addReferrerGoal(values);
    onHide();
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/ReferralGoalSetting",
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
          {id ? "Update Referrer Goal Settings" : "Add Referrer Goal Settings"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={
          id
            ? {
                id,
                targetDay: editData?.data?.targetDay,
                targetOrder: editData?.data?.targetOrder,
                referredRiderBonusAmount:
                  editData?.data?.referredRiderBonusAmount,
                newRiderBonusAmount: editData?.data?.newRiderBonusAmount,
              }
            : initialValues
        }
        validationSchema={id ? "" : referrerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* <p>{JSON.stringify(values)}</p> */}
            <Modal.Body>
              <div className="vstack gap-3">
                <FormikInputField
                  name="targetDay"
                  inputFieldProps={{ label: "Target Day", type: "number" }}
                  value={values.targetDay}
                  onChange={handleChange}
                />
                <FormikInputField
                  name="targetOrder"
                  inputFieldProps={{ label: "Target Order", type: "number" }}
                  value={values.targetOrder}
                  onChange={handleChange}
                />
                <FormikInputField
                  name="referredRiderBonusAmount"
                  inputFieldProps={{
                    label: "Referred Rider Bonus",
                    type: "number",
                  }}
                  value={values.referredRiderBonusAmount}
                  onChange={handleChange}
                />
                <FormikInputField
                  name="newRiderBonusAmount"
                  inputFieldProps={{ label: "New Rider Bonus", type: "number" }}
                  value={values.newRiderBonusAmount}
                  onChange={handleChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex hstack gap-1 justify-content-end">
                <Button variant="danger" onClick={onHide}>
                  Close
                </Button>
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
