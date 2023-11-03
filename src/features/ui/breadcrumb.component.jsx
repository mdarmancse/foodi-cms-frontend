import PropTypes from "prop-types";
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { AiTwotoneHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export const FoodiBreadcrumb = ({ items = [], active = "" }) => {
  const bItems = [
    {
      name: "",
      icon: <AiTwotoneHome className="text-primary" />,
      url: "/",
    },
    ...items,
  ];
  return (
    <Breadcrumb className="pt-3" as="div">
      {bItems.map((item, index) => {
        const isLink = item?.url;
        return (
          <React.Fragment key={item?.name}>
            <Breadcrumb.Item
              active={item?.name?.toLowerCase() === active}
              className="d-flex align-items-center breadcrumb"
            >
              {Boolean(item.icon) && (
                <span>
                  {!item.name ? (
                    <Link to={item.url}>{item?.icon}</Link>
                  ) : (
                    item?.icon
                  )}
                </span>
              )}
              {Boolean(item.name) && (
                <span className={` ${name ? "ps-2" : ""}`}>
                  {isLink ? (
                    <Link
                      className="text-primary text-decoration-none"
                      to={item.url}
                      data-cy={index + 1 === bItems.length ? 0 : ""}
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    item?.name
                  )}
                </span>
              )}
            </Breadcrumb.Item>
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};

FoodiBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  active: PropTypes.string,
};
