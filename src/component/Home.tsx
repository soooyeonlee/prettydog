import 'antd/dist/antd.css';
import { CardDiv, MainDiv, MainHeader, MenuDiv } from './StyleComponet';
import { SearchOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import {Menu, Input, Table, Card, Row, Col, Upload,DatePicker ,Checkbox, Button,InputNumber,Switch } from 'antd';
import logo from '../img/testimg.png';
const { TextArea } = Input;
const { Search } = Input;
export default function Home(){
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
    ]
      

    const onSearch  = () => {
        
    }

    return(
        <>
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
                    <Button type="primary"><SearchOutlined/></Button>
                </div>
                <div>
                    <Button style={{marginRight : "5px"}} type="primary">고객등록</Button>
                    <Button style={{marginRight : "5px"}} type="primary">애견등록</Button>
                    <Button style={{marginRight : "5px"}} type="primary">블랙리스트 명단</Button>
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
                                    <Col><Input placeholder="성별" /></Col>
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
                                    <Col><Input placeholder="성별" /></Col>
                                </Row>
                            </Col>
                            <Col span={9}>
                                <Table size="small" pagination={false} columns={dogInfoColumns} dataSource={dogdata}/>
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={9} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>강아지 프로필</CardDiv>
                    <Card size="small" bordered={false}>
                        <div style={{display : "flex", width : "100%"}}>
                            <Col span={12} >
                                <div style={{border : "1px solid #d9d9d9",width : "200px",height : "200px"}}>
                                    사진업로드
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
                                    <Col><Input placeholder="성별" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>나이 :</Col>
                                    <Col><Input placeholder="나이" /></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={5}>생일 :</Col>
                                    <Col><DatePicker/></Col>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={5} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>
                        구매목록
                        <Button size="small" type="primary" style={{marginLeft : "5px"}} icon={<PlusCircleOutlined/>}/>
                    </CardDiv>
                    <Card size="small" bordered={false}>
                        <Table pagination={false} size="small" columns={buyInfoColumns} dataSource={buydata}/>
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
                        <TextArea rows={5}/>
                    </Card>
                </Col>
                <Col span={14} style={{border: "1px solid #f0f0f0"}}>
                    <CardDiv>
                        미용 기록
                        <Button size="small" type="primary" style={{marginLeft : "5px"}} icon={<PlusCircleOutlined/>}/>
                    </CardDiv>
                    <Card size="small" bordered={false}>
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={4}>
                                <Table
                                size="small"
                                pagination={false}
                                columns={cutInfoColumns}
                                dataSource = {cutdata}
                                />
                            </Col>
                            <Col span={20} style={{textAlign : "center"}}>
                                <TextArea rows={7} style={{width : "90%"}}/>
                            </Col>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div style={{textAlign : "center", margin : "5px"}}>
                <Button style={{marginRight : "5px"}} type="primary">저장</Button>
                <Button type="primary">닫기</Button>
            </div>
        </MainDiv>
        </>
    );
}

