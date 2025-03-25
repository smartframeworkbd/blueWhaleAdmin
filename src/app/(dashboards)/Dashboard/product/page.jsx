"use client"

import DashboardTable from "@/components/Table/DashboardTable"
import { useGetProductQuery } from "@/redux/Feature/Admin/product/productApi";

const Product = () => {
    const { data, isLoading, isSuccess } = useGetProductQuery()

    const columns = [
        {
            title: "Product Title",
            dataIndex: "productTitle",
            key: "productTitle",
        },
        {
            title: "Price",
            dataIndex: "productPrice",
            key: "productPrice",
        },
        {
            title: "Stock",
            dataIndex: "productStock",
            key: "productStock",
        },
        {
            title: "Status",
            dataIndex: "productStatus",
            key: "productStatus",
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Product Image",
            dataIndex: "productImage",
            key: "productImage",
            render: (imageString) => {
                try {
                    const images = JSON.parse(imageString); // Parse the JSON string to an array
                    return images?.length > 0 ? (
                        <img
                            src={images[0]?.imageUrl}
                            alt="Product"
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                        />
                    ) : (
                        <span>No Image</span>
                    );
                } catch (error) {
                    return <span>Invalid Image</span>; // Handle parsing errors
                }
            },
        },
    ];

    return (
        <div>
            <div className="text-center lg:text-2xl font-bold mb-5">
                Product 
            </div>
            <DashboardTable columns={columns} data={isSuccess && data?.data} loading={isLoading} />
        </div>
    )
}

export default Product;
