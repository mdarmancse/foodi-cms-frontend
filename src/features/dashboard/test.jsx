import { FormikToggleButton } from "../ui";

export const Test = ({ setFieldValue }) => {
  return (
    <div>
      <FormikToggleButton
        name="second"
        toggleButtonProps={{
          label: "Second",
          onChange() {
            setFieldValue("second", 10);
          },
        }}
      />
    </div>
  );
};
