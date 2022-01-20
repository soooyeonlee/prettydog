import { Button, Typography , Checkbox, Form, Input, Row, Card } from "antd";
import { LoginDiv, LoginInnerDiv } from "./StyleComponet";
import service, { ResponseDatas } from "../helper/service";
import { ChangeEvent, useState } from "react";
const { Title } = Typography;
export default function Login(){

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onFinish = (values: any) => {
        console.log('Success:', values);
        sendLogin();
    };

    const sendLogin = async() =>{
        let result:ResponseDatas = await service('/login/token','POST', {'email':email, 'password':password});

        if(Object(result.data).code !== '0'){
            alert(Object(result.data).message);
        }else{
            if(result.status === 200 && result.data){
                sessionStorage.setItem('token', Object(result.data).data.token);
                document.location.href = "/home";
            }
        }
    }
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeEmail = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
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
                        <Input value={email} onChange={onChangeEmail}/>
                    </Form.Item>
                    <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={onChangePassword}/>
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