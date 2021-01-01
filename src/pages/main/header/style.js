import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  .headerLogo{
    padding: 5px;
    vertical-align: top;
    width: 12vh;
    border-radius: 40%;
  }
  .headerName{
    margin-left: 20px;
    display: inline;
    color: white;
    line-height: 12vh;
    font-size: 3vh;
  }
  .right{
    position: relative;
    display: inline;
    float: right;
    line-height: 6vh;
    div{
      display: inline;
      position: absolute;
      color: white;
      font-size: 2vh;
    }
  }
  .role{
    left: -150px;
    width: 200px;
    top: 10px;
  }
  .username{
    top: 40px;
    left: -150px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .logout{
    color: #1890ff;
    position: relative;
    display: inline;
    float: right;
    div{
      position: absolute;
      left: 10px;
      cursor: pointer;
      top: 20px;
      .icons{
        font-size: 20px;
      }
    }
  }
`