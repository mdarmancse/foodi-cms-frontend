import { FormikInputField } from "@/features/ui";
import { FieldArray, useField } from "formik";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useToggle } from "react-use";
import { VariationRow } from "./form.config";
import { VariationAddOnsSidebar } from "./variation-add-ons-sidebar.component";

export function Variation() {
  const [, , { setValue }] = useField("selectedVariationIndex");
  const [field] = useField("hasVariation");
  const [variationField, voFMeta] = useField("variations");
  const [on, toggle] = useToggle();

  return (
    <div className="mt-2 mb-4">
      {field.value === true && (
        <div className="mt-3 bg-success bg-opacity-10 py-4 px-3 rounded">
          <div>
            <h5>Variations Info.</h5>
          </div>

          <hr className="my-2" />

          <FieldArray
            name="variations"
            render={({ push, remove }) => {
              const vfLength = variationField.value?.length;
              return variationField?.value?.map((vF, index) => {
                const hasVariationSidebarValue = !vF?.addOnCategories?.length
                  ? false
                  : true;

                return (
                  <Row className="mt-3" key={index}>
                    <Col xs={12} md={2}>
                      <FormikInputField
                        name={`variations.${index}.name`}
                        inputFieldProps={{
                          label: "Name",
                          required: true,
                        }}
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FormikInputField
                        name={`variations.${index}.price`}
                        inputFieldProps={{
                          label: "Price",
                          required: true,
                          type: "number",
                        }}
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FormikInputField
                        name={`variations.${index}.groupName`}
                        inputFieldProps={{
                          label: "Group Name",
                        }}
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FormikInputField
                        name={`variations.${index}.groupDescription`}
                        inputFieldProps={{
                          label: "Description",
                        }}
                      />
                    </Col>

                    <Col className="d-flex align-items-end">
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className={`d-flex ${
                          voFMeta.error
                            ? "align-items-end pb-1"
                            : "align-items-end"
                        } `}
                      >
                        {variationField?.value.length > 1 && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            <MdDelete />
                          </Button>
                        )}

                        <Button
                          onClick={() => {
                            setValue(index);
                            toggle();
                          }}
                          size="sm"
                          variant={
                            hasVariationSidebarValue ? "warning" : "primary"
                          }
                        >
                          {hasVariationSidebarValue
                            ? "Edit Add-ons"
                            : "Add Add-Ons"}
                        </Button>
                      </Stack>
                    </Col>

                    {vfLength === index + 1 && (
                      <Col className="border-start d-flex align-items-center">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Click To Add New Row</Tooltip>}
                        >
                          <Button
                            variant="primary"
                            className="d-flex align-items-center py-2"
                            onClick={() => push(VariationRow)}
                          >
                            <BsPlusCircleFill />
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    )}
                  </Row>
                );
              });
            }}
          />
        </div>
      )}
      {on && <VariationAddOnsSidebar show={on} onHide={toggle} />}
    </div>
  );
}
