import styled from 'styled-components'

export const MainContentWrapper = styled.div` 
  .center{
    margin: 0 auto;
  }
  .grid{
    display: grid !important;
    grid-template-columns: repeat(5,20%);
  }
  .left{
    position: absolute;
    width: 20px;
    margin: 0 5px;
    padding: 300px 10px;
    top: 10%;
    cursor: pointer;
    &:hover{
      background-color:transparent;
    }
  }

  .right{
    position: absolute;
    width: 20px;
    margin: 0 5px 0 0;
    padding: 300px 10px 300px 0;
    top: 10%;
    cursor: pointer;
    right:15px;
    &:hover{
      background-color:transparent;
    }
  }
`