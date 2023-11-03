import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { PermissionCreateSchema, initialValue } from "./form.config";
import Select from "react-select";
import {
  useGetAllRolesQuery,
  useGetMenusQuery,
  useAddPermissionMutation,
  useGetByIdQuery,
  useEditPermissionMutation,
} from "../permission-api";
import { MenuPermission } from "./menu-permission";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { LinkButton, FormikSubmitButton } from "@/features/ui";

const breadcrumbItems = [{ name: "Role Menu Permission" }, { name: "Create" }];

export const PermissionCreate = () => {
  const navigate = useNavigate();
  let parentMenus = [];
  let actionMenus = [];
  let allMenus = [];
  const { id } = useParams();
  const [selected, setSelected] = useState([]);

  const { data: allRoles, isSuccess, isError } = useGetAllRolesQuery();

  // console.log("allRoles", allRoles?.items);

  const {
    data: editMenuPermission,
    isLoading: editLoading,
    isSuccess: editMenuSuccess,
  } = useGetByIdQuery(id, {
    skip: !id,
  });

  // console.log("edit", editMenuPermission);
  const {
    data: allmenus,
    isSuccess: menuSuccess,
    isError: menuError,
  } = useGetMenusQuery();

  const [addPermission, { isSuccess: addSuccess }] = useAddPermissionMutation();

  const [editPermission, { isSuccess: editSuccess }] =
    useEditPermissionMutation();

  if (isSuccess) {
    allMenus = allmenus?.data;
  }
  if (editMenuSuccess) {
    parentMenus = editMenuPermission?.parentMenus;
    actionMenus = editMenuPermission?.actionMenus;
  }

  const converted = allRoles?.items?.filter((role) => {
    return editMenuPermission?.roles?.includes(role.id);
  });

  // console.log("Converted", converted);

  const handleSubmit = async (values) => {
    let roles = values?.roles?.map((role) => role.value);
    let params = id
      ? {
          batchId: values?.batchId,
          roles: values?.roles?.map((role) => role.value),
          menus: values?.menus,
        }
      : {
          roles,
          menus: selected,
        };

    id ? await editPermission(params) : await addPermission(params);

    // console.log("params", params);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      navigate("/permission");
    }
  }, [addSuccess, editSuccess]);

  return (
    <div className="pt-4">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/permission" btnName="Back" />}
        title={
          id ? "Update Role Menu Permission" : "Create Role Menu Permission"
        }
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    batchId: id,
                    roles: converted?.map((role) => {
                      return {
                        value: role.id,
                        label: role.name,
                      };
                    }),
                    menus: editMenuPermission?.parentMenus.concat(
                      editMenuPermission?.actionMenus
                    ),
                  }
                : initialValue
            }
            validationSchema={id ? "" : PermissionCreateSchema}
            onSubmit={handleSubmit}
          >
            {({ values, error, setFieldValue }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}

                <div className="vstack gap-3">
                  <div>
                    <label>Roles</label>
                    <Select
                      options={allRoles?.items}
                      value={values.roles}
                      onChange={(selected) => {
                        setFieldValue("roles", selected);
                      }}
                      autoFocus={true}
                      isMulti
                    />
                  </div>
                  <div>
                    <MenuPermission
                      onChange={(seletedItems) => {
                        setFieldValue("menus", seletedItems);
                      }}
                      values={values.menus}
                      selected={selected}
                      parentMenus={parentMenus}
                      actionMenus={actionMenus}
                      setSelected={setSelected}
                      userMenu={allMenus}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {/* <Button variant="primary" type="submit">
                    Submit
                  </Button> */}
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

export default PermissionCreate;
