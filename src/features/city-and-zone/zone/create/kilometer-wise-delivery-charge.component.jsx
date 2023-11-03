import { FormikInputField } from "@/features/ui";
import { FieldArray, useField } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { defaultKMWiseCharge } from "./form.config";

export default function KilometerWiseDeliveryCharge() {
  const [{ value }] = useField("kilometerWiseDeliveryCharges");
  const [{ value: deleteKMValue }, , deleteKMForm] = useField(
    "deletekilometerWiseDeliveryChargesIds"
  );

  return (
    <div>
      <div className="bg-info p-2 shadow-sm text-center rounded mb-2">
        <h6>Delivery Charge ( KM. wise )</h6>
      </div>
      <div>
        <FieldArray name="kilometerWiseDeliveryCharges">
          {({ insert, remove, push }) => (
            <div>
              {value?.length > 0 &&
                value?.map((row, index) => (
                  <Row key={index} className="mb-3">
                    <Col xs={12} md={4}>
                      <FormikInputField
                        name={`kilometerWiseDeliveryCharges.${index}.kilometer`}
                        inputFieldProps={{
                          label: index === 0 ? "Kilometer" : "",
                          placeholder: "kilometer",
                          type: "number",
                        }}
                      />
                    </Col>

                    <Col xs={12} md={4}>
                      <FormikInputField
                        name={`kilometerWiseDeliveryCharges.${index}.charge`}
                        inputFieldProps={{
                          label: index === 0 ? "Delivery Charge" : "",
                          placeholder: "Delivery Charge",
                          type: "number",
                        }}
                      />
                    </Col>

                    <Col
                      xs={12}
                      md={4}
                      className={`${index === 0 ? "mt-4 pt-1" : ""}`}
                    >
                      {Boolean(value?.length > 1) && (
                        <Button
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            if (row.id) {
                              deleteKMForm.setValue([...deleteKMValue, row.id]);
                              remove(index);
                            } else {
                              remove(index);
                            }
                          }}
                          variant="danger"
                        >
                          <MdDelete />
                        </Button>
                      )}
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => push(defaultKMWiseCharge)}
                      >
                        <BiPlus />
                      </Button>
                    </Col>
                  </Row>
                ))}
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
}
