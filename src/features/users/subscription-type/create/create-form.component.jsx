import {
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
  LinkButton,
} from "@/features/ui";
import { FieldArray, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { InitialValues, SubscriptionTypeSchema } from "./form.config";
import {
  useAddSubscriptionTypesMutation,
  useGetSubscriptionTypeByIdQuery,
  useEditSubscribtionTypeMutation,
  useDeleteSubscriptionTyeMutation,
} from "../subscription-type-api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function SubscriptionTypeCreate() {
  const breadcrumbItems = [
    { name: "Subscription Type" },
    { name: "Subscription type add" },
  ];
  const params = useParams();
  const navigate = useNavigate();
  const [addSubscriptionType, { isSuccess: subscriptionTypeAdded }] =
    useAddSubscriptionTypesMutation();
  const [editSubscriptionType, { isSuccess: editSucces }] =
    useEditSubscribtionTypeMutation();
  const { data: subscriptionTypeData, isSuccess: idGetSuccess } =
    useGetSubscriptionTypeByIdQuery(params?.id, { skip: !params?.id });

  useEffect(() => {
    if (subscriptionTypeAdded) {
      toast.success("Subscription type added");
      navigate("/subscription-type")
      
    }
    if(editSucces) {
      toast.success("Subscription type edited");
      navigate("/subscription-type")
    }
  }, [subscriptionTypeAdded,editSucces]);

  const bckBtn = <LinkButton to="/subscription-type" btnName="Back" />;
  return (
    <CommonLayout
      title="Add Subscription Type"
      breadcrumbItems={breadcrumbItems}
      BtnComp={bckBtn}
    >
      <div className="col-10 mx-auto">
        <Formik
          enableReinitialize
          initialValues={
            params?.id
              ? {
                  name: subscriptionTypeData?.data?.name,
                  fee: subscriptionTypeData?.data?.fee,
                  isPremium: subscriptionTypeData?.data?.isPremium,
                  detail: subscriptionTypeData?.data?.detail,
                  expireIn: subscriptionTypeData?.data?.expireIn,
                }
              : InitialValues
          }
          validationSchema={SubscriptionTypeSchema}
          onSubmit={(values) => {
            console.log(values);
            params?.id
              ? editSubscriptionType({ ...values, id: params?.id })
              : addSubscriptionType(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="name"
                    inputFieldProps={{
                      label: "Subscription Type Name",
                      required: true,
                      type: "text",
                    }}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="fee"
                    inputFieldProps={{
                      label: "Subscription fee",
                      type: "text",
                      required: true,
                    }}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="expireIn"
                    inputFieldProps={{
                      label: "Subscribe for in days",
                      type: "number",
                      required: true,
                    }}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikCheckBox
                    name="isPremium"
                    checkBoxProps={{
                      label: "Premium",
                    }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikTextAria
                    name="detail"
                    textAreaProps={{ label: "Detail" }}
                  />
                </Col>

                {/* <FieldArray name="details">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.details.length > 0 &&
                        values.details.map((detail, index) => (
                          <Row key={index} className="mb-1">
                            <Col xs={9}>
                              <FormikTextAria
                                name={`details.${index}.detail`}
                                textAreaProps={{
                                  required: true,
                                }}
                              />
                            </Col>

                            <Col xs={3} className="mt-3">
                              {values.details.length > 1 && (
                                <Button
                                  size="sm"
                                  className="me-2"
                                  variant="danger"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </Button>
                              )}
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => push(detailsTemplate)}
                              >
                                +
                              </Button>
                            </Col>
                          </Row>
                        ))}
                    </div>
                  )}
                </FieldArray> */}
              </Row>

              <div className="d-flex justify-content-end">
                <FormikSubmitButton className="mt-2">Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CommonLayout>
  );
}
export default SubscriptionTypeCreate;
