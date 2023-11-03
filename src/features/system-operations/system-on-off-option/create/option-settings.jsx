import {
  FormikCheckBox,
  FormikInputField,
  FormikSelectField,
} from "@/features/ui";
import { Col, Button } from "react-bootstrap";
import { TfiCheck } from "react-icons/tfi";

const reasons = [
  {
    label: "test reason name",

    value: 46,
  },
  {
    label: "Rebboot Update ",

    value: 45,
  },
  {
    label: "system",

    value: 44,
  },
];

export const OptionSettings = ({ values, id, editData }) => {
  return (
    <>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikInputField
            name="iterationInterval"
            inputFieldProps={{
              label: " Iteration Interval",
              type: "number",
            }}
          />
          {id &&
            values?.iterationInterval &&
            values?.iterationInterval !== editData?.data?.iterationInterval && (
              <Col className="mx-2 my-4">
                <Button type="submit">
                  <TfiCheck />
                </Button>
              </Col>
            )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikInputField
            name="riderMaxIteration"
            inputFieldProps={{
              label: "Rider Max Iteration",
              type: "number",
            }}
          />
          {id &&
            values?.riderMaxIteration &&
            values?.riderMaxIteration !== editData?.data?.riderMaxIteration && (
              <Col className="mx-2 my-4">
                <Button type="submit">
                  <TfiCheck />
                </Button>
              </Col>
            )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikCheckBox
            name="isSystemOff"
            checkBoxProps={{ label: "System Off" }}
          />
          {id && !values?.isSystemOff && (
            <Col className="mx-2 my-4">
              <Button type="submit">
                <TfiCheck />
              </Button>
            </Col>
          )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikCheckBox
            name="isFacebookAuthenticated"
            checkBoxProps={{ label: "Facbook Authenticated" }}
          />
          {id && !values?.isFacebookAuthenticated && (
            <Col className="mx-2 my-4">
              <Button type="submit">
                <TfiCheck />
              </Button>
            </Col>
          )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikCheckBox
            name="isGoogleAuthenticated"
            checkBoxProps={{ label: "Google Authenticated" }}
          />
          {id && !values?.isGoogleAuthenticated && (
            <Col className="mx-2 my-4">
              <Button type="submit">
                <TfiCheck />
              </Button>
            </Col>
          )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikCheckBox
            name="isPhoneNumberAuthenticated"
            checkBoxProps={{ label: "Phone No Authenticated" }}
          />
          {id && !values?.isPhoneNumberAuthenticated && (
            <Col className="mx-2 my-4">
              <Button type="submit">
                <TfiCheck />
              </Button>
            </Col>
          )}
        </Col>
      </div>
      <div className="d-flex justify-content-around">
        <Col md={id ? 11 : 12}>
          <FormikSelectField
            name="systemOnOffReasonId"
            selectFieldProps={{
              label: "System On Off Reason",
              options: reasons,
            }}
          />
          {id &&
            values?.systemOnOffReasonId &&
            values?.systemOnOffReasonId !==
              editData?.data?.systemOnOffReasonId && (
              <Col className="mx-2 my-4">
                <Button type="submit">
                  <TfiCheck />
                </Button>
              </Col>
            )}
        </Col>
      </div>
    </>
  );
};
