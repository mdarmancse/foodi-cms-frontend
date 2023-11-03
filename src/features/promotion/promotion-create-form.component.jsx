import { useGetBranchNameQuery } from "@/features/restaurant/restaurant-menu";
import {
  FormikAutoComplete,
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikToggleButton,
  ImagePreview,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form, useField } from "formik";
import { Col, Row, Stack } from "react-bootstrap";

export function PromotionCreateForm({}) {
  const [{ value }, , imageFieldForm] = useField("branchAndPromotions");

  const { isLoading: isBranchLoading, data: branchData } =
    useGetBranchNameQuery();

  const branchOptions = branchData?.data || [];

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
              name="name"
              inputFieldProps={{
                label: lang("name"),
                placeholder: lang("name"),
                required: true,
              }}
            />

            <FormikSelectField
              name="type"
              selectFieldProps={{
                label: lang("type"),
                options: typeOptions,
                required: true,
              }}
            />

            <FormikInputField
              name="startDate"
              inputFieldProps={{
                label: lang("start_date"),
                placeholder: lang("start_date"),
                required: true,
                type: "datetime-local",
              }}
            />

            <FormikInputField
              name="endDate"
              inputFieldProps={{
                label: lang("end_date"),
                placeholder: lang("end_date"),
                required: true,
                type: "datetime-local",
              }}
            />

            <FormikImageField
              name="bannerImage"
              imageFieldProps={{
                label: lang("image"),
                required: false,
              }}
            />

            <ImagePreview fieldName={"bannerImage"} />
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
            <FormikAutoComplete
              name="branchAndPromotions"
              autoCompleteProps={{
                label: lang("branches"),
                options: branchOptions,
                isLoading: isBranchLoading,
                required: true,
                isMulti: true,
              }}
            />

            <FormikToggleButton
              name="isDelivery"
              toggleButtonProps={{
                required: true,
                label: lang("delivery"),
                options: [
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ],
              }}
            />
            <FormikToggleButton
              name="isPickup"
              toggleButtonProps={{
                required: true,
                label: lang("pickup"),
                options: [
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ],
              }}
            />
            <FormikToggleButton
              name="isDine"
              label={lang("dine_in")}
              toggleButtonProps={{
                required: true,
                label: lang("dine_in"),
                options: [
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ],
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
