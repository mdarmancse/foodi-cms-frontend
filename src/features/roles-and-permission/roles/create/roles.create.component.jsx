import { FormikInputField, FormikSubmitButton, useLazyGetTableListQuery } from "@/features/ui";
import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { RoleCreateSchema, initialValue } from "./form.config";
import {
  useAddRoleMutation,
  useGetRoleByIdQuery,
  useEditRoleMutation,
} from "../roles-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Api } from "@/constants";

export const RolesCreate = ({ show, selectedRow,onClose }) => {
  const [addRole, {data : postData, isSuccess : postSuccess, isError, isLoading }] = useAddRoleMutation();
  const [editRole, {data: putData, isSuccess: editSuccess }] = useEditRoleMutation();
  const { data: editData ,isFetching} = useGetRoleByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });
  const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state.commonTable);
  const [getList] = useLazyGetTableListQuery(); 

  function handleSubmit(values){
    selectedRow?.id ? editRole(values) : addRole(values)
  }

  useEffect(() => {
    if(postSuccess && postData){
      toast.success(postData?.message);
      getList({
        url : Api.GetRolesList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive
        }
      });
      onClose();
    }
  },[postData])

  useEffect(() => {
    if(putData && editSuccess){
      toast.success(putData?.message);
      getList({
        url : Api.GetRolesList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive
        }
      });
      onClose();
    }
  },[putData])

  return (
    <div>
      <Modal show={show && !isFetching} centered>
        <Modal.Header>
          <Modal.Title>{selectedRow?.id ? "Update Roles" : "Add Roles"}</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={selectedRow?.id ? { id: selectedRow?.id,...editData } : initialValue}
          validationSchema={selectedRow?.id ? "" : RoleCreateSchema}
          onSubmit={(values) => {handleSubmit(values)}}
        >
          {({ values, handleChange }) => (
            <Form>
              <Modal.Body>
                <div className="vstack gap-3">
                  <div>
                    <FormikInputField
                      name="name"
                      inputFieldProps={{ label: "Role Name", type: "text" }}
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex hstack gap-3 justify-content-end">
                  <Button onClick={onClose}>Close</Button>
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default RolesCreate;
