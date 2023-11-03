import { Col } from "react-bootstrap";
import { FieldArray } from "formik";
import { FormikSelectField } from "@/features/ui";
import { TfiTrash, TfiPlus } from "react-icons/tfi";

export const OptionSettings = ({
  values,
  editData,
  setDeleteBranches,
  setDeleteCuisines,
  setDeleteZones,
  setDeleteUsers,
  setDeleteSubscriptions,
  branchOptions,
  cuisineOptions,
  zoneOptions,
  userOptions,
  subscriptionOptions,
}) => {
  // console.log("OptionSettings", values);
  return (
    <>
      <FieldArray
        name="branches"
        render={(arrayHelpers) => (
          <>
            {values?.type == "branch_wise" &&
              values?.branches?.map((item, index) => (
                <>
                  <Col md={12}>
                    <FormikSelectField
                      name={`branches.${index}`}
                      selectFieldProps={{
                        label: "Branches",
                        options: branchOptions || [],
                      }}
                    />
                  </Col>
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
                    {values?.branches?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteBranches((prev) => [
                            ...prev,
                            editData?.branches[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </>
              ))}
          </>
        )}
      />
      <FieldArray
        name="cuisines"
        render={(arrayHelpers) => (
          <>
            {values?.type == "cuisine_wise" &&
              values?.cuisines?.map((item, index) => (
                <>
                  <Col md={12}>
                    <FormikSelectField
                      name={`cuisines.${index}`}
                      selectFieldProps={{
                        label: "Cuisines",
                        options: cuisineOptions || [],
                      }}
                    />
                  </Col>
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
                    {values?.cuisines?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteCuisines((prev) => [
                            ...prev,
                            editData?.cuisines[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </>
              ))}
          </>
        )}
      />
      <FieldArray
        name="zones"
        render={(arrayHelpers) => (
          <>
            {values?.type == "zone_wise" &&
              values?.zones?.map((item, index) => (
                <>
                  <Col md={12}>
                    <FormikSelectField
                      name={`zones.${index}`}
                      selectFieldProps={{
                        label: "Zones",
                        options: zoneOptions || [],
                      }}
                    />
                  </Col>
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
                    {values?.zones?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteZones((prev) => [
                            ...prev,
                            editData?.zones[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </>
              ))}
          </>
        )}
      />
      <FieldArray
        name="users"
        render={(arrayHelpers) => (
          <>
            {values?.type == "user_wise" &&
              values?.users?.map((item, index) => (
                <>
                  <Col md={12}>
                    <FormikSelectField
                      name={`users.${index}`}
                      selectFieldProps={{
                        label: "Users",
                        options: userOptions || [],
                      }}
                    />
                  </Col>
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
                    {values?.users?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteUsers((prev) => [
                            ...prev,
                            editData?.users[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </>
              ))}
          </>
        )}
      />
      <FieldArray
        name="subscriptionTypes"
        render={(arrayHelpers) => (
          <>
            {(values.type == "branch_wise" ||
              values?.type == "cuisine_wise" ||
              values?.type == "zone_wise") &&
              values?.subscriptionTypes?.map((item, index) => (
                <>
                  <Col md={12}>
                    <FormikSelectField
                      name={`subscriptionTypes.${index}`}
                      selectFieldProps={{
                        label: "Subscription Type",
                        options: subscriptionOptions || [],
                      }}
                    />
                  </Col>
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
                    {values?.subscriptionTypes?.length > 1 && (
                      <button
                        onClick={() => {
                          arrayHelpers.remove(index);
                          setDeleteSubscriptions((prev) => [
                            ...prev,
                            editData?.subscriptionTypes[index]?.id,
                          ]);
                        }}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <TfiTrash />
                      </button>
                    )}
                  </div>
                </>
              ))}
          </>
        )}
      />
    </>
  );
};
