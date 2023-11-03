import { useField } from "formik";
import { isArray } from "lodash";
import { Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

const imageBasePath = import.meta.env.VITE_APP_IMAGE_URL;

export const ImagePreview = ({ fieldName }) => {
  const [field, _, form] = useField(fieldName);
  const image =
    field?.value instanceof File
      ? URL.createObjectURL(field.value)
      : `${imageBasePath}${field.value}`;

  return (
    <div>
      {field?.value && image && (
        <div className="position-relative d-inline-block">
          <div className="position-absolute top-0 end-0">
            <Button
              variant="transparent"
              className="text-white cursor-pointer"
              onClick={() => form.setValue("")}
            >
              <FaTimesCircle />
            </Button>
          </div>
          <img
            style={{
              width: 300,
              height: "auto",
              objectFit: "cover",
            }}
            src={image}
            alt={`${fieldName} image`}
          />
        </div>
      )}
    </div>
  );
};
