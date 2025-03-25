const { default: baseApi } = require("@/redux/Api/baseApi");

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data
            })
        }),
        getProduct: builder.query({
            query: () => ({
                url: "/product",
                method: "GET"
              
            })
        }),
    })
});

export const { useAddProductMutation,useGetProductQuery } = productApi;
