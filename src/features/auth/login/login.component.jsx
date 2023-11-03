import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "..";
import { useLoginMutation } from "./login-api";
import { LoginHeader } from "./login-header.component";
import { InitialValues, LoginValidationSchema } from "./login.config";

export const Login = () => {
  const navigate = useNavigate();
  const [login, { isError, isLoading, data, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && isSuccess) {
      const user = data?.data?.user;
      const permission = {};
      const menu = data?.data?.menu || [];
      const accessToken = data?.data?.token || "";
      const refreshToken = data?.data?.refreshToken || "";

      dispatch(
        saveUserData({
          user,
          permission,
          menu,
          accessToken,
          refreshToken,
        })
      );
    }
  }, [data]);

  const handleSubmit = async (values, helpers) => {
    try {
      await login(values);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col>
          <Card className="shadow" style={{ minWidth: 400 }}>
            <LoginHeader />

            {isError && (
              <div className="py-3 text-center text-danger  fw-bold text-danger bg-opacity-10 bg-danger">
                <BsInfoCircle />
                <span className="ps-2 fs-xs">Credential Doesn't Match.</span>
              </div>
            )}

            <Card.Body className="pt-4 ">
              <Formik
                initialValues={InitialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Stack gap={3} className="px-2">
                    <FormikInputField
                      name="userName"
                      inputFieldProps={{
                        label: "Email",
                        placeholder: "Email",
                      }}
                    />
                    <FormikInputField
                      name="password"
                      inputFieldProps={{
                        label: "Password",
                        type: "password",
                        placeholder: "Password",
                      }}
                    />

                    <div className="mt-4  mb-2 w-100 d-flex justify-content-center">
                      <FormikSubmitButton className="w-100">
                        Submit
                      </FormikSubmitButton>
                    </div>
                  </Stack>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
