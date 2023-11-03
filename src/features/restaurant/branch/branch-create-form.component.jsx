import {
  FormikAutoComplete,
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikToggleButton,
  ImagePreview,
} from "@/features/ui";
import { settings } from "@/features/layouts/shared/google-map-settings";
import {
  Autocomplete,
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Field, FieldArray, Form, useFormikContext } from "formik";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { WorkingHoursTemplate } from "./form.config";
import { useState } from "react";

export function BranchCreateForm({}) {
  const [searchPlace, setSearchPlaces] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  const { values } = useFormikContext();

  const dayOptions = [
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
  ];

  const parentRestaurantOptions = [
    { label: "PizzaHut", value: 1 },
    { label: "Takeout", value: 2 },
    { label: "KFC", value: 3 },
    { label: "Segafredo Espresso", value: 4 },
  ];

  const cuisineOptions = [
    { label: "Bangla", value: 1 },
    { label: "Indian", value: 2 },
    { label: "Mexican", value: 3 },
    { label: "Chinese", value: 4 },
  ];

  const zonalAdminOptions = [
    { label: "Messi", value: 1 },
    { label: "Ronaldo", value: 2 },
    { label: "Neymar", value: 3 },
    { label: "Mbappe", value: 4 },
  ];

  const branchAdminOptions = [
    { label: "Messi", value: 1 },
    { label: "Ronaldo", value: 2 },
    { label: "Neymar", value: 3 },
    { label: "Mbappe", value: 4 },
  ];

  const centralAdminOptions = [
    { label: "Messi", value: 1 },
    { label: "Ronaldo", value: 2 },
    { label: "Neymar", value: 3 },
    { label: "Mbappe", value: 4 },
  ];

  const branchAttributeOptions = [
    { label: "Fine Dining", value: 1 },
    { label: "Cloud Kitchen", value: 2 },
    { label: "Classic", value: 3 },
  ];

  const priceRangeOptions = [
    { label: "High", value: "৳৳৳" },
    { label: "Medium", value: "৳৳" },
    { label: "Low", value: "৳" },
  ];
  const initialLatLong = {
    lat: 23.8103,
    lng: 90.4125,
  };
  const { isLoaded } = useJsApiLoader(settings);

  const moveMarker = (e) => {
    return;
  };

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    const { lat, lng } = place.geometry.location;

    // setSearchPlaces(place.name);
    // setInitialLatLong({ lat: lat(), lng: lng() });
    // setLocationData({
    //   ...locationData,
    //   location: [lat(), lng()],
    //   lat: lat(),
    //   lng: lng(),
    // });
  };

  return (
    <Form>
      <Row>
        <Col xs={12} md={6}>
          <Stack gap={2}>
            <FormikInputField
              name="Name"
              inputFieldProps={{
                label: lang("name"),
                placeholder: lang("name"),
                required: true,
              }}
            />

            <FormikSelectField
              name="ParentRestaurantId"
              selectFieldProps={{
                label: lang("restaurant"),
                options: parentRestaurantOptions,
                required: true,
              }}
            />

            <FormikInputField
              name="Email"
              inputFieldProps={{
                label: lang("email"),
                type: "email",
                placeholder: lang("email"),
                required: true,
              }}
            />

            <FormikInputField
              name="PhoneNumber"
              inputFieldProps={{
                label: lang("mobile"),
                placeholder: lang("mobile"),
                required: true,
              }}
            />

            <FormikSelectField
              name="ZonalAdmin"
              selectFieldProps={{
                label: lang("zonal_admin"),
                options: zonalAdminOptions,
                required: true,
              }}
            />

            <FormikSelectField
              name="BranchAdmin"
              selectFieldProps={{
                label: lang("branch_admin"),
                options: branchAdminOptions,
                required: true,
              }}
            />
            <FormikSelectField
              name="CentralAdmin"
              selectFieldProps={{
                label: lang("central_admin"),
                options: centralAdminOptions,
                required: true,
              }}
            />

            <FormikImageField
              name="Image"
              imageFieldProps={{
                label: lang("image"),
                required: false,
              }}
            />

            <ImagePreview fieldName={"Image"} />

            <FormikImageField
              name="CoverImage"
              imageFieldProps={{
                label: lang("cover_image"),
                required: false,
              }}
            />

            <ImagePreview fieldName={"CoverImage"} />

            <FormikAutoComplete
              name="Cuisines"
              autoCompleteProps={{
                label: lang("cuisines"),
                options: cuisineOptions,
                required: true,
                isMulti: true,
              }}
            />
          </Stack>
        </Col>
        <Col>
          <Stack gap={2}>
            <FormikToggleButton
              name="IsDelivery"
              toggleButtonProps={{
                required: true,
                label: lang("delivery"),
              }}
            />

            <FormikToggleButton
              name="IsTakePreOrder"
              toggleButtonProps={{
                required: true,
                label: lang("pre_order"),
              }}
            />

            <FormikToggleButton
              name="IsVeg"
              toggleButtonProps={{
                required: true,
                label: lang("vegetarian"),
              }}
            />
            <FormikToggleButton
              name="IsPickup"
              toggleButtonProps={{
                required: true,
                label: lang("pickup"),
              }}
            />
            <FormikToggleButton
              name="IsDine"
              label={lang("dine_in")}
              toggleButtonProps={{
                required: true,
                label: lang("dine_in"),
              }}
            />

            <FormikToggleButton
              name="PriceRange"
              toggleButtonProps={{
                required: true,
                label: lang("price_range"),
                options: priceRangeOptions,
              }}
            />
            <FormikInputField
              name="Commission"
              inputFieldProps={{
                label: `${lang("commission")} (%)`,
                placeholder: `${lang("commission")} (%)`,
                required: true,
                type: "number",
              }}
            />

            <FormikInputField
              name="MinOrderValue"
              inputFieldProps={{
                label: `${lang("min_order_value")}`,
                placeholder: `${lang("min_order_value")}`,
                required: true,
                type: "number",
              }}
            />

            <FormikInputField
              name="DeliveryTime"
              inputFieldProps={{
                label: `${lang("delivery_time")}`,
                placeholder: `${lang("delivery_time")}`,
                required: true,
                type: "number",
              }}
            />

            <FormikInputField
              name="PickupTime"
              inputFieldProps={{
                label: `${lang("pickup_time")}`,
                placeholder: `${lang("pickup_time")}`,
                required: true,
                type: "number",
              }}
            />

            <FormikInputField
              name="Address"
              inputFieldProps={{
                label: `${lang("address")}`,
                placeholder: `${lang("address")}`,
                required: true,
              }}
            />

            <FormikAutoComplete
              name="Attributes"
              autoCompleteProps={{
                label: lang("attributes"),
                options: branchAttributeOptions,
                isMulti: true,
              }}
            />
          </Stack>
        </Col>
      </Row>

      <Row className="mt-2 mx-2">
        <Card className="p-2">
          <Card.Title>{lang("location")}</Card.Title>
          <Card.Body>
            {/* <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col lg={5} md={5} sm={12}>
                <StandaloneSearchBox
                  onLoad={(autocomplete) => {
                    setAutocomplete(autocomplete);
                  }}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Search location"
                    value={searchPlace}
                    onChange={(e) => setSearchPlaces(e.target.value)}
                  />
                </StandaloneSearchBox>
              </Col>

              <Col lg={1} md={1} sm={12} className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  // onClick={() => {
                  //   clear();
                  // }}
                >
                  Clear
                </button>
              </Col>
            </Row> */}
            {isLoaded && (
              <Field>
                {({
                  field,
                  meta: { touched, error },
                  form: { isSubmitting, setFieldValue, setFieldTouched },
                }) => {
                  return (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "400px",
                      }}
                    >
                      <GoogleMap
                        center={field.value.Location}
                        zoom={18}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                      >
                        <MarkerF
                          draggable={true}
                          onDragEnd={(e) => {
                            setFieldValue("Location", {
                              lat: e.latLng.lat(),
                              lng: e.latLng.lng(),
                            });
                          }}
                          position={field.value.Location}
                        />
                      </GoogleMap>
                    </div>
                  );
                }}
              </Field>
            )}
          </Card.Body>
        </Card>
      </Row>

      <Row className="mt-2 mx-2">
        <Card className="p-2">
          <Card.Title>{lang("working_hours")}</Card.Title>
          <Card.Body>
            <FieldArray name="WorkingHours">
              {({ insert, remove, push }) => (
                <div>
                  {values.WorkingHours.length > 0 &&
                    values.WorkingHours.map((workingHour, index) => (
                      <Stack gap={2} key={index}>
                        <FormikSelectField
                          name={`WorkingHours.${index}.Day`}
                          selectFieldProps={{
                            label: lang("day"),
                            options: dayOptions,
                            required: true,
                          }}
                        />
                        <FormikInputField
                          name={`WorkingHours.${index}.OpenTime`}
                          inputFieldProps={{
                            label: `${lang("open")} ${lang("time")}`,
                            required: true,
                            type: "time",
                          }}
                        />

                        <FormikInputField
                          name={`WorkingHours.${index}.CloseTime`}
                          inputFieldProps={{
                            label: `${lang("close")} ${lang("time")}`,
                            required: true,
                            type: "time",
                          }}
                        />

                        <Col>
                          <Button
                            variant="danger"
                            onClick={() => remove(index)}
                          >
                            X
                          </Button>
                        </Col>
                      </Stack>
                    ))}
                  <Button
                    variant="info"
                    className="mt-2 secondary"
                    onClick={() => push(WorkingHoursTemplate)}
                  >
                    Add More
                  </Button>
                </div>
              )}
            </FieldArray>
          </Card.Body>
        </Card>
      </Row>

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
