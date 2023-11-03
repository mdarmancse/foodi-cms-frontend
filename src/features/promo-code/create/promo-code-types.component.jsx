import { FormikAutoComplete } from "@/features/ui";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import {
  useGetPromoCodeTypesQuery,
  useLazyGetCategoriesByBranchQuery,
  useLazyGetMenuItemsQuery,
} from "../promo-code-api-slice";
import { PromoCodeTypesLabelName } from "./constants";
import { generatePromoCodeTypesRow } from "./helpers";
import { usePromoCodeOptions } from "./use-promo-code-options.hook";

export const PromoCodeTypes = () => {
  const [typesRow, setTypesRow] = useState({});
  const { data: PromoCodeOptions, isLoading: PromoCodeLoading } =
    useGetPromoCodeTypesQuery();
  const { options, isLoading } = usePromoCodeOptions();
  const [{ value: selectedPromoCode }, promoCodeMeta, promoCodeForm] =
    useField("couponTypeId");
  const [{ value: branchIds }] = useField("branchIds");

  const [getCategory, { data: categoryList, isLoading: categoryLoading }] =
    useLazyGetCategoriesByBranchQuery();
  const [getMenuItem, { data: menuItemList, isLoading: menuItemLoading }] =
    useLazyGetMenuItemsQuery();
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!typesRow.length) {
      if (Array.isArray(PromoCodeOptions?.data) && !isLoading) {
        const rows = generatePromoCodeTypesRow(PromoCodeOptions.data, options);
        setTypesRow(rows || []);
      }
    }
  }, [PromoCodeOptions, isLoading]);

  useEffect(() => {
    if (selectedPromoCode?.fieldValue == 2) {
      // fetch category
      if (branchIds?.length) {
        getCategory(branchIds);
      }
    } else if (selectedPromoCode?.fieldValue === 7) {
      // fetch menu item
      if (branchIds?.length) {
        getMenuItem(branchIds);
      }
    }
  }, [selectedPromoCode, branchIds]);

  useEffect(() => {
    if (branchIds?.length) {
      if (selectedPromoCode.fieldValue == 2) {
        if (categoryList?.data?.length) {
          // should change categories list
          const prevRows = {
            ...typesRow,
          };
          prevRows[selectedPromoCode.value] = prevRows[
            selectedPromoCode.value
          ].map((row) => {
            if (row.label === PromoCodeTypesLabelName.Categories) {
              return {
                ...row,
                options: categoryList?.data,
              };
            }

            return row;
          });
          setTypesRow(prevRows);
        }
      } else if (selectedPromoCode.fieldValue == 7) {
        if (menuItemList?.data?.length) {
          const prevRows = {
            ...typesRow,
          };
          prevRows[selectedPromoCode.value] = prevRows[
            selectedPromoCode.value
          ].map((row) => {
            if (row.label === PromoCodeTypesLabelName.MenuItem) {
              return {
                ...row,
                options: menuItemList?.data,
              };
            }
            return row;
          });
          setTypesRow(prevRows);
        }
      }
    }
  }, [branchIds, menuItemList, categoryList]);

  const showRows = Boolean(
    selectedPromoCode?.value && typesRow?.[selectedPromoCode?.value]?.length
  );

  return (
    <>
      <Col xs={12} sm={6}>
        <FormikAutoComplete
          name="couponTypeId"
          autoCompleteProps={{
            label: "PromoCode Type",
            isLoading: PromoCodeLoading,
            options: PromoCodeOptions?.data || [],
            onChange(value) {
              setFieldValue("customerIds", []);
              setFieldValue("branchIds", []);
              setFieldValue("categoryIds", []);
              setFieldValue("subscriptionTypeIds", []);
              setFieldValue("restaurantIds", []);
              setFieldValue("zoneIds", []);
              setFieldValue("cityIds", []);
              setFieldValue("cuisineIds", []);
              setFieldValue("menuItemIds", []);

              promoCodeForm.setValue(value);
            },
            required: true,
          }}
        />
      </Col>

      {showRows &&
        typesRow[selectedPromoCode?.value]?.map((row, index) => {
          let isLoading = false;
          if (row.label === PromoCodeTypesLabelName.Categories) {
            isLoading = categoryLoading;
          } else if (row.label === PromoCodeTypesLabelName.MenuItem) {
            isLoading = menuItemLoading;
          }

          return (
            <Col xs={12} sm={6} key={index}>
              <FormikAutoComplete
                name={row.name}
                autoCompleteProps={{
                  label: row.label,
                  options: row.options,
                  isMulti: row.isMultiple,
                  isLoading: isLoading,
                  required: true,
                  onChange(value, actions) {
                    function setValue() {
                      setFieldValue(row.name, value);
                    }

                    if (actions.action === "remove-value") {
                      const removeItem = actions.removedValue;
                      if (values[row.name + "Old"]?.length) {
                        const fieldName =
                          row.name.charAt(0).toUpperCase() + row.name.slice(1);
                        const prevIds = values[`delete${fieldName}`] || [];
                        setFieldValue(`delete${fieldName}`, [
                          ...prevIds,
                          removeItem.value,
                        ]);
                      }
                      setValue();
                    } else {
                      setValue();
                    }
                  },
                }}
              />
            </Col>
          );
        })}
    </>
  );
};
