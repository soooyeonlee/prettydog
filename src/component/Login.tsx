import { Button, Typography , Checkbox, Form, Input, Row, Card } from "antd";
import { LoginDiv, LoginInnerDiv } from "./StyleComponet";
const { Title } = Typography;
export default function Login(){
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!'
        }
    };

    return(
        <>
        <LoginDiv>
            <Card size="small" title="로그인" style={{boxShadow : "10px 10px 10px gray", borderRadius : "20px"}}>
            <LoginInnerDiv>
                
                <Form
                    validateMessages={validateMessages}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Form.Item name={['user', 'email']} label="이메일" rules={[{ type: 'email',required:true, }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                    </Form.Item>
                </Form>
            </LoginInnerDiv>
            </Card>
        </LoginDiv>
        </>
    );
}