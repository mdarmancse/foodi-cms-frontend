import { FormikCheckBox, FormikInputField } from "@/features/ui";
import { useField } from "formik";
import { useEffect } from "react";
import { Alert, Col, Row, Spinner, Stack } from "react-bootstrap";
import { useLazyGetRestaurantTimeSlotByBranchIdQuery } from "../restaurant-api-slice";

export function MenuAvailability(params) {
  const [trigger, { data, isLoading, isUninitialized }] =
    useLazyGetRestaurantTimeSlotByBranchIdQuery();

  const [branchObj] = useField("branchId");
  const [{ value: menuAv }, menuAvMeta, menuAvForm] =
    useField("menuAvailableTimes");
  const branchId = branchObj.value.value;

  useEffect(() => {
    if (branchId) {
      trigger({
        id: branchId,
      });
    }
  }, [branchId]);

  return (
    <div className="my-3  p-3 rounded bg-info bg-opacity-10">
      <label className="fw-bold">Menu availability</label>

      <hr className="my-0 my-2" />

      <div>
        {isLoading && (
          <div className="my-4 d-flex align-items-center  justify-content-center">
            <Spinner animation="border" variant="warning" />
          </div>
        )}

        {!isUninitialized && !data?.length && (
          <p className="text-danger ">No Data Found</p>
        )}

        {Boolean(data?.length) && (
          <div>
            {data?.map((d) => {
              return (
                <Row className="mt-3" key={d?.id}>
                  <Col>
                    <FormikCheckBox
                      name={d?.name}
                      checkBoxProps={{
                        label: d?.name,
                        onChange(event) {
                          const isChecked = event.target.checked;
                          if (isChecked) {
                            menuAvForm.setValue([
                              ...menuAv,
                              {
                                menuItemTimeSlotId: d?.id,
                              },
                            ]);
                          } else {
                            menuAvForm.setValue(
                              [...menuAv].filter(
                                (m) => m.menuItemTimeSlotId !== d?.id
                              )
                            );
                          }
                        },
                        checked: menuAv.find(
                          (menu) => menu?.menuItemTimeSlotId == d?.id
                        ),
                      }}
                    />
                  </Col>
                  <Col>
                    <Stack gap={2} direction="horizontal">
                      <FormikInputField
                        name="1"
                        inputFieldProps={{
                          label: "Start Time",
                          value: d?.startTime,
                          type: "time",
                        }}
                        disabled={true}
                      />
                      <FormikInputField
                        name="2"
                        inputFieldProps={{
                          label: "End Time",
                          value: d?.endTime,
                          type: "time",
                        }}
                        disabled={true}
                      />
                    </Stack>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}

        {menuAvMeta.error && (
          <Alert
            className=" mt-4 text-danger text-capitalize"
            variant="warning"
          >
            {menuAvMeta.error}
          </Alert>
        )}
      </div>
    </div>
  );
}
