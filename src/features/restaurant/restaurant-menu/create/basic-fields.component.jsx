import { FormikImageField, FormikInputField } from "@/features/ui";
import { useField } from "formik";
import { Col, Row, Stack } from "react-bootstrap";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const BasicFields = () => {
  const [{ value }, , imageFieldForm] = useField("image");

  const image = value;

  return (
    <>
      <Row>
        <Col>
          <Stack gap={2}>
            <FormikInputField
              name="name"
              inputFieldProps={{
                label: "Menu Name",
                required: true,
              }}
            />
            <FormikInputField
              name="description"
              inputFieldProps={{
                label: "Menu Description",
              }}
            />
            <FormikInputField
              name="price"
              inputFieldProps={{
                label: "Menu Price",
                required: true,
              }}
            />
            <FormikInputField
              name="pickupMenuPrice"
              inputFieldProps={{
                label: "Pickup Menu Price",
                required: true,
              }}
            />
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
            <FormikInputField
              name="recipeTime"
              inputFieldProps={{
                label: "Recipe Time",
                required: true,
                type: "number",
              }}
            />
            <FormikInputField
              name="variationGroupName"
              inputFieldProps={{
                label: "Variation Group Name",
              }}
            />
            <FormikInputField
              name="variationGroupDesc"
              inputFieldProps={{
                label: "Variation Group Desc.",
              }}
            />

            <FormikImageField
              name="image"
              imageFieldProps={{
                label: "Image",
              }}
            />

            {image && (
              <div
                className="mt-2 position-relative"
                style={{
                  width: 200,
                  height: 120,
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    typeof image === "object"
                      ? URL.createObjectURL(image)
                      : image
                  }
                  alt="image"
                />

                <div
                  style={{
                    width: 30,
                    height: 30,
                    background: "white",
                    position: "absolute",
                    borderRadius: "5px",
                    top: 5,
                    right: 5,
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "1px solid red",
                  }}
                  onClick={() => {
                    imageFieldForm.setValue(null);
                  }}
                >
                  <IoMdCloseCircleOutline className="fs-4 text-danger" />
                </div>
              </div>
            )}
          </Stack>
        </Col>
      </Row>
    </>
  );
};
