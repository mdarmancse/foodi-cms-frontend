import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import {
  useAddRewardLabelsMutation,
  useEditRewardLabelMutation,
  useGetRewardLabelByIdQuery,
} from "../reward-label-api";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { useEffect } from "react";
import { InitialValues, RewardLabelSchema } from "./form.config";

export function RewardLabelForm({ show, onClose, selectedRow }) {
  const [
    createItem,
    { data: addedData, isSuccess: postSuccess, isLoading, isError },
  ] = useAddRewardLabelsMutation();
  const {
    data: editData,
    isSuccess: getSucceed,
    isFetching,
  } = useGetRewardLabelByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });

  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditRewardLabelMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (addedData && postSuccess) {
      toast.success(addedData?.message);
      getList({
        url: Api.GetRewardLevelList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [addedData]);

  useEffect(() => {
    if (editResponse && editSuccess) {
      toast.success(editResponse?.message);
      getList({
        url: Api.GetRewardLevelList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [editResponse]);
  return (
    <>
      {isFetching == true ? (
        <div style={{marginBottom:"50%"}} className="d-flex align-items-center text-center justify-content-center">
          <Spinner animation="border" variant="warning" className="text-center"/>
        </div>
      ) : (
        <Modal show={show && !isFetching} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{show?._id ? "Edit" : "Add"} Reward Label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              enableReinitialize
              initialValues={
                selectedRow?.id
                  ? {
                      name: editData?.data?.name,
                      value: editData?.data?.value,
                      level: editData?.data?.level,
                      isActive: editData?.data?.isActive,
                    }
                  : InitialValues
              }
              validationSchema={RewardLabelSchema}
              onSubmit={(values) => {
                selectedRow?.id
                  ? editItem({ ...values, id: selectedRow?.id })
                  : createItem(values);
              }}
            >
              {({}) => (
                <Form>
                  <Row>
                    <Col xs={12} className="mb-1">
                      <FormikInputField
                        name="name"
                        inputFieldProps={{
                          label: "Name",
                          required: true,
                          type: "text",
                        }}
                      />
                    </Col>
                    <Col xs={12} className="mb-1">
                      <FormikInputField
                        name="value"
                        inputFieldProps={{
                          label: "Upper Limit Point",
                          required: true,
                        }}
                      />
                    </Col>
                    <Col xs={12} className="mb-1">
                      <FormikInputField
                        name="level"
                        inputFieldProps={{ label: "Level", type: "number" }}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <FormikSubmitButton className="mt-2">
                      Submit
                    </FormikSubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
