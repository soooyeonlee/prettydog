import { Button,Table } from "antd";
import { useState } from "react";
import { BlackModalDiv, BlackModalInnerDiv, ButtonDiv, CardPopupDiv, SpinStyle } from "./StyleComponet";
import { SearchOutlined ,CloseSquareTwoTone} from '@ant-design/icons';
export default function BlackListPopup(props : {CloseBlackListPopup : () => void, showBlackListPopup : boolean}){
    const [loading, setLoading] = useState<boolean>(false);
    const BlackColumns = [
        {
            title : "보호자 이름",
            align: 'center' as 'center',
            dataIndex : "owner_nm",
            key : "owner_nm"
        },
        {
            title : "부 보호자 이름",
            align: 'center' as 'center',
            dataIndex : "side_owner_nm",
            key : "side_owner_nm"
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
            title : "내용",
            align: 'center' as 'center',
            dataIndex : "contents",
            key : "contents"
        },
    ];
    const BlackData = [
        {
            key : "1",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        {
            key : "2",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        {
            key : "3",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        {
            key : "4",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        {
            key : "5",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        {
            key : "6",
            owner_nm : "김김김",
            side_owner_nm : "김김김",
            pet_nm : "초코",
            hp_no : "010-1234-5655",
            contents : "사소한 일로 컴플레인이 매우 반복적임. 환불요구도..",
        },
        
    ]
    return(
        <>
        <BlackModalDiv style={{display : props.showBlackListPopup ? '' : "none"}}>
            <BlackModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>블랙리스트 명단
                        <Button type="primary" icon={<CloseSquareTwoTone />} onClick={props.CloseBlackListPopup}/>
                    </CardPopupDiv>
                    <Table
                        pagination={false}
                        columns={BlackColumns}
                        dataSource={BlackData}
                        size="small"
                        scroll={{ y: 250 }}
                    />
                </SpinStyle>
            </BlackModalInnerDiv>
        </BlackModalDiv>
        </>
    );
}