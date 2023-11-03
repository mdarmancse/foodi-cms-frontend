import {
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikToggleButton,
  ImagePreview,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { FieldArray, Form, useFormikContext } from "formik";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { CuisineLanguageTemplate } from "./form.config";

export function CuisineCreateForm() {
  // TODO: need to get language from api once it is ready
  const languageOptions = [
    { label: "Bangla", value: 1 },
    { label: "English", value: 2 },
    { label: "Hindi", value: 3 },
    { label: "Urdu", value: 4 },
  ];

  const { values } = useFormikContext();

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

            <FormikImageField
              name="image"
              imageFieldProps={{
                label: lang("image"),
                required: false,
              }}
            />

            <ImagePreview fieldName={"image"} />

            <Card className="p-2">
              <Card.Title>Language</Card.Title>
              <Card.Body>
                <FieldArray name="cuisineLangs">
                  {({ insert, remove, push }) => (
                    <div>
                      {values?.cuisineLangs?.length > 0 &&
                        values.cuisineLangs.map((cuisineLang, index) => (
                          <Stack gap={2} key={index}>
                            <FormikInputField
                              name={`cuisineLangs.${index}.name`}
                              inputFieldProps={{
                                label: lang("name"),
                                required: false,
                                placeholder: lang("name"),
                              }}
                            />
                            <FormikSelectField
                              name={`cuisineLangs.${index}.languageId`}
                              selectFieldProps={{
                                label: lang("language"),
                                options: languageOptions,
                              }}
                            />
                            <Col>
                              <Button
                                variant="danger"
                                onClick={() => remove(index)}
                              >
                                X
                              </Button>
                            </Col>
                          </Stack>
                        ))}
                      <Button
                        variant="info"
                        className="mt-2 secondary"
                        onClick={() => push(CuisineLanguageTemplate)}
                      >
                        Add More
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
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

            <FormikInputField
              name="color.fg"
              inputFieldProps={{
                type: "color",
                required: true,
                label: lang("foreground_color"),
                className: "w-25",
              }}
            />

            <FormikInputField
              name="color.bg"
              type="color"
              inputFieldProps={{
                type: "color",
                required: true,
                label: lang("background_color"),
                className: "w-25",
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
