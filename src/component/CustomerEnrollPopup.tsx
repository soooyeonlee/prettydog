import { ChangeEvent, useEffect, useState } from "react";
import { ButtonDiv,CardPopupDiv, CustomerInnerDiv, CustomerModalDiv, SpinStyle } from "./StyleComponet";
import { CloseSquareTwoTone} from '@ant-design/icons';
import { Button, Row, Col, Card, Radio, Input, InputNumber, Modal, RadioChangeEvent, Checkbox } from "antd";
import service, { ResponseDatas } from "../helper/service";
import { valueType } from "antd/lib/statistic/utils";

const { TextArea } = Input;
export default function CustomerEnrollPopup(props : {CloseCustomerEnroll : () => void, showCustomerEnrollPopup : boolean, setGogekId : any}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [m_name, set_m_name] = useState<string>('');
    const [m_hp_no, set_m_hp_no] = useState<string>('');
    const [m_gender, set_m_gender] = useState<string>('');
    const [m_addr1, set_m_addr1] = useState<string>('');
    const [s_name, set_s_name] = useState<string>('');
    const [s_hp_no, set_s_hp_no] = useState<string>('');
    const [s_gender, set_s_gender] = useState<string>('');
    const [black_yb_chk, set_black_yb_chk] = useState<boolean>(false);
    const [black_yb, set_black_yb] = useState<string>('');
    const [noshow, set_noshow] = useState<valueType>('');
    const [late, set_late] = useState<valueType>('');
    const [memo, set_memo] = useState<string>('');
    
    useEffect(()=>{
        ResetData();
    },[props.showCustomerEnrollPopup])
    
    /**
     * 닫기
     */
    const ClosePopup = () => {
        props.CloseCustomerEnroll();
    }

    /**
     * 초기화
     */
    const ResetData = () => {
        set_m_name('');
        set_m_hp_no('');
        set_m_gender('');
        set_m_addr1('');
        set_s_name('');
        set_s_hp_no('');
        set_s_gender('');
        set_black_yb('');
        set_black_yb_chk(false);
        set_noshow('');
        set_late('');
        set_memo('');
    }

    /**
     * 값 가져오기
     */
    const m_name_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_name(event.target.value);
    }

    const m_hp_no_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_hp_no(event.target.value);
    }

    const m_gender_change = (event : RadioChangeEvent) => {
        set_m_gender(event.target.value);
    }

    const m_addr1_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_addr1(event.target.value);
    }

    const s_name_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_s_name(event.target.value);
    }

    const s_hp_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_s_hp_no(event.target.value);
    }

    const s_gender_change = (event : RadioChangeEvent) => {
        set_s_gender(event.target.value);
    }

    const black_yb_change = (event : any) => {
        set_black_yb_chk(event.target.checked);
        if(event.target.checked === true){
            set_black_yb('1');
        }else{
            set_black_yb('');
        }
    }

    const noshow_change = (event : valueType) => {
        set_noshow(event);
    }
    
    const late_change = (event : valueType) => {
        set_late(event);
    }

    const memo_change = (event : ChangeEvent<HTMLTextAreaElement>) => {
        set_memo(event.target.value);
    }

    /**
     * 저장
     */
    const SaveConfirm = (record : Object) => {
        Modal.confirm({
            title: '저장',
            content: '저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                sendSave();
            }
        });
    }

    const sendSave = async () => {
        let params:object = {
            m_name : m_name,
            m_hp_no : m_hp_no,
            m_gender : m_gender,
            m_addr1 : m_addr1,
            //m_addr2 : '체육관로 ',
            s_name  : s_name,
            s_hp_no : s_hp_no,
            s_gender : s_gender,
            black_yb : black_yb,
            noshow : noshow,
            late : late,
            memo : memo,
        };

        setLoading(true);
        let result:ResponseDatas = await service('/client','POST', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            
            if(Object(result.data).data.id){
                alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
               
                ClosePopup();
                props.setGogekId(Object(result.data).data.id);
            }
        }
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
                                <Col><Input placeholder="이름" onChange={m_name_change} value={m_name}/></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>전화번호 :</Col>
                                <Col><Input placeholder="전화번호" onChange={m_hp_no_change} value={m_hp_no}/></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>성별 :</Col>
                                <Col>
                                    <Radio.Group onChange={m_gender_change} value={m_gender}>
                                        <Radio value={"1"}>남</Radio>
                                        <Radio value={"2"}>여</Radio>
                                        <Radio value={"3"}>모름</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>주소 :</Col>
                                <Col><Input placeholder="주소" onChange={m_addr1_change} value={m_addr1}/></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>부 보호자 :</Col>
                                <Col><Input placeholder="부 보호자" onChange={s_name_change} value={s_name}/></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>전화번호 :</Col>
                                <Col><Input placeholder="전화번호"  onChange={s_hp_change} value={s_hp_no}/></Col>
                            </Row>
                            <Row style={{marginBottom : "5px"}}>
                                <Col span={5}>성별 :</Col>
                                <Col>
                                    <Radio.Group onChange={s_gender_change} value={s_gender}>
                                        <Radio value={"1"}>남</Radio>
                                        <Radio value={"2"}>여</Radio>
                                        <Radio value={"3"}>모름</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </div>
                   </Card>
                   <Card size="small" type="inner" title="블랙리스트 여부">
                        <div style={{ width : "100%"}}>
                            <Row style={{marginBottom : "5px", display : "flex", alignItems : "center"}}>
                                <label style={{marginRight : "5px"}}>블랙리스트</label>
                                <Checkbox onChange={black_yb_change} value={black_yb} checked={black_yb_chk}/>
                            </Row>
                            <Row style={{display : "flex", alignItems : "center", marginBottom : "5px"}}>
                                <Col span={2}>
                                    <label>노쇼 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} onChange={noshow_change} value={noshow}/>
                                <Col span={2}>
                                    <label>회</label>
                                </Col>

                                <Col span={2}>
                                    <label>지각 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} onChange={late_change} value={late}/>
                                <Col span={2}>
                                    <label>회</label>
                                </Col>
                            </Row>
                            <TextArea rows={6} onChange={memo_change} value={memo}/>
                        </div>
                   </Card>
                   <ButtonDiv>
                       <Button style={{marginRight : "5px"}} type="primary" onClick={SaveConfirm}>저장</Button>
                   </ButtonDiv>
                </SpinStyle>
            </CustomerInnerDiv>
        </CustomerModalDiv>
        </>
    );
}