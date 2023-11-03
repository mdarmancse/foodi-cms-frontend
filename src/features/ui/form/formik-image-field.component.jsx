import { Field } from "formik";
import { useId } from "react";
import BSFile from "react-bootstrap/Form";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {boolean} required
 */
/**
 * @typedef { import('react-bootstrap').FormControlProps & OtherProps } ImageFieldProps
 * @
 */

/**
 * @param { ImageFieldProps } props
 */
function ImageField({ label, id, error,multiple, helperText, disabled, ...rest }) {
  const generatedID = useId();
  const fileId = id || generatedID;

  //@TODO: should handle error later;
  return (
    <FieldContainer>
      {label && (
        <label htmlFor={fileId} className="fw-medium">
          <span> {label}</span>
          {rest.required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <BSFile.Control id={fileId} type="file" multiple={multiple} disabled={disabled} {...rest} />
      </div>
    </FieldContainer>
  );
}

/**
 *
 * @typedef {Object} FormikTextFieldProps
 * @property {string} apiError
 * @property {ImageFieldProps} imageFieldProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikTextFieldProps} props
 */
export function FormikImageField({
  imageFieldProps,
  apiError,
  disabled,
  multiple,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting, setFieldValue },
      }) => {
        return (
          <ImageField
            {...imageFieldProps}
            multiple={multiple == true ? true : false}
            onChange={(event) => {
              const imageFile = multiple == true ? event.target.files : event.target.files[0]
              setFieldValue(rest?.name, imageFile);
            }}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : imageFieldProps?.helperText
            }
          />
        );
      }}
    </Field>
  );
}
