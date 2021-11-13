import { Button, Input, Table } from "antd";
import { useState } from "react";
import { SearchOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import { ButtonDiv, CardPopupDiv, OwnerSearchModalDiv, OwnerSearchModalInnerDiv, SpinStyle } from "./StyleComponet";
const {Search} = Input;
export default function OwnerSearchPopup(props : {CloseOwnerSearchPopup : () => void, showOwnerSearchPopup : boolean}){
    const OwnerColumns = [
        {
            title : "보호자 이름",
            align: 'center' as 'center',
            dataIndex : "owner_nm",
            key : "owner_nm"
        },
        {
            title : "강아지 이름",
            align: 'center' as 'center',
            dataIndex : "pet_nm",
            key : "pet_nm"
        },
        {
            title : "핸드폰 번호",
            align: 'center' as 'center',
            dataIndex : "hp_no",
            key : "hp_no"
        },
        {
            title: '선택',
            dataIndex: 'key',
            key: 'key',
            align: 'center' as 'center',
            render: (text : String, record : Object) => (
                <Button type="primary">선택</Button>
            ),
        }
    ];
    const OwnerData = [
        {
            key : "1",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
        {
            key : "2",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
        {
            key : "3",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
        {
            key : "4",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
        {
            key : "5",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
        {
            key : "6",
            owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
        },
    ]
    const [loading, setLoading] = useState<boolean>(false);
    return(
        <>
        <OwnerSearchModalDiv style={{display : props.showOwnerSearchPopup ? '' : "none"}}>
            <OwnerSearchModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>보호자, 강아지 검색<SearchOutlined /></CardPopupDiv>
                    <Search size="middle"
                            enterButton
                            style={{margin : "10px 0 10px 2px" , width : "30%"}}/>
                    <Table size="small"
                           pagination={false}
                           columns = {OwnerColumns}
                           dataSource={OwnerData}
                           scroll={{ y: 250 }}/>
                    <ButtonDiv>
                        <Button type="primary" onClick={props.CloseOwnerSearchPopup}>닫기</Button>
                    </ButtonDiv>
                </SpinStyle>
            </OwnerSearchModalInnerDiv>
        </OwnerSearchModalDiv>
        </>
    );
}