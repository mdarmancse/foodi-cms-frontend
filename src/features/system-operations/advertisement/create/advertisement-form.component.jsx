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
  useCreateNewAdvertisementMutation,
  useLazyGetIdAvertisementQuery,
  useUpdateAdvertisementByIdMutation,
} from "../advertisement-apislice";
import { useNavigate, useParams } from "react-router-dom";
import { DisplayImage } from "@/features/ui/display-image";

const breadcrumbItems = [
  { name: "Advertisement", url: "/advertisement" },
  {
    name: "Advertisement Create",
    url: "/advertisement/create",
  },
];

export const AdvertisementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editAdvertimentList }] =
    useLazyGetIdAvertisementQuery();

  const [
    createAdvertisementList,
    { isSuccess: successResult, data: successmsg },
  ] = useCreateNewAdvertisementMutation();
  const [updateAdvertisementList, { isSuccess: resultId, data: updatemsg }] =
    useUpdateAdvertisementByIdMutation();

  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("Title", values.title);
    formData.append("Description", values.description);
    formData.append("image", values.image);

    let params = id ? { id: values.id, formData } : formData;
    id ? updateAdvertisementList(params) : createAdvertisementList(params);
  };

  useEffect(() => {
    trigger(id);
  }, [id]);

  useEffect(() => {
    if (successResult || resultId) {
      toast.success(
        id
          ? updatemsg?.message || "Updated Successfully"
          : successmsg?.message || "Created Successfully"
      );
      navigate("/advertisement");
    }
  }, [successResult, resultId]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/advertisement" btnName="Back" />}
        title={id ? "Update Advertisement List" : "Create Advertisement List"}
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
                      title: editAdvertimentList?.data?.title,
                      description: editAdvertimentList?.data?.description,
                      image: editAdvertimentList?.data?.image,
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
                        name="title"
                        inputFieldProps={{
                          label: "Title",
                        }}
                        value={values.title}
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
