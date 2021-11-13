import { useState } from "react";
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { ButtonDiv, CardPopupDiv, CutModalDiv, CutModalInnerDiv, SpinStyle } from "./StyleComponet";
import { Input, DatePicker, Button } from 'antd';
const { TextArea } = Input;
export default function CutHistoryPopup(props : {CloseCutHistoryPopup : () => void, showCutHistoryPopup : boolean}){
    const [loading, setLoading] = useState<boolean>(false);
    return(
        <>
        <CutModalDiv style={{display : props.showCutHistoryPopup ? '' : "none"}}>
            <CutModalInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>미용 기록 입력</CardPopupDiv>
                    <div style={{padding : "0px 5px 0px 5px", margin : "3px 0px 3px"}} >
                        <label>일자 : </label>
                        <DatePicker locale={locale}/>
                        <TextArea rows={7} style={{marginTop : "5px"}}/>
                    </div>
                    <ButtonDiv>
                        <Button type="primary" onClick={props.CloseCutHistoryPopup}>닫기</Button>
                    </ButtonDiv>
                </SpinStyle>
            </CutModalInnerDiv>
        </CutModalDiv>
        </>
    );
}