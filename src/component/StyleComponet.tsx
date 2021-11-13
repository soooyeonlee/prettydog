import styled from "styled-components";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Header } = Layout;

export const MainDiv = styled.div`
   width: 98%;
   height: 100vh;
   margin: 0 auto;
`;

export const MainHeader = styled(Header)`
   background : rgb(227 240 254 / 95%);
   text-align : right;
`;

export const MenuDiv = styled.div`
   display : flex;
   background : #fff;
   align-items : center;
`;

export const CardDiv = styled.div`
   border-bottom: 1px solid #f0f0f0;
   height : 40px;
   display : flex;
   align-items : center;
   padding-left : 5px;
`;
