import 'antd/dist/antd.css';
import { MainDiv, MainHeader, MenuDiv } from './StyleComponet';
import { Layout, Menu, Input, Table, Card, Row, Col, Upload,DatePicker ,Checkbox } from 'antd';
const { Header, Content, Footer } = Layout;
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

    const data = [
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
      

    const onSearch  = () => {
        
    }
    return(
        <>
        <MainDiv>
            <MainHeader>
                이뻐진개
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
            <div>
                <Search placeholder="input search text" onSearch={onSearch} enterButton style={{width : "300px"}}/>
            </div>
            <Row>
                <Col span={10}>
                    <Card title="보호자 프로필" size="small">
                        <div style={{display : "flex",width : "100%"}}>
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
                                <Table pagination={false} columns={dogInfoColumns} dataSource={data}/>
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={14}>
                    <Card title="강아지 프로필" size="small">
                        <div style={{display : "flex",width : "100%"}}>
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
            </Row>
            <Row>
                <Col span={5}>
                    <Card title="블랙리스트" size="small">
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={24}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col><Checkbox>블랙리스트</Checkbox></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col style={{marginRight : "5px"}}>노쇼 </Col>
                                    <Col span={3} style={{marginRight : "20px"}}><Input/></Col>
                                    <Col style={{marginRight : "5px"}}>지각 </Col>
                                    <Col span={3} style={{marginRight : "20px"}}><Input/></Col>
                                </Row>
                                <TextArea rows={5} />
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="블랙리스트" size="small">
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={24}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col><Checkbox>블랙리스트</Checkbox></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>노쇼 :</Col>
                                    <Col style={{marginRight : "3px"}}><Input/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>지각 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <TextArea rows={5} />
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="블랙리스트" size="small">
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={24}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col><Checkbox>블랙리스트</Checkbox></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>노쇼 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>지각 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <TextArea rows={5} />
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="블랙리스트" size="small">
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={24}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col><Checkbox>블랙리스트</Checkbox></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>노쇼 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>지각 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <TextArea rows={5} />
                            </Col>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card title="블랙리스트" size="small">
                        <div style={{display : "flex",width : "100%"}}>
                            <Col span={24}>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col><Checkbox>블랙리스트</Checkbox></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>노쇼 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <Row style={{marginBottom : "5px"}}>
                                    <Col span={2}>지각 :</Col>
                                    <Col><Input/></Col>
                                </Row>
                                <TextArea rows={5} />
                            </Col>
                        </div>
                    </Card>
                </Col>
            </Row>
        </MainDiv>
        </>
    );
}

