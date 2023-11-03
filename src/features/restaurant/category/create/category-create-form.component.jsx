import {
  FormikAutoComplete,
  FormikCheckBox,
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, Formik, useField } from "formik";
import { CloseButton, Col, Image, Modal, Row } from "react-bootstrap";
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetBranchQuery,
  useGetCategoryByIdQuery,
} from "../category-api";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { Api } from "@/constants";
import { useEffect } from "react";
import { CategorySchema, InitialValues } from "./form.config";
import { json } from "react-router-dom";
import { DisplayImage } from "./display-image";
import { toast } from "react-toastify";

export function CategoryForm({ show, selectedRow, onClose }) {

  const formData = new FormData();
  const { data: branches, isFetching: branchFetch } = useGetBranchQuery();
  const [
    createItem,
    { data: addedData, isSuccess: postSuccess, isLoading, isError },
  ] = useAddCategoryMutation();
  const {
    data: editData,
    isSuccess: getSucceed,
    isFetching,
  } = useGetCategoryByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });

  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditCategoryMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmission = (values) => {
    formData.append("Name", values?.Name);
    formData.append("Image", values?.Image);
    formData.append("IsShowInPanel", values?.IsShowInPanel);
    formData.append("BranchId", values?.BranchId);
    formData.append("PriorityNumber", values?.PriorityNumber);
    selectedRow?.id ? editItem({ formData, categoryId }) : createItem(formData);
  };

  useEffect(() => {
    if (addedData && postSuccess) {
      toast.success(addedData?.message);
      getList({
        url: Api.GetCategoryList,
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
        url: Api.GetCategoryList,
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
    <Modal
      show={show && !isFetching && !branchFetch}
      centered
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedRow?.id ? "Edit" : "Add"} Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={
            selectedRow?.id
              ? {
                  Name: editData?.data?.name,
                  Image: editData?.data?.image,
                  IsShowInPanel: editData?.data?.isShowInPanel,
                  BranchId: editData?.data?.branchId,
                  PriorityNumber: editData?.data?.priorityNumber,
                }
              : InitialValues
          }
          validationSchema={CategorySchema}
          onSubmit={(values) => {
            handleSubmission(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="Name"
                    inputFieldProps={{
                      label: "Name",
                      placeholder: "Enter Category Name",
                      required: true,
                    }}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikSelectField
                    name="BranchId"
                    selectFieldProps={{
                      label: "Branch",
                      required: true,
                      options: branches?.items,
                    }}
                  />
                </Col>

                <Col xs={12} className="mb-2">
                  <FormikImageField
                    name="Image"
                    imageFieldProps={{
                      label: "Image",
                      accept: ".jpg, .jpeg, .bmp, .png, .webp",
                      required: false,
                    }}
                  />
                </Col>
                {values.Image && (
                  <DisplayImage value={values?.Image} id={selectedRow?.id} />
                )}
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="PriorityNumber"
                    inputFieldProps={{
                      label: "Priority Number",
                      type: "number",
                    }}
                  />
                </Col>
                <Col xs={12} className="mb-2">
                  <FormikCheckBox
                    name="IsShowInPanel"
                    checkBoxProps={{ label: "Show in Panel" }}
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-2">
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
