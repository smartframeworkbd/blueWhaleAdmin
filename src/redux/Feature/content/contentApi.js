import baseApi from '../../Api/baseApi';
// import { getTagsByModuleName } from "@/redux/Tag/Tag";



const contentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // Get Content
        getContentBySlug: builder.query({
            query: (slug) => ({
                url: `/content/slug/${slug}`,
            }),


        }),
        getContentIsMenu: builder.query({
            query: () => ({
                url: `/content/menu`,
            }),
        })


    }),
});


export const {
    useGetContentBySlugQuery,
    useGetContentIsMenuQuery
} = contentApi;

