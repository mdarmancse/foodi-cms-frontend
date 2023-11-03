import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import { DineInVoucherSettingSchema, InitialValues } from "./form.config";
import { FormikContext, useFormik } from "formik";
import { DineInVoucherSettingForm } from "./create-form.component";

const breadcrumbItems = [
  { name: "Dine in Voucher Setting", url: "/dine-in-voucher-setting" },
  { name: "Create" },
];

export const DineInVoucherSettingCreate = () => {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [voucherSettingInfo, setVoucherSettingInfo] = useState({
    name: "",
    type: "dine_in",
    voucher_type: "",
    discount_type: "",
    discount_in_amount: 0,
    discount_in_percent: 0,
    minimum_order_amount: "",
    expire_time: "",
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    is_active: true,
  });

  const [voucherTypes, setVoucherTypes] = useState([
    {
      label: "Branch Wise",
      value: "branch_wise",
    },
    {
      label: "Zone Wise",
      value: "zone_wise",
    },
    {
      label: "Cuisine Wise",
      value: "cuisine_wise",
    },
    {
      label: "User Wise",
      value: "user_wise",
    },
  ]);

  const [selectedVoucherType, setSelectedVoucherType] = useState("");

  const handleSelectVoucherType = (e) => {
    const value = e ? e.value : "";
    setVoucherSettingInfo({ ...voucherSettingInfo, voucher_type: value });
    setSelectedVoucherType(e);
  };

  const [discountTypes, setDiscountTypes] = useState([
    {
      label: "Percent",
      value: "percent",
    },
    {
      label: "Amount",
      value: "amount",
    },
  ]);

  const [selectedDiscountType, setSelectedDiscountType] = useState("");

  const handleSelectDiscountType = (e) => {
    const value = e ? e.value : "";
    setVoucherSettingInfo({ ...voucherSettingInfo, discount_type: value });
    setSelectedDiscountType(e);
  };

  let branchData = undefined;
  // if (props.get_all_branch_data?.length > 0) {
  //   branchDate = props.get_all_branch_data?.map((item, key) => ({
  //     label: item.name,
  //     value: item._id,
  //   }));
  // }

  //select multiple branch
  const [selectedBranch, setSelectedBranch] = useState("");
  const handleSelectBranch = (e) => {
    setSelectedBranch(e);
  };

  let zoneData = undefined;
  //   if (props.get_all_zone_data?.length > 0) {
  //     zoneData = props.get_all_zone_data?.map((item, key) => ({
  //       label: item.name,
  //       value: item._id,
  //     }));
  //   }

  const [selectedZone, setSelectedZone] = useState("");

  const handleSelectZone = (e) => {
    setSelectedZone(e);
  };

  let cuisineData = undefined;
  //   if (props.get_all_cuisine_data?.length > 0) {
  //     cuisineData = props.get_all_cuisine_data?.map((item, key) => ({
  //       label: item.name,
  //       value: item._id,
  //     }));
  //   }

  const [selectedCuisine, setSelectedCuisine] = useState("");

  const handleSelectCuisine = (e) => {
    setSelectedCuisine(e);
  };

  //select multiple user
  let userData = undefined;
  // if (props.get_all_customer_data?.length > 0) {
  //   userData = props.get_all_customer_data?.map((item, key) => ({
  //     label: `${item.firstName} ${item.lastName} -  ${item.mobile}`,
  //     value: item._id,
  //   }));
  // }

  const [selectedUser, setSelectedUser] = useState("");

  const handleSelectUser = (e) => {
    setSelectedUser(e);
  };

  //select multiple subscription_type

  let subTypeData = undefined;
  // if (props.get_all_subscription_type_data?.length > 0) {
  //   subTypeData = props.get_all_subscription_type_data?.map((item, key) => ({
  //     label: item.name,
  //     value: item._id,
  //   }));
  // }

  const [selectedSubType, setSelectedSubType] = useState("");

  const handleSelectSubType = (e) => {
    setSelectedSubType(e);
  };

  let name, value, checked;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setVoucherSettingInfo({ ...voucherSettingInfo, [name]: value });
  };

  const handleTimeChange = (e) => {
    // console.log("e :", e.target.value)
    // console.log(new Date(e.target.value).toISOString())
    name = e.target.name;
    value = e.target.value;
    let new_time_string = `${value}:00Z`;
    setVoucherSettingInfo({
      ...voucherSettingInfo,
      [name]: new Date(new_time_string).toISOString(),
    });
  };

  const handleSubmit = (e) => {
    //setSubmitDisabled(true);
    e.preventDefault();

    console.log(
      voucherSettingInfo,
      selectedBranch,
      selectedCuisine,
      selectedZone,
      selectedUser,
      selectedSubType
    );
  };

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: DineInVoucherSettingSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/dine-in-voucher-setting" btnName="Back" />}
      title="Create New Dine In Voucher Setting"
    >
      {/* <Row>
        <Col className="col-10 mx-auto">
          <form className="mt-4" action="#" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <label htmlFor="name" className="col-md-2 col-form-label">
                Name <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleInputs}
                  value={voucherSettingInfo.name ?? ""}
                  required
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label htmlFor="voucher_type" className="col-md-2 col-form-label">
                Type <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <Select
                  value={selectedVoucherType}
                  onChange={handleSelectVoucherType}
                  isClearable={true}
                  options={voucherTypes}
                  isMulti={false}
                  required
                />
              </div>
            </Row>

            {selectedVoucherType?.value == "branch_wise" && (
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Branches <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <Select
                    value={selectedBranch}
                    onChange={handleSelectBranch}
                    options={branchData}
                    isLoading={branchData == undefined ? true : false}
                    isMulti={true}
                    required
                  />
                </div>
              </Row>
            )}

            {selectedVoucherType?.value == "zone_wise" && (
              <Row className="mb-3">
                <label htmlFor="zone" className="col-md-2 col-form-label">
                  Zones <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <Select
                    value={selectedZone}
                    onChange={handleSelectZone}
                    options={zoneData}
                    isLoading={zoneData == undefined ? true : false}
                    isMulti={true}
                    required
                  />
                </div>
              </Row>
            )}

            {selectedVoucherType?.value == "cuisine_wise" && (
              <Row className="mb-3">
                <label htmlFor="cuisine" className="col-md-2 col-form-label">
                  Cuisines <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <Select
                    value={selectedCuisine}
                    onChange={handleSelectCuisine}
                    options={cuisineData}
                    isLoading={cuisineData == undefined ? true : false}
                    isMulti={true}
                    required
                  />
                </div>
              </Row>
            )}

            {selectedVoucherType?.value == "user_wise" && (
              <Row className="mb-3">
                <label htmlFor="user" className="col-md-2 col-form-label">
                  Users <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <Select
                    value={selectedUser}
                    onChange={handleSelectUser}
                    options={userData}
                    isLoading={userData == undefined ? true : false}
                    isMulti={true}
                    required
                  />
                </div>
              </Row>
            )}

            {voucherSettingInfo.voucher_type != "user_wise" && (
              <Row className="mb-3">
                <label
                  htmlFor="subscription_type"
                  className="col-md-2 col-form-label"
                >
                  Subscription Type
                </label>
                <div className="col-md-10">
                  <Select
                    value={selectedSubType}
                    onChange={handleSelectSubType}
                    options={subTypeData}
                    isLoading={subTypeData == undefined ? true : false}
                    isMulti={true}
                  />
                </div>
              </Row>
            )}

            <Row className="mb-3">
              <label
                htmlFor="discount_type"
                className="col-md-2 col-form-label"
              >
                Discount Type <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <Select
                  value={selectedDiscountType}
                  onChange={handleSelectDiscountType}
                  isClearable={true}
                  options={discountTypes}
                  isMulti={false}
                  required
                />
              </div>
            </Row>

            {selectedDiscountType?.value == "amount" && (
              <Row className="mb-3">
                <label
                  htmlFor="discount_in_amount"
                  className="col-md-2 col-form-label"
                >
                  Maximum Discount Amount
                  <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <input
                    type="number"
                    className="form-control"
                    id="discount_in_amount"
                    placeholder="Enter Discount"
                    name="discount_in_amount"
                    onChange={handleInputs}
                    value={voucherSettingInfo.discount_in_amount ?? ""}
                    required
                  />
                </div>
              </Row>
            )}

            {selectedDiscountType?.value == "percent" && (
              <Row className="mb-3">
                <label
                  htmlFor="discount_in_percent"
                  className="col-md-2 col-form-label"
                >
                  Maximum Discount (%) <span className="text-danger">*</span>
                </label>
                <div className="col-md-10">
                  <input
                    type="number"
                    className="form-control"
                    id="discount_in_percent"
                    placeholder="Enter Discount in Percent"
                    name="discount_in_percent"
                    onChange={handleInputs}
                    value={voucherSettingInfo.discount_in_percent ?? ""}
                    required
                  />
                </div>
              </Row>
            )}

            <Row className="mb-3">
              <label
                htmlFor="minimum_order_amount"
                className="col-md-2 col-form-label"
              >
                Minimum Order Amount
                <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <input
                  type="number"
                  className="form-control"
                  id="minimum_order_amount"
                  placeholder="Enter minimum order amount"
                  name="minimum_order_amount"
                  onChange={handleInputs}
                  value={voucherSettingInfo.minimum_order_amount ?? ""}
                  required
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label htmlFor="expire_time" className="col-md-2 col-form-label">
                Expire Time (In Hour)
                <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <input
                  type="number"
                  className="form-control"
                  id="expire_time"
                  placeholder="Enter expire time"
                  name="expire_time"
                  onChange={handleInputs}
                  value={voucherSettingInfo.expire_time ?? ""}
                  required
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label htmlFor="start_time" className="col-md-2 col-form-label">
                Start Time <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <input
                  type="datetime-local"
                  id="start_time"
                  className="form-control"
                  name="start_time"
                  placeholder="Start Time"
                  value={voucherSettingInfo.start_time.slice(0, 16)}
                  onChange={(e) => handleTimeChange(e)}
                  required
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label htmlFor="end_time" className="col-md-2 col-form-label">
                End Time <span className="text-danger">*</span>
              </label>
              <div className="col-md-10">
                <input
                  type="datetime-local"
                  id="end_time"
                  className="form-control"
                  name="end_time"
                  placeholder="End Time"
                  value={voucherSettingInfo.end_time.slice(0, 16)}
                  onChange={(e) => handleTimeChange(e)}
                  required
                />
              </div>
            </Row>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary mt-3"
                type="submit"
                disabled={submitDisabled}
              >
                Save
              </button>
            </div>
          </form>
        </Col>
      </Row> */}

      <FormikContext.Provider value={formik}>
        <DineInVoucherSettingForm />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
