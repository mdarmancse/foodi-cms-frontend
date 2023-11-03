import { useField } from "formik";
import { Col, Image, Row } from "react-bootstrap";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const DisplayImage = ({ value, id }) => {
  const [imageFieldForm, , imageFieldHelpers] = useField("image");

  const src =
    typeof value === "object" || (id && typeof value === "object")
      ? URL.createObjectURL(value)
      : import.meta.env.VITE_APP_IMAGE_BASE + value;

  return (
    <Row>
      <Col xs={12} className="mb-1 text-center position-relative mt-2">
        <Image src={src} style={{ width: 200 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 380,
            zIndex: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            // Clear the form field value
            imageFieldHelpers.setValue(null);
          }}
        >
          <IoMdCloseCircleOutline className="fs-4 text-danger" />
        </div>
      </Col>
    </Row>
  );
};
