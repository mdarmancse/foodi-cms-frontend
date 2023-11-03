import { Col } from "react-bootstrap";
import {
  FormikImageField,
  FormikInputField,
  FormikSelectField,
} from "@/features/ui";
import { DisplayImage } from "../../../ui/display-image";
import {
  useGetBatchLevelQuery,
  useGetBagTypeQuery,
  useGetRiderTypeQuery,
} from "../rider-api";

export const PersonalDteials = ({ values, id }) => {
  const { data: batch } = useGetBatchLevelQuery();
  const { data: bag } = useGetBagTypeQuery();
  const { data: rider } = useGetRiderTypeQuery();
  // console.log("bag", bag);
  // console.log("rider", rider);
  // console.log("batch", batch);
  return (
    <>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="firstName"
          inputFieldProps={{
            label: "First Name",
            placeholder: "Enter First Name",
            required: true,
          }}
        />
      </Col>

      <Col xs={12} className="mb-1">
        <FormikInputField
          name="lastName"
          inputFieldProps={{
            label: "Last Name",
            placeholder: "Enter Last Name",
            required: true,
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="mobileNumber"
          inputFieldProps={{
            label: "Mobile Number",
            placeholder: "Enter Mobile Number",
            required: true,
            type: "number",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="email"
          inputFieldProps={{
            label: "Email",
            placeholder: "Enter Email",
            required: true,
            type: "email",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="birthDate"
          inputFieldProps={{
            label: "Birth Date",
            placeholder: "Enter Birth Date",
            type: "date",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="riderStartDate"
          inputFieldProps={{
            label: "Rider Start Date",
            placeholder: "Enter Rider Start Date",
            required: true,
            type: "date",
          }}
        />
      </Col>

      <Col xs={12} className="mb-1">
        <FormikSelectField
          name="riderTypeId"
          selectFieldProps={{
            label: "Rider Type",
            options: rider?.items || [],
            required: true,
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikSelectField
          name="batchLevelId"
          selectFieldProps={{
            label: "Batch Level",
            options: batch?.items || [],
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikSelectField
          name="bagTypeId"
          selectFieldProps={{
            label: "Bag Type",
            options: bag?.items || [],
          }}
        />
      </Col>
      <Col xs={12} className="mb-2">
        <FormikImageField
          name="image"
          imageFieldProps={{
            label: "Image",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>
      {values?.image && <DisplayImage value={values?.image} id={id} />}
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="nidNo"
          inputFieldProps={{
            label: "NID No",
            placeholder: "Enter NID No",
          }}
        />
      </Col>

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="nidFront"
          imageFieldProps={{
            label: "NID Front",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>
      {values.nidFront && <DisplayImage value={values?.nidFront} id={id} />}

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="nidBack"
          imageFieldProps={{
            label: "NID Back",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

      {values.nidBack && <DisplayImage value={values?.nidBack} id={id} />}
    </>
  );
};
