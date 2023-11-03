import { useField } from "formik";
import { Alert, Button, Stack } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TbAlertOctagon } from "react-icons/tb";
import { toast } from "react-toastify";
import { CategoryRowObj } from "./form.config";
import { VariationCategory } from "./variation-category.component";

export function VariationAddOnsSidebar({ show, onHide }) {
  const [{ value }, initialMeta, initialAddOnsForm] = useField(
    "initialVariationCategory"
  );

  const [{ value: index }] = useField("selectedVariationIndex");

  const [{ value: variationRow }, variationMeta, variationForm] = useField(
    `variations.${index}.addOnCategories`
  );

  const handleSave = () => {
    const hasCatIDAndOdsOns = value?.some(
      (val) => val.addOnCategoryId && val?.addOns?.length > 0
    );

    if (!hasCatIDAndOdsOns) {
      toast.error("Please select a category");
      return;
    }

    const hasErrors = initialMeta.error;

    if (hasErrors) {
      return;
    }

    const rows = value.map((v) => ({
      ...v,
      isSaved: true,
      addOns: v.addOns?.map((addOn) => ({
        ...addOn,
        isPrev: true,
      })),
      isCategoryMultiple: value?.length > 1 ? true : false,
    }));

    console.log({ rows });
    variationForm.setValue(rows);

    initialAddOnsForm.setValue([CategoryRowObj]);
    onHide();
  };

  return (
    <Offcanvas
      as="div"
      style={{
        width: "40vw",
      }}
      show={show}
      onHide={onHide}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Add-ons</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Alert variant="warning" className="d-flex align-items-center">
          <TbAlertOctagon className="me-2" />
          You've to select at least one Category.
        </Alert>

        <VariationCategory />

        <div className="mt-4 d-flex justify-content-end">
          <Stack direction="horizontal" gap={2}>
            <Button onClick={onHide} variant="warning">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </Stack>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
