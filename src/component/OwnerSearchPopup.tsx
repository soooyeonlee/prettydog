import { Button, Input, Table } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { CloseSquareTwoTone } from '@ant-design/icons';
import { CardPopupDiv, OwnerSearchModalDiv, OwnerSearchModalInnerDiv, SpinStyle } from "./StyleComponet";
import service, { ResponseDatas } from "../helper/service";
const {Search} = Input;
export default function OwnerSearchPopup(props : {CloseOwnerSearchPopup : () => void, showOwnerSearchPopup : boolean, setGogekId : any, setPetId : any}){
    const [loading, setLoading] = useState<boolean>(false);
    const [OwnerData,set_OwnerData] = useState<Array<Object>>();
    const [search_val,set_search_val] = useState<string>('');
    const OwnerColumns = [
        {
            title : "보호자 이름",
            align: 'center' as 'center',
            dataIndex : "m_name",
            key : "m_name"
        },
        {
            title : "강아지 이름",
            align: 'center' as 'center',
            dataIndex : "p_name",
            key : "p_name"
        },
        {
            title : "핸드폰 번호",
            align: 'center' as 'center',
            dataIndex : "m_hp_no",
            key : "m_hp_no"
        },
        {
            title : "보호자 이름(부)",
            align: 'center' as 'center',
            dataIndex : "s_name",
            key : "s_name"
        },
        {
            title : "핸드폰 번호(부)",
            align: 'center' as 'center',
            dataIndex : "s_hp_no",
            key : "s_hp_no"
        },
        {
            title: '선택',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center',
            render: (text : String, record : Object) => (
                <Button type="primary" onClick={()=>SelectInfo(record)}>선택</Button>
            ),
        }
    ];

    useEffect(()=>{
        ResetData();   
    },[props.showOwnerSearchPopup])

    /**
     * 초기화
     */
    const ResetData = () => {
        set_OwnerData(undefined);
        set_search_val('');
    }

    /**
     * 검색
     */
    const search_val_change = (event : ChangeEvent<HTMLInputElement>) =>{
        set_search_val(event.target.value);
    }
    const onSearch = (value : string) => {
        SearchInfo(value);
    }

    const SearchInfo = async(value : string) => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/search/'+value,'GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            set_OwnerData(Object(result.data).data);
        }
    }

    /**
     * 선택
     */
    const SelectInfo = (record : Object) => {
        props.setGogekId(Object(record).id);
        props.setPetId(Object(record).p_id);
        props.CloseOwnerSearchPopup();
    }
    
    return(
        <>
        <OwnerSearchModalDiv style={{display : props.showOwnerSearchPopup ? '' : "none"}}>
            <OwnerSearchModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>보호자, 강아지 검색
                        <Button type="primary" icon={<CloseSquareTwoTone />} onClick={props.CloseOwnerSearchPopup}/>
                    </CardPopupDiv>
                    <Search size="middle"
                            enterButton
                            onSearch={onSearch}
                            onChange={search_val_change}
                            value={search_val}
                            style={{margin : "10px 0 10px 2px" , width : "30%"}}/>
                    <Table size="small"
                           pagination={false}
                           columns = {OwnerColumns}
                           dataSource={OwnerData}
                           rowKey={'p_id'}
                           scroll={{ y: 250 }}/>
                </SpinStyle>
            </OwnerSearchModalInnerDiv>
        </OwnerSearchModalDiv>
        </>
    );
}