import { Form, Formik } from "formik";
import { Row, Button, Card, Col } from "react-bootstrap";
import { initialValues, voucherSchema } from "./form.config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { CommonLayout } from "../../../layouts";
import {
  FormikInputField,
  LinkButton,
  FormikImageField,
  FormikSelectField,
  FormikSubmitButton,
} from "../../../ui";
import { DisplayImage } from "@/features/ui/display-image";
import {
  useAddVoucherMutation,
  useEditVoucherMutation,
  useLazyGetVoucherByIdQuery,
} from "../voucher-api";

export const VoucherForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editData }] = useLazyGetVoucherByIdQuery();

  // console.log("edit", editData?.data);

  const [addVoucher, { isSuccess: addSuccess, isError: addError }] =
    useAddVoucherMutation();

  const [editVoucher, { isSuccess: editSuccess, isError: editError }] =
    useEditVoucherMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmit = async (values) => {
    // console.log("values", values);

    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("image", values.image);
    formData.append("type", values.type);
    formData.append("voucherAmount", values.voucherAmount);
    formData.append("voucherCostInPoint", values.voucherCostInPoint);
    formData.append("expireTime", values.expireTime);

    let params = id ? { id, formData } : formData;

    id ? await editVoucher(params) : await addVoucher(params);
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Creadted Successfully");
      getList({
        url: "/system-operations/api/VoucherSetting",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/voucher");
    }

    if (addError || editError) {
      toast.error(id ? "Error Updating" : "Error creating");
    }
  }, [addSuccess, editSuccess, addError, editError]);
  return (
    <div>
      <CommonLayout
        title="Voucher Create"
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
                    image: editData?.data?.image,
                    type: editData?.data?.type,
                    voucherAmount: editData?.data?.voucherAmount,
                    voucherCostInPoint: editData?.data?.voucherCostInPoint,
                    expireTime: editData?.data?.expireTime,
                  }
                : initialValues
            }
            validationSchema={voucherSchema}
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
                    <FormikImageField
                      name="image"
                      imageFieldProps={{
                        label: "Image",
                        accept: ".jpg, .jpeg, .bmp, .png, .webp",
                      }}
                    />
                    {values?.image && (
                      <DisplayImage value={values?.image} id={id} />
                    )}
                  </Col>
                  <Col md={12}>
                    <FormikSelectField
                      name="type"
                      selectFieldProps={{
                        label: "Type",
                        options: [
                          { value: "Voucher", label: "Voucher" },
                          { value: "Coupon", label: "Coupon" },
                        ],
                        required: true,
                      }}
                    />
                  </Col>

                  {values.type == "Coupon" && (
                    <FormikInputField
                      name="voucherAmount"
                      inputFieldProps={{
                        label: "Voucher Amount",
                        type: "number",
                        min: 0,
                      }}
                    />
                  )}
                  <Col md={12}>
                    <FormikInputField
                      name="voucherCostInPoint"
                      inputFieldProps={{
                        label: "Voucher Cost In Point",
                        type: "number",
                        min: 0,
                      }}
                    />
                  </Col>
                  <Col md={12}>
                    <FormikInputField
                      name="expireTime"
                      inputFieldProps={{
                        label: "Expire Time",
                        type: "number",
                        min: 0,
                      }}
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                  {/* <Button type="submit" variant="primary">
                    Submit
                  </Button> */}
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};
