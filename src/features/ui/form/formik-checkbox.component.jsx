import { Field } from "formik";
import { useId } from "react";
import Form from "react-bootstrap/Form";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 */

/**
 * @typedef { import('react-bootstrap/FormCheck').FormCheckProps & OtherProps } CheckBoxProps
 */

/**
 * @param {  CheckBoxProps } props
 */
function CheckBox({ name, id, label, disabled, error, helperText, ...rest }) {
  const generatedID = useId();
  const checkBoxId = id || generatedID;

  return (
    <div className="d-flex flex-row py-2">
      {label && (
        <label htmlFor={checkBoxId} className="fw-medium">
          <span className="text-capitalize"> {label}</span>
          {rest.required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div className="ps-3">
        <Form.Check name={name} id={generatedID} {...rest} type="checkbox" />
      </div>

      {error && <small className={"text-danger"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </div>
  );
}

/**
 *
 * @typedef {Object} FormikCheckBoxProps
 * @property {string} apiError
 * @property {CheckBoxProps} checkBoxProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikCheckBoxProps} props
 */
export function FormikCheckBox({ checkBoxProps, apiError, disabled, ...rest }) {
  return (
    <Field {...rest}>
      {({ field, meta: { touched, error }, form: { isSubmitting } }) => {
        return (
          <CheckBox
            {...field}
            checked={field.value}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : checkBoxProps?.helperText
            }
            {...checkBoxProps}
          />
        );
      }}
    </Field>
  );
}
