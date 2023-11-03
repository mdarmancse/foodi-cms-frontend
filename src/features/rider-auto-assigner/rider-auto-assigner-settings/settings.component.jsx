import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Row, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { InitialValues, SchemaOfAutoServiceSettings } from "./form.config";
import {
  useGetAutoAssignerServiceSettingsQuery,
  useUpdateAssignerServiceSettingsMutation,
} from "./settings-api";

const breadcrumbItems = [
  { name: "Rider-Auto-Assigner-Service Settings", url: "/settings" },
];

export const RiderAutoAssinerServiceSettings = () => {
  const { data } = useGetAutoAssignerServiceSettingsQuery();
  const settings = data?.data;

  const [edit, { isSuccess: editSuccess, data: updatemsg }] =
    useUpdateAssignerServiceSettingsMutation();

  const handleSubmit = (values) => {
    edit(values);
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success(
        settings?.id ? updatemsg?.message || "Updated Successfully" : ""
      );
    }
  }, [editSuccess]);

  return (
    <div>
      <CommonLayout breadcrumbItems={breadcrumbItems} />
      <Container fluid className="pt-2">
        <Card>
          <Card.Body>
            <Formik
              enableReinitialize
              initialValues={settings?.id ? { ...settings } : InitialValues}
              validationSchema={SchemaOfAutoServiceSettings}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="orderForwardingInterval"
                        inputFieldProps={{
                          label: "Order Forwarding Interval",
                          type: "number",
                        }}
                        value={values.orderForwardingInterval}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="searchRadius"
                        inputFieldProps={{
                          label: "Search Radius",
                          type: "number",
                        }}
                        value={values.searchRadius}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="searchTimeout"
                        inputFieldProps={{
                          label: "Timeout",
                          type: "number",
                        }}
                        value={values.searchTimeout}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="riderLocationUpdateInterval"
                        inputFieldProps={{
                          label: "Rider Location Update Interval",
                          type: "number",
                        }}
                        value={values.riderLocationUpdateInterval}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center">
                    <FormikSubmitButton className="mt-4">
                      Submit
                    </FormikSubmitButton>
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
