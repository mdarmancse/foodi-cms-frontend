import {
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  ImagePreview,
} from "@/features/ui";
import { Form } from "formik";
import { Col, Row, Stack } from "react-bootstrap";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { useGetUserQuery } from "@/features/promo-code/promo-code-api-slice";
import { useEffect, useState } from "react";

export function RestaurantCreateForm() {
  const { isLoading: isUserLoading, data: userData } = useGetUserQuery();
  const [centralAdminOptions, setCentralAdminOptions] = useState([]);

  useEffect(() => {
    if (userData) {
      const options = userData?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setCentralAdminOptions(options);
    }
  }, [userData]);

  return (
    <Form>
      <Row>
        <Col xs={12} md={6}>
          <Stack gap={2}>
            <FormikInputField
              name="name"
              inputFieldProps={{
                label: lang("name"),
                required: true,
              }}
            />
            <FormikInputField
              name="mobile"
              inputFieldProps={{
                required: true,
                label: lang("mobile"),
              }}
            />

            <FormikImageField
              name="logo"
              imageFieldProps={{
                label: lang("logo"),
                required: true,
              }}
            />

            <ImagePreview fieldName={"logo"} />
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
            <FormikSelectField
              name="centralAdmin"
              selectFieldProps={{
                required: true,
                label: lang("central_admin"),
                options: centralAdminOptions,
              }}
            />

            <FormikImageField
              name="coverImage"
              imageFieldProps={{
                label: lang("cover_image"),
                required: true,
              }}
            />

            <ImagePreview fieldName={"coverImage"} />
          </Stack>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
