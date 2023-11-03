import {
  FormikAutoComplete,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, useField } from "formik";
import { CloseButton, Col, Image, Row } from "react-bootstrap";

export function DineInVoucherSettingForm() {
  const voucherTypes = [
    {
      label: "Branch Wise",
      value: "branch_wise",
    },
    {
      label: "Zone Wise",
      value: "zone_wise",
    },
    {
      label: "Cuisine Wise",
      value: "cuisine_wise",
    },
    {
      label: "User Wise",
      value: "user_wise",
    },
  ];
  const discountTypes = [
    {
      label: "Percent",
      value: "percent",
    },
    {
      label: "Amount",
      value: "amount",
    },
  ];

  const [voucherTypeField, voucherTypeMeta, voucherTypeHelper] =
    useField("voucher_type");
  const [discountTypeField, discountTypeMeta, discountTypeHelper] =
    useField("discount_type");

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

        <Col xs={12} className="mb-1">
          <FormikAutoComplete
            name="voucher_type"
            autoCompleteProps={{
              label: "Type",
              required: true,
              placeholder: "Select Type",
              options: voucherTypes,
              isMulti: false,
              isClearable: true,
            }}
          />
        </Col>
        {voucherTypeField.value.value === "branch_wise" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="branches"
              autoCompleteProps={{
                label: "Branch",
                required: true,
                placeholder: "Select Branch",
                options: voucherTypes,
                isMulti: true,
              }}
            />
          </Col>
        )}
        {voucherTypeField.value.value === "user_wise" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="users"
              autoCompleteProps={{
                label: "Users",
                required: true,
                placeholder: "Select Users",
                options: voucherTypes,
                isMulti: true,
              }}
            />
          </Col>
        )}
        {voucherTypeField.value.value === "zone_wise" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="zones"
              autoCompleteProps={{
                label: "Zones",
                required: true,
                placeholder: "Select Zones",
                options: voucherTypes,
                isMulti: true,
              }}
            />
          </Col>
        )}
        {voucherTypeField.value.value === "cuisine_wise" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="cuisines"
              autoCompleteProps={{
                label: "Cuisines",
                required: true,
                placeholder: "Select Cuisines",
                options: voucherTypes,
                isMulti: true,
              }}
            />
          </Col>
        )}
        {voucherTypeField.value.value !== "user_wise" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="subscription_types"
              autoCompleteProps={{
                label: "Subscription Type",
                placeholder: "Select Subscription Type",
                options: voucherTypes,
                isMulti: true,
              }}
            />
          </Col>
        )}
        <Col xs={12} className="mb-1">
          <FormikAutoComplete
            name="discount_type"
            autoCompleteProps={{
              label: "Discount Type",
              required: true,
              placeholder: "Select Discount Type",
              options: discountTypes,
              isMulti: false,
              isClearable: true,
            }}
          />
        </Col>

        {discountTypeField.value.value === "percent" && (
          <Col xs={12} className="mb-1">
            <FormikInputField
              name="discount_in_percent"
              inputFieldProps={{
                label: "Maximum Discount (%)",
                placeholder: "Enter Maximum Discount (%)",
                required: true,
                type: "number",
              }}
            />
          </Col>
        )}

        {discountTypeField.value.value === "amount" && (
          <Col xs={12} className="mb-1">
            <FormikInputField
              name="discount_in_amount"
              inputFieldProps={{
                label: "Maximum Discount Amount",
                placeholder: "Enter Maximum Discount Amount",
                required: true,
                type: "number",
              }}
            />
          </Col>
        )}

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="minimum_order_amount"
            inputFieldProps={{
              label: "Minimum Order Amount",
              placeholder: "Enter Minimum Order Amount",
              required: true,
              type: "number",
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="expire_time"
            inputFieldProps={{
              label: "Expire Time (In Hour)",
              placeholder: "Enter Expire Time",
              required: true,
              type: "number",
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="start_time"
            inputFieldProps={{
              label: "Start Time",
              placeholder: "Enter Start Time",
              required: true,
              type: "datetime-local",
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikInputField
            name="end_time"
            inputFieldProps={{
              label: "End Time",
              placeholder: "Enter End Time",
              required: true,
              type: "datetime-local",
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
