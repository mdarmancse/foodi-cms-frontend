import {
  FormikInputField,
  FormikSubmitButton,
  FormikSelectField,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { initialValues, menuSchema } from "./form.config";
import {
  useGetMenuActionsQuery,
  useGetMenuNamesQuery,
  useAddMenuMutation,
  useGetMenuByIdQuery,
  useEditMenuMutation,
} from "../admin-menu-api";
import { useNavigate, useParams } from "react-router-dom";

const breadcrumbItems = [{ name: "Menu" }, { name: "Create" }];

export const AdminMneuForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: editMenu } = useGetMenuByIdQuery(id, {
    skip: !id,
  });

  const {
    data: menuActions,
    isSuccess,
    isError,
    isLoading,
  } = useGetMenuActionsQuery();

  const { data: menuNames, isSuccess: menuSuccess } = useGetMenuNamesQuery();

  const actions = menuActions?.map((menu) => {
    return {
      label: menu.name,
      value: menu.id,
    };
  });

  const names = menuNames?.map((menu) => {
    return {
      label: menu.displayName,
      value: menu.id,
    };
  });

  const [addMenu, { isSuccess: addSuccess }] = useAddMenuMutation();
  const [edit, { isSuccess: editSuccess }] = useEditMenuMutation();
  const handleSubmit = async (values) => {
    // console.log("parent", values.isParent);
    let params = {
      ...values,
      parentId: values.parentId ? Number(values.parentId) : 0,
      menuActionId: values.menuActionId ? Number(values.menuActionId) : null,
    };

    id ? await edit(params) : await addMenu(params);
    console.log("params", params);
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      navigate("/admin-menu");
    }
  }, [addSuccess, editSuccess]);
  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/admin-menu" btnName="Back" />}
        title={id ? "Update Menu" : "Create Menu"}
      />
      <Container fluid className="pt-2">
        <Card>
          <Card.Body>
            <Formik
              enableReinitialize
              initialValues={
                id
                  ? {
                      id,
                      name: editMenu?.name,
                      displayName: editMenu?.displayName,
                      icon: editMenu?.icon,
                      url: editMenu?.url,
                      order: editMenu?.order,
                      isModule: editMenu?.isModule,
                      isParent: editMenu?.isParent,
                      parentId: editMenu?.parentId,
                      isVisible: editMenu?.isVisible,
                      levelAt: editMenu?.levelAt,
                      menuActionId: editMenu?.menuActionId,
                    }
                  : initialValues
              }
              validationSchema={menuSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  {/* {JSON.stringify(values)} */}
                  <Row>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="name"
                        inputFieldProps={{
                          label: "Name",
                        }}
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="displayName"
                        inputFieldProps={{
                          label: "Display Name",
                        }}
                        value={values.displayName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="icon"
                        inputFieldProps={{
                          label: "Icon",
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="url"
                        inputFieldProps={{
                          label: "URL",
                        }}
                        value={values.url}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="order"
                        inputFieldProps={{
                          label: "Order",
                          type: "number",
                        }}
                        value={values.order}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikSelectField
                        name="isModule"
                        selectFieldProps={{
                          required: true,
                          label: "Is Module",
                          options: [
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                          ],
                        }}
                        value={values.isModule}
                        onChange={(item) => {
                          setFieldValue("isModule", e.target.value);
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikSelectField
                        name="isParent"
                        selectFieldProps={{
                          //   required: true,

                          label: "Has Parent",
                          options: [
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                          ],
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      {/* Api call */}
                      <FormikSelectField
                        name="parentId"
                        selectFieldProps={{
                          //   required: true,
                          label: "Parent Name",
                          options: names,
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikSelectField
                        name="isVisible"
                        selectFieldProps={{
                          required: true,
                          label: "Show In Left Menu",
                          options: [
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                          ],
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="levelAt"
                        inputFieldProps={{
                          label: "Level At",
                          type: "number",
                        }}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      {/* Api call */}
                      <FormikSelectField
                        name="menuActionId"
                        selectFieldProps={{
                          //   required: true,
                          label: "Menu Action",
                          options: actions,
                        }}
                      />
                    </Col>
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
