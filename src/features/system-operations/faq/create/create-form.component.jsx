import {
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
  TextEditor,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { FormikSelectField } from "@/features/ui";
import { FieldArray, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { FaqCreateSchema, faqLang, initialValue } from "./form.config";
import { FiTrash } from "react-icons/fi";
import {
  useCreateFaqMutation,
  useEditFaqMutation,
  useGetFaqByIdQuery,
  useGetuserTypeOptionsQuery,
} from "../faq-api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { Navigate, useNavigate } from "react-router-dom";
export const FaqCreateForm = ({ id }) => {
  const languageOptions = [
    { label: "Bangla", value: 1 },
    { label: "English", value: 2 },
    { label: "Hindi", value: 3 },
    { label: "Urdu", value: 4 },
    { label: "Urdu", value: 5 },
    { label: "Urdu", value: 6 },
  ];
  const [deletedId, setDeletedId] = useState([]);
  const { data: userTypeOptions, isFetching: userFetching } =
    useGetuserTypeOptionsQuery();
  const { data: faqData, isFetching: dataFetching } = useGetFaqByIdQuery(id, {
    skip: !id,
  });
  const [editItem, { data: putResponse,isSuccess : putSuccess }] = useEditFaqMutation();
  const [addItem, { data: postResponse, isSuccess : postSuccess }] = useCreateFaqMutation();
  const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state.commonTable);
  const [getList] = useLazyGetTableListQuery();
  const navigate = useNavigate();
  const  handleSubmission = (values) => {
    const question = values?.faqLangs[0].question;
    const answer = values?.faqLangs[0].answer;
    values.question = question,
    values.answer = answer,
    values.deletedFaqLangIds = deletedId,
    id ? editItem(values) : addItem(values);
  }

  useEffect(() => {
    if(postResponse && postSuccess) {
        toast.success(postResponse?.message);
        getList({
            url : Api.GetFaqLists,
            params: {
                pageNumber,
                itemsPerPage,
                isActive
            }
        });
        navigate("/faq");
    }
  },[postResponse])

  useEffect(() => {
    if(putResponse && putSuccess){
        toast.success(putResponse?.message);
        getList({
            url : Api.GetFaqLists,
            params : {
                pageNumber,
                itemsPerPage,
                isActive
            }
        });
        navigate("/faq");
    }
   
  },[putResponse])

  return (
    <>
      {!userFetching && !dataFetching ? (
        <Formik
          initialValues={
            id
              ? {
                  id: id,
                  userTypeId: faqData?.data?.userTypeId,
                  faqLangs: faqData?.data?.faqLangs,
                }
              : initialValue
          }
          validationSchema={FaqCreateSchema}
          onSubmit={(values) => {
            handleSubmission(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikSelectField
                    name="userTypeId"
                    selectFieldProps={{
                      label: "User type",
                      placeholder: "Selecet please..",
                      required: true,
                      options: userTypeOptions?.items,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="mb-1">
                  <FieldArray
                    name="faqLangs"
                    render={(arrayHelpers) => (
                      <div>
                        {values?.faqLangs?.map((item, index) => (
                          <>
                            <Row>
                              <Col xs={12} className="mb-1">
                                <FormikSelectField
                                  name={`faqLangs[${index}].languageId`}
                                  selectFieldProps={{
                                    label: "Language",
                                    options: languageOptions,
                                  }}
                                />
                              </Col>
                              <Col xs={12} className="mb-1">
                                <FormikInputField
                                  name={`faqLangs[${index}].question`}
                                  inputFieldProps={{ label: "Question" }}
                                />
                              </Col>
                              <Col xs={2}>
                                <label className="col-md-2 col-form-label fw-medium">
                                  Answer
                                </label>
                              </Col>
                              <Col xs={12} className="mb-1">
                                <TextEditor
                                  label="Answer"
                                  value={values.faqLangs[index]?.answer}
                                  onEditorChange={(newValue) => {
                                    setFieldValue(
                                      `faqLangs[${index}].answer`,
                                      newValue
                                    );
                                  }}
                                />
                              </Col>
                              <Col
                                xs={12}
                                className="mt-4 pt-1 d-flex justify-content-end"
                              >
                                {values?.faqLangs?.length > 1 && (
                                  <Button
                                    size="sm"
                                    className="me-2"
                                    variant="danger"
                                    onClick={() => {
                                      id
                                        ? setDeletedId([
                                            ...deletedId,
                                            values.faqLangs[index]?.id,
                                          ])
                                        : "",
                                        arrayHelpers.remove(index);
                                    }}
                                  >
                                    <FiTrash />
                                  </Button>
                                )}
                                <Button
                                  variant="info"
                                  size="sm"
                                  onClick={() => arrayHelpers.push(faqLang)}
                                >
                                  Add Question
                                </Button>
                              </Col>
                            </Row>
                          </>
                        ))}
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        ""
      )}
    </>
  );
};
