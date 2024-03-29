import 'antd/dist/antd.css';
import imageCompression from 'browser-image-compression'; 
import { ButtonCenter, CardDiv, MainDiv, MainHeader, MenuDiv, SpinStyle } from './StyleComponet';
import { SearchOutlined ,PlusCircleOutlined,DeleteOutlined} from '@ant-design/icons';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import {Menu, Input, Table, Card, Row, Col, DatePicker , Button,InputNumber,Radio, RadioChangeEvent, List, Avatar, Modal } from 'antd';
import logo from '../img/testimg.png';
import moment, { Moment } from 'moment'
import BuyListPopup from './BuyListPopup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import OwnerSearchPopup from './OwnerSearchPopup';
import CutHistoryPopup from './CutHistoryPopup';
import BuyDetailPopup from './BuyDetailPopup';
import BlackListPopup from './BlackListPopup';
import service, { ResponseDatas } from '../helper/service';
import CustomerEnrollPopup from './CustomerEnrollPopup';
import PetEnrollPopup from './PetEnrollPopup';
import { valueType } from 'antd/lib/statistic/utils';
import Checkbox from 'antd/lib/checkbox/Checkbox';
const { TextArea } = Input;
export default function Home(){
    const [loading, setLoading] = useState<boolean>(false);

    const [showOwnerSearchPopup,setShowOwnerSearchPopup] = useState<boolean>(false);
    const [showBuyListPopup , setShowBuyListPopup] = useState<boolean>(false);
    const [showBuyDetailPopup , setShowBuyDetailPopup] = useState<boolean>(false);
    const [showCutHistoryPopup, setShowCutHistoryPopup] = useState<boolean>(false);
    const [showBlackListPopup, setShowBlackListPopup] = useState<boolean>(false);
    const [showCustomerEnrollPopup,setShowCustomerEnrollPopup] = useState<boolean>(false);
    const [showPetEnrollPopup,setShowPetEnrollPopup] = useState<boolean>(false);
    const [id, setGogekId] = useState<string>('');
    const [pet_id, setPetId] = useState<string>('');
    const [dogdata, set_dogdata] = useState<Array<Object>>([]);
    const [beautyData, set_beautyData] = useState<Array<Object>>([]);

    const [m_name, set_m_name] = useState<string>('');
    const [m_hp_no, set_m_hp_no] = useState<string>('');
    const [m_gender, set_m_gender] = useState<string>('');
    const [m_addr1, set_m_addr1] = useState<string>('');
    const [m_addr2, set_m_addr2] = useState<string>('');
    const [s_name, set_s_name] = useState<string>('');
    const [s_hp_no, set_s_hp_no] = useState<string>('');
    const [s_gender, set_s_gender] = useState<string>('');
    const [black_yb_chk, set_black_yb_chk] = useState<boolean>(false);
    const [black_yb, set_black_yb] = useState<string>('');
    const [noshow, set_noshow] = useState<valueType>('');
    const [late, set_late] = useState<valueType>('');
    const [memo, set_memo] = useState<string>('');

    const [kind_nm, set_kind_nm] = useState<string>('');
    const [name, set_name] = useState<string>('');
    const [gender_cd, set_gender_cd] = useState<string>('');
    const [birth_day,set_birth_day] = useState<Moment>();
    const [pic_url,set_pic_url] = useState<string>('');
    const [birth_day_str,set_birth_day_str] = useState<string>('');
    const [age, set_age] = useState<number>();

    const [beautyMemo, setBeautyMemo] = useState<string>('');

    const [file, setFile] = useState<File>();
    const [previewURL, setPreviewURL] = useState<any>();
    const [preview,setPreview] = useState<any>();

    

    useEffect(()=>{
        if(birth_day){  
            let today = new Date();
            let birth = new Date(birth_day.format('YYYY-MM-DD'));
            let years = today.getFullYear() - birth.getFullYear();
            set_age(years);
        }
    },[birth_day]);

    useEffect(()=>{
        clearClient();
        clearProfile();
        if(id){
            SetGogekInfo(id);
        }
        
    },[id])

    useEffect(()=>{
        clearProfile();
        if(pet_id){
            SetPetInfo(pet_id);
        }
    },[pet_id]);

    /**
     * 전체 초기화
     */

    const clearAll = () =>{        
        setGogekId('');
        setPetId('');
        clearClient();
        clearBeauty();
        clearProfile();
    }

    /**
     * 고객프로필 셋팅 초기화
     */
    const clearClient = () =>{
        setPetId('');
        set_dogdata([]);
        set_m_name('');
        set_m_hp_no('');
        set_m_gender('');
        set_m_addr1('');
        set_s_name('');
        set_s_hp_no('');
        set_s_gender('');
        set_black_yb_chk(false);
        set_black_yb('');
        set_noshow('');
        set_late('');
        set_memo('');
    }

    /**
     * 애견프로필 셋팅 초기화
     */
    const clearProfile = () =>{
        set_kind_nm('');
        set_name('');
        set_gender_cd('');
        set_birth_day(undefined);
        set_birth_day_str('');
        set_age(undefined);
        setPreview(<div></div>);
    };

    /**
     * 미용정보 초기화
     */
    const clearBeauty = () => {
        setBeautyMemo('');
        set_beautyData([]);
    }

    /**
     * 애견테이블 클릭 시 애견정보 세팅
     */
     const petRowClick = (record : Object) => {
        setPetId(String(Object(record).id));
        PetInfo(Object(record).id);
    }

    /**
     * 애견 프로필 수정 클릭이벤트
     */
     const onClickPetSave = () => {
        Modal.confirm({
            title: '저장',
            content: '저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                sendPetUpdate(id, pet_id);
            }
        });
    }

    const onClickCustomerSave = () => {
        Modal.confirm({
            title: '저장',
            content: '저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                sendCustomerUpdate(id);
            }
        });
    }

    

    /**
     * 미용테이블 클릭 시 애견정보 세팅
     */
     const beautyRowClick = (record : Object) => {
         //profile_id
        BeautyInfo(Object(record).profile_id, Object(record).id);
    }

    /**
     * 보호자 프로필 삭제 클릭 이벤트
     */
       const onClickClientDelete = () => {
        Modal.confirm({
            title: '저장',
            content: '삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                sendClientDelete();
            }
        });
    }

    /**
     * 애견 프로필 삭제 클릭 이벤트
     */
     const onClickPetProfileDelete = () => {
        Modal.confirm({
            title: '저장',
            content: '삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk() {
                sendPetProfileDelete();
            }
        });
    }

    

    /**
     * 보호자,강아지 검색 팝업
     */
    const OpenOwnerSearchPopup = () => {
        setShowOwnerSearchPopup(true);
    }

    const CloseOwnerSearchPopup = () => {
        setShowOwnerSearchPopup(false);
    }

    /**
     * 고객등록 팝업
     */
    const OpenCustomerEnroll = () => {
        setShowCustomerEnrollPopup(true);
    }

    const CloseCustomerEnroll = () => {
        setShowCustomerEnrollPopup(false);
    }

    /**
     * 애견등록 팝업
     */
     const OpenPetEnroll = () => {
        setShowPetEnrollPopup(true);
    }

    const ClosePetEnroll = () => {
        setShowPetEnrollPopup(false);
    }

    /**
     * 구매목록 팝업
     */
    const OpenBuyListPopup  = () => {
        setShowBuyListPopup(true);
    }
    const CloseBuyListPopup = () => {
        setShowBuyListPopup(false);
    }

    /**
     * 구매목록 상세
     */
    
    const OpenBuyDetailPopup = () => {
        setShowBuyDetailPopup(true);
    }

    const CloseBuyDetailPopup = () => {
        setShowBuyDetailPopup(false);
    }
    
    /**
     * 구매목록 리스트 더블클릭
     */
    const dbOnclickBuyList = (record : Object ,rowIndex: number | undefined)=> {
        OpenBuyDetailPopup();
    }

    /**
     * 미용기록 팝업
     */
    const OpenCutHistoryPopup = () => {
        setShowCutHistoryPopup(true);
    }

    const CloseCutHistoryPopup = () => {
        setShowCutHistoryPopup(false);
    }

    /**
     * 블랙리스트 명단 팝업
     */

    const OpenBlackListPopup = () => {
        setShowBlackListPopup(true);
    }

    const CloseBlackListPopup = () => {
        setShowBlackListPopup(false);
    }

    const CloseBeautyList = (_petId:string) =>{
        BeautyList(_petId)
    }

    /**
     * 값 입력
     */
     const m_name_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_name(event.target.value);
    }

    const m_hp_no_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_hp_no(event.target.value);
    }

    const m_gender_change = (event : RadioChangeEvent) => {
        set_m_gender(event.target.value);
    }

    const m_addr1_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_m_addr1(event.target.value);
    }

    const s_name_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_s_name(event.target.value);
    }

    const s_hp_change = (event : ChangeEvent<HTMLInputElement>) => {
        set_s_hp_no(event.target.value);
    }

    const s_gender_change = (event : RadioChangeEvent) => {
        set_s_gender(event.target.value);
    }

    const black_yb_change = (event : any) => {
        set_black_yb_chk(event.target.checked);
        if(event.target.checked === true){
            set_black_yb('1');
        }else{
            set_black_yb('');
        }
    }

    const noshow_change = (event : valueType) => {
        set_noshow(event);
    }
    
    const late_change = (event : valueType) => {
        set_late(event);
    }

    const memo_change = (event : ChangeEvent<HTMLTextAreaElement>) => {
        set_memo(event.target.value);
    }

    const beauty_memo_change = (event : ChangeEvent<HTMLTextAreaElement>) => {
        setBeautyMemo(event.target.value);
    }

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
    }


    /**
     * 저장 후 고객정보  세팅
     */
     const SetGogekInfo = async(id : string) => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id,'GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data.client){
                set_m_name(Object(result.data).data.client.m_name);
                set_m_hp_no(Object(result.data).data.client.m_hp_no);
                set_m_gender(Object(result.data).data.client.m_gender);
                set_m_addr1(Object(result.data).data.client.m_addr1);
                set_m_addr2('');
                set_s_name(Object(result.data).data.client.s_name);
                set_s_hp_no(Object(result.data).data.client.s_hp_no);
                set_s_gender(Object(result.data).data.client.s_gender);
                set_black_yb(Object(result.data).data.client.black_yb);

                if(Object(result.data).data.client.black_yb === '1'){
                    set_black_yb_chk(true);
                }else{
                    set_black_yb_chk(false);   
                }
                
                set_noshow(Object(result.data).data.client.late);
                set_late(Object(result.data).data.client.noshow);
                set_memo(Object(result.data).data.client.memo);
            }
        }
    }

    /**
     * 애견 정보 저장 후 값 세팅
     */
     const SetPetInfo = async(pet_id : string = '') => {
        clearProfile();

        setBeautyMemo('');
        set_beautyData([]);

        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id + '/profile','GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data){
                set_dogdata(Object(result.data).data);
                if(pet_id){
                    PetInfo(pet_id);
                }
            }
        }
    }

    /**
     * 애견정보 세팅 (서버호출)
     */
     const PetInfo = async(pet_id : string) => {
        setPetId(pet_id);
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id + '/profile/' + pet_id,'GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data){
                let profile:Object = Object(result.data).data.profile;
                let beauty:Object = Object(result.data).data.beauty;
                set_kind_nm(Object(profile).kind_nm);
                set_name(Object(profile).name);
                set_gender_cd(Object(profile).gender_cd);
                if(Object(profile).pic_upload){
                    setPreview(<img className='img_preview' src={Object(profile).pic_upload} alt='url'></img>);
                }else{
                    setPreview(<div></div>);
                }

                if(Object(profile).birth_day){
                    set_birth_day(moment(Object(profile).birth_day));
                }

                if(beauty){
                    set_beautyData(Object(beauty));
                }
            }
        }
    }

    /**
     * 미용정보 세팅 (서버호출)
     */
     const BeautyList = async(pet_id : string) => {
        clearBeauty();
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/profile/' + pet_id + '/beauty/','GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data){
                set_beautyData(Object(result.data).data);
            }
        }
    }
    /**
     * 고객정보 수정
     */
     const sendCustomerUpdate = async(_id : string) => {
        let params:object = {
            m_name : m_name,
            m_hp_no : m_hp_no,
            m_gender : m_gender,
            m_addr1 : m_addr1,
            //m_addr2 : '체육관로 ',
            s_name  : s_name,
            s_hp_no : s_hp_no,
            s_gender : s_gender,
            black_yb : black_yb,
            noshow : noshow,
            late : late,
            memo : memo,
        };

        setLoading(true);
        let result:ResponseDatas = await service('/client/' + _id, 'PUT', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            
            if(Object(result.data).data.id){
                alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
            }
        }
    }

    /**
     * 애견정보 수정
     */
     const sendPetUpdate = async(_id : string, _petId : string) => {
        let params:object = {
            kind_nm : kind_nm,
            name : name,
            birth_day : birth_day?.format('YYYYMMDD'),
            gender_cd : gender_cd,
            file : file
        };

        setLoading(true);
        let result:ResponseDatas = await service('/client/' + _id + '/profile/' + _petId, 'POST', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            
            if(Object(result.data).data.id){
                alert('정상적으로 저장 완료 ID='+ Object(result.data).data.id);
            }
        }
    }

    /**
     * 미용정보 세팅 (서버호출)
     */
     const BeautyInfo = async(pet_id : string, beauty_id : string) => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/profile/' + pet_id + '/beauty/' + beauty_id,'GET', params);
        setLoading(false);
        if(result.status === 200 && result.data){
            if(Object(result.data).data){
                setBeautyMemo(Object(result.data).data.memo);
            }
        }
    }
    

    /**
     * 보호자 프로필 삭제
     */
     const sendClientDelete = async() => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id ,'DELETE', params);
        setLoading(false);
        if(result.status === 200 && result.data){
           alert('삭제 완료');
           clearAll();
           //SetPetInfo();
        }
    }

    /**
     * 애견 프로필 삭제
     */
    const sendPetProfileDelete = async() => {
        let params:object = {};
        setLoading(true);
        let result:ResponseDatas = await service('/client/' + id + '/profile/'+ pet_id,'DELETE', params);
        setLoading(false);
        if(result.status === 200 && result.data){
           alert('삭제 완료');
           setPetId('');
           SetPetInfo();
        }
    }


    /**
     * 이미지 업로드
     */
    const fileRef : any = useRef();
    const imgRef : any = useRef();

    useEffect(() => {
        if(file) //처음 파일 등록하지 않았을 때를 방지
        setPreview(<img className='img_preview' src={previewURL} alt='url'></img>);
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
            console.log(error);
        }
    }

    const dogInfoColumns = [
        {
            title : "강아지 이름",
            dataIndex : "name",
            key : "name"
        }
    ]

    const buyInfoColumns = [
        {
            title : "구매 날짜",
            width: '40%',
            dataIndex : "buy_date",
            key : "petbuy_date_nm"
        },
        {
            title : "제품 이름",
            dataIndex : "buy_nm",
            key : "buy_nm"
        }
    ];

    const buydata = [
        {
            key: '1',
            buy_date : '2021-11-13',
            buy_nm : '강아지를 위한 개껌'
        }
    ];

    const cutInfoColumns = [
        {
            title : "미용 날짜",
            dataIndex : "beauty_date",
            key : "beauty_date"
        }
    ];

    return(
        <>
        <OwnerSearchPopup CloseOwnerSearchPopup={CloseOwnerSearchPopup} showOwnerSearchPopup={showOwnerSearchPopup} setGogekId={setGogekId} setPetId={setPetId}/>
        <BuyListPopup CloseBuyListPopup={CloseBuyListPopup} showBuyListPopup={showBuyListPopup}/>
        <CutHistoryPopup CloseCutHistoryPopup={CloseCutHistoryPopup} showCutHistoryPopup={showCutHistoryPopup} petId={pet_id} closeSendList={CloseBeautyList}/>
        <BuyDetailPopup CloseBuyDetailPopup={CloseBuyDetailPopup} showBuyDetailPopup={showBuyDetailPopup}/>
        <BlackListPopup CloseBlackListPopup={CloseBlackListPopup} showBlackListPopup={showBlackListPopup}/>
        <CustomerEnrollPopup CloseCustomerEnroll={CloseCustomerEnroll} showCustomerEnrollPopup={showCustomerEnrollPopup} setGogekId={setGogekId}/>
        <PetEnrollPopup ClosePetEnroll={ClosePetEnroll}  showPetEnrollPopup={showPetEnrollPopup} id={id} setPetId={setPetId}/>
        <MainDiv>
            <SpinStyle spinning={loading}>
                <MainHeader>
                    이뻐진개
                </MainHeader>
                <MenuDiv style={{display : 'none'}}>
                    <Menu mode="horizontal" style={{width :"100%"}}>
                        <Menu.Item key={1}>메인</Menu.Item>
                        <Menu.Item key={2}>회원관리</Menu.Item>
                        <Menu.Item key={3}>예약관리</Menu.Item>
                        <Menu.Item key={4}>재고관리</Menu.Item>
                        <Menu.Item key={5}>설정</Menu.Item>
                    </Menu>
                </MenuDiv>
                <div style={{display : "flex", justifyContent : "space-between"}}>
                    <div>
                        <Input readOnly={true} placeholder="보호자/강아지 이름검색" style={{width : "300px"}} onClick={OpenOwnerSearchPopup}/>
                        <Button type="primary" onClick={OpenOwnerSearchPopup}><SearchOutlined/></Button>
                    </div>
                    <div>
                        <Button style={{marginRight : "5px"}} type="primary" onClick={OpenCustomerEnroll}>고객등록</Button>
                        <Button style={{marginRight : "5px"}} type="primary" onClick={OpenPetEnroll} disabled = {id ? false : true}>애견등록</Button>
                        <Button style={{marginRight : "5px"}} type="primary" onClick={OpenBlackListPopup}>블랙리스트 명단</Button>
                    </div>
                </div>
                <Row>
                    <Col span={10} style={{border: "1px solid #f0f0f0"}}>
                        <CardDiv>보호자 프로필
                            <Button icon={<DeleteOutlined />} type='primary' danger disabled = {id ? false : true} onClick={onClickClientDelete}/>
                        </CardDiv>
                        <Card size="small" bordered={false}>
                            <div style={{display : "flex", width : "100%"}}>
                                <Col span={15}>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>이름 :</Col>
                                        <Col><Input placeholder="이름" onChange={m_name_change} value={m_name}/></Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>전화번호 :</Col>
                                        <Col><Input placeholder="전화번호" onChange={m_hp_no_change} value={m_hp_no}/></Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>성별 :</Col>
                                        <Col>
                                            <Radio.Group onChange={m_gender_change} value={m_gender}>
                                                <Radio value={"1"}>남</Radio>
                                                <Radio value={"2"}>여</Radio>
                                                <Radio value={"3"}>모름</Radio>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>주소 :</Col>
                                        <Col span={18}><Input placeholder="주소" onChange={m_addr1_change} value={m_addr1}/></Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>부 보호자 :</Col>
                                        <Col><Input placeholder="부 보호자" onChange={s_name_change} value={s_name}/></Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>전화번호 :</Col>
                                        <Col><Input placeholder="전화번호"  onChange={s_hp_change} value={s_hp_no}/></Col>
                                    </Row>
                                    <Row style={{marginBottom : "5px"}}>
                                        <Col span={5}>성별 :</Col>
                                        <Col>
                                            <Radio.Group onChange={s_gender_change} value={s_gender}>
                                                <Radio value={"1"}>남</Radio>
                                                <Radio value={"2"}>여</Radio>
                                                <Radio value={"3"}>모름</Radio>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={9}>                                    
                                    <Table size="small" 
                                        pagination={false}
                                        columns={dogInfoColumns}
                                        dataSource={dogdata}
                                        scroll={{ y: 200 }}
                                        style={{cursor : "pointer"}}
                                        rowKey={'id'}
                                        onRow={(record,rowIndex)=>{
                                            return{
                                                onClick : event => {petRowClick(record)}
                                            }
                                        }}/>
                                </Col>
                            </div>
                        </Card>
                    </Col>
                    <Col span={9} style={{border: "1px solid #f0f0f0"}}>
                        <CardDiv>강아지 프로필
                            <Button icon={<DeleteOutlined />} type='primary' danger disabled={pet_id ? false : true} onClick={onClickPetProfileDelete}/>
                        </CardDiv>
                        <Card size="small" bordered={false}>
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
                        <ButtonCenter>
                            <Button style={{marginRight : "5px"}} type="primary" disabled={pet_id ? false : true}
                             onClick={onClickPetSave}>애견 프로필 수정</Button>
                        </ButtonCenter>
                    </Col>
                    <Col span={5} style={{border: "1px solid #f0f0f0"}}>
                        <CardDiv>
                            구매목록
                            <Button size="small"
                                    type="primary"
                                    style={{marginLeft : "5px"}}
                                    icon={<PlusCircleOutlined/>}
                                    onClick = {OpenBuyListPopup}/>
                        </CardDiv>
                        <Card size="small" bordered={false}>
                            <Table pagination={false}
                                size="small"
                                columns={buyInfoColumns}
                                dataSource={buydata}
                                scroll={{ y: 150 }}
                                style={{cursor : "pointer"}}
                                onRow={(record, rowIndex) => {
                                    return {
                                    onDoubleClick: event => {dbOnclickBuyList(record, rowIndex)}
                                    };
                                }}
                                />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} style={{border: "1px solid #f0f0f0"}}>
                        <CardDiv>블랙리스트</CardDiv>
                        <Card size="small" bordered={false}>
                            <Row style={{marginBottom : "5px", display : "flex", alignItems : "center"}}>
                                <label style={{marginRight : "5px"}}>블랙리스트</label>
                                <Checkbox onChange={black_yb_change} value={black_yb} checked={black_yb_chk}/>
                            </Row>
                            <Row style={{display : "flex", alignItems : "center", marginBottom : "5px"}}>
                                <Col span={2}>
                                    <label>노쇼 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} onChange={noshow_change} value={noshow}/>
                                <Col span={2}>
                                    <label>회</label>
                                </Col>

                                <Col span={2}>
                                    <label>지각 : </label>
                                </Col>
                                <InputNumber size="middle" min={0} max={100000} defaultValue={0} onChange={late_change} value={late}/>
                                <Col span={2}>
                                    <label>회</label>
                                </Col>
                            </Row>
                            <TextArea rows={6} onChange={memo_change} value={memo}/>
                        </Card>
                        <ButtonCenter>
                            <Button style={{marginRight : "5px"}} type="primary" 
                                    disabled = {id ? false : true}
                                    onClick={onClickCustomerSave}>보호자 정보 수정</Button>
                        </ButtonCenter>
                    </Col>
                    <Col span={14} style={{border: "1px solid #f0f0f0"}}>
                        <CardDiv>
                            미용 기록
                            <Button size="small" 
                                    type="primary"
                                    style={{marginLeft : "5px"}}
                                    icon={<PlusCircleOutlined/>}
                                    onClick={OpenCutHistoryPopup}
                                    disabled = {pet_id ? false : true}/>
                        </CardDiv>
                        <Card size="small" bordered={false}>
                            <div style={{display : "flex",width : "100%"}}>
                                <Col span={5}>
                                    <Table
                                    size="small"
                                    pagination={false}
                                    columns={cutInfoColumns}
                                    dataSource = {beautyData}
                                    scroll={{ y: 150 }}
                                    style={{cursor : "pointer"}}
                                    onRow={(record, rowIndex)=>{
                                        return{
                                            onClick : event => {beautyRowClick(record)}
                                        }
                                    }}
                                    />
                                </Col>
                                <Col span={20} style={{textAlign : "center"}}>
                                    <TextArea  rows={7} style={{width : "90%"}}  value={beautyMemo}/>
                                </Col>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </SpinStyle>
        </MainDiv>
        </>
    );
}

