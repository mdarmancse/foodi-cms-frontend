import { Link } from "react-router-dom";

/**
 *
 * @typedef {Object} OtherProps
 * @property {string} className
 * @property {string} btnName
 */

/**
 *
 * @typedef {Partial<OtherProps>  } linkButtonProps
 *
 */
export function LinkButton({ className = "", btnName = "", to = "", ...rest }) {
  return (
    <Link to={to} className={`link-button ${className}`} {...rest}>
      {btnName}
    </Link>
  );
}
