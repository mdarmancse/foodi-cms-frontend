import Axios from "axios";

const BaseURL = import.meta.env.VITE_APP_BASE_URL;

const axios = Axios.create({ baseURL: BaseURL });

export const axiosBaseQuery = ({ prepareHeaders, meta, transformResponse }) => {
  return async (args, api, extraOptions) => {
    try {
      console.log({ args, api, extraOptions });

      console.log({ prepareHeaders, meta, transformResponse });

      const requestConfig = args;
      axios.interceptors.request.use((config) => {
        const token = prepareHeaders(requestConfig?.headers || {}, api) || "";
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      });
      let result;

      if (!requestConfig?.method) {
        console.log("inside if");
        result = await axios({
          url: requestConfig,
          method: "GET",
          data: requestConfig.body,
          signal: api.signal,
          ...extraOptions,
        });
      } else {
        result = await axios({
          ...requestConfig,
          data: requestConfig.body,
          signal: api.signal,
          ...extraOptions,
        });
      }

      return {
        data: transformResponse ? transformResponse(result.data) : result.data,
      };
    } catch (err) {
      if (!Axios.isAxiosError(err)) {
        return {
          error: err,
          meta,
        };
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
        meta,
      };
    }
  };
};
