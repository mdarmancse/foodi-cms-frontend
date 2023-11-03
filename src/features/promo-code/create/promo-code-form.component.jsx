import {
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { Form, useField } from "formik";
import { Col, Row } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { Deliveries } from "./deliveries.component";
import { Discounts } from "./discounts.component";
import { GradualInfo } from "./gradual-info.component";
import { PromoCodeLimits } from "./limits.component";
import { PromoCodeTimes } from "./promo-code-times.component";
import { PromoCodeTypes } from "./promo-code-types.component";

export function PromoCodeForm() {
  const [{ value }, , ImageForm] = useField("Image");

  const isImageFile = typeof value === "object";
  return (
    <Form className="my-4  shadow-lg border border-primary rounded">
      <div className="p-4 promo-code-form">
        <Row className="first-row">
          <Col xs={12} sm={6}>
            <FormikInputField
              name="name"
              inputFieldProps={{
                label: "Name",
                placeholder: "Name",
                required: true,
              }}
            />
          </Col>

          <Col xs={12} sm={6}>
            <FormikTextAria
              name="description"
              textAreaProps={{
                label: "Description",
                placeholder: "Description",
              }}
            />
          </Col>

          <Col xs={12} sm={6}>
            <FormikImageField
              name="image"
              imageFieldProps={{
                label: "Image",
              }}
            />

            {value && (
              <div
                className="position-relative"
                style={{
                  width: "80%",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: 100,
                    marginTop: 10,
                  }}
                  src={isImageFile ? URL.createObjectURL(value) : value}
                />

                <div className="position-absolute top-0 end-0 mt-2">
                  <span
                    className="bg-light  px-2 py-1 text-danger rounded border border-danger"
                    onClick={() => {
                      ImageForm.setValue("");
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <MdOutlineCancel />
                  </span>
                </div>
              </div>
            )}
          </Col>

          <PromoCodeTypes />

          <Deliveries />

          <PromoCodeLimits />

          <GradualInfo />

          <Discounts />

          <PromoCodeTimes />
        </Row>

        <Row className="mt-5">
          <Col className="d-flex align-items-center justify-content-end">
            <FormikSubmitButton>Submit</FormikSubmitButton>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
