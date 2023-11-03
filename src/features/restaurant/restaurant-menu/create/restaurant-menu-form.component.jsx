import {
  FormikAutoComplete,
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, useFormikContext } from "formik";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  useGetBranchNameQuery,
  useLazyGetCategoryNamesByRestaurantQuery,
} from "../restaurant-api-slice";
import { BasicFields } from "./basic-fields.component";
import { MenuAvailability } from "./menu-availability.component";
import { Variation } from "./variation.component";

export const RestaurantMenuForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const { isLoading, data } = useGetBranchNameQuery();
  const [findCategory, { data: catResponse, isLoading: isCategoryLoading }] =
    useLazyGetCategoryNamesByRestaurantQuery();

  useEffect(() => {
    if (values.branchId?.value) {
      findCategory({
        ids: values.branchId?.value,
      });
    }
  }, [values.branchId?.value]);

  const branchList = data?.data || [];
  const categoryList = catResponse?.data || [];
  return (
    <Form className="mb-4 shadow m-2 p-4 border border-primary rounded">
      <Row>
        <Col>
          <FormikAutoComplete
            name="branchId"
            autoCompleteProps={{
              label: "Branch Name",
              required: true,
              isLoading: isLoading,
              options: branchList || [],
              onChange: (row) => {
                setFieldValue("branchId", row);
                setFieldValue("categoryId", "");
                setFieldValue("menuAvailableTimes", []);
              },
            }}
          />
        </Col>
        <Col>
          <FormikAutoComplete
            name="categoryId"
            autoCompleteProps={{
              label: "Category",
              required: true,
              options: categoryList || [],
            }}
          />
        </Col>
      </Row>
      <Card className="rounded-1 p-2 mt-4">
        <BasicFields />

        <Row className="my-3">
          <Col>
            <FormikCheckBox
              name="hasVariation"
              checkBoxProps={{
                label: "Has Variation & Add-ons",
              }}
            />
          </Col>

          <Col>
            <FormikInputField
              name="menuGroupId"
              inputFieldProps={{
                label: "Menu Group Id",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Variation />
        </Row>

        <Row className="my-3">
          <Col>
            <FormikInputField
              name="vat"
              inputFieldProps={{
                label: "Vat(%)",
                required: true,
              }}
            />
          </Col>
          <Col>
            <FormikInputField
              name="sd"
              inputFieldProps={{
                label: "SD (%)",
                required: true,
              }}
            />
          </Col>
        </Row>

        <Row className="my-3">
          <Col>
            <FormikCheckBox
              name="isPopular"
              checkBoxProps={{
                label: "Popular",
              }}
            />
          </Col>
          <Col>
            <FormikCheckBox
              name="isDelivery"
              checkBoxProps={{
                label: "Delivery",
              }}
            />
          </Col>
          <Col>
            <FormikCheckBox
              name="isPickup"
              checkBoxProps={{
                label: "Pickup",
              }}
            />
          </Col>
          <Col>
            <FormikCheckBox
              name="isDine"
              checkBoxProps={{
                label: "Dine",
              }}
            />
          </Col>
        </Row>

        <MenuAvailability />

        <div className="d-flex justify-content-end mt-4">
          <FormikSubmitButton>Submit</FormikSubmitButton>
        </div>
      </Card>
    </Form>
  );
};
