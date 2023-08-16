import { Button, Form, Input, message } from "antd";
import { useSignupMutation } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};
const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const onFinish = (values: any) => {
    const data = { ...values };
    signup(data)
      .unwrap()
      .then(() => {
        message.success("Bạn đăng ký thành công");
        navigate("/");
      })
      .catch(() => {
        message.error("Đăng ký thất bại");
      });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className="text-2xl">Đăng ký</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Bạn chưa nhập email" },
              { type: "email", message: "Không đúng định dạng" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Bạn chưa nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8 , span: 16}}>
            <Button htmlType="submit">Đăng ký</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
