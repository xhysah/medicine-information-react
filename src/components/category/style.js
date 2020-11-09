import styled from 'styled-components'

export const CategoryWrapper = styled.div`
  padding: 5px 10px;
  img{
    width: 100%;
    height: 100%;
  }
  .close{
    position: absolute;
    right: 10px;
    color: #1890ff;
    cursor: pointer;
    padding: 5px;
    &:hover{
      background-color: #e6f7ff;
      border-radius: 50%;
      color: black;
    }
  }
  .ant-card-body{
    padding: 10px;
  }
`