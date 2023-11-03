import { Col } from "react-bootstrap";
import { FieldArray } from "formik";
import { FormikSelectField } from "@/features/ui";
import { TfiTrash, TfiPlus } from "react-icons/tfi";

export const SystemOptionDetails = ({
  values,
  setDeleteZones,
  id,
  zoneOptions,
  editData,
}) => {
  return (
    <FieldArray
      name="systemOptionDetails"
      render={(arrayHelpers) => (
        <>
          {values?.systemOptionDetails?.map((item, index) => (
            <>
              <div className="d-flex justify-content-around">
                <Col md={id ? 11 : 12}>
                  <FormikSelectField
                    name={`systemOptionDetails.${index}.zoneId`}
                    selectFieldProps={{
                      label: "Zone",
                      options: zoneOptions || [],
                    }}
                  />
                  <div className="d-flex justify-content-end align-items-center gap-1 my-1">
                    <button
                      onClick={() => {
                        arrayHelpers.push(item);
                        // setAdd((prev) => [...prev, item]);
                      }}
                      type="button"
                      className="btn btn-sm btn-primary"
                    >
                      <TfiPlus />
                    </button>
                    {values?.systemOptionDetails?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteZones((prev) => [
                            ...prev,
                            editData?.data?.systemOptionDetails[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </Col>
              </div>
            </>
          ))}
        </>
      )}
    />
  );
};
