import { useGetBranchNameQuery } from "@/features/restaurant/restaurant-menu";
import {
  FormikAutoComplete,
  FormikCheckBox,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { Form, useField, useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";

export function PopupBannerForm() {
  const { setFieldValue } = useFormikContext();

  const redirectOptions = [
    { label: "Campaign", value: "campaign" },
    { label: "Restaurant", value: "restaurant" },
  ];

  const [redirectField, redirectMeta, redirectHelper] = useField("isRedirect");
  const [redirectTypeField, redirectTypeMeta, redirectTypeHelper] =
    useField("redirectType");
  const [{ value }, , imageFieldForm] = useField("image");
  const image = value;

  const { isLoading, data } = useGetBranchNameQuery();
  const branchList = data?.data || [];

  const { id } = useParams();
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="title"
            inputFieldProps={{ label: "Title", required: true }}
          />
        </Col>
      </Row>
      <Col xs={12} className="mb-1">
        <FormikTextAria
          name="description"
          textAreaProps={{ label: "Description" }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikCheckBox
          name="isRedirect"
          checkBoxProps={{ label: "Redirect" }}
        />
      </Col>
      {redirectField.value == true ? (
        <Col xs={12} className="mb-1">
          <FormikAutoComplete
            name="redirectType"
            autoCompleteProps={{
              label: "Redirection Type",
              placeholder: "Select Type",
              options: redirectOptions,
              isMulti: false,
              isClearable: true,
            }}
          />
        </Col>
      ) : (
        ""
      )}
      {redirectField.value == true &&
        redirectTypeField?.value?.value == "campaign" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="campaignId"
              autoCompleteProps={{
                label: "Campaign",
                placeholder: "Select Campaign",
                options: [
                  { label: "one", value: "1" },
                  { label: "two", value: "2" },
                ],
                isMulti: false,
                isClearable: true,
              }}
            />
          </Col>
        )}
      {redirectField.value == true &&
        redirectTypeField?.value?.value == "restaurant" && (
          <Col xs={12} className="mb-1">
            <FormikAutoComplete
              name="restaurantId"
              autoCompleteProps={{
                label: "Restaurant",
                placeholder: "Select Restaurant",
                isLoading: isLoading,
                isMulti: false,
                isClearable: true,
                options: branchList || [],
                onChange: (row) => {
                  setFieldValue("restaurantId", row);
                },
              }}
            />
          </Col>
        )}
      <Col xs={12} className="mb-1">
        <FormikImageField
          name="image"
          imageFieldProps={{
            label: "Image",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

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
            src={typeof image === "object" ? URL.createObjectURL(image) : image}
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
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="startDate"
          inputFieldProps={{
            label: "Start Date",
            placeholder: "Start Date",
            type: "datetime-local",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="endDate"
          inputFieldProps={{
            label: "End Date",
            placeholder: "End Date",
            type: "datetime-local",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikCheckBox
          name="cancellable"
          checkBoxProps={{ label: "Cancellable" }}
        />
      </Col>
      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">
          {id ? "Update" : "Submit"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
