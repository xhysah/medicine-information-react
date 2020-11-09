import styled from 'styled-components'

export const ShoppingCartWrapper = styled.div`
  display: ${props => props.ifShow};
  max-height: 500px;
  width: 300px;
  background-color: #e6f7ff;
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: scroll;
  border-radius: 10px;
  .good{
    position: relative;
    padding: 10px;
    img{
      width: 100px;
      border: 1px solid #1890ff61;
    }
    .goodsName{
      position: absolute;
      top: 10px;
      left: 120px;
      width: 150px;
    }
    .price{
      color: red;
      position: absolute;
      bottom: 10px;
      left: 120px;
    }
    .button{
      position: absolute;
      bottom: 10px;
      right: 10px;
      .input{
        border: none;
        width: 40px;
        text-align: center;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        &:focus{
          outline:none;
        }
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
      .button1{
        cursor: pointer;
        background-color: white;
        border: 1px solid #999;
        border-radius: 20% 0 0 20%;
        &:focus{
          outline:none;
        }
        &:hover{
          background-color: #e6f7ff;
        }
        :disabled{
          color: #999;
          cursor: default;
          background-color: #f1f0f3;
        }
      }
      .button2{
        cursor:pointer;
        border: 1px solid #999;
        border-radius: 0 20% 20% 0;
        background-color: white;
        &:focus{
          outline:none;
        }
        &:hover{
          background-color: #e6f7ff;
        }
        :disabled{
          color: #999;
          cursor: default;
          background-color: #f1f0f3;
        }
      }
    }
  }
  .footer{
    margin-right: 7px;
    float: right;
    .num{
      border-radius: 20px;
      display: inline-block;
      text-align: center;
      width: 90px;
      background-color: #1890ff;
      color: white;
      padding: 5px 10px;
      cursor: pointer;
      span{
        display: inline-block;
        text-align: center;
        width:20px;
      }
    }
    .all{
      padding: 10px;
      color: red;
      font-size: 14px;
    }
  }
  .close{
    float: right;
    color: #1890ff;
    cursor: pointer;
    padding: 5px;
    &:hover{
      background-color: #e6f7ff;
      border-radius: 50%;
      color: black;
    }
  }
`