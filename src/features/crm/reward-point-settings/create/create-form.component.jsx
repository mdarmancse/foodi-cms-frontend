import {
  FormikAutoComplete,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Modal, Row } from "react-bootstrap";
import { InitialValues, RewardPointSchema } from "./form.config";
import { useEffect, useState } from "react";
import {
  useAddRewardPointSettingsMutation,
  useGetRewardPointSettingsByIdQuery,
  useEditRewardPointSettingsMutation,
  useGetRewardLabelsQuery
} from "../reward-point-settings-api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export function RewardPointForm({ show, onClose, selectedRow }) {
  const [getList] = useLazyGetTableListQuery();
  const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state.commonTable)
  const [
    addRewardPointSettings,
    { data: postResponse, isSuccess: postSuccess },
  ] = useAddRewardPointSettingsMutation();
  const [editRewardPointSetting, { data: putResponse, isSuccess : putSuccess }] = useEditRewardPointSettingsMutation();
  const [rewardLabelOption, setRewardLabelOption] = useState([]);
  const {
    data: rewardLabel,
    isSuccess: rewardLabelSucceed,
    isFetching: rewardFetching,
  } = useGetRewardLabelsQuery();
  
  const { data: rewardPointSettingsData, isFetching } =
    useGetRewardPointSettingsByIdQuery(selectedRow?.id, {
      skip: !selectedRow?.id,
    });

  useEffect(() => {
    if(postResponse && postSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: Api.GetRewardPointSettingsList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive,
        }
      });
      onClose();
    }
  },[postResponse])
  useEffect(() => {
    if(putResponse && putSuccess) {
      toast.success(putResponse?.message);
      getList({
        url: Api.GetRewardPointSettingsList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive,
        }
      });
      onClose();
    }
  },[putResponse])

  return (
    <Modal show={show && !isFetching} onHide={onClose} centered>
      <Modal.Header closeButton>
        {selectedRow?.id ? "Edit" : "Create"} reward point settings
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={
            selectedRow?.id
              ? {
                  id: selectedRow?.id,
                  isActive: rewardPointSettingsData?.data?.isActive,
                  rewardLevelId: rewardPointSettingsData?.data?.rewardLevelId?._id,
                  pointPerAmount: rewardPointSettingsData?.data?.pointPerAmount,
                }
              : InitialValues
          }
          validationSchema={RewardPointSchema}
          onSubmit={(values) => {
            selectedRow?.id ? editRewardPointSetting(values) : addRewardPointSettings(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikSelectField
                    name="rewardLevelId"
                    selectFieldProps={{
                      label: "Reward Level",
                      placeholder: "Select Reward Level",
                      options: rewardLabel?.items,
                      required: true,
                    }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="pointPerAmount"
                    inputFieldProps={{
                      label: "Point Per Amount",
                      required: true,
                    }}
                  />
                </Col>
                <div className="d-flex justify-content-end">
                  <FormikSubmitButton className="mt-2">
                    Submit
                  </FormikSubmitButton>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
