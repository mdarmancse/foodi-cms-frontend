import { FormikSelectField } from "@/features/ui";
import { FieldArray, useField } from "formik";
import { useEffect, useState } from "react";
import { Button, Row, Stack } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useGetCategoryWithPresetQuery } from "../restaurant-api-slice";
import { CategoryAddOns } from "./category-add-ons.component";
import { CategoryRowObj } from "./form.config";

export function VariationCategory() {
  const { data, isLoading } = useGetCategoryWithPresetQuery();
  const categories = data?.data || [];
  const categoryListForOptions =
    categories.map((d) => ({ label: d.name, value: d.id })) || [];

  const [selectedCat, setSelectedCat] = useState(null);
  const [{ value: addonsVariation }, , initialAddonsVariationForm] = useField(
    "initialVariationCategory"
  );
  // just for selecting which index;
  const [{ value: selectedVariationIndex }] = useField(
    "selectedVariationIndex"
  );
  const [{ value: variationCategory }] = useField(
    `variations.${selectedVariationIndex}.addOnCategories`
  );

  useEffect(() => {
    if (variationCategory?.length > 0) {
      initialAddonsVariationForm.setValue(variationCategory);
    }

    return () => {
      initialAddonsVariationForm.setValue([CategoryRowObj]);
    };
  }, []);

  return (
    <FieldArray
      name="initialVariationCategory"
      render={({ push, remove }) => {
        return (
          addonsVariation?.length > 0 &&
          addonsVariation?.map((category, index) => {
            return (
              <Row className="mb-3" key={index}>
                <Stack gap={3}>
                  <FormikSelectField
                    name={`initialVariationCategory.${index}.addOnCategoryId`}
                    selectFieldProps={{
                      label: "Category",
                      required: true,
                      options: categoryListForOptions,
                      className: "text-capitalize",
                    }}
                  />
                </Stack>

                <Row>
                  <CategoryAddOns
                    categories={categories}
                    categoryInfo={category}
                    index={index}
                  />
                </Row>

                <Row className="mt-4 ms-1">
                  <Stack direction="horizontal" gap={2}>
                    {addonsVariation.length > 1 && (
                      <Button variant="danger" onClick={() => remove(index)}>
                        <MdDelete />
                      </Button>
                    )}

                    {addonsVariation.length === index + 1 && (
                      <Button
                        className="w-auto"
                        variant="success"
                        onClick={() => push(CategoryRowObj)}
                      >
                        Add More Category
                      </Button>
                    )}
                  </Stack>
                </Row>
              </Row>
            );
          })
        );
      }}
    />
  );
}
