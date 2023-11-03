import { settings } from "@/features/layouts/shared/google-map-settings";
import { FormikInputField, FormikTextAria } from "@/features/ui";
import {
  Autocomplete,
  GoogleMap,
  PolygonF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useField } from "formik";
import { useCallback, useRef, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { PiSealWarningFill } from "react-icons/pi";

const initialLocation = {
  lat: 23.777176,
  lng: 90.399452,
};

export const MapPolygon = () => {
  const { isLoaded } = useJsApiLoader(settings);
  const [, { error: latLongError }] = useField("latLong");
  const [{ value: coords }, , coordsForm] = useField("latLong.coordinates");
  const [{ value: inputValue }, , inputForm] = useField("autocompleteInput");
  const [autocomplete, setAutocomplete] = useState(null);
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    const { lat, lng } = place.geometry.location;

    const latLng = { lat: lat(), lng: lng() };
    inputForm.setValue(place.name);
    coordsForm.setValue([latLng, latLng]);
  };

  const clear = () => {
    inputForm.setValue("");
    coordsForm.setValue([]);
  };

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      coordsForm.setValue(nextPath);
    }
  }, [coords]);

  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  const centerLoc = coords.length ? coords[0] : initialLocation;
  const paths = coords.length ? coords : [initialLocation, initialLocation];
  const pathsString = paths.reduce((prev, next, index) => {
    return (
      prev +
      (index !== 0 ? ", " : "") +
      "( " +
      next.lat +
      ", " +
      next.lng +
      " )"
    );
  }, "");
  return (
    <div className="border py-3 px-2 rounded">
      {Boolean(latLongError?.coordinates) && (
        <Alert
          className="text-center d-flex align-items-center justify-content-center gap-2 text-danger"
          variant="warning"
        >
          <span>
            <PiSealWarningFill className="fs-2 " />
          </span>
          You've to choose a area to 'submit' the form.
        </Alert>
      )}

      <fieldset className=" p-1 mb-1 p-4">
        <legend>Location</legend>
        <Row>
          <Col xs={12} md={6} className="mb-1">
            <Autocomplete
              onLoad={(autocomplete) => {
                setAutocomplete(autocomplete);
              }}
              onPlaceChanged={handlePlaceSelect}
              restrictions={{
                country: "bd",
              }}
            >
              <FormikInputField
                name="autocompleteInput"
                inputFieldProps={{
                  label: "Location Name",
                  placeholder: "Search location",
                  value: inputValue,
                  onChange: (e) => inputForm.setValue(e.target.value),
                }}
              />
            </Autocomplete>
          </Col>
          <Col xs={12} md={6} className="mb-1">
            <FormikTextAria
              name="location"
              textAreaProps={{
                value: pathsString,
                label: "Lat. & Long.",
              }}
              disabled={true}
            />

            <Button
              variant="warning"
              size="sm"
              className="mt-2"
              onClick={() => {
                clear();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </fieldset>

      <GoogleMap
        center={centerLoc}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: 350 }}
      >
        <PolygonF
          editable
          draggable
          path={paths}
          onMouseUp={onEdit}
          onDragEnd={onEdit}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </GoogleMap>
    </div>
  );
};
