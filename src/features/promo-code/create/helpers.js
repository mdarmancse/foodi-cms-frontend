import { cloneDeep } from "lodash";
import moment from "moment";
import {
  FieldValueForOption,
  NamesForOption,
  PromoCodeTypesLabelName,
} from "./constants";
import { InitialPCValues } from "./form.config";

export function generatePromoCodeTypesRow(promoCodeTypes, optionsList = {}) {
  if (!promoCodeTypes?.length) return {};
  const result = {};

  //value means promoCodeType Id
  //label means promoCodeType name
  for (let { label, value, fieldValue } of promoCodeTypes) {
    if (fieldValue == FieldValueForOption.Users) {
      // it's a user
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Users,
          options: optionsList[PromoCodeTypesLabelName.Users],
          isMultiple: true,
          name: NamesForOption.Users,
        },
      ];
    } else if (fieldValue == FieldValueForOption.Categories) {
      // it's a category
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Branch,
          options: optionsList[PromoCodeTypesLabelName.Branch],
          isMultiple: true,
          name: NamesForOption.Branch,
        },
        {
          label: PromoCodeTypesLabelName.Categories,
          options: optionsList[PromoCodeTypesLabelName.Categories],
          isMultiple: true,
          name: NamesForOption.Categories,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.City) {
      // it's a City
      result[value] = [
        {
          label: PromoCodeTypesLabelName.City,
          options: optionsList[PromoCodeTypesLabelName.City],
          isMultiple: true,
          name: NamesForOption.City,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.Restaurants) {
      // it's a Restaurant
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Restaurants,
          options: optionsList[PromoCodeTypesLabelName.Restaurants],
          isMultiple: true,
          name: NamesForOption.Restaurants,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.Branch) {
      // it's a Branch
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Branch,
          options: optionsList[PromoCodeTypesLabelName.Branch],
          isMultiple: true,
          name: NamesForOption.Branch,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.Zones) {
      // it's a Zone
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Zones,
          options: optionsList[PromoCodeTypesLabelName.Zones],
          isMultiple: true,
          name: NamesForOption.Zones,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.MenuItem) {
      // it's a Menu
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Branch,
          options: optionsList[PromoCodeTypesLabelName.Branch],
          isMultiple: true,
          name: NamesForOption.Branch,
        },
        {
          label: PromoCodeTypesLabelName.MenuItem,
          options: optionsList[PromoCodeTypesLabelName.MenuItem] || [],
          isMultiple: true,
          name: NamesForOption?.MenuItem,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    } else if (fieldValue == FieldValueForOption.Cuisines) {
      // it's a Cuisine
      result[value] = [
        {
          label: PromoCodeTypesLabelName.Cuisines,
          options: optionsList[PromoCodeTypesLabelName.Cuisines],
          isMultiple: true,
          name: NamesForOption.Cuisines,
        },
        {
          label: PromoCodeTypesLabelName.SubscriptionType,
          options: optionsList[PromoCodeTypesLabelName.SubscriptionType],
          isMultiple: true,
          name: NamesForOption.SubscriptionType,
        },
      ];
    }
  }

  return result;
}

export function arrayToParams(arr = [], paramKeyName) {
  return arr.reduce((prev, curr) => {
    if (prev) {
      return `${prev}&${paramKeyName}=${curr}`;
    } else {
      return `${paramKeyName}=${curr}`;
    }
  }, "");
}

export function generatePayload(values) {
  const payload = cloneDeep(values);
  if (payload?.customerIds?.length) {
    payload.customerIds = values?.customerIds?.map(
      (customer) => customer.value
    );
  }
  if (payload?.branchIds?.length) {
    payload.branchIds = values?.branchIds?.map((branch) => branch.value);
  }
  if (payload.categoryIds?.length) {
    payload.categoryIds = values?.categoryIds?.map(
      (category) => category.value
    );
  }
  if (payload?.subscriptionTypeIds?.length) {
    payload.subscriptionTypeIds = values?.subscriptionTypeIds?.map(
      (subs, index) => subs.value
    );
  }
  if (payload?.cityIds?.length) {
    payload.cityIds = values?.cityIds?.map((city) => city.value);
  }
  if (payload?.restaurantIds?.length) {
    payload.restaurantIds = values?.restaurantIds?.map((rest) => rest.value);
  }
  if (payload?.zoneIds?.length) {
    payload.zoneIds = values?.zoneIds?.map((rest) => rest.value);
  }
  if (payload?.menuItemIds?.length) {
    payload.menuItemIds = values?.menuItemIds?.map((rest) => rest.value);
  }
  if (payload?.cuisineIds?.length) {
    payload.cuisineIds = values?.cuisineIds?.map((rest) => rest.value);
  }

  // if not ids then remove
  if (!values?.customerIds?.length) {
    delete payload.customerIds;
  }
  if (!values?.branchIds?.length) {
    delete payload.branchIds;
  }
  if (!values?.categoryIds?.length) {
    delete payload.categoryIds;
  }
  if (!values?.subscriptionTypeIds?.length) {
    delete payload.subscriptionTypeIds;
  }
  if (!values?.cityIds?.length) {
    delete payload.cityIds;
  }
  if (!values?.restaurantIds?.length) {
    delete payload.restaurantIds;
  }
  if (!values?.zoneIds?.length) {
    delete payload.zoneIds;
  }
  if (!values?.menuItemIds?.length) {
    delete payload.menuItemIds;
  }
  if (!values?.cuisineIds?.length) {
    delete payload?.cuisineIds;
  }

  if (values.isGradual === "false") {
    delete payload.gradualInformation;
  }

  payload.isPercent = values.isPercent === "true" ? true : false;
  payload.isGradual = values.isGradual === "true" ? true : false;
  payload.promoCodeTypeId = values?.couponTypeId?.value;
  payload.validTimeInDayStart = `${payload.validTimeInADayStart}:00:0000000`;
  payload.validTimeInDayEnd = `${payload.validTimeInADayEnd}:00:0000000`;
  payload.startTime = moment(values.startTime).toISOString();
  payload.endTime = moment(values.endTime).toISOString();

  delete payload.selectedTypes;
  delete payload.couponTypeId;

  return payload;
}

export function getInitialValues(values) {
  return InitialPCValues;
}
