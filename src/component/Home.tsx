import 'antd/dist/antd.css';
import { MainDiv, MainHeader, MenuDiv } from './StyleComponet';
import { Layout, Menu, Input, Table, Card, Row, Col  } from 'antd';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
export default function Home(){
    const dogInfoColumns = [
        {
            title : "보호자 이름",
            dataIndex : "gogek_nm",
            key : "gogek_no"
        },
        {
            title : "핸드폰 뒷자리",
            dataIndex : "hp_backnum",
            key : "hp_backnum"
        },
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
            <Layout>
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
                    <Search placeholder="input search text" onSearch={onSearch} enterButton style={{width : "300px"}}/>
                </MenuDiv>
                
                <Content>
                    <Table columns={dogInfoColumns} dataSource={data} size="small" pagination = {false}/>
                    <Row style={{padding : "10px"}}>
                        <Col span={12}>
                            <Card title="보호자 프로필">
                                Card content
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="강아지 프로필">
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </MainDiv>
        </>
    );
}

