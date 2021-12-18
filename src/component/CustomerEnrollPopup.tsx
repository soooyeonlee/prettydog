import { useState } from "react";
import { ButtonDiv, CardDiv, CardPopupDiv, CustomerInnerDiv, CustomerModalDiv, SpinStyle } from "./StyleComponet";
import { SearchOutlined ,CloseSquareTwoTone} from '@ant-design/icons';
import { Button, Row, Col, Card, Radio, Input, Switch, InputNumber } from "antd";
const { TextArea } = Input;
export default function CustomerEnrollPopup(props : {CloseCustomerEnroll : () => void, showCustomerEnrollPopup : boolean}) {
    const [loading, setLoading] = useState<boolean>(false);
    const ClosePopup = () => {
        props.CloseCustomerEnroll();
    }
    return (
        <>
        <CustomerModalDiv style={{display : props.showCustomerEnrollPopup ? '' : 'none'}}>
            <CustomerInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>고객등록 
                        <Button type="primary" icon={<CloseSquareTwoTone />} onClick={ClosePopup}/>
                    </CardPopupDiv>
                   <Card size="small" type="inner" title="프로필 입력">
                        <div style={{ width : "100%"}}>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>이름 :</Col>
                                <Col><Input placeholder="이름" /></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>전화번호 :</Col>
                                <Col><Input placeholder="전화번호" /></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>성별 :</Col>
                                <Col>
                                    <Radio.Group >
                                        <Radio value={1}>남</Radio>
                                        <Radio value={2}>여</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>주소 :</Col>
                                <Col><Input placeholder="주소" /></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>부 보호자 :</Col>
                                <Col><Input placeholder="부 보호자" /></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>전화번호 :</Col>
                                <Col><Input placeholder="전화번호" /></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>성별 :</Col>
                                <Col>
                                    <Radio.Group >
                                        <Radio value={1}>남</Radio>
                                        <Radio value={2}>여</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </div>
                   </Card>
                   <Card size="small" type="inner" title="블랙리스트 여부">
                        <div style={{ width : "100%"}}>
                            <Row style={{marginBottom : "5px", display : "flex", alignItems : "center"}}>
                                <label>블랙리스트</label>
                                <Switch size="small"  />
                            </Row>
                            <Row style={{display : "flex", alignItems : "center", marginBottom : "5px"}}>
                                <Col span={2}>
                                    <label>노쇼 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                                <Col span={2}>
                                    <label>회</label>
                                </Col>

                                <Col span={2}>
                                    <label>지각 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                                <Col span={2}>
                                    <label>회</label>
                                </Col>
                            </Row>
                            <TextArea rows={6}/>
                        </div>
                   </Card>
                   <ButtonDiv>
                       <Button style={{marginRight : "5px"}} type="primary">저장</Button>
                   </ButtonDiv>
                </SpinStyle>
            </CustomerInnerDiv>
        </CustomerModalDiv>
        </>
    );
}