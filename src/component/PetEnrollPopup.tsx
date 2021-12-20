import { ChangeEvent, useEffect, useRef, useState } from "react";
import imageCompression from 'browser-image-compression'; 
import { ButtonDiv, CardPopupDiv, PetInnerDiv, PetModalDiv, SpinStyle } from "./StyleComponet";
import { CloseSquareTwoTone} from '@ant-design/icons';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { Moment } from 'moment'
import { Button, Row, Col, Card, Radio, Input, DatePicker, Table, RadioChangeEvent, Modal } from "antd";
import service, { ResponseDatas } from '../helper/service';
export default function PetEnrollPopup(props : {ClosePetEnroll : () => void, showPetEnrollPopup : boolean, id : string, setPetId : any}){
    const [loading, setLoading] = useState<boolean>(false);

    const [OwnerData, set_OwnerData] = useState<Array<object>>([]);
    const [kind_nm, set_kind_nm] = useState<string>('');
    const [name, set_name] = useState<string>('');
    const [gender_cd, set_gender_cd] = useState<string>('');
    const [birth_day,set_birth_day] = useState<Moment>();
    const [birth_day_str,set_birth_day_str] = useState<string>('');
    const [age, set_age] = useState<number | string>('');

    const [file, setFile] = useState<File>(); 
    const [previewURL, setPreviewURL] = useState<any>();
    const [preview,setPreview] = useState<any>();
    const ClosePopup = () => {
        props.ClosePetEnroll();
    }
    const OwnerColumns = [
        {
            title : "보호자 이름",
            align: 'center' as 'center',
            dataIndex : "m_name",
            key : "m_name"
        },
        {
            title : "핸드폰 번호",
            align: 'center' as 'center',
            dataIndex : "m_hp_no",
            key : "m_hp_no"
        },
        {
            title : "성별",
            align: 'center' as 'center',
            dataIndex : "m_gender",
            key : "m_gender"
        }
    ];

    /**
     * 초기화
     */

    const ResetData = () => {
        set_OwnerData([]);
        set_kind_nm('');
        set_name('');
        set_gender_cd('');
        set_birth_day(undefined);
        set_age('');
        setFile(undefined);
        setPreviewURL(undefined);
        setPreview(undefined);
    }

    /**
     * 이미지 업로드
     */
    const fileRef : any = useRef();
    const imgRef : any = useRef();
 
    useEffect(() => {
        if(file) //처음 파일 등록하지 않았을 때를 방지
        setPreview(<img className='img_preview' src={previewURL}></img>);
        return () => {
 
        }
    }, [previewURL])

    const clickUpload = () => {
        fileRef.current.click();
    }
 
    const fileOnchange = async(event : ChangeEvent<HTMLInputElement>) => {
        let file : File = (event.target.files as FileList)[0];
 
        const options = {
             maxSizeMB: 2, 
             maxWidthOrHeight: 198
        }
 
        try {
            const compressedFile = await imageCompression(file, options);
            setFile(compressedFile);
             
            // resize된 이미지의 url을 받아 fileUrl에 저장
            const promise = imageCompression.getDataUrlFromFile(compressedFile);
            promise.then(result => {
                setPreviewURL(result);
            })
        }catch(error){
            alert("이미지 사이즈가 너무 큽니다. 2MB 이하로 업로드 해주세요");
        }
    }

    /**
     * 애견등록 전 고객정보 세팅
     */
     useEffect(()=>{
        ResetData();
        if(props.showPetEnrollPopup===true && props.id){
            SetInfo(props.id);
        }
    },[props.showPetEnrollPopup])

    const SetInfo = async(id : string) => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id,'GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data.client){
                set_OwnerData([
                    {
                        key : id,
                        m_name : Object(result.data).data.client.m_name,
                        m_hp_no : Object(result.data).data.client.m_hp_no,
                        m_gender : Object(result.data).data.client.m_gender,
                    }
                ])
            }
        }
    }

    /**
     * 값 입력
     */
    const kind_nm_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_kind_nm(event.target.value);
    }

    const name_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_name(event.target.value);
    }

    const gender_cd_change = (event : RadioChangeEvent) => {
        set_gender_cd(event.target.value);
    }

    const birth_day_change = (date : any , dateStirng : string) => {
        set_birth_day(date);
        set_birth_day_str(dateStirng);

        // 나이 계산
        var today = new Date();
        var birth = new Date(dateStirng);
        var years = today.getFullYear() - birth.getFullYear();
        set_age(years);
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
            kind_nm : kind_nm,
            name : name,
            birth_day : birth_day_str,
            gender_cd : gender_cd
        };

        setLoading(true);
        let result:ResponseDatas = await service('/client/'+props.id+'/profile','POST', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data.id){
                alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
                ClosePopup();
                props.setPetId(Object(result.data).data.id);
            }
        }
    }

    return(
        <>
        <PetModalDiv style={{display : props.showPetEnrollPopup ? '' : 'none'}}>
            <PetInnerDiv>
                <SpinStyle spinning={loading}>
                    <CardPopupDiv>애견등록 
                        <Button type="primary" icon={<CloseSquareTwoTone />} onClick={ClosePopup}/>
                    </CardPopupDiv>
                   <Card size="small" type="inner" title="보호자">
                   <Table size="small" 
                    pagination={false}
                    columns={OwnerColumns}
                    dataSource={OwnerData}
                    scroll={{ y: 50 }}
                    style={{cursor : "pointer"}}/>
                   </Card>
                   <Card size="small" type="inner" title="애견 프로필 등록">
                   <div ref={imgRef} style={{marginBottom : "3px"}}><Button type="primary" onClick={clickUpload}>사진업로드</Button></div>
                        <input ref={fileRef} type="file" id="image" accept="image/*" onChange={fileOnchange} hidden/>
                        <div style={{display : "flex", width : "100%"}}>
                            <Col span={12} >
                                <div style={{border : "1px solid #d9d9d9",width : "200px",height : "200px",overflow : "auto"}}>
                                    {preview}
                                </div>
                            </Col>  
                            <Col span={12}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>이름 :</Col>
                                    <Col><Input placeholder="이름" onChange={name_change} value={name}/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>종류 :</Col>
                                    <Col><Input placeholder="종류" onChange={kind_nm_change} value={kind_nm}/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>성별 :</Col>
                                    <Col>
                                        <Radio.Group onChange={gender_cd_change} value={gender_cd}>
                                            <Radio value={"1"}>남</Radio>
                                            <Radio value={"2"}>여</Radio>
                                            <Radio value={"3"}>모름</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>생일 :</Col>
                                    <Col><DatePicker locale={locale} onChange={birth_day_change} value={birth_day}/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>나이 :</Col>
                                    <Col>
                                        <Input placeholder="나이" readOnly value={age}/>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                   </Card>
                   <ButtonDiv>
                       <Button style={{marginRight : "5px"}} type="primary" onClick={SaveConfirm}>저장</Button>
                   </ButtonDiv>
                </SpinStyle>
            </PetInnerDiv>
        </PetModalDiv>
        </>
    );
}