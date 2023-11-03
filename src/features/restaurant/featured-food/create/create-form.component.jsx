import { initialValues, featuredFoodSchema, foodDetail } from "./form.config";
import { CommonLayout } from "@/features/layouts";
import { Formik, Form, FieldArray } from "formik";
import { LinkButton, FormikSelectField, FormikInputField } from "@/features/ui";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  useGetBranchNamesQuery,
  useLazyGetNamesByBranchIdsQuery,
  useAddFeaturedFoodMutation,
  useGetFeaturedFoodByIdQuery,
  useEditFeaturedFoodMutation,
} from "../featured-food-api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { TfiTrash, TfiPlus } from "react-icons/tfi";
import moment from "moment";

export const FeaturedFoodForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const { data: editData } = useGetFeaturedFoodByIdQuery(id, { skip: !id });
  // console.log("edit", editData?.data);
  const branchIds = editData?.data?.featuredFoodDetail?.map(
    (item) => item.branchId
  );
  // console.log("branchIds", branchIds);

  const [menu, { data: menuItem, isError: menuError, isSuccess: menuSuccess }] =
    useLazyGetNamesByBranchIdsQuery();
  const { data: branch } = useGetBranchNamesQuery();
  const [
    addFeatured,
    { data: addRes, isSuccess: addSuccess, isError: addError },
  ] = useAddFeaturedFoodMutation();
  const [
    editFeatured,
    { data: editRes, isSuccess: editSuccess, isError: editError },
  ] = useEditFeaturedFoodMutation();
  // console.log("branch", branch);

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  // console.log("deleted", deletedIds);

  useEffect(() => {
    branchIds?.forEach(async (item) => {
      let res = await fetch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/restaurants/api/MenuItem/GetNamesByBranchIds?branchIds=${item}`
      );
      const menus = await res.json();
      setItems((prev) => [...prev, menus?.data]);
      // console.log("res", menus?.data);
      return menus;
    });

    // console.log("promises", promises);
  }, [branchIds?.length]);

  // console.log("items", items);

  const handleSubmit = (values) => {
    // console.log("values", values);
    let params = id
      ? {
          ...values,
          startDateTime: moment(values.startDateTime).toISOString(),
          endDateTime: moment(values.endDateTime).toISOString(),
          startTimeInDay:
            values?.startTimeInDay?.length == 8
              ? values.startTimeInDay
              : values.startTimeInDay + ":00",
          endTimeInDay:
            values?.endTimeInDay?.length == 8
              ? values.endTimeInDay
              : values.endTimeInDay + ":00",
          featuredFoodDetail: values?.featuredFoodDetail?.map((item) => {
            const { menuArr, ...restProps } = item;
            return restProps;
          }),
          featuredFoodDetailDeletedIds: deletedIds.length ? deletedIds : [0],
        }
      : {
          ...values,
          startDateTime: moment(values.startDateTime).toISOString(),
          endDateTime: moment(values.endDateTime).toISOString(),
          startTimeInDay: values.startTimeInDay + ":00",
          endTimeInDay: values.endTimeInDay + ":00",
          featuredFoodDetail: values?.featuredFoodDetail?.map((item) => {
            const { menuArr, ...restProps } = item;
            return restProps;
          }),
          featuredFoodDetailDeletedIds: [0],
        };
    // console.log("params", params);
    id ? editFeatured(params) : addFeatured(params);
  };
  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/restaurants/api/FeaturedFood",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/featured-food");
    }
    if (addError || editError) {
      toast.error(id ? editRes?.message : addRes?.message);
    }
  }, [addSuccess, editSuccess, addError, editError]);
  return (
    <div>
      <CommonLayout
        title="Featured Food Create"
        BtnComp={<LinkButton btnName="Back" to="/featured-food" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    id,
                    startDateTime: editData?.data?.startDateTime?.slice(0, 16),
                    endDateTime: editData?.data?.endDateTime?.slice(0, 16),
                    startTimeInDay: editData?.data?.startTimeInDay,
                    endTimeInDay: editData?.data?.endTimeInDay,
                    featuredFoodDetail: editData?.data?.featuredFoodDetail.map(
                      (item, i) => {
                        return {
                          ...item,
                          menuArr: items[i]?.map((value) => {
                            return {
                              value: value.id,
                              label: value.name,
                            };
                          }),
                        };
                      }
                    ),
                  }
                : initialValues
            }
            validationSchema={featuredFoodSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}
                {/* {console.log(values?.featuredFoodDetail)} */}
                <Row>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="startDateTime"
                      inputFieldProps={{
                        required: true,
                        label: "Start Date Time",
                        type: "datetime-local",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="endDateTime"
                      inputFieldProps={{
                        required: true,
                        label: "End Date Time",
                        type: "datetime-local",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="startTimeInDay"
                      inputFieldProps={{
                        label: "Start Time In Day",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <FormikInputField
                      name="endTimeInDay"
                      inputFieldProps={{
                        label: "End Time In Day",
                        type: "time",
                      }}
                    />
                  </Col>
                  <Col md={12} sm={12}>
                    <FieldArray
                      name="featuredFoodDetail"
                      render={(arrayHelpers) => (
                        <>
                          {values?.featuredFoodDetail?.map((item, index) => (
                            <div>
                              <Row className="d-flex justify-content-end align-items-cente gap-1">
                                <FormikSelectField
                                  name={`featuredFoodDetail.${index}.branchId`}
                                  selectFieldProps={{
                                    //     required: true,
                                    label: "Branch",
                                    options: branch?.items || [],
                                    onChange: (e) => {
                                      menu(e.target.value);

                                      setFieldValue(
                                        `featuredFoodDetail.${index}.branchId`,
                                        e.target.value
                                      );
                                    },
                                  }}
                                  value={
                                    values?.featuredFoodDetail[index].branchId
                                  }
                                />
                                <FormikSelectField
                                  name={`featuredFoodDetail.${index}.menuItemId`}
                                  selectFieldProps={{
                                    //     required: true,
                                    label: "Menu Item",
                                    options: values?.featuredFoodDetail[index]
                                      ?.menuArr?.length
                                      ? values?.featuredFoodDetail[index]
                                          ?.menuArr
                                      : menuItem?.items,
                                    onChange: (e) => {
                                      setFieldValue(
                                        `featuredFoodDetail.${index}.menuArr`,
                                        menuItem?.items
                                      );

                                      setFieldValue(
                                        `featuredFoodDetail.${index}.menuItemId`,
                                        e.target.value
                                      );
                                    },
                                  }}
                                  value={
                                    values?.featuredFoodDetail[index]
                                      ?.menuItemId
                                  }
                                />
                              </Row>
                              <div className="d-flex justify-content-end align-items-cente gap-1 mt-1">
                                <button
                                  onClick={() => {
                                    arrayHelpers.push(foodDetail);
                                    // setAdd((prev) => [...prev, item]);
                                  }}
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                >
                                  <TfiPlus />
                                </button>
                                {values?.featuredFoodDetail?.length > 1 && (
                                  <button
                                    onClick={() => {
                                      arrayHelpers.remove(index);

                                      setDeletedIds((prev) => [
                                        ...prev,
                                        item.id,
                                      ]);
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                  >
                                    <TfiTrash />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end pt-2">
                  <Button
                    variant="success"
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};
