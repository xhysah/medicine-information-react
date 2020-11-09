import styled from 'styled-components'

export const MainContentWrapper = styled.div` 
  .center{
    margin: 0 auto;
  }
  .grid{
    display: inline-grid !important;
    grid-template-columns: repeat(5,18.5%);
    width: auto;
    justify-content: center !important;
    justify-items: center;
  }
  .left{
    position: absolute;
    width: 40px;
    margin: 0 5px;
    padding: 100px 0;
    top: 30%;
    cursor: pointer;
    color: #999;
    &:hover{
      background-color:#e2e4e6;
      color: white;
    }
  }

  .right{
    position: absolute;
    width: 40px;
    margin: 0 5px;
    padding: 100px 0;
    top: 30%;
    cursor: pointer;
    right:0;
    color: #999;
    &:hover{
      background-color:#e2e4e6;
      color: white;
    }
  }
`