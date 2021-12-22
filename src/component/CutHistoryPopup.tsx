import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { ButtonDiv, CardPopupDiv, CutModalDiv, CutModalInnerDiv, SpinStyle } from "./StyleComponet";
import { Input, DatePicker, Button , Modal, TimePicker} from 'antd';
import { CloseSquareTwoTone } from "@ant-design/icons";
import service, { ResponseDatas } from "../helper/service";
import moment, { Moment } from "moment";
const { TextArea } = Input;
export default function CutHistoryPopup(props : {CloseCutHistoryPopup : () => void, showCutHistoryPopup : boolean, petId : any, closeSendList :Function}){
    const [loading, setLoading] = useState<boolean>(false);
    const [inputTime, setInputTime] = useState<Moment|null>();
    const [inputDate, setInputDate] = useState<Moment|null>();
    const [memoData, setMemoData] = useState<string>('');

    useEffect(()=>{
        ResetData();
    },[props.showCutHistoryPopup])

    /**
     * 초기화
     */
     const ResetData = () => {
        setInputTime(moment());
        setInputDate(moment());
        setMemoData('');
    }

    const ClosePopup = () => {
        props.CloseCutHistoryPopup();
    }

    const inputTimeOnChange = (v:Moment|null, dataString:string) =>{
        setInputTime(v);
        console.log(v);
    }

    const onChangeDatePicker = (v:Moment|null, dataString:string) =>{
        setInputDate(v);
    }

    const onChangeMemoTextArea = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setMemoData(event.target.value);
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
        })
    };

    const sendSave = async () => {
        let params:object = {
            memo : memoData,
            beauty_date : inputDate?.format('YYYYMMDD')+''+inputTime?.format('HHmm')+'00'
        };

        setLoading(true);
        let result:ResponseDatas = await service('/profile/'+props.petId+'/beauty','POST', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data.id){
                alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
                ClosePopup();
                props.closeSendList(props.petId);
            }
        }
    }

    return(
        <>
        <CutModalDiv style={{display : props.showCutHistoryPopup ? '' : "none"}}>
            <CutModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>미용 기록 입력
                        <Button type="primary" icon={<CloseSquareTwoTone />} onClick={ClosePopup}/>
                    </CardPopupDiv>
                    <div style={{padding : "0px 5px 0px 5px", margin : "3px 0px 3px"}} >
                        <label>일자 : </label>
                        <DatePicker locale={locale} onChange={onChangeDatePicker} value={inputDate}/>
                        <TimePicker format={'HH:mm'} onChange={inputTimeOnChange} value={inputTime}/>
                        <TextArea rows={7} style={{marginTop : "5px"}} value={memoData} onChange={onChangeMemoTextArea}/>
                    </div>
                    <ButtonDiv>
                        <Button style={{marginRight : "5px"}} type="primary" onClick={SaveConfirm}>저장</Button>
                    </ButtonDiv>
                </SpinStyle>
            </CutModalInnerDiv>
        </CutModalDiv>
        </>
    );
}