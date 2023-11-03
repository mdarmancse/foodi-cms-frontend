export const parseObjectToParams = (obj = {}) => {
  let queryParams;
  if (typeof obj === "object") {
    queryParams = Object.keys(obj).reduce((curr, prev) => {
      return !curr ? `${prev}=${obj[prev]}` : `${curr}&${prev}=${obj[prev]}`;
    }, "");
  } else {
    queryParams = "";
  }

  return queryParams;
};
