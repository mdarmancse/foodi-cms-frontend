import { FormikAutoComplete, FormikInputField } from "@/features/ui";
import { Col } from "react-bootstrap";
import { useGetCitiesForZonesQuery } from "../zone-api-slice";

export const BasicFields = () => {
  const { data, isLoading, isSuccess } = useGetCitiesForZonesQuery();

  const cityList = (isSuccess && data?.data) || [];
  return (
    <>
      <Col xs={12} sm={6} className="mb-1">
        <FormikInputField
          name="name"
          inputFieldProps={{
            label: "Zone Name",
            placeholder: "Enter area name",
            required: true,
          }}
        />
      </Col>

      <Col xs={12} sm={6} className="mb-1">
        <FormikAutoComplete
          name="cityId"
          autoCompleteProps={{
            label: "City",
            required: true,
            placeholder: "Select city",
            options: cityList,
            isClearable: true,
          }}
        />
      </Col>
    </>
  );
};
