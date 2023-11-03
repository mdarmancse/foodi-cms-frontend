import { cloneDeep } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { FieldValueForOption, NamesForOption } from "./constants";
import { usePromoCodeOptions } from "./use-promo-code-options.hook";

export const useGetInitialValue = (values) => {
  const { isLoading, options } = usePromoCodeOptions();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (Object.keys(values).length) {
      const PromoCodeTypeObj = {
        label: values?.promoCodeType?.name,
        value: values?.promoCodeType?.id,
        fieldValue: values?.promoCodeType?.codeTypeValue,
      };

      const newValues = cloneDeep(values);
      newValues.couponTypeId = PromoCodeTypeObj;
      let CustomerIds = [];
      let BranchIds = [];
      let CategoryIds = [];
      let SubscriptionTypeIds = [];
      let CityIds = [];
      let RestaurantIds = [];
      let ZoneIds = [];
      let CuisineIds = [];
      let MenuItemIds = [];

      console.log("*()*", values?.promoCodeMappings);

      values?.promoCodeMappings?.forEach((each) => {
        if (PromoCodeTypeObj.fieldValue == FieldValueForOption.Users) {
          CustomerIds.push(each.customerId);
        }
        if (PromoCodeTypeObj.fieldValue == FieldValueForOption.Categories) {
          BranchIds.push;
        }
      });

      if (PromoCodeTypeObj?.fieldValue == FieldValueForOption.Users) {
        newValues[NamesForOption.Users] = options?.Users?.filter((user) => {
          return CustomerIds.includes(user?.value);
        });
        newValues[`customerIdsOld`] = CustomerIds;
      }

      newValues.startTime = moment(newValues.startTime).format("YYYY-MM-DD");
      newValues.endTime = moment(newValues.endTime).format("YYYY-MM-DD");
      newValues.isGradual = newValues.isGradual?.toString();
      newValues.isPercent = newValues.isPercent?.toString();

      setInitialValues(newValues);
    }
  }, [values]);

  return initialValues;
};
