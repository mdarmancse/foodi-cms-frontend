import { Api } from "@/constants";
import { CommonLayout } from "@/features/layouts";
import {
  FormikSelectField,
  FormikSubmitButton,
  FormikSwitchButton,
  FormikTextAria,
  LinkButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddRiderLeaveRequestMutation,
  useGetRiderOptionsQuery,
  useGetRiderShiftDutyOptionsQuery,
  useGetRiderShiftLeaveRequestByIDQuery,
} from "../rider-leave-request-api";
import { InitialValue, RiderLeaveRequestSchema } from "./form.config";

export const RiderLeaveRequestCreate = () => {
  const breadcrumbItems = [
    {
      name: "Foodi",
    },
    {
      name: "Rider leave request",
    },
  ];
  const params = useParams();
  const { data: riderLeaveRequest, isFetching } =
    useGetRiderShiftLeaveRequestByIDQuery(params?.id, { skip: !params.id });
  const navigate = useNavigate();
  const { data: riderOptions, isFetching: riderFetching } =
    useGetRiderOptionsQuery();
  const { data: riderShiftDutyOptions, isFetching: riderShiftFetching } =
    useGetRiderShiftDutyOptionsQuery();
  const [
    addRiderLeaveRequest,
    {
      data: postResponse,
      isSuccess: addSuccess,
      isError: isPostError,
      error: errorPost,
      isLoading: postLoading,
    },
  ] = useAddRiderLeaveRequestMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  const [getList] = useLazyGetTableListQuery();

  const handleSubmit = async (params) => {
    await addRiderLeaveRequest(params);
  };
  useEffect(() => {
    if (postResponse && addSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: Api.GetRiderLeaveRequestList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      navigate("/rider-leave-request");
    }
  }, [postResponse]);

  useEffect(() => {
    toast.error(errorPost?.data?.message);
  }, [errorPost]);
  return (
    <CommonLayout
      title={
        params?.id ? "Edit Rider Leave Request" : "Create Rider Leave Request"
      }
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to="/rider-leave-request" btnName="Back" />}
    >
      <Container fluid className="pt-2">
        <Card>
          <Card.Body>
            <Formik
              enableReinitialize
              initialValues={
                params?.id
                  ? {
                      id: params.id,
                      riderId: riderLeaveRequest?.data?.riderId,
                      riderShiftDutyBookingId:
                        riderLeaveRequest?.data?.riderShiftDutyBookingId,
                      reason: riderLeaveRequest?.data?.reason,
                      isApproved: riderLeaveRequest?.data?.isApproved,
                    }
                  : InitialValue
              }
              validationSchema={RiderLeaveRequestSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col xs={4} className="py-2">
                      <FormikSelectField
                        name="riderId"
                        selectFieldProps={{
                          label: "Rider",
                          required: true,
                          options: riderOptions?.items,
                        }}
                      />
                    </Col>
                    <Col xs={4} className="py-2">
                      <FormikSelectField
                        name="riderShiftDutyBookingId"
                        selectFieldProps={{
                          label: "Shift duty booking",
                          required: true,
                          options: riderShiftDutyOptions?.items,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row xs={12} className="mb-1 justify-content-center">
                    <Col xs={4} className="py-2">
                      <FormikTextAria
                        name="reason"
                        textAreaProps={{ label: "Reason" }}
                        required
                      />
                    </Col>
                    <Col xs={4} className="py-2">
                      <FormikSwitchButton
                        name="isApproved"
                        switchButtonProps={{ label: "Is Approved" }}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <FormikSubmitButton disabled={postLoading}>
                      Submit
                    </FormikSubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </CommonLayout>
  );
};
