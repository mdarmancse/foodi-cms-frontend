import PropTypes from "prop-types";
import { FoodiBreadcrumb } from "../ui";

export const CommonLayout = ({
  breadcrumbItems = [],
  title = "",
  BtnComp,
  children,
}) => {
  return (
    <div className="p-1 h-auto">
      <FoodiBreadcrumb items={breadcrumbItems} />

      <div className="title">
        <h4>{title}</h4>

        {BtnComp && BtnComp}
      </div>

      {children}
    </div>
  );
};

CommonLayout.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  BtnComp: PropTypes.element,
};
