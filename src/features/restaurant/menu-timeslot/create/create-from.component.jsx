import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Row, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { InitialValues, SchemaOfMenuItemTimeSlot } from "./form.config";
import {
  useGetBranchNamesQuery,
  useAddTimeslotMutation,
  useLazyGetTimeslotByIDQuery,
  useEditMenuTimeSlotMutation,
} from "../menu-timeslot-api";
import { useNavigate, useParams } from "react-router-dom";

const breadcrumbItems = [
  { name: "Menu Item TimeSlot", url: "/timeslot" },
  { name: "Menu Item Timeslot Create", url: "/timeslot/create" },
];

export const TimeslotForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editMenu }] = useLazyGetTimeslotByIDQuery();

  const { data: actionBranch } = useGetBranchNamesQuery();

  const [addMenu, { isSuccess: addSuccess, data: successmsg }] =
    useAddTimeslotMutation();
  const [edit, { isSuccess: editSuccess, data: updatemsg }] =
    useEditMenuTimeSlotMutation();

  const handleSubmit = (values) => {
    let params = {
      ...values,
    };

    id ? edit(params) : addMenu(params);
  };

  useEffect(() => {
    trigger(id);
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(
        id
          ? updatemsg?.message || "Updated Successfully"
          : successmsg?.message || "Created Successfully"
      );
      navigate("/timeslot");
    }
  }, [addSuccess, editSuccess]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/timeslot" btnName="Back" />}
        title={id ? "Update MenuItemSlot" : "Create MenuItemSlot"}
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
                      name: editMenu?.data?.name,
                      startTime: editMenu?.data?.startTime,
                      endTime: editMenu?.data?.endTime,
                      branchId: editMenu?.data?.branchId,
                    }
                  : InitialValues
              }
              validationSchema={SchemaOfMenuItemTimeSlot}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col lg={4} className="py-2">
                      <FormikInputField
                        name="name"
                        inputFieldProps={{
                          label: "Slot Name",
                        }}
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col lg={4} className="py-2">
                      <FormikSelectField
                        name="branchId"
                        selectFieldProps={{
                          required: true,
                          label: "Branch Name",
                          options: actionBranch?.items || [],
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="my-3 align-items-center">
                    <Col xs={12} sm={2} className="mb-1">
                      <h6>Time Schedule</h6>
                    </Col>
                    <Col xs={12} sm={4} className="mb-1">
                      <FormikInputField
                        name="startTime"
                        inputFieldProps={{
                          label: "Start Time",
                          placeholder: "Enter Start Time",
                          required: true,
                          type: "time",
                        }}
                        value={values.startTime}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col xs={12} sm={4} className="mb-1 pb-1">
                      <FormikInputField
                        name="endTime"
                        inputFieldProps={{
                          label: "End Time",
                          placeholder: "Enter End Time",
                          required: true,
                          type: "time",
                        }}
                        value={values.endTime}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center">
                    <FormikSubmitButton className="mt-4">
                      {id ? "Update" : "Submit"}
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
