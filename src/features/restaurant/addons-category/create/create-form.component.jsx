import {
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { FieldArray, Form, useField, useFormikContext } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { addonsTemplate } from "./form.config";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { FiTrash } from "react-icons/fi";

export function AddonsCategoryForm() {
  const [Field, Meta, Helper] = useField("isCategoryMultiple");

  const { values } = useFormikContext();
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{
              label: "Category Name",
              placeholder: "Enter Category Name",
              required: true,
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikTextAria
            name="description"
            textAreaProps={{
              label: "Category Description",
              placeholder: "Enter Category Description",
            }}
          />
        </Col>
      </Row>
      <Row className="my-3 align-items-center bg-info justify-content-center p-1">
      <Col  className="mb-1">
          <h6 className="text-center fw-medium text-white">Preset Addons</h6>
        </Col>
      </Row>
      <Row className="my-3 align-items-center">
        
        <Col xs={12} sm={2} className="mb-1">
          <FormikCheckBox
            name="isCategoryMultiple"
            checkBoxProps={{
              label: "Multiple Selection",
            }}
          />
        </Col>

        {Field.value && (
          <Col xs={12} sm={10} className="mb-1">
            <FormikInputField
              name="maxChoice"
              inputFieldProps={{
                label: "Maximum required number of choice(s) ",
                placeholder: "Enter Maximum Name",
                required: true,
                type: "number",
              }}
            />
          </Col>
        )}
      </Row>

      <FieldArray name="presetAddOns">
        {({ insert, remove, push }) => (
          <div>
            {values?.presetAddOns?.length > 0 &&
              values.presetAddOns.map((preset_add_on, index) => (
                <Row key={index}>
                  <Col xs={12} md={8}>
                    <FormikInputField
                      name={`presetAddOns.${index}.addOnName`}
                      inputFieldProps={{
                        label: "Add-ons Name",
                        placeholder: "Add-ons Name",
                      }}
                    />
                  </Col>

                  <Col xs={12} md={2}>
                    <FormikInputField
                      name={`presetAddOns.${index}.addOnPrice`}
                      inputFieldProps={{
                        label: "Price",
                        placeholder: "Price",
                        type: "number",
                      }}
                    />
                  </Col>

                  <Col xs={12} md={2} className="mt-4 pt-1 ">
                    {values?.presetAddOns?.length > 1 && (
                      <Button
                        size="sm"
                        className="me-2"
                        variant="danger"
                        onClick={() => remove(index)}
                      >
                        <FiTrash/>
                      </Button>
                    )}
                    {values?.presetAddOns?.length == index+1 && <Button
                      variant="info"
                      size="sm"
                      onClick={() => push(addonsTemplate)}
                    >
                      +
                    </Button>}
                  </Col>
                </Row>
              ))}
          </div>
        )}
      </FieldArray>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
