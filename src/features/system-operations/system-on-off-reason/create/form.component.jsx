import {
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Row, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { InitialValues, SchemaOfSystemOnOffReason } from "./form.config";
import {
  useCreateReasonOfSystemOnOffMutation,
  useLazyGetSystemOnOffReasonIdQuery,
  useUpdateReasonOfSystemOnOffMutation,
} from "../system-on-off-api";
import { useNavigate, useParams } from "react-router-dom";
import { DisplayImage } from "@/features/ui/display-image";

const breadcrumbItems = [
  { name: "System On & Off Reason", url: "/system-on-off-reason" },
  {
    name: "System On & Off Reason Create",
    url: "/system-on-off-reason/create",
  },
];

export const RebootForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editRebootSystem }] =
    useLazyGetSystemOnOffReasonIdQuery();

  const [createRebootSystem, { isSuccess: addSuccess, data: successmsg }] =
    useCreateReasonOfSystemOnOffMutation();
  const [updateRebootSystem, { isSuccess: editSuccess, data: updatemsg }] =
    useUpdateReasonOfSystemOnOffMutation();

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("image", values.image);

    let params = id ? { id: values.id, formData } : formData;
    id ? updateRebootSystem(params) : createRebootSystem(params);
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
      navigate("/system-on-off-reason");
    }
  }, [addSuccess, editSuccess]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/system-on-off-reason" btnName="Back" />}
        title={
          id ? "Update System On & Off Reason" : "Create System On & Off Reason"
        }
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
                      name: editRebootSystem?.data?.name,
                      description: editRebootSystem?.data?.description,
                      image: editRebootSystem?.data?.image,
                    }
                  : InitialValues
              }
              validationSchema={SchemaOfSystemOnOffReason}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Row xs={12} className="mb-1 justify-content-center">
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
                      <FormikTextAria
                        name="description"
                        textAreaProps={{
                          label: lang("description"),
                          placeholder: lang("description"),
                          required: true,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col xs={8} className="mb-2">
                      <FormikImageField
                        name="image"
                        imageFieldProps={{
                          label: "Image",
                          accept: ".jpg, .jpeg, .bmp, .png, .webp",
                        }}
                      />
                    </Col>
                    {values?.image && (
                      <DisplayImage value={values?.image} id={id} />
                    )}
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
