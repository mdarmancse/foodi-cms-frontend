import { initialValues, menuObj } from "./form.config";
import { Formik, Form, FieldArray } from "formik";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CommonLayout } from "@/features/layouts/common-layout.component";
import {
  LinkButton,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { TfiTrash, TfiPlus } from "react-icons/tfi";
import {
  useEditOrderMutation,
  useGetDetailsByBrachIdQuery,
  useLazyGetAddonsByMneuQuery,
  useLazyGetAddonsListByBranchQuery,
} from "./order-api";
import { useState } from "react";

export const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState("");
  const [menuId, setMenuId] = useState("");
  const [update, { isSuccess, isError }] = useEditOrderMutation();
  // console.log("searchParams: ", searchParams.get("branchId"));

  const branchId = searchParams.get("branchId");

  const { data: branchData } = useGetDetailsByBrachIdQuery(
    searchParams.get("branchId")
  );
  const [trigger2, { data: branchAddon }] = useLazyGetAddonsListByBranchQuery();
  const [trigger, { data: addons }] = useLazyGetAddonsByMneuQuery();

  console.log("addons", addons);

  console.log("category", categoryId);

  const filteredMneu = branchData?.data?.categories
    ?.filter((category) => category?.id === Number(categoryId))[0]
    ?.menuItem.map((menu) => {
      return {
        value: menu.id,
        label: menu.name,
      };
    });

  const filteredAddons = branchData?.data?.categories
    ?.filter((category) => category?.id === Number(categoryId))[0]
    ?.menuItem?.filter(
      (menu) => menu?.id === Number(menuId)
    )[0]?.menuItemAndAddOnCategoryAndVariationsMapping;
  console.log("filtered: ", filteredMneu);
  console.log("filteredAddon: ", filteredAddons);

  console.log("branchData: ", branchData?.data);

  const handleSubmit = async (values) => {
    await update(values);
  };

  return (
    <div>
      <CommonLayout
        title={"Update Order"}
        BtnComp={<LinkButton btnName="Back" to="/order-dispatch" />}
      />
      <Card>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {JSON.stringify(values)}
                <Row>
                  <FieldArray
                    name="menus"
                    render={(arrayHelpers) => (
                      <>
                        {values?.menus?.map((menu, index) => (
                          <>
                            <div className="d-flex justify-content-around">
                              <Col>
                                {values?.menus[index]?.categoryId}
                                <FormikSelectField
                                  name={`menus.${index}.categoryId`}
                                  selectFieldProps={{
                                    label: "Category",
                                    options: branchData?.data?.categories?.map(
                                      (item) => {
                                        return {
                                          value: item.id,
                                          label: item.name,
                                        };
                                      }
                                    ),
                                    onChange: (e) => {
                                      console.log("change", e.target.value);

                                      setFieldValue(
                                        `menus.${index}.categoryId`,
                                        e.target.value
                                      );
                                      setCategoryId(e.target.value);
                                    },
                                  }}
                                />
                                {/* {branchData?.data?.categories?.map(
                                  (category) => category?.menuItem
                                )} */}
                                <FormikSelectField
                                  name={`menus.${index}.menuId`}
                                  selectFieldProps={{
                                    label: "Menu",
                                    options: filteredMneu || [],
                                    onChange: (e) => {
                                      setFieldValue(
                                        `menus.${index}.menuId`,
                                        e.target.value
                                      );
                                      setMenuId(e.target.value);
                                      trigger({ id: e.target.value, branchId });
                                    },
                                  }}
                                />

                                <FieldArray
                                  name={`menus.${index}.addons`}
                                  render={(helper) => (
                                    <>
                                      {menu?.addons?.map((addon, idx) => (
                                        <Col className="border m-2 p-2">
                                          <FormikSelectField
                                            name={`menus.${index}.addons.${idx}.addonId`}
                                            selectFieldProps={{
                                              label: "Addon",
                                              options: [],
                                            }}
                                          />
                                          <div className="d-flex justify-content-end align-items-center gap-1 my-1">
                                            <button
                                              onClick={() => {
                                                helper.push(addon);
                                              }}
                                              type="button"
                                              className="btn btn-sm btn-primary"
                                            >
                                              <TfiPlus />
                                            </button>

                                            {menu?.addons?.length > 0 && (
                                              <button
                                                onClick={() => {
                                                  helper.remove(idx);
                                                }}
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                              >
                                                <TfiTrash />
                                              </button>
                                            )}
                                          </div>
                                        </Col>
                                      ))}
                                    </>
                                  )}
                                />

                                <div className="d-flex justify-content-end align-items-center gap-1 my-1">
                                  <button
                                    onClick={() => {
                                      arrayHelpers.push(menuObj);
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                  >
                                    <TfiPlus />
                                  </button>
                                  {values?.menus?.length > 1 && (
                                    <button
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                      }}
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                    >
                                      <TfiTrash />
                                    </button>
                                  )}
                                </div>
                              </Col>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  />
                </Row>
                <div className="d-flex justify-content-end mt-3">
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
