import { Button, Input, Table, Select,InputNumber, Col, Row,DatePicker } from "antd";
import { useState } from "react";
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { SearchOutlined ,DownOutlined} from '@ant-design/icons';
import { ButtonDiv, CardPopupDiv, BuyDetailModalDiv, BuyDetailInnerDiv, SpinStyle } from "./StyleComponet";
import { SelectValue } from "antd/lib/select";
const {Option} = Select;
export default function BuyDetailPopup(props : {CloseBuyDetailPopup : () => void, showBuyDetailPopup : boolean}){
    const [loading, setLoading] = useState<boolean>(false);
    const selectSearchFilterOption = (input : any, option : any) =>{
        console.log(input, option);
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return(
        <>
        <BuyDetailModalDiv style={{display : props.showBuyDetailPopup ? '' : "none"}}>
            <BuyDetailInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>구매 상세</CardPopupDiv>
                    <Row style={{display : "flex" , alignItems : "center",margin : "7px 0px 7px 5px"}}>
                        <Col style={{textAlign : "center"}} span={3}>구매일자 :</Col>
                        <Col span={5}><DatePicker locale={locale}/></Col>
                        
                        <Col style={{textAlign : "center"}} span={4}>제품명 / 수량 :</Col>
                        <Select placeholder="제품 이름" 
                                    style={{width:'30%'}}
                                    filterOption={selectSearchFilterOption}
                                    showSearch = {true}
                                    >
                        </Select>
                        <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                    </Row>
                    <div style={{margin : "7px 0px 7px 5px"}}>
                        
                    </div>
                    <ButtonDiv>
                        <Button type="primary" style={{marginRight : "5px"}}>수정</Button>
                        <Button type="primary" onClick={props.CloseBuyDetailPopup}>닫기</Button>
                    </ButtonDiv>
                </SpinStyle>
            </BuyDetailInnerDiv>
        </BuyDetailModalDiv>
        </>
    );
}