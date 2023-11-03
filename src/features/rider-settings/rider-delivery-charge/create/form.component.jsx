import { FormikInputField, FormikSelectField, FormikSubmitButton } from "@/features/ui"
import { Form } from "formik"
import { Col, Row } from "react-bootstrap"

export const CreateForm = ({riderTypeOptions, vehicleTypeOptions,selectedRow}) => {
  console.log(riderTypeOptions,vehicleTypeOptions);
    return (
        <Form>
              <Row>
                <Col xs="col-10" className="mb-1">
                  <FormikSelectField
                    name="riderTypeId"
                    selectFieldProps={{
                      label: "Rider Type",
                      options: riderTypeOptions,
                    }}
                  />
                </Col>
                <Col xs="col-10" className="mb-1">
                  <FormikSelectField
                    name="vehicleTypeId"
                    selectFieldProps={{
                      label: "Vehicle Type",
                      options: vehicleTypeOptions,
                    }}
                  />
                </Col>
                <Col xs="col-10" className="mb-1">
                  <FormikInputField
                    name="deliveryChargeAmount"
                    inputFieldProps={{
                      label: "Delivery charge",
                      type: "number",
                    }}
                  />
                </Col>
                <div className="d-flex justify-content-end">
                  <FormikSubmitButton>
                    {selectedRow?.id ? "Update" : "Submit"}
                  </FormikSubmitButton>
                </div>
              </Row>
            </Form>
    )
}