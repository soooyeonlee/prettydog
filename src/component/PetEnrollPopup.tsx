import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ButtonDiv, CardDiv, CardPopupDiv, PetInnerDiv, PetModalDiv, SpinStyle } from "./StyleComponet";
import { SearchOutlined ,CloseSquareTwoTone} from '@ant-design/icons';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import { Button, Row, Col, Card, Radio, Input, DatePicker, InputNumber, Table } from "antd";
const { TextArea } = Input;
export default function PetEnrollPopup(props : {ClosePetEnroll : () => void, showPetEnrollPopup : boolean}){
    const [loading, setLoading] = useState<boolean>(false);

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
            dataIndex : "owner_nm",
            key : "owner_nm"
        },
        {
            title : "핸드폰 번호",
            align: 'center' as 'center',
            dataIndex : "hp_no",
            key : "hp_no"
        },
        {
            title : "성별",
            align: 'center' as 'center',
            dataIndex : "sex",
            key : "sex"
        }
    ];
    const OwnerData = [
        {
            key : "1",
            owner_nm : "김김김",
            hp_no : "010-1234-5655",
            sex : "여",
        }
    ]

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

     const fileOnchange = (event : ChangeEvent<HTMLInputElement>) => {
        let file : File = (event.target.files as FileList)[0];
        let reader = new FileReader();

        reader.onloadend = (e) => {
            setFile(file);
            setPreviewURL(reader.result);
        }

        if(file){
            reader.readAsDataURL(file);
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
                                    <Col><Input placeholder="이름" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>종류 :</Col>
                                    <Col><Input placeholder="종류" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>성별 :</Col>
                                    <Col>
                                        <Radio.Group >
                                            <Radio value={1}>남</Radio>
                                            <Radio value={2}>여</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>나이 :</Col>
                                    <Col>
                                        <Input placeholder="나이" />
                                    </Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>생일 :</Col>
                                    <Col><DatePicker locale={locale}/></Col>
                                </Row>
                            </Col>
                        </div>
                   </Card>
                   <ButtonDiv>
                       <Button style={{marginRight : "5px"}} type="primary">저장</Button>
                   </ButtonDiv>
                </SpinStyle>
            </PetInnerDiv>
        </PetModalDiv>
        </>
    );
}