import { useAddProductMutation } from "@/api/product";
import { message, Input, Form, Button } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name?: string;
  price: number;
  description: string;
};

const AdminProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();
    const onFinish = (values: any) => {
        addProduct(values)
            .unwrap()
            .then(()=>{
                
                messageApi.open({
                    type: "success",
                    content: "Bạn đã sửa thành công",
                    
                });
                form.resetFields()
                setTimeout(()=>{
                    navigate("/admin/dashboard")
                })
            })
    }
    const onFinishFailed = (errorInfo: any) =>{
        console.log("Failed", errorInfo);
        
    }
  return (
    <div>
        {contextHolder}
        <h2>Thêm Sản Phẩm</h2>
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
            { required: true, message: "Bạn chưa nhập mô tả sản phẩm" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isAddProductLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Thêm"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProductAdd;
