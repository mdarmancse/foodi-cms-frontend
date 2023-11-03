import {
  FormikAutoComplete,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, useField } from "formik";
import { CloseButton, Col, Image, Row } from "react-bootstrap";

const coupon_type = [
  {
    label: "Coupon",
    value: "in_app",
  },
  {
    label: "Voucher",
    value: "out_app",
  },
];

export function VoucherSettingForm() {
  const [typeField, typeMeta, typeHelper] = useField("type");
  const [imageField, imageMeta, imageHelper] = useField("image");

  const reset = () => {
    imageHelper.setValue("");
  };

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

        <Col xs={12} className="mb-2">
          <FormikImageField
            name="image"
            imageFieldProps={{
              label: "Image",
              accept: ".jpg, .jpeg, .bmp, .png, .webp",
              //   multiple: true,
              required: true,
            }}
          />
        </Col>

        {imageField?.value?.[0] && (
          <Row>
            <Col xs={12} className="mb-1 text-center position-relative ">
              <Image
                src={URL.createObjectURL(imageField?.value?.[0])}
                className="w-25"
                fluid
              />
              <CloseButton
                onClick={() => reset()}
                className="position-absolute bg-danger"
              />
            </Col>
          </Row>
        )}

        <Col xs={12} className="mb-1">
          <FormikAutoComplete
            name="type"
            autoCompleteProps={{
              label: "Type",
              required: true,
              placeholder: "Select Type",
              options: coupon_type,
              isMulti: false,
              isClearable: true,
            }}
          />
        </Col>

        {typeField.value.value === "in_app" && (
          <Col xs={12} className="mb-1">
            <FormikInputField
              name="voucher_amount"
              inputFieldProps={{
                label: "Voucher Amount in TK",
                placeholder: "Enter voucher amount",
                required: true,
                type: "number",
              }}
            />
          </Col>
        )}

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="voucher_cost_in_point"
            inputFieldProps={{
              label: "Voucher Cost in Point",
              placeholder: "Enter voucher amount",
              required: true,
              type: "number",
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="validity_time"
            inputFieldProps={{
              label: "Expire Time in days",
              placeholder: "Enter voucher amount",
              required: true,
              type: "number",
            }}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
