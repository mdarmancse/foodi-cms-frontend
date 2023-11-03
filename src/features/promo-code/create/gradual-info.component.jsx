import { FormikInputField, FormikToggleButton } from "@/features/ui";
import { FieldArray, useField } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { GradualSingleRow } from "./form.config";

export function GradualInfo(params) {
  const [{ value }, { error }, giForm] = useField("gradualInformation");
  const [{ value: IsGradual }, , isGradualForm] = useField("isGradual");
  const [{ value: Sequence }, , sequenceForm] = useField("sequence");

  return (
    <>
      <Col xs={12} sm={6}>
        <FormikToggleButton
          name="isGradual"
          toggleButtonProps={{
            label: "Is Gradual",
            options: [
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ],
            required: true,
            onChange(event) {
              isGradualForm.setValue(event.target.value);
              sequenceForm.setValue("");
              if (event.target.value === "true") {
                giForm.setValue([GradualSingleRow]);
              } else {
                giForm.setValue([]);
              }
            },
          }}
        />
      </Col>

      {/* Gradual Row */}
      {IsGradual === "true" && (
        <div className="p-0 mb-3 border ">
          <div className="text-center bg-info py-2 mb-3 shadow ">
            <h6>Gradual Information</h6>
          </div>
          {error && (
            <div className="text-center my-2 text-danger fs-4 border border-danger">
              <div className="d-flex align-items-center justify-content-center">
                <span>
                  <AiOutlineInfoCircle />
                </span>
                <h6 className="ps-2">
                  {typeof error === "string"
                    ? error
                    : "Please check your input value"}
                </h6>
              </div>
            </div>
          )}
          <div className="p-2">
            <FieldArray
              name="gradualInformation"
              render={({ push, remove }) => {
                return value?.map((row, index) => {
                  return (
                    <Row className="mb-2">
                      <Col xs={12} sm={4}>
                        <FormikInputField
                          name={`gradualInformation.${index}.Sequence`}
                          inputFieldProps={{
                            label: index === 0 ? "Sequence" : "",
                            placeholder: "Sequence",
                          }}
                        />
                      </Col>
                      <Col xs={12} sm={4}>
                        <FormikInputField
                          name={`gradualInformation.${index}.DiscountPercent`}
                          inputFieldProps={{
                            label: index === 0 ? "Discount Percent" : "",
                            placeholder: "Discount Percent",
                            type: "number",
                          }}
                        />
                      </Col>

                      <Col xs={12} sm={4} className="d-flex align-items-end">
                        {value.length === index + 1 && (
                          <Button
                            size="sm"
                            variant="warning"
                            className="me-1"
                            onClick={() => push(GradualSingleRow)}
                          >
                            <GrAdd />
                          </Button>
                        )}
                        {value.length > 1 && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            <MdDelete />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

{
  /* Gradual Row */
}
{
  /* {IsGradual === "true" && (
  <div className="p-0 mb-3 border ">
    <div className="text-center bg-info py-2 mb-3 shadow ">
      <h6>Gradual Information</h6>
    </div>
    {error && (
      <div className="text-center my-2 text-danger fs-4 border border-danger">
        <div className="d-flex align-items-center justify-content-center">
          <span>
            <AiOutlineInfoCircle />
          </span>
          <h6 className="pt-2 ps-2">
            {typeof error === "string"
              ? error
              : "Please check your input value"}
          </h6>
        </div>
      </div>
    )}
    <div className="p-2">
      <FieldArray
        name="GradualInformation"
        render={({ push, remove }) => {
          return (
            <>
              <Row className="mb-2">
                <Col xs={12} sm={4}>
                  <FormikInputField
                    name={"Sequence"}
                    inputFieldProps={{
                      label: "Sequence",
                      placeholder: "Sequence",
                      required: true,
                    }}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <FormikInputField
                    name={"DiscountPercent"}
                    inputFieldProps={{
                      label: "Discount Percent",
                      placeholder: "Discount Percent",
                      type: "number",
                      required: true,
                    }}
                  />
                </Col>

                <Col xs={12} sm={4} className="d-flex align-items-end">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1"
                    onClick={() => {
                      if (!Sequence) {
                        toast.error("Sequence is required.");
                        return;
                      } else if (!DiscountPercent) {
                        toast.error("Discount Percent is required.");
                        return;
                      }

                      push({
                        Sequence,
                        DiscountPercent,
                      });
                    }}
                  >
                    <GrAdd />
                  </Button>
                </Col>
              </Row>

              <div
                style={{
                  minHeight: 10,
                  maxHeight: 300,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {value?.map((row, index) => {
                  return (
                    <Row className="mb-2">
                      <Col xs={12} sm={4}>
                        <FormikInputField
                          name={`GradualInformation.${index}.Sequence`}
                          inputFieldProps={{
                            placeholder: "Sequence",
                            required: true,
                          }}
                        />
                      </Col>
                      <Col xs={12} sm={4}>
                        <FormikInputField
                          name={`GradualInformation.${index}.DiscountPercent`}
                          inputFieldProps={{
                            placeholder: "Discount Percent",
                            type: "number",
                            required: true,
                          }}
                        />
                      </Col>

                      <Col
                        xs={12}
                        sm={4}
                        className="d-flex align-items-end"
                      >
                        {value.length > 1 && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            <MdDelete />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </>
          );
        }}
      />
    </div>
  </div>
)} */
}
