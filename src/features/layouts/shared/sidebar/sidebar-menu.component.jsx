import { Fragment } from "react";
import { Accordion, Card } from "react-bootstrap";
import { BsCardList } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Menus = [
  {
    id: 1,
    name: "Restaurent",
    url: "/restaurent",
    icon: "restaurent",
    displayName: "Restaurent",
    hasSubMenus: false,
    lavelAt: 1,
    isSelected: true,
    isVisible: true,
    parentId: 0,
    order: 1,
    subMenus: [],
    menuActions: [],
  },
  {
    id: 2,
    name: "Rider",
    url: "/rider",
    icon: "rider",
    displayName: "Rider",
    hasSubMenus: false,
    lavelAt: 1,
    isSelected: true,
    isVisible: true,
    parentId: 0,
    order: 2,
    subMenus: [],
    menuActions: [],
  },
];

export function SidebarMenu({ menuList = Menus }) {
  const { pathname } = useLocation();

  //@TODO: Some implementation left. Will implement later;
  return (
    <div className="mt-2">
      {menuList?.map((menu, index) => {
        if (menu.hasSubMenus && menu.subMenus.length > 0) {
          return (
            <Accordion key={index} className="sidebar-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  style={{
                    fontSize: "15px !important",
                  }}
                >
                  {menu.displayName}
                </Accordion.Header>

                <div>
                  <Accordion.Body className="accordion-body">
                    {menu?.subMenus?.map((subMenu, indx) => {
                      return (
                        <Card
                          key={indx}
                          className="nested-sidebar-accordion border-0 bg-transparent my-1 px-1 "
                        >
                          <Link
                            to={`${subMenu.url}`}
                            className={`sidebar-link ${
                              pathname === subMenu.url ? "sidebar-active" : ""
                            }`}
                          >
                            <Card.Body className="p-0">
                              {subMenu.displayName}
                            </Card.Body>
                          </Link>
                        </Card>
                      );
                    })}
                  </Accordion.Body>
                </div>
              </Accordion.Item>
            </Accordion>
          );
        }

        if (menu.menuActions.length > 0) {
          return (
            <Fragment key={menu.id}>
              <Accordion className="sidebar-accordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    style={{
                      fontSize: "15px !important",
                    }}
                  >
                    {menu.displayName}
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <Card className="border-0">
                      {menu.menuActions.length > 0 &&
                        menu.menuActions.map((actions, i) => (
                          <Card
                            key={i}
                            className="nested-sidebar-accordion border-0 bg-transparent my-1 px-1 "
                          >
                            <Link
                              to={`${actions.url}`}
                              className={`sidebar-link ${
                                pathname === actions.url ? "sidebar-active" : ""
                              }`}
                            >
                              <Card.Body className="p-0">
                                {actions.displayName}
                              </Card.Body>
                            </Link>
                          </Card>
                        ))}
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Fragment>
          );
        }

        return (
          <Card key={menu.id} className="border-0">
            <Link
              to={menu.url}
              className={`sidebar-link ${
                pathname === menu.url ? "sidebar-active" : ""
              }`}
            >
              {menu.displayName}
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
