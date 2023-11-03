import { Row, Col, Image } from "react-bootstrap";
export const DisplayImage = ({ value, id }) => {
  const src =
    typeof value === "object" || (!id && typeof value === "object")
      ? URL.createObjectURL(value)
      : import.meta.env.VITE_APP_IMAGE_BASE + value;

  // console.log({ src });

  // console.log(console.log("typeof", typeof value));
  return (
    <Row>
      <Col xs={12} className="mb-1 text-center position-relative ">
        <Image src={src} style={{ width: 200 }} />
      </Col>
    </Row>
  );
};
