import styled from 'styled-components'

export const GoodsItemWrapper = styled.div`
  opacity: ${props=> props.ifNull};
  padding: 5px 10px;
  img{
    width: 100%;
    height: 100%;
  }
  .card{
    width: 220px;
    .ant-card-body {
      padding: 15px;
    }
    .width{
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .goodsName{
      margin: 5px 0;
    }
    .price{
      font-size: 18px;
      color: red;
    }
    .stocks{
      margin-top: 5px;
      font-size:12px;
      color: #999;
      float: right;
    }
    .no{
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
      font-size: 25px;
    }
  }
`