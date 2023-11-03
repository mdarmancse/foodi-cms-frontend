import { apiSlice } from "@/features/api";

const categoryApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Category"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: ({ perPage, pageNumber }) =>
          `restaurants/api/Category?Offset=${pageNumber}&Limit=${perPage}`,
        providesTags: ["Category"],
      }),
      getBranch: builder.query({
        query:()=>"restaurants/api/Branch/GetBranchNames",
        transformResponse:(response)=>{
          console.log("response", response);

          let newResponse={
            items: response?.data?.map((item)=>{
              return{
                value: item.id,
                label: item.name
              }
            })
          }
          return newResponse
        }
       
      }),
      addCategory: builder.mutation({
        query: (data) => ({
          url: "restaurants/api/Category",
          method: "POST",
          body: data,
          
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation({
        query: (data) => ({
          url: `restaurants/api/Category/${data?.id}?isActive=${data?.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),
      
      getCategoryById: builder.query({
        query: (id) => `restaurants/api/Category/${id}`,
        providesTags: ["Category"],
      }),
      editCategory: builder.mutation({
        query: ({ formData, categoryId }) => ({
          url: `restaurants/api/Category/${categoryId}`,
          method: "PUT",
          body: formData,
          FormData: true,
        }),
        invalidatesTags: ["Category"],
      }),
    }),
  });

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useGetBranchQuery,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,
} = categoryApiSlice;
