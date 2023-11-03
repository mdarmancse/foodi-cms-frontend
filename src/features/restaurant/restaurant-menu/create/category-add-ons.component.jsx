import { FormikCheckBox, FormikInputField } from "@/features/ui";
import { FieldArray, useField } from "formik";
import { useEffect } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

export function CategoryAddOns({ categories, categoryInfo, index }) {
  const [{ value }, , categoryAddOnsRow] = useField(
    `initialVariationCategory.${index}`
  );

  const [{ value: selectedRowIndex }] = useField("selectedVariationIndex");
  const [{ value: selectedVariationRowCategory }] = useField(
    `variations.${selectedRowIndex}.addOnCategories.${index}`
  );

  const [{ value: addOnRow }] = useField(
    `initialVariationCategory.${index}.addOns`
  );
  const [{ value: categoryAddOn }, , categoryAddOnForm] =
    useField("categoryAddOns");

  const findAddOnPresetRow = () => {
    if (selectedVariationRowCategory) {
      const currentCategory = categoryInfo.addOnCategoryId;
      const prevCategoryInfo = selectedVariationRowCategory.addOnCategoryId;

      if (currentCategory == prevCategoryInfo) {
        return categoryInfo.addOns;
      } else {
        return (
          categories.find((ct) => ct.id == categoryInfo?.addOnCategoryId)
            ?.presetAddOns || []
        );
      }
    }

    return (
      categories.find((ct) => ct.id == categoryInfo?.addOnCategoryId)
        ?.presetAddOns || []
    );
  };

  useEffect(() => {
    if (categoryInfo.addOnCategoryId) {
      categoryAddOnsRow.setValue({
        ...value,
        addOns: findAddOnPresetRow(),
      });
    }
  }, [categoryInfo.addOnCategoryId]);

  return (
    <Row className="mt-4">
      <FieldArray
        name={`initialVariationCategory.${index}.addOns`}
        render={({ push, remove }) => {
          return (
            <>
              {Boolean(addOnRow?.length) &&
                addOnRow?.map((row, indx) => {
                  return (
                    <Row key={indx} className="mt-3">
                      <Col xs={12} md={5}>
                        <FormikInputField
                          name={`initialVariationCategory.${index}.addOns.${indx}.name`}
                          inputFieldProps={{
                            required: true,
                            label: indx === 0 ? "Name" : "",
                          }}
                        />
                      </Col>
                      <Col xs={12} md={5}>
                        <FormikInputField
                          name={`initialVariationCategory.${index}.addOns.${indx}.price`}
                          inputFieldProps={{
                            required: true,
                            type: "number",
                            label: indx === 0 ? "Price" : "",
                          }}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={2}
                        className={index === 0 ? "d-flex align-items-end " : ""}
                      >
                        <Stack direction="horizontal" gap={1}>
                          {Boolean(addOnRow?.length > 1) && (
                            <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => remove(indx)}
                              >
                                <AiFillDelete className="text-danger" />
                              </Button>
                            </OverlayTrigger>
                          )}

                          <div>
                            {Boolean(addOnRow?.length === indx + 1) && (
                              <OverlayTrigger
                                overlay={
                                  <Tooltip>Click to add new Row</Tooltip>
                                }
                              >
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    push({
                                      name: "",
                                      price: "",
                                    });
                                  }}
                                >
                                  Add
                                </Button>
                              </OverlayTrigger>
                            )}
                          </div>
                        </Stack>
                      </Col>
                    </Row>
                  );
                })}
            </>
          );
        }}
      />

      <Row className="mt-4">
        <FormikCheckBox
          name={`initialVariationCategory.${index}.hasMaxChoice`}
          checkBoxProps={{
            label: "Has Max-Choice",
          }}
        />

        {Boolean(value.hasMaxChoice) && (
          <div className="mt-2">
            <FormikInputField
              name={`initialVariationCategory.${index}.maxChoice`}
              inputFieldProps={{
                type: "number",
                label: "Max-Choice Number",
                required: true,
              }}
            />
          </div>
        )}
      </Row>
    </Row>
  );
}
