import styled from "styled-components";
import 'antd/dist/antd.css';
import { Layout, Spin, Card} from 'antd';
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

export const CardPopupDiv = styled.div`
   background : rgb(227 240 254 / 95%);
   border : 1px solid #f0f0f0;
   height : 40px;
   display : flex;
   align-items : center;
   padding-left : 5px;
`;

/**
 * loading
 */
export const SpinStyle = styled(Spin)`

`;

/**
 * 보호자, 강아지 찾기 팝업
 */
export const OwnerSearchModalDiv = styled.div`
   position: fixed;
   width: 100%;
   height: 100%;
   background: #0000005a;
   z-index: 100;
`;

export const OwnerSearchModalInnerDiv = styled.div`
    width: 50%;
    height: 450px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: inline-block;
`;

/**
 * 구매목록 추가 팝업
 */
export const BuyModalDiv = styled.div`
   position: fixed;
   width: 100%;
   height: 100%;
   background: #0000005a;
   z-index: 100;
`;

export const BuyModalInnerDiv = styled.div`
    width: 50%;
    height: 400px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: inline-block;
`;

/**
 * 구매 목록 상세
 */
 export const BuyDetailModalDiv = styled.div`
 position: fixed;
 width: 100%;
 height: 100%;
 background: #0000005a;
 z-index: 100;
`;

export const BuyDetailInnerDiv = styled.div`
  width: 50%;
  height: 150px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: inline-block;
`;
/**
 * 미용기록 추가 팝업
 */
 export const CutModalDiv = styled.div`
 position: fixed;
 width: 100%;
 height: 100%;
 background: #0000005a;
 z-index: 100;
`;

export const CutModalInnerDiv = styled.div`
  width: 50%;
  height: 300px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: inline-block;
`;

/**
 * 블랙리스트 팝업
 */

 export const BlackModalDiv = styled.div`
 position: fixed;
 width: 100%;
 height: 100%;
 background: #0000005a;
 z-index: 100;
`;

export const BlackModalInnerDiv = styled.div`
  width: 50%;
  height: 380px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: inline-block;
`;

/**
 * 팝업 닫기 버튼 아래쪽 가운데 정렬
 */
export const ButtonDiv = styled.div`
   text-align: center;
    margin-bottom: 0.5em;
    bottom: 0;
    position: fixed;
    width: 100%;
`;