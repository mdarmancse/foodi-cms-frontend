import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form } from "formik";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { UserImage } from "./user-image.component";

export function DummyUserForm() {
  return (
    <Form>
      <Card className="px-2 py-3 ">
        <Row>
          <Col xs={12} md={6}>
            <Stack gap={2}>
              <FormikInputField
                name="firstName"
                inputFieldProps={{
                  label: "First Name",
                  required: true,
                }}
                required={true}
              />
              <FormikInputField
                name="lastName"
                inputFieldProps={{
                  required: true,
                  label: "Last Name",
                }}
              />

              <UserImage />

              <FormikInputField
                name="presentAddress"
                inputFieldProps={{
                  required: true,
                  label: "Present Address",
                }}
              />

              <FormikInputField
                name="permanentAddress"
                inputFieldProps={{
                  required: true,
                  label: "Permanent Address",
                }}
              />
            </Stack>
          </Col>
          <Col>
            <Stack gap={2}>
              <FormikInputField
                name="mobileNumber"
                inputFieldProps={{
                  required: true,
                  label: "Mobile Number",
                }}
              />

              <FormikInputField
                name="email"
                inputFieldProps={{
                  required: true,
                  label: "Email",
                }}
              />

              <FormikSelectField
                name="role"
                selectFieldProps={{
                  required: true,
                  label: "Role",
                  options: [
                    { label: "Super Admin", value: "1" },
                    { label: "Admin", value: "2" },
                    { label: "user", value: "3" },
                  ],
                }}
              />

              <FormikInputField
                name="password"
                inputFieldProps={{
                  label: "Password",
                  required: true,
                  type: "password",
                }}
              />

              <FormikInputField
                name="confirmPassword"
                inputFieldProps={{
                  label: "Confirm Password",
                  required: true,
                  type: "password",
                }}
              />
            </Stack>
          </Col>
        </Row>
      </Card>

      <div className="d-flex justify-content-center">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
