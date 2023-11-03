import { Form, Formik } from "formik";
import { Row, Button, Card, Col } from "react-bootstrap";
import { initialValues, systemOptionSchema } from "./form.config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { CommonLayout } from "../../../layouts";
import {
  FormikInputField,
  LinkButton,
  FormikSubmitButton,
  FormikCheckBox,
} from "../../../ui";
import { OptionSettings } from "./option-settings";
import { SystemOptionDetails } from "./system-option-details";
import {
  useAddSystemOptionMutation,
  useEditSystemOptionMutation,
  useLazyGetSystemOptionByIdQuery,
} from "../system-on-off-option-api";
import { useGetAllZonesQuery } from "../../../api/common-api-hooks";
import moment from "moment";
import { TfiCheck } from "react-icons/tfi";

export const SystemOnOffOptionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteZones, setDeleteZones] = useState([]);

  const { data: zones } = useGetAllZonesQuery();
  const [addSytemOption, { isSuccess: addSuccess, isError: addError }] =
    useAddSystemOptionMutation();

  const [editSytemOption, { isSuccess: editSuccess, isError: editError }] =
    useEditSystemOptionMutation();

  const [trigger, { data: editData }] = useLazyGetSystemOptionByIdQuery();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  //   console.log("zones", zones);

  const handleSubmit = async (values) => {
    // console.log("submit", values);
    let params = id
      ? {
          ...values,
          systemOptionDetails:
            values?.systemOptionDetails?.length !==
            editData?.data?.systemOptionDetails?.length
              ? values?.systemOptionDetails?.map((item, index) => {
                  let newItem = {};
                  if (index == editData?.data?.systemOptionDetails?.length) {
                    newItem = {
                      id: 0,
                      zoneId: Number(item.zoneId),
                      systemOptionId: 0,
                      createdAt: null,
                      updatedAt: null,
                    };
                  }
                  return { ...item, ...newItem };
                })
              : values?.systemOptionDetails,
          deletedSystemOptionDetailIds: deleteZones[0] !== 0 ? deleteZones : "",
        }
      : values;
    console.log(params);
    id ? editSytemOption(params) : addSytemOption(params);
  };

  // console.log("edit", editData?.data);

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success("Created Successfully");
      getList({
        url: "/system-operations/api/SystemOnOffOption",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/system-on-off-option");
    }

    if (addError || editError) {
      toast.error("Error creating");
    }
  }, [addSuccess, addError, editSuccess, editError]);

  // console.log("deletedZones", deleteZones);

  return (
    <div>
      <CommonLayout
        title={"System On Off Option Create"}
        BtnComp={<LinkButton btnName="Back" to="/system-on-off-option" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    id,
                    name: editData?.data?.name,
                    riderAssignRadius: editData?.data?.riderAssignRadius,
                    isAutoRouting: editData?.data?.isAutoRouting,
                    maxOrderValue: editData?.data?.maxOrderValue,
                    minOrderValue: editData?.data?.minOrderValue,
                    contactUsEmail: editData?.data?.contactUsEmail,
                    orderVerificationMaxAmount:
                      editData?.data?.orderVerificationMaxAmount,
                    iterationInterval: editData?.data?.iterationInterval,
                    riderMaxIteration: editData?.data?.riderMaxIteration,
                    isSystemOff: editData?.data?.isSystemOff,
                    isFacebookAuthenticated:
                      editData?.data?.isFacebookAuthenticated,
                    isGoogleAuthenticated:
                      editData?.data?.isGoogleAuthenticated,
                    isPhoneNumberAuthenticated:
                      editData?.data?.isPhoneNumberAuthenticated,
                    systemOnOffReasonId: editData?.data?.systemOnOffReasonId,
                    systemOptionDetails: editData?.data?.systemOptionDetails,
                  }
                : initialValues
            }
            validationSchema={systemOptionSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}
                <Row className="d-flex justify-content-between">
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="name"
                        inputFieldProps={{
                          label: "Name",
                        }}
                      />
                      {id &&
                        values?.name &&
                        values?.name !== editData?.data?.name && (
                          <Col className="mx-2 my-4">
                            <Button type="submit">
                              <TfiCheck />
                            </Button>
                          </Col>
                        )}
                    </Col>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="riderAssignRadius"
                        inputFieldProps={{
                          label: "Assign Rider Radius",
                          type: "number",
                        }}
                      />
                      {id &&
                        values?.riderAssignRadius &&
                        values?.riderAssignRadius !==
                          editData?.data?.riderAssignRadius && (
                          <Col className="mx-2 my-4">
                            <Button type="submit">
                              <TfiCheck />
                            </Button>
                          </Col>
                        )}
                    </Col>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikCheckBox
                        name="isAutoRouting"
                        checkBoxProps={{ label: "Auto Routing" }}
                      />
                      {id && !values?.isAutoRouting && (
                        <Col className="mx-2 my-4">
                          <Button type="submit">
                            <TfiCheck />
                          </Button>
                        </Col>
                      )}
                    </Col>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="maxOrderValue"
                        inputFieldProps={{
                          label: "Max Order Value",
                          type: "number",
                        }}
                      />
                      {id &&
                        values?.maxOrderValue &&
                        values?.maxOrderValue !==
                          editData?.data?.maxOrderValue && (
                          <Col className="mx-2 my-4">
                            <Button type="submit">
                              <TfiCheck />
                            </Button>
                          </Col>
                        )}
                    </Col>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="minOrderValue"
                        inputFieldProps={{
                          label: "Min Order Value",
                          type: "number",
                        }}
                      />
                      {id &&
                        values?.minOrderValue &&
                        values?.minOrderValue !==
                          editData?.data?.minOrderValue && (
                          <Col className="mx-2 my-4">
                            <Button type="submit">
                              <TfiCheck />
                            </Button>
                          </Col>
                        )}
                    </Col>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="contactUsEmail"
                        inputFieldProps={{
                          label: "Contact Us Email",
                        }}
                      />
                    </Col>
                    {id &&
                      values?.contactUsEmail &&
                      values?.contactUsEmail !==
                        editData?.data?.contactUsEmail && (
                        <Col className="mx-2 my-4">
                          <Button type="submit">
                            <TfiCheck />
                          </Button>
                        </Col>
                      )}
                  </div>
                  <div className="d-flex justify-content-around">
                    <Col md={id ? 11 : 12}>
                      <FormikInputField
                        name="orderVerificationMaxAmount"
                        inputFieldProps={{
                          label: "Order Verification Max Amount",
                          type: "number",
                        }}
                      />
                      {id &&
                        values?.orderVerificationMaxAmount &&
                        values?.orderVerificationMaxAmount !==
                          editData?.data?.orderVerificationMaxAmount && (
                          <Col className="mx-2 my-4">
                            <Button type="submit">
                              <TfiCheck />
                            </Button>
                          </Col>
                        )}
                    </Col>
                  </div>

                  <OptionSettings values={values} id={id} editData={editData} />
                  <SystemOptionDetails
                    values={values}
                    editData={editData}
                    zoneOptions={zones?.items}
                    id={id}
                    setDeleteZones={setDeleteZones}
                  />
                </Row>
                <div className="d-flex justify-content-end mt-2">
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
