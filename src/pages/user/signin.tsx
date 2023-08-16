import { Button, Form, Input, message } from "antd";
import { useSigninMutation } from "@/api/auth";
import {useNavigate } from "react-router-dom";
import localStorage from "redux-persist/es/storage";

type FieldType = {
  email?: string;
  password?: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const [signin] = useSigninMutation();

  const onFinish = (values: any) => {
    signin(values)
      .unwrap()
      .then(() => {
        message.success("Đăng nhập thành công");
        navigate("/");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        message.error("Đăng nhập thất bại");
      });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className="text-2xl">Đăng nhập</h2>
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
              { required: true, message: "Bạn chưa nhập Email" },
              { type: "email", message: "Email chưa đúng định dạng" },
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

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button htmlType="submit">
                Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
