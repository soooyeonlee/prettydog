import 'antd/dist/antd.css';
import { CardDiv, MainDiv, MainHeader, MenuDiv } from './StyleComponet';
import { SearchOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import {Menu, Input, Table, Card, Row, Col, Upload,DatePicker , Button,InputNumber,Switch,Radio } from 'antd';
import logo from '../img/testimg.png';
import BuyListPopup from './BuyListPopup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import OwnerSearchPopup from './OwnerSearchPopup';
import CutHistoryPopup from './CutHistoryPopup';
import BuyDetailPopup from './BuyDetailPopup';
import BlackListPopup from './BlackListPopup';
import service, { ResponseDatas } from '../helper/service';
const { TextArea } = Input;
export default function Home(){
    const [showOwnerSearchPopup,setShowOwnerSearchPopup] = useState<boolean>(false);
    const [showBuyListPopup , setShowBuyListPopup] = useState<boolean>(false);
    const [showBuyDetailPopup , setShowBuyDetailPopup] = useState<boolean>(false);
    const [showCutHistoryPopup, setShowCutHistoryPopup] = useState<boolean>(false);
    const [showBlackListPopup, setShowBlackListPopup] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [previewURL, setPreviewURL] = useState<any>();
    const [preview,setPreview] = useState<any>();
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

    /**
     * 저장버튼 클릭
     */
    const clickSaveDate = () => {
        sendSaveDate();
    }

    const sendSaveDate = async() =>{
        let params:object = {
            m_name : '고객명',
            m_hp_no : '01012345678',
            m_gender : '1',
            m_addr1 : '주소1',
            m_addr2 : '주소2',
            s_name : '고객명2',
            s_hp_no : '01012345678',
            s_gender : '1',
            black_yb : '',
            noshow : '1',
            late : '2',
            memo : '메모',
        }
        let result:ResponseDatas = await service('/client','POST', params);
        if(Object(result.data).data){
            //Object(result.data).data.id  // 고객ID
        }
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

    const dogInfoColumns = [
        {
            title : "강아지 이름",
            dataIndex : "pet_nm",
            key : "pet_nm"
        }
    ]

    const dogdata = [
        {
          key: '1',
          gogek_nm: '디지니',
          hp_backnum: 1234,
          pet_nm: '초코',
        },
        {
          key: '2',
          gogek_nm: '디지니',
          hp_backnum: 1234,
          pet_nm: '몽글',
        },
        {
          key: '3',
          gogek_nm: '디지니',
          hp_backnum: 1234,
          pet_nm: '미니',
        },
    ];

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
        },
        {
            key: '2',
            buy_date : '2021-11-13',
            buy_nm : '강아지를 위한 개껌'
        },
        {
            key: '3',
            buy_date : '2021-11-13',
            buy_nm : '강아지를 위한 개껌'
        },
    ];

    const cutInfoColumns = [
        {
            title : "미용 날짜",
            dataIndex : "cut_date",
            key : "cut_date"
        }
    ]

    const cutdata = [
        {
            key: '1',
            cut_date : '2021-09-13'
        },
        {
            key: '2',
            cut_date : '2021-10-13'
        },
        {
            key: '3',
            cut_date : '2021-11-13'
        },
        {
            key: '4',
            cut_date : '2021-09-13'
        },
        {
            key: '5',
            cut_date : '2021-10-13'
        },
        {
            key: '6',
            cut_date : '2021-11-13'
        },{
            key: '7',
            cut_date : '2021-09-13'
        },
        {
            key: '8',
            cut_date : '2021-10-13'
        },
        {
            key: '9',
            cut_date : '2021-11-13'
        },{
            key: '10',
            cut_date : '2021-09-13'
        }
    ]

    return(
        <>
        <OwnerSearchPopup CloseOwnerSearchPopup={CloseOwnerSearchPopup} showOwnerSearchPopup={showOwnerSearchPopup}/>
        <BuyListPopup CloseBuyListPopup={CloseBuyListPopup} showBuyListPopup={showBuyListPopup}/>
        <CutHistoryPopup CloseCutHistoryPopup={CloseCutHistoryPopup} showCutHistoryPopup={showCutHistoryPopup}/>
        <BuyDetailPopup CloseBuyDetailPopup={CloseBuyDetailPopup} showBuyDetailPopup={showBuyDetailPopup}/>
        <BlackListPopup CloseBlackListPopup={CloseBlackListPopup} showBlackListPopup={showBlackListPopup}/>
        <MainDiv>
            <MainHeader>
                이뻐진개
                <img style={{maxHeight : "100%", maxWidth : "100%"}}  src={logo}></img>
            </MainHeader>
            <MenuDiv>
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
                    <Input placeholder="보호자/강아지 이름검색" style={{width : "300px"}}/>
                    <Button type="primary" onClick={OpenOwnerSearchPopup}><SearchOutlined/></Button>
                </div>
                <div>
                    <Button style={{marginRight : "5px"}} type="primary">고객등록</Button>
                    <Button style={{marginRight : "5px"}} type="primary">애견등록</Button>
                    <Button style={{marginRight : "5px"}} type="primary" onClick={OpenBlackListPopup}>블랙리스트 명단</Button>
                </div>
            </div>
            <Row>
                <Col span={10} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>보호자 프로필</CardDiv>
                    <Card size="small" bordered={false}>
                        <div style={{display : "flex", width : "100%"}}>
                            <Col span={15}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>이름 :</Col>
                                    <Col><Input placeholder="이름" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>전화번호 :</Col>
                                    <Col><Input placeholder="전화번호" /></Col>
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
                                    <Col span={5}>주소 :</Col>
                                    <Col><Input placeholder="주소" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>부 보호자 :</Col>
                                    <Col><Input placeholder="부 보호자" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>전화번호 :</Col>
                                    <Col><Input placeholder="전화번호" /></Col>
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
                            </Col>
                            <Col span={9}>
                                <Table size="small" 
                                       pagination={false}
                                       columns={dogInfoColumns}
                                       dataSource={dogdata}
                                       scroll={{ y: 150 }}
                                       style={{cursor : "pointer"}}/>
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={9} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>강아지 프로필</CardDiv>
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
                            <label>블랙리스트</label>
                            <Switch size="small"  />
                        </Row>
                        <Row style={{display : "flex", alignItems : "center", marginBottom : "5px"}}>
                            <Col span={2}>
                                <label>노쇼 : </label>
                            </Col>
                            <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                            <Col span={2}>
                                <label>회</label>
                            </Col>

                            <Col span={2}>
                                <label>지각 : </label>
                            </Col>
                            <InputNumber size="middle" min={0} max={100000} defaultValue={0} />
                            <Col span={2}>
                                <label>회</label>
                            </Col>
                        </Row>
                        <TextArea autoSize={true}/>
                    </Card>
                </Col>
                <Col span={14} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>
                        미용 기록
                        <Button size="small" 
                                type="primary"
                                style={{marginLeft : "5px"}}
                                icon={<PlusCircleOutlined/>}
                                onClick={OpenCutHistoryPopup}/>
                    </CardDiv>
                    <Card size="small" bordered={false}>
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={4}>
                                <Table
                                size="small"
                                pagination={false}
                                columns={cutInfoColumns}
                                dataSource = {cutdata}
                                scroll={{ y: 150 }}
                                style={{cursor : "pointer"}}
                                />
                            </Col>
                            <Col span={20} style={{textAlign : "center"}}>
                                <TextArea autoSize={true} style={{width : "90%"}}/>
                            </Col>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div style={{textAlign : "center", margin : "5px 0px 10px"}}>
                <Button style={{marginRight : "5px"}} type="primary" onClick={clickSaveDate}>저장</Button>
            </div>
        </MainDiv>
        </>
    );
}

