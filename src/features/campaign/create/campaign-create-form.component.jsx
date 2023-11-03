import { useGetBranchNameQuery } from "@/features/restaurant/restaurant-menu";
import {
  FormikAutoComplete,
  FormikCheckBox,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { DisplayImage } from "@/features/ui/display-image";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form, useField, useFormikContext } from "formik";
import { Col, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function CampaignCreateForm({}) {
  const { setFieldValue } = useFormikContext();

  const { id } = useParams();

  const { isLoading, data } = useGetBranchNameQuery();
  const branchList = data?.data || [];

  const [{ value }, , imageFieldForm] = useField("image");
  const image = value;

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

            <FormikTextAria
              name="description"
              textAreaProps={{
                label: lang("description"),
                placeholder: lang("description"),
              }}
            />

            <FormikImageField
              name="image"
              imageFieldProps={{
                label: "Image",
                accept: ".jpg, .jpeg, .bmp, .png, .webp",
              }}
            />

            {image && <DisplayImage value={image} id={id} />}

            <FormikAutoComplete
              name="branchAndCampaigns"
              autoCompleteProps={{
                label: lang("branches"),
                placeholder: "Select Branch",
                isLoading: isLoading,
                isMulti: true,
                options: branchList || [],
                onChange: (row) => {
                  setFieldValue("branchAndCampaigns", row);
                },
              }}
            />
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
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

            <FormikCheckBox
              name="isDelivery"
              checkBoxProps={{ label: lang("delivery") }}
            />

            <FormikCheckBox
              name="isPickup"
              checkBoxProps={{ label: lang("pickup") }}
            />

            <FormikCheckBox
              name="isDine"
              checkBoxProps={{ label: lang("dine_in") }}
            />

            <FormikCheckBox
              name="isFlower"
              checkBoxProps={{ label: lang("flower") }}
            />
          </Stack>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">
          {id ? "Update" : "Submit"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
