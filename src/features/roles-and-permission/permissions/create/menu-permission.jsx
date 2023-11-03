import { useEffect, useMemo, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

export const MenuPermission = ({
  selected,
  onChange,
  setSelected,
  userMenu,
  parentMenus,
  actionMenus,
}) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    setChecked([...parentMenus, ...actionMenus]);
  }, [parentMenus.length, actionMenus.length]);

  useEffect(() => {
    onChange([...selected]);
  }, [selected]);

  const newNodes = userMenu?.map((nodes) => {
    return {
      value: nodes.id,
      label: nodes.name,
      children: nodes.hasSubMenus
        ? nodes?.subMenus?.map((subMenu) => {
            return {
              value: subMenu.id,
              label: subMenu.displayName,
              children: subMenu?.menuActions?.map((menuAction) => {
                return {
                  value: menuAction.id,
                  label: menuAction.name,
                };
              }),
            };
          })
        : nodes?.menuActions?.map((menuAction) => {
            return {
              value: menuAction.id,
              label: menuAction.name,
            };
          }),
    };
  });

  // console.log("newNodes", newNodes);

  // console.log({ checked });

  return (
    <>
      {userMenu && (
        <CheckboxTree
          checkModel="all"
          nodes={newNodes}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => {
            setChecked(checked), setSelected(checked);
          }}
          onExpand={(expanded) => setExpanded(expanded)}
        />
      )}
    </>
  );
};
