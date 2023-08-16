import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { Button, Popconfirm, Table, message, Skeleton } from "antd"
import { Link } from "react-router-dom"
import { IProduct } from "@/interfaces/products";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminProduct = () => {
    const [messageApi , contextHolder] = message.useMessage();
    const [removeLoadingMap, setRemoveLoadingMap] = useState<Record<number|string,boolean>>({})
    const { data: productsData, isLoading: isProductLoading } = useGetProductsQuery();
    const [removeProduct, {isLoading: isRemoveLoading}] = useRemoveProductMutation();
    const dataSource = productsData?.map((item: IProduct) => ({
        key: item.id,
        name: item.name,
        price: item.price,
        description: item.description
    }))

    const confirm = (id:number | string) => {
        setRemoveLoadingMap((preMap) => ({...preMap , [id]: true}));

        removeProduct(id) 
            .unwrap()
            .then(() =>{
                messageApi.open({
                    type: "success",
                    content: "Bạn đã xóa thành công !",
                })
                setRemoveLoadingMap((preMap)=>({...preMap,[id]: false}))
            })
    }
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Mô tả sản phẩm",
            dataIndex: "description",
            key: "description",
        }
        ,

        {
            render: ({ key: id }: { key: number | string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Xóa sản phẩm"}
                        description={"Bạn chắc chưa ?"}
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            {
                                removeLoadingMap[id] && isRemoveLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    "Xóa"
                                )}

                        </Button>
                    </Popconfirm>
                    <Button>
                        <Link to={`/admin/${id}/edit`}>Sửa</Link>
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>
            <Button type="primary" danger>
                <Link to="/admin/add">Thêm Sản Phẩm</Link>
            </Button>
            <br />
            {contextHolder}
            {isProductLoading ? <Skeleton/> : <Table dataSource={dataSource} columns={columns}/>}
        </div>
    )
}

export default AdminProduct