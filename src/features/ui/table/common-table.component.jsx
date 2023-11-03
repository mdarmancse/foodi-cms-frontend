import { isEqual } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DataTable } from "..";
import { useLazyGetTableListQuery } from "./common-table-api-slice";
import {
  changeCurrentPage,
  changeItemsPerPage,
  changePaginationParams,
} from "./common-table-slice";
import { TableActiveInactiveTab } from "./table-tabs.component";

const InitialParams = {
  isActive: true,
  pageNumber: 1,
  itemsPerPage: 10,
  path: "",
};

export function CommonTable({
  url,
  initialFilters = {},
  columns = [],
  filterComp: FilterComp,
}) {
  const { pageNumber, itemsPerPage, isActive, totalItems, filter, path } =
    useSelector((state) => state.commonTable);
  const dispatch = useDispatch();
  const [trigger, { data, isSuccess, isFetching }] = useLazyGetTableListQuery();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== path || pathname !== path) {
      dispatch(
        changePaginationParams({
          ...InitialParams,
          path: pathname,
          filter: {},
        })
      );
    } else {
      if (url) {
        if (Object.keys(filter).length) {
          trigger({
            url,
            params: {
              itemsPerPage,
              isActive,
              ...initialFilters,
              ...filter,
            },
          });
        } else {
          trigger({
            url,
            params: {
              pageNumber,
              itemsPerPage,
              isActive,
              ...initialFilters,
            },
          });
        }
      }
    }
  }, [pageNumber, itemsPerPage, isActive, filter, pathname, path]);

  useEffect(() => {
    if (data && isSuccess) {
      const paginationParams = {
        pageNumber: data?.data?.pageNumber,
        itemsPerPage: data?.data?.itemsPerPage,
        totalItems: data?.data?.totalItems,
      };

      if (!path) {
        paginationParams.path = pathname;
      } else {
        if (path !== pathname) {
          paginationParams.path = pathname;
        }
      }

      if (!isEqual({ pageNumber, itemsPerPage, isActive }, paginationParams)) {
        dispatch(changePaginationParams(paginationParams));
      }
    }
  }, [data]);

  const items = isSuccess ? data?.data?.items || data?.data : [];
  return (
    <div className="px-2 pb-4 common-table">
      {FilterComp && FilterComp}

      <TableActiveInactiveTab />
      <DataTable
        columns={columns}
        tableData={items}
        handlePageChange={(pageNumber) => {
          dispatch(changeCurrentPage(pageNumber));
        }}
        handlePerRowsChange={(itemsPerPage) => {
          dispatch(changeItemsPerPage(itemsPerPage));
        }}
        progressPending={isFetching}
        totalRows={totalItems}
        paginationPerPage={itemsPerPage}
        currentPage={pageNumber}
      />
    </div>
  );
}
