import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RoleUserCreateSchema, initialValue } from "./form.config";
import {
  FormikAutoComplete,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import {
  useAddRolesUserMutation,
  useGetAllRolesQuery,
  useGetAllUsersQuery,
  useGetRoleUserByBatchIdQuery,
  useEditRoleUserMutation,
} from "../roles-user-api";
import { toast } from "react-toastify";

export const RoleUserCreate = ({
  isOpenModal,
  onHide,
  batchId,
  setIsModalOpen,
}) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleids, setRoleids] = useState([]);
  const [userids, setUserids] = useState([]);
  const [loader, setLoader] = useState(true);
  const [addRoleUser, { isSuccess : createSuccess }] = useAddRolesUserMutation();
  const [editRoleUser, { isSuccess: editSuccess }] = useEditRoleUserMutation();
  const { data: allroles } = useGetAllRolesQuery();
  const { data: allusers } = useGetAllUsersQuery();
  const { data: editData } = useGetRoleUserByBatchIdQuery(batchId, { skip: !batchId, });

  useEffect(() => {
    if (editData?.roleList) {
      var newRoles = [];
      editData.roleList.map((role) => {
        var newRole = {
          label: role?.name,
          value: role?.id,
        };
        role?.isSelected == true ? newRoles.push(newRole) : "";
      });
      setRoleids(newRoles);
    }
    if (editData?.userList) {
      var newUsers = [];
      editData.userList?.map((user) => {
        var newUser = {
          label: user?.name,
          value: user?.id,
        };
        user?.isSelected == true ? newUsers.push(newUser) : "";
      });
      setUserids(newUsers);
    }
    setLoader(false);
  }, [editData]);

  useEffect(() => {
    if (allroles) {
      var newRoles = [];
      allroles.map((role) => {
        var newRole = {
          label: role?.name,
          value: role?.id,
        };
        newRoles.push(newRole);
      });
      setRoles(newRoles);
    }
    if (allusers) {
      var newUsers = [];
      allusers?.data?.map((user) => {
        var newUser = {
          label: user?.name,
          value: user?.id,
        };
        newUsers.push(newUser);
      });
      setUsers(newUsers);
    }
    setLoader(false);
  }, [allroles, allusers]);

  useEffect(() => {
    if (createSuccess) {
      toast.success("Created Succcesfully");
      onHide();
    }
    if (editSuccess) {
      toast.success("Edit successfully");
      onHide();
    }
  }, [createSuccess, editSuccess]);

  useEffect(() => {
    if (batchId != "") {
      setLoader(true);
    }
  }, [batchId]);
  console.log(users,roles);
  console.log("init",initialValue);
  console.log(localStorage);

  return (
    <div>
      <Modal show={isOpenModal && !loader} centered>
        <Modal.Header>{batchId ? "Edit" : "Add"} Role User</Modal.Header>
        <Formik
          enableReinitialize
          initialValues={
            batchId
              ? { batchId: batchId, roleIds: roleids, userIds: userids }
              : initialValue
          }
          validationSchema={RoleUserCreateSchema}
          onSubmit={(value) => {
            const resultRole = value?.roleIds.map((option) => option.value);
            const resultUser = value?.userIds.map((option) => option.value);
            batchId
              ? editRoleUser({
                  batchId: batchId,
                  roleids: resultRole,
                  userids: resultUser,
                  updatedBy: 1,
                })
              : addRoleUser({
                  roleids: resultRole,
                  userids: resultUser,
                  createdBy: 1,
                });
          }}
        >
          {({ values, error }) => (
            <Form>
              <Modal.Body>
                <div className="vstack gap-3">
                  <div>
                    <FormikAutoComplete
                      name="roleIds"
                      autoCompleteProps={{
                        label: "Roles",
                        options: roles,
                        isMulti: true,
                      }}
                    />
                  </div>
                  <div>
                    <FormikAutoComplete
                      name="userIds"
                      autoCompleteProps={{
                        label: "Users",
                        options: users,
                        isMulti: true,
                      }}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="hstack gap-3 justify-content-end">
                  <Button onClick={() => { onHide()}} >Close</Button>
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

export default RoleUserCreate;
