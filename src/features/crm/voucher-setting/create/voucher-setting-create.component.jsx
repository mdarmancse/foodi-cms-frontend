import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import { FormikContext, useFormik } from "formik";
import { InitialValues, VoucherSettingSchema } from "./form.config";
import { VoucherSettingForm } from "./form-create.component";

const breadcrumbItems = [
  { name: "Voucher Setting", url: "/voucher-setting" },
  { name: "Create" },
];

export const VoucherSettingCreate = () => {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [voucherSettingInfo, setVoucherSettingInfo] = useState({
    name: "",
    image: "",
    voucher_amount: 0,
    voucher_cost_in_point: 0,
    validity_time: 0,
    type: "",
    is_active: true,
  });

  const [couponTypes, setCouponTypes] = useState([
    {
      label: "Coupon",
      value: "in_app",
    },
    {
      label: "Voucher",
      value: "out_app",
    },
  ]);

  const [selectedCouponType, setSelectedCouponType] = useState("");

  const handleSelectCouponType = (e) => {
    setVoucherSettingInfo({ ...voucherSettingInfo, type: e.value });
    setSelectedCouponType(e);
  };

  let name, value, checked;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setVoucherSettingInfo({ ...voucherSettingInfo, [name]: value });
  };

  const handleFiles = (e) => {
    name = e.target.name;
    value = e.target.files[0];
    setVoucherSettingInfo({ ...voucherSettingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    //setSubmitDisabled(true);
    e.preventDefault();
    console.log(voucherSettingInfo);
  };

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: VoucherSettingSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/voucher-setting" btnName="Back" />}
      title="Create New Voucher Setting"
    >
      <FormikContext.Provider value={formik}>
        <VoucherSettingForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
