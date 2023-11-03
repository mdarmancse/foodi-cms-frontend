import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextAria,
  FormikToggleButton,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form } from "formik";
import { Col, Row, Stack } from "react-bootstrap";

export function CouponCreateForm({}) {
  const branchOptions = [
    { label: "PizzaHut Banani", value: 1 },
    { label: "Takeout Gulshan", value: 2 },
    { label: "KFC Baridhara", value: 3 },
    { label: "Segafredo Espresso Bashundara", value: 4 },
  ];

  const typeOptions = [
    { label: "Slider", value: "slider" },
    { label: "Banner", value: "banner" },
  ];

  return (
    <Form>
      <Row>
        <Col xs={12} md={6}>
          <Stack gap={2}>
            <FormikInputField
              name="Name"
              inputFieldProps={{
                label: lang("name"),
                placeholder: lang("name"),
                required: true,
              }}
            />

            <FormikTextAria
              name="Description"
              textAreaProps={{
                label: lang("description"),
                placeholder: lang("description"),
                required: true,
              }}
            />

            {/* <FormikSelectField
              name="Type"
              selectFieldProps={{
                label: lang("type"),
                options: typeOptions,
                required: true,
              }}
            /> */}

            <FormikInputField
              name="StartDate"
              inputFieldProps={{
                label: lang("start_date"),
                placeholder: lang("start_date"),
                required: true,
                type: "datetime-local",
              }}
            />

            <FormikInputField
              name="EndDate"
              inputFieldProps={{
                label: lang("end_date"),
                placeholder: lang("end_date"),
                required: true,
                type: "datetime-local",
              }}
            />

            {/* <FormikImageField
              name="Image"
              imageFieldProps={{
                label: lang("image"),
                required: false,
              }}
            /> */}

            {/* <ImagePreview fieldName={"Image"} /> */}
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
            <FormikSelectField
              name="BranchId"
              selectFieldProps={{
                label: lang("branches"),
                options: branchOptions,
                required: true,
              }}
            />

            <FormikToggleButton
              name="IsDelivery"
              toggleButtonProps={{
                required: true,
                label: lang("delivery"),
              }}
            />
            <FormikToggleButton
              name="IsPickup"
              toggleButtonProps={{
                required: true,
                label: lang("pickup"),
              }}
            />
            <FormikToggleButton
              name="IsDine"
              label={lang("dine_in")}
              toggleButtonProps={{
                required: true,
                label: lang("dine_in"),
              }}
            />
          </Stack>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
