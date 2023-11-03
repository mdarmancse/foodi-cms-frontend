import {
  FormikAutoComplete,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function UserForm() {
  const type = [
    { label: "Administrative User", value: "administrative_user" },
    { label: "Customer", value: "customer" },
  ];

  const { id } = useParams();
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{
              label: "Name",
              placeholder: "Enter name",
              required: true,
            }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="address"
            inputFieldProps={{
              label: "Address",
              placeholder: "Enter Address",
              required: true,
            }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="phoneNumber"
            inputFieldProps={{
              label: "Phone Number",
              placeholder: "Enter Phone Number",
              required: true,
            }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="email"
            inputFieldProps={{
              label: "Email",
              placeholder: "Enter Email",
              required: true,
              type: "email",
            }}
          />
        </Col>
        {!id && (
          <>
            <Col xs={12} className="mb-1">
              <FormikInputField
                name="password"
                inputFieldProps={{
                  label: "Password",
                  placeholder: "Enter Password",
                  required: true,
                  type: "password",
                }}
              />
            </Col>
            <Col xs={12} className="mb-1">
              <FormikInputField
                name="confirmPassword"
                inputFieldProps={{
                  label: "Confirm Password",
                  placeholder: "Confirm Password",
                  required: true,
                  type: "password",
                }}
              />
            </Col>

            <Col xs={12} className="mb-1">
              <FormikAutoComplete
                name="userType"
                autoCompleteProps={{
                  label: "User Type",
                  required: true,
                  placeholder: "Select type",
                  options: type,
                  isMulti: false,
                  isClearable: true,
                }}
              />
            </Col>
          </>
        )}
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">
          {id ? "Update" : "Submit"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
