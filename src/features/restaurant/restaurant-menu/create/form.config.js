import * as yup from "yup";

export const CategoryRowObj = {
  addOnCategoryId: "",
  addOnCategoryName: "",
  addOns: [],
  isCategoryMultiple: false,
  maxChoice: 0,
  hasMaxChoice: false,
  isSaved: false,
};

export const VariationRow = {
  name: "",
  price: "",
  groupName: "",
  groupDescription: "",
  addOnCategories: [],
  addOn: false,
};

export const RMenuInitialValue = {
  name: "",
  price: "",
  pickupMenuPrice: "",
  recipeTime: "",
  menuGroupId: "",
  variationGroupName: "",
  variationGroupDesc: "",
  hasVariation: "",
  image: "",
  description: "",
  vat: "",
  sd: "",
  isPopular: false,
  isDelivery: false,
  isPickup: false,
  isDine: false,
  branchId: "",
  categoryId: "",
  menuAvailableTimes: [],
  variations: [VariationRow],
  initialVariationCategory: [CategoryRowObj],

  selectedVariationIndex: "",
  categoryAddOns: {
    name: "",
    price: "",
  },
};

export const RMenuCreateValidationSchema = yup.object({
  branchId: yup
    .object({
      label: yup.string().required("Branch Name is required"),
      value: yup.string().required("Branch Name is required"),
    })
    .required("This Field is Required"),
  categoryId: yup
    .object({
      label: yup.string().required("Category is Required"),
      value: yup.string().required("Category is Required"),
    })
    .required("This Field is Required"),
  name: yup.string().min(1).max(100).trim().required("This Field is Required."),
  recipeTime: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("This Field is Required."),
  description: yup.string().min(1).max(100).trim().notRequired(),
  variationGroupName: yup.string().min(1).max(100).trim().notRequired(),
  price: yup.string().min(1).max(100).trim().required("This Field is Required"),
  menuGroupId: yup.string().required("This Field is Required"),
  pickupMenuPrice: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("This Field is Required"),
  image: yup.mixed().notRequired(), // this will implement later;
  hasVariation: yup.boolean().notRequired(),
  variations: yup
    .array()
    .when("hasVariation", (value, schema) => {
      const isChecked = value[0];
      if (isChecked) {
        return schema
          .of(
            yup.object({
              name: yup
                .string()
                .min(1)
                .max(100)
                .trim()
                .required("This Field is required."),
              price: yup.number().min(0).required("This Field is required."),
              groupName: yup.string().min(1).max(100).trim().notRequired(),
              groupDescription: yup
                .string()
                .min(1)
                .max(100)
                .trim()
                .notRequired(),
              addOnCategories: yup
                .array()
                .of(
                  yup.object({
                    addOnCategoryId: yup.string().required(),
                    hasMaxChoice: yup.boolean().notRequired(),
                    maxChoice: yup.number().min(0).notRequired(),
                    addOns: yup
                      .array()
                      .of(
                        yup.object({
                          name: yup.string().min(1).max(100).required(),
                          price: yup.number().min(0).required(),
                        })
                      )
                      .when("addOnCategoryId", (value, schema) => {
                        const hasCat = value[0];
                        if (hasCat) {
                          return schema.min(1).required();
                        }

                        return schema.notRequired();
                      }),
                  })
                )
                .notRequired(),
            })
          )
          .min(1)
          .required();
      }
      return schema.min(0).notRequired();
    })
    .notRequired(),
  vat: yup.number().min(0).required("This Field is Required"),
  sd: yup.number().min(0).required("This Field is Required"),
  menuAvailableTimes: yup
    .array()
    .min(1, "Please select at least one availability time.")
    .required("Minimum one availability time is required."),

  initialVariationCategory: yup
    .array()
    .of(
      yup.object({
        categoryId: yup.string().notRequired("This Field is required"),
        hasMaxChoice: yup.boolean().notRequired(),
        maxChoice: yup
          .number()
          .min(0, "Number should be positive")
          .notRequired(),
        addOns: yup
          .array()
          .of(
            yup.object({
              name: yup
                .string()
                .min(1)
                .max(100)
                .required("This Field is required"),
              price: yup
                .number()
                .min(0, "Number should be positive")
                .required("This Field is Required."),
            })
          )
          .notRequired(),
      })
    )
    .notRequired(),
});

export const generateFormData = (values) => {
  const variations = values?.addOnsVariationRows?.map((row) => {
    return {
      name: row.variationName,
      price: row.variationPrice,
      groupDescription: row.description,
      groupName: row.groupName,
      addOn: values.checkAddOns,
      addOnCategories: row.variationCategory.map((cat) => {
        const category = {
          addOnCategoryName: "",
          isCategoryMultiple: row.variationCategory?.length > 1 ? true : false,
          addOnCategoryId: cat.category,
          addOns: cat.presetAddOns?.map((addOn) => ({
            name: addOn.addOnName,
            price: addOn.addOnPrice,
            maxChoice: cat.maxChoice,
            isMultiple: cat.presetAddOns?.length > 1 ? true : false,
            addOnCategoryId: cat.category,
          })),
        };

        if (cat.hasMaxChoice) {
          category.maxChoice = cat.maxChoiceNumber;
        }

        return category;
      }),
    };
  });

  const payload = {
    name: values.menuName,
    price: values.menuPrice,
    pickupMenuPrice: values.pickupMenuPrice,
    recipeTime: values.preparationTime,
    menuGroupId: values.menuGroupId,
    variationGroupName: values.variationGroupName,
    variationGroupDesc: values.variationGroupDescription,
    hasVariation: values.checkAddOns ? 1 : 0,
    image: values?.image[0],
    description: values.menuDescription,
    vat: values.vat,
    sd: values.sd,
    isPopular: values.popular,
    isDelivery: values.delivery,
    isPickup: values.pickup,
    isDine: values.dine,
    branchId: values.branchName?.value,
    categoryId: values.category?.value,
    variations: variations,
    menuAvailableTimes: values.menuAvailability,
  };

  if (!payload.hasVariation) delete payload.variations;

  return payload;
};

export const getRMenuInitialData = (data = {}) => {
  if (!data) return RMenuInitialValue;

  const initialValue = { ...data };
  initialValue.branchId = {
    label: data?.branch?.name,
    value: data?.branchId,
  };
  initialValue.categoryId = {
    label: data?.category?.name,
    value: data?.categoryId,
  };

  initialValue.hasVariation = Boolean(data?.hasVariation);
  if (initialValue.hasVariation) {
    initialValue.variations = data?.variations.map((vr) => ({
      ...vr,
      addOnCategories: vr.addOnCategories.map((adC) => ({
        ...adC,
        hasMaxChoice: Boolean(adC.maxChoice),
      })),
    }));
    initialValue.initialVariationCategory = [CategoryRowObj];
  } else {
    initialValue.variations = [VariationRow];
    initialValue.initialVariationCategory = [CategoryRowObj];
  }

  return initialValue;
};
