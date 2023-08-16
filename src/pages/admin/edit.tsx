import { useGetProductByIdQuery, useUpdateProductMutation } from "@/api/product";
import { message, Input, Form, Button } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom"

type FieldType = {
    name?: string;
    price: number;
    description: string;
}

const AdminProductEdit = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder ] = message.useMessage();
    const { data: productData , isLoading: isProductLoading} = useGetProductByIdQuery(
        idProduct || ""
    )
    const [updateproduct, {isLoading: isUpdateLoading}] = useUpdateProductMutation();

    useEffect(() => {
        form.setFieldsValue(productData)
    },[productData])

    const onFinish = (values: any) => {
        updateproduct({...values,id: idProduct})
        .unwrap()
        .then(()=>{
            messageApi.open({
                type: "success",
                content: "Bạn đã sửa thành công",
            });
            form.resetFields()
            setTimeout(()=>{
                navigate("/admin")
            },3000)
        })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed", errorInfo);

    }
    return (
        <div>
            {contextHolder}
            <h2>Sửa Sản Phẩm</h2>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            style={{ width: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Bạn chưa nhập tên sản phẩm" },
                { min: 3, message: " Tên sản phẩm tối thiểu 3 ký tự" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Gía sản phẩm"
              name="price"
              rules={[
                { required: true, message: "Bạn chưa nhập giá sản phẩm" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Mô tả sản phẩm"
              name="description"
              rules={[
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" danger htmlType="submit">
                {isUpdateLoading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
}

export default AdminProductEdit