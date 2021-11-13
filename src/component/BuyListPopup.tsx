import { Button, Input, Table, Select,InputNumber, Tooltip } from "antd";
import { useState } from "react";
import { SearchOutlined ,DownOutlined} from '@ant-design/icons';
import { ButtonDiv, CardPopupDiv, BuyModalDiv, BuyModalInnerDiv, SpinStyle } from "./StyleComponet";
import { SelectValue } from "antd/lib/select";
const {Search} = Input;
const {Option} = Select;
export default function BuyListPopup(props : {CloseBuyListPopup : () => void, showBuyListPopup : boolean}){
    const BuyListColumns = [
        {
            title : "일자",
            align: 'center' as 'center',
            dataIndex : "buy_date",
            key : "buy_date"
        },
        {
            title : "제품이름",
            align: 'center' as 'center',
            dataIndex : "buy_nm",
            key : "buy_nm"
        },
        {
            title : "수량",
            align: 'center' as 'center',
            dataIndex : "buy_amount",
            key : "buy_amount"
        },
        {
            title: '삭제',
            dataIndex: 'key',
            key: 'key',
            align: 'center' as 'center',
            render: (text : String, record : Object) => (
                <Button type="primary" danger>선택</Button>
            ),
        }
    ];
    const BuyListData = [
        {
            key : "1",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        {
            key : "2",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        {
            key : "3",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        {
            key : "1",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        {
            key : "2",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        {
            key : "3",
            buy_date : "2021-09-27",
            buy_nm : "개껌1",
            buy_amount : "1",
        },
        
    ]
    const [loading, setLoading] = useState<boolean>(false);
    const selectSearchFilterOption = (input : any, option : any) =>{
        console.log(input, option);
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return(
        <>
        <BuyModalDiv style={{display : props.showBuyListPopup ? '' : "none"}}>
            <BuyModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>구매 입력</CardPopupDiv>
                    <div style={{textAlign : "center", margin : "7px 0px 7px"}}>
                        <Select placeholder="제품 이름" 
                                style={{width:'30%'}}
                                filterOption={selectSearchFilterOption}
                                showSearch = {true}
                                >
                            <Option value="1">개껌1</Option>
                            <Option value="2">개껌2</Option>
                            <Option value="3">개껌3</Option>
                            <Option value="4">개껌4</Option>
                            <Option value="5">개껌5</Option>
                            <Option value="6">개껌6</Option>
                            <Option value="7">개껌7</Option>
                            <Option value="8">개껌8</Option>
                        </Select>
                        <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                    </div>
                    <div style={{textAlign : "center", marginBottom : "7px"}}>
                        <Tooltip placement="topLeft" title="목록 추가" arrowPointAtCenter>
                            <Button type="primary" icon={<DownOutlined />}/>
                        </Tooltip>
                    </div>
                    <Table
                        size="small"
                        pagination={false}
                        columns={BuyListColumns}
                        dataSource={BuyListData}
                        scroll={{ y: 150 }}
                        />
                    <ButtonDiv>
                        <Button type="primary" onClick={props.CloseBuyListPopup}>닫기</Button>
                    </ButtonDiv>
                </SpinStyle>
            </BuyModalInnerDiv>
        </BuyModalDiv>
        </>
    );
}