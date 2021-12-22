import { useState } from "react";
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { ButtonDiv, CardPopupDiv, CutModalDiv, CutModalInnerDiv, SpinStyle } from "./StyleComponet";
import { Input, DatePicker, Button , Modal} from 'antd';
import { CloseSquareTwoTone } from "@ant-design/icons";
import service, { ResponseDatas } from "../helper/service";
const { TextArea } = Input;
export default function CutHistoryPopup(props : {CloseCutHistoryPopup : () => void, showCutHistoryPopup : boolean, petId : any}){
    const [loading, setLoading] = useState<boolean>(false);
    const ClosePopup = () => {
        props.CloseCutHistoryPopup();
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

        const sendSave = async () => {
            let params:object = {
                memo : '',
                beauty_date : '20211218152300'
            };
    
            setLoading(true);
            let result:ResponseDatas = await service('/profile/'+props.petId+'/beauty','POST', params);
            setLoading(false);
            if(result.status === 200 && result.data){
                if(Object(result.data).data.id){
                    alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
                    ClosePopup();
                    //props.setPetId(Object(result.data).data.id);
                }
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
                        <DatePicker locale={locale}/>
                        <TextArea rows={7} style={{marginTop : "5px"}}/>
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