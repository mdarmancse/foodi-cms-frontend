import { Form, Formik } from "formik";
import { Row, Button, Card, Col } from "react-bootstrap";
import { initialValues, dineInVoucher } from "./form.config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { CommonLayout } from "../../../layouts";
import { FormikInputField, LinkButton, FormikSelectField } from "../../../ui";
import { VoucherSettings } from "./voucher-settings";
import { OptionSettings } from "./option-settings";
import {
  useGetAllBranchesQuery,
  useGetAllCuisinesQuery,
  useGetAllSubscriptionTypesQuery,
  useGetAllUsersQuery,
  useGetAllZonesQuery,
} from "../../../api/common-api-hooks";
import {
  useAddDineInVoucherMutation,
  useLazyGetDineInVoucherByIdQuery,
  useEditDineInVoucherMutation,
} from "../dinein-gallery-voucher-api";
import moment from "moment";

const optionTypes = [
  { value: "branch_wise", label: "Branch Wise" },
  { value: "zone_wise", label: "Zone Wise" },
  { value: "cuisine_wise", label: "Cuisine Wise" },
  { value: "user_wise", label: "User Wise" },
];

const optionDiscount = [
  { value: "percent", label: "Percent" },
  { value: "amount", label: "Amount" },
];

export const DineInGalleryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteBranches, setDeleteBranches] = useState([]);
  const [deleteCuisines, setDeleteCuisines] = useState([]);
  const [deleteZones, setDeleteZones] = useState([]);
  const [deleteUsers, setDeleteUsers] = useState([]);
  const [deleteSubscriptions, setDeleteSubscriptions] = useState([]);

  const { data: branch } = useGetAllBranchesQuery();
  const { data: cuisine } = useGetAllCuisinesQuery();
  const { data: zone } = useGetAllZonesQuery();
  const { data: user } = useGetAllUsersQuery();
  const { data: subscription } = useGetAllSubscriptionTypesQuery();

  const [addDineInVoucher, { isSuccess: addSuccess, isError: addError }] =
    useAddDineInVoucherMutation();
  const [editDineInVoucher, { isSuccess: editSuccess, isError: editError }] =
    useEditDineInVoucherMutation();
  const [trigger, { data: editData }] = useLazyGetDineInVoucherByIdQuery();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/system-operations/api/VoucherSetting",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/dine-in-gallery-voucher");
    }
    if (addError || editError) {
      toast.error(id ? "Error Updating" : "Error Creating");
    }
  }, [addSuccess, editSuccess, addError, editError]);

  // console.log("edit", editData?.data);

  // function removeEmptyValues(object) {
  //   for (var key in object) {
  //     if (object.hasOwnProperty(key)) {
  //       var value = object[key];
  //       if (value === null || value === undefined || value === "") {
  //         delete object[key];
  //       }
  //     }
  //   }
  // }

  //   console.log("users", user);
  const handleSubmit = (values) => {
    let formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("type", "dine_in");
    formdata.append("voucherTypes", values.type);
    formdata.append("discountTypes", values.discountTypes);
    formdata.append("discountInPercent", values.discountInPercent);
    formdata.append("minimumOrderAmount", values.minimumOrderAmount);
    formdata.append("expireTime", values.expireTime);
    formdata.append(
      "startTime",
      moment(values.startTime).utc().local().format()
    );
    formdata.append("endTime", moment(values.endTime).utc().local().format());
    values?.branches[0] !== 0
      ? values?.branches?.forEach((item, index) => {
          formdata.append(
            `Branches[${index}].id`,
            id && editData?.data?.branches[index]?.id
              ? editData?.data?.branches[index]?.id
              : 0
          );
          formdata.append(`Branches[${index}].branchId`, item);
          formdata.append(
            `Branches[${index}].voucherSettingId`,
            id && editData?.data?.branches[index]?.id
              ? editData?.data?.branches[index]?.voucherSettingId
              : 0
          );
        })
      : "";
    values?.cuisines[0] !== 0
      ? values?.cuisines?.forEach((item, index) => {
          formdata.append(
            `Cuisines[${index}].id`,
            id && editData?.data?.cuisines[index]?.id
              ? editData?.data?.cuisines[index]?.id
              : 0
          );
          formdata.append(`Cuisines[${index}].cuisineId`, item);
          formdata.append(
            `Cuisines[${index}].voucherSettingId`,
            id && editData?.data?.cuisines[index]?.id
              ? editData?.data?.cuisines[index]?.voucherSettingId
              : 0
          );
        })
      : "";
    values?.zones[0] !== 0
      ? values?.zones?.forEach((item, index) => {
          formdata.append(
            `Zones[${index}].id`,
            id && editData?.data?.zones[index]?.id
              ? editData?.data?.zones[index]?.id
              : 0
          );
          formdata.append(`Zones[${index}].zoneId`, item);
          formdata.append(
            `Zones[${index}].voucherSettingId`,
            id && editData?.data?.zones[index]?.id
              ? editData?.data?.zones[index]?.voucherSettingId
              : 0
          );
        })
      : "";
    values?.users[0] !== 0
      ? values?.users?.forEach((item, index) => {
          formdata.append(
            `Users[${index}].id`,
            id && editData?.data?.users[index]?.id
              ? editData?.data?.users[index]?.id
              : 0
          );
          formdata.append(`Users[${index}].userId`, item);
          formdata.append(
            `Users[${index}].voucherSettingId`,
            id && editData?.data?.users[index]?.id
              ? editData?.data?.users[index]?.voucherSettingId
              : 0
          );
        })
      : "";
    values?.subscriptionTypes[0] !== 0
      ? values?.subscriptionTypes?.forEach((item, index) => {
          formdata.append(
            `SubscriptionTypes[${index}].id`,
            id && editData?.data?.subscriptionTypes[index]?.id
              ? editData?.data?.subscriptionTypes[index]?.id
              : 0
          );
          formdata.append(
            `SubscriptionTypes[${index}].subscriptionTypeId`,
            item
          );
          formdata.append(
            `SubscriptionTypes[${index}].voucherSettingId`,
            id && editData?.data?.subscriptionTypes[index]?.id
              ? editData?.data?.subscriptionTypes[index]?.voucherSettingId
              : 0
          );
        })
      : "";
    deleteBranches[0] !== null
      ? deleteBranches?.forEach((item, index) => {
          formdata.append(`DeleteBranchIds[${index}]`, item);
        })
      : "";
    deleteSubscriptions[0] !== null
      ? deleteSubscriptions?.forEach((item, index) => {
          formdata.append(`DeleteSubscriptionTypeIds[${index}]`, item);
        })
      : "";
    deleteZones[0] !== null
      ? deleteZones?.forEach((item, index) => {
          formdata.append(`DeleteZoneIds[${index}]`, item);
        })
      : "";

    deleteCuisines[0] !== null
      ? deleteCuisines?.forEach((item, index) => {
          formdata.append(`DeleteCuisineIds[${index}]`, item);
        })
      : "";
    deleteUsers[0] !== null
      ? deleteUsers?.forEach((item, index) => {
          formdata.append(`DeleteUserIds[${index}]`, item);
        })
      : "";

    let editParams = {
      id,
      formdata,
    };

    id ? editDineInVoucher(editParams) : addDineInVoucher(formdata);
  };

  // console.log("branches", deleteBranches);
  // console.log("subscription", deleteSubscriptions);

  return (
    <div>
      <CommonLayout
        title={
          id
            ? "Dine In Gallery Voucher Update"
            : "Dine In Gallery Voucher Create"
        }
        BtnComp={<LinkButton btnName="Back" to="/voucher" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    name: editData?.data?.name,
                    type: editData?.data?.branches[0]?.voucherSetting
                      ?.voucherTypes,
                    discountTypes:
                      editData?.data?.branches[0]?.voucherSetting
                        ?.discountTypes,
                    discountInPercent: editData?.data?.discountInPercent,
                    discountInAmount: editData?.data?.discountInAmount,
                    minimumOrderAmount: editData?.data?.minimumOrderAmount,
                    expireTime: editData?.data?.expireTime,
                    startTime: editData?.data?.startTime.slice(0, 10),
                    endTime: editData?.data?.endTime.slice(0, 10),
                    branches: editData?.data?.branches?.map(
                      (item) => item.branchId
                    ),
                    cuisines: editData?.data?.cuisines?.map(
                      (item) => item.cuisineId
                    ),
                    zones: editData?.data?.zones?.map((item) => item.zoneId),
                    users: editData?.data?.users?.map((item) => item.userId),
                    subscriptionTypes: editData?.data?.subscriptionTypes?.map(
                      (item) => item.subscriptionTypeId
                    ),
                  }
                : initialValues
            }
            // validationSchema={dineInVoucher}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, handleChange }) => (
              <Form>
                {/* <p>{JSON.stringify(values)}</p> */}
                <Row>
                  <Col md={12}>
                    <FormikInputField
                      name="name"
                      inputFieldProps={{
                        label: "Name",
                      }}
                    />
                  </Col>

                  <Col md={12}>
                    <FormikSelectField
                      name="type"
                      selectFieldProps={{
                        label: "Type",
                        options: optionTypes,
                        required: true,
                      }}
                    />
                  </Col>
                  <Col md={12}>
                    <FormikSelectField
                      name="discountTypes"
                      selectFieldProps={{
                        label: "Discount Type",
                        options: optionDiscount,
                        required: true,
                      }}
                    />
                  </Col>
                  {values?.discountTypes == "amount" && (
                    <Col md={12}>
                      <FormikInputField
                        name="discountInAmount"
                        inputFieldProps={{
                          label: "Discount In Amount",
                          type: "number",
                        }}
                      />
                    </Col>
                  )}
                  {values?.discountTypes == "percent" && (
                    <Col md={12}>
                      <FormikInputField
                        name="discountInPercent"
                        inputFieldProps={{
                          label: "Discount In Percent",
                          type: "number",
                        }}
                      />
                    </Col>
                  )}
                  <VoucherSettings />
                  <OptionSettings
                    values={values}
                    editData={editData?.data}
                    setDeleteBranches={setDeleteBranches}
                    setDeleteCuisines={setDeleteCuisines}
                    setDeleteZones={setDeleteZones}
                    setDeleteUsers={setDeleteUsers}
                    setDeleteSubscriptions={setDeleteSubscriptions}
                    branchOptions={branch?.items}
                    cuisineOptions={cuisine?.items}
                    zoneOptions={zone?.items}
                    userOptions={user?.items}
                    subscriptionOptions={subscription?.items}
                  />
                </Row>
                <div className="d-flex justify-content-end mt-3">
                  <Button type="submit" variant="primary">
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
