import styled from 'styled-components'
import login from '@/assets/img/login.png';

export const LoginWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  background: url(${login}) no-repeat;
  height:inherit;
  background-size:100% 100%;
  .login{
    padding: 30px;
    transform: translateY(-30%);
    width: 500px;
    background:  rgba(0,0,0,.05);
    margin: 0 auto;
    .error{
      width: 300px;
      background: #fff2e8;
      margin: 0 0 10px 0;
      padding: 10px;
      color: #fa541c;
      border: #ffbb96;
    }
    .header{
      font-size: 30px;
      margin-bottom: 20px;
      text-align: center;
    }
    .form{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .ant-input{
      font-size: 16px;
      background: transparent;
      width: 300px;
    }
    .input{
      background: transparent;
      width: 300px;
    }
    input:-internal-autofill-previewed,input:-internal-autofill-selected {
    -webkit-text-fill-color: black !important;
    transition: background-color 5000s ease-in-out 0s !important;
    }
  }
`