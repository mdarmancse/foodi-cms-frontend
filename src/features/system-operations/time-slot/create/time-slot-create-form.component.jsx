import { Formik, Form, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  TimeSlotValidationSchema,
  initailValue,
  operation,
} from "./form.config";
import { Button, Col, Row } from "react-bootstrap";
import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useGetAllWeekDaysQuery, useGetAllZonesQuery } from "@/features/api";
import {
  useAddTimeSlotMutation,
  useUpdateTimeSlotMutation,
  useGetTimeSlotByIdQuery,
} from "../time-slot-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import moment from "moment";

export const TimeSlotForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: zoneOptions } = useGetAllZonesQuery();
  const { data: weekDayOptions } = useGetAllWeekDaysQuery();
  const [addTimeSlot, { data: postData, isSuccess: postSuccess }] = useAddTimeSlotMutation();
  const [editTimeSlot, { data: puttData, isSuccess: puttSuccess }] = useUpdateTimeSlotMutation();
  const { data: timeSlot, isFetching } = useGetTimeSlotByIdQuery(params.id, { skip: !params.id, });
  const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state.commonTable)
  const [getList] = useLazyGetTableListQuery();
  
  const handleSubmit = async(values) => {
    const ids = values?.operationsDetails?.map((item) => item?.id);
    let newValues = {
        ...values,
        startTime : values.startTime.length == 8 ? values.startTime : values.startTime + ":00",
        endTime : values.endTime.length == 8 ? values.endTime : values.endTime + ":00",
        weekDay : parseInt(values.weekDay),
        // platformOperationDetailIds : ids
    }
    params?.id ? editTimeSlot(newValues) : addTimeSlot(newValues);
  }

  useEffect(() => {
    if(postData && postSuccess){
        toast.success(postData?.message);
        getList({
            url : Api.GetPlatformTimeSlot,
            params : {
                pageNumber,
                itemsPerPage,
                isActive
            }
        });
        navigate("/systemOperation/time-slot")
    }
  },[postData])

  useEffect(() => {
    if(puttData && puttSuccess) {
        toast.success(puttData?.message);
        getList({
            url : Api.GetPlatformTimeSlot,
            params : {
                pageNumber,
                itemsPerPage,
                isActive
            }
        });
        navigate("/systemOperation/time-slot")
    }
  },[puttData])
  return (
    <>
      {isFetching ? (
        ""
      ) : (
        <Formik
          initialValues={
            params?.id
              ? {
                  id: params.id,
                  weekDay: timeSlot?.data?.weekDay,
                  startTime: timeSlot?.data?.startTime,
                  endTime: timeSlot?.data?.endTime,
                  operationsDetails: timeSlot?.data?.operations,
                }
              : initailValue
          }
          validationSchema={TimeSlotValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={6}>
                  <FormikSelectField
                    name="weekDay"
                    selectFieldProps={{
                      label: "Week day",
                      options: weekDayOptions?.items,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormikInputField
                    name="startTime"
                    inputFieldProps={{ label: "Start time", type: "time" }}
                  />
                </Col>
                <Col>
                  <FormikInputField
                    name="endTime"
                    inputFieldProps={{ label: "End time", type: "time" }}
                  />
                </Col>
              </Row>
              <Row>
                <FieldArray
                  name="operationsDetails"
                  render={(arrayHelpers) => (
                    <>
                      {values?.operationsDetails?.map((item, index) => (
                        <Row key={index}>
                          <Col>
                            <FormikSelectField
                              name={`operationsDetails[${index}].zoneId`}
                              selectFieldProps={{
                                label: "Zone",
                                options: zoneOptions?.items,
                              }}
                            />
                          </Col>
                          <Col className="mt-4 pt-1 d-flex justify-content-end gap-2">
                            {values?.operationsDetails?.length > 1 && (
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <FiTrash />
                              </Button>
                            )}
                            {values?.operationsDetails?.length == index + 1 && (
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => arrayHelpers.push(operation)}
                              >
                                <FiPlus />
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                />
              </Row>
              <div className="d-flex justify-content-center mt-4 mb-1">
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
