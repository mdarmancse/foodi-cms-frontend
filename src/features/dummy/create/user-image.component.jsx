import { FormikImageField } from "@/features/ui";
import { useField } from "formik";

export const UserImage = () => {
  const [field, _, form] = useField("image");

  const image = field?.value?.[0];

  return (
    <div>
      <div>
        {image && (
          <div className="position-relative">
            <div className="position-absolute">
              <span
                style={{
                  fontSize: "30px",
                  color: "white",
                }}
                onClick={() => form.setValue("")}
              >
                {" "}
                X
              </span>
            </div>
            <img
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
              }}
              src={URL.createObjectURL(image)}
              alt="user"
            />
          </div>
        )}
      </div>

      <FormikImageField
        name="image"
        imageFieldProps={{
          label: "Image",
          multiple: true,
          required: true,
        }}
      />
    </div>
  );
};
