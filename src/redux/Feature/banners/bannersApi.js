import baseApi from '../../Api/baseApi';
// import { getTagsByModuleName } from "@/redux/Tag/Tag";



const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // Get banner
        getBanners: builder.query({
            query: () => ({
                url: `/banners/`,
            }),


        }),
       

    }),
});


export const {
useGetBannersQuery  
} = bannerApi;

