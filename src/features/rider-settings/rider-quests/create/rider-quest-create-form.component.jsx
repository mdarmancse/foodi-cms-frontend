import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import {
  FormikInputField,
  TextEditor,
  FormikAutoComplete,
  FormikSwitchButton,
  FormikSubmitButton,
} from "../../../ui";
import { FieldArray, Form, Formik } from "formik";
import {
  RiderQuestCreateSchema,
  goalTemaplate,
  initialValue,
} from "./form.config";
import { TfiTrash, TfiPlus } from "react-icons/tfi";
import {
  useAddQuestsMutation,
  useEditQuestsMutation,
  useGetQuestByIdQuery,
} from "../rider-quests-api";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const zones = [
  { label: "Gulshan2 Up", value: 9 },
  { label: "Gulshan1", value: 8 },
  { label: "Gulshan", value: 7 },
  { label: "Chittagong", value: 5 },
  { label: "Bagura", value: 4 },
  { label: "Baridhara", value: 2 },
];

export const RiderQuestAddForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleted, setDeleted] = useState([]);
  // console.log("deleted", deleted);
  const { data: editQuest } = useGetQuestByIdQuery(id, { skip: !id });
  const [addQuests, { isSuccess: questSuccess, isError: questError }] =
    useAddQuestsMutation();

  const [editQuests, { isSuccess: editSuccess, isError: editError }] =
    useEditQuestsMutation();

  const filteredZones = zones.filter((zone) =>
    editQuest?.data?.zones?.find((item) => item.zoneId == zone.value)
  );

  // console.log({ filteredZones });

  // console.log("editQuest", editQuest?.data);

  const handleSubmission = async (values) => {
    // console.log(values);

    const zoneIds = values.zoneIds.map((zone) => parseInt(zone?.value));
    let deletedRow = deleted.map((row) => {
      return {
        ...row,
        isActive: false,
      };
    });
    let items = values?.goals
      ?.filter((item) =>
        editQuest?.data?.goals.find((prev) => prev.createdAt !== item.createdAt)
      )
      .map((item) => {
        return {
          ...item,
          questId: Number(id),
          isActive: true,
        };
      });
    // console.log("items", items);
    // console.log("deletedRow", deletedRow);
    let params = id
      ? {
          ...values,
          zoneIds: zoneIds,
          startDate: moment(values.startDate).toISOString(),
          endDate: moment(values.endDate).toISOString(),
          startTime:
            values?.startTime?.length == 5
              ? values?.startTime + ":00"
              : values?.startTime,
          endTime:
            values?.endTime?.length == 5
              ? values?.endTime + ":00"
              : values?.endTime,

          goals:
            deletedRow.length > 0
              ? [...values.goals, ...deletedRow]
              : [...items],
        }
      : {
          ...values,
          zoneIds: zoneIds,
          startDate: moment(values.startDate).toISOString(),
          endDate: moment(values.endDate).toISOString(),
          startTime: values.startTime + ":00",
          endTime: values.endTime + ":00",
        };
    // console.log("params", params);
    id ? await editQuests(params) : await addQuests(params);
  };

  useEffect(() => {
    if (questSuccess) {
      toast.success("Created Successfully");
      navigate("/quests");
    }
    if (questError) {
      toast.error("Error creating");
    }
    if (editSuccess) {
      toast.success("Upadted Successfully");
      navigate("/quests");
    }
    if (editError) {
      toast.error("Error updating");
    }
  }, [questSuccess, questError, editSuccess, editError]);

  return (
    <Formik
      enableReinitialize
      initialValues={
        id
          ? {
              id,
              name: editQuest?.data?.name,
              acceptableAcceptanceRate:
                editQuest?.data?.acceptableAcceptanceRate,
              acceptableCompletionRate:
                editQuest?.data?.acceptableCompletionRate,
              startDate: moment(editQuest?.data?.startDate).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              endDate: moment(editQuest?.data?.endDate).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              startTime: editQuest?.data?.startTime,
              endTime: editQuest?.data?.endTime,
              hasTimeLimit: editQuest?.data?.hasTimeLimit,
              rules: editQuest?.data?.rules,
              zoneIds: filteredZones,
              goals: editQuest?.data?.goals,
            }
          : initialValue
      }
      validationSchema={id ? "" : RiderQuestCreateSchema}
      onSubmit={(values) => handleSubmission(values)}
    >
      {({ values, handleReset, setFieldValue }) => (
        <Form className="mt-4">
          {/* <p>{JSON.stringify(values)}</p> */}
          <Row className="mb-3">
            <FormikInputField
              name="name"
              inputFieldProps={{ label: "Name", required: true, type: "text" }}
            />
          </Row>
          <Row className="mb-3">
            <FormikAutoComplete
              name="zoneIds"
              autoCompleteProps={{
                label: "Zone",
                required: true,
                options: zones,
                isMulti: true,
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormikInputField
              name="acceptableAcceptanceRate"
              inputFieldProps={{
                label: "Order Acceptence Rate (%)",
                type: "number",
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormikInputField
              name="acceptableCompletionRate"
              inputFieldProps={{
                label: "Order Completion Rate (%)",
                type: "number",
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormikInputField
              name="startDate"
              inputFieldProps={{
                label: "Start Time",
                type: "datetime-local",
                required: "true",
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormikInputField
              name="endDate"
              inputFieldProps={{
                label: "End Time",
                type: "datetime-local",
                required: "true",
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormikSwitchButton
              name="hasTimeLimit"
              switchButtonProps={{
                label: "Time Limit (In a day)",
                // required: "true",
              }}
            />
          </Row>
          {values?.hasTimeLimit == true && (
            <>
              <Row className="mb-3">
                <FormikInputField
                  name="startTime"
                  inputFieldProps={{
                    label: "Start Time",
                    type: "time",
                    required: "true",
                  }}
                />
              </Row>
              <Row className="mb-3">
                <FormikInputField
                  name="endTime"
                  inputFieldProps={{
                    label: "End Time",
                    type: "time",
                    required: "true",
                  }}
                />
              </Row>
            </>
          )}
          <Row className="mb-3">
            <label className="col-md-2 col-form-label">
              Rules<span className="text-danger">*</span>
            </label>
            <div className="col-md-12">
              <TextEditor
                value={values.rules}
                onEditorChange={(newValue, editor) => {
                  setFieldValue("rules", newValue);
                }}
              />
            </div>
          </Row>
          <Row className="mb-3">
            <Table
              striped
              bordered
              hover
              className="col-md-10 border-rounded"
              style={{ borderRadius: "5px" }}
            >
              <thead>
                <tr>
                  <th
                    className="text-center"
                    colSpan={5}
                    style={{ background: "#c4f0c5" }}
                  >
                    Goals
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Serial</th>
                  <th>Name</th>
                  <th>Required numbers of orders</th>
                  <th>Per oder value</th>
                  <th>Action</th>
                </tr>

                <FieldArray
                  name="goals"
                  render={(arrayHelpers) => (
                    <>
                      {values.goals?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <FormikInputField
                              name={`goals[${index}].sl`}
                              inputFieldProps={{ type: "number" }}
                            />
                          </td>
                          <td>
                            <FormikInputField
                              name={`goals[${index}].name`}
                              inputFieldProps={{ type: "text" }}
                            />
                          </td>
                          <td>
                            <FormikInputField
                              name={`goals[${index}].requiredNumberOfOrder`}
                              inputFieldProps={{ type: "number" }}
                            />
                          </td>
                          <td>
                            <FormikInputField
                              name={`goals[${index}].perOrderValue`}
                              inputFieldProps={{ type: "number" }}
                            />
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center gap-1">
                              <button
                                onClick={() => {
                                  arrayHelpers.push(goalTemaplate);
                                  // setAdd((prev) => [...prev, item]);
                                }}
                                type="button"
                                className="btn btn-sm btn-primary"
                              >
                                <TfiPlus />
                              </button>
                              {values?.goals?.length > 1 && (
                                <button
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                    setDeleted((prev) => [...prev, item]);
                                  }}
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                >
                                  <TfiTrash />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                />
              </tbody>
            </Table>
          </Row>
          <div className="d-flex justify-content-end">
            <FormikSubmitButton>Submit</FormikSubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
