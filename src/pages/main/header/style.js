import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  .headerLogo{
    padding: 5px;
    vertical-align: top;
    width: 98px;
    border-radius: 40%;
  }
  .headerName{
    margin-left: 20px;
    display: inline;
    color: white;
    line-height: 100px;
    font-size: 25px;
  }
  .right{
    position: relative;
    display: inline;
    float: right;
    div{
      display: inline;
      position: absolute;
      color: white;
      font-size: 16px;
    }
  }
  .role{
    left: -140px;
    width: 200px;
  }
  .username{
    top: 30px;
    left: -140px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`