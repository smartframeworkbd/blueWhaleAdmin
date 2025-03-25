const { default: baseApi } = require("@/redux/Api/baseApi");

const productCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProductCategory: builder.mutation({
            query: (data) => ({
                url: "/product-category/create",
                method: "POST",
                body: data
            })
        }),
        getProductCategory: builder.query({
            query: () => ({
                url: "/product-category",
                method: "GET"
              
            })
        }),

    })
});

export const { useAddProductCategoryMutation,useGetProductCategoryQuery } = productCategoryApi;
