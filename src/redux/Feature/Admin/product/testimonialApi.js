import baseApi from "@/redux/Api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTestimonial: builder.mutation({
            query: (data) => ({
                url: "/testimonial/create",
                method: "POST",
                body: data
            })
        }),
        getTestimonial: builder.query({
            query: () => ({
                url: "/testimonial",
                method: "GET"
              
            })
        }),
    })
});

export const {useAddTestimonialMutation,useGetTestimonialQuery  } = productApi;
