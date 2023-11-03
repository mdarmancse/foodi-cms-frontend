import { useGetBranchNameQuery } from "@/features/restaurant/restaurant-menu";
import { DisplayImage } from "@/features/ui/display-image";
import { Form, useField, useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  FormikAutoComplete,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
} from "../../ui";

export const DineinGalleryForm = () => {
  const { setFieldValue } = useFormikContext();

  const [{ value }, , imageFieldForm] = useField("thumbnailImage");
  const image = value;
  const { id } = useParams();

  const { isLoading, data } = useGetBranchNameQuery();
  const branchList = data?.data || [];

  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{ label: "Name", required: true }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikAutoComplete
            name="branchId"
            autoCompleteProps={{
              label: "Branch",
              placeholder: "Select Branch",
              isLoading: isLoading,
              isMulti: false,
              isClearable: true,
              options: branchList || [],
              onChange: (row) => {
                setFieldValue("branchId", row);
              },
            }}
          />
        </Col>

        <Col xs={12} className="mb-1">
          <FormikImageField
            name="thumbnailImage"
            imageFieldProps={{
              label: "Thumbnail Image",
              accept: ".jpg, .jpeg, .bmp, .png, .webp",
            }}
          />
        </Col>

        {image && <DisplayImage value={image} id={id} />}

        <Col xs={12} className="mb-1">
          <FormikImageField
            name="images"
            multiple={true}
            imageFieldProps={{
              label: "Gallery Image",
              accept: ".jpg, .jpeg, .bmp, .png, .webp",
            }}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">
          {id ? "Update" : "Submit"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
};
