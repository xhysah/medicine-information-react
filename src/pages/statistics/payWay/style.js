import styled from 'styled-components'

export const PayWayWrapper =  styled.div`
.time{
  margin: 10px;
}
.total{
  font-size: 20px;
  color: red;
  text-align: center;
  position: relative;
  top: 140px;
}
`
export const GoodsWrapper =  styled.div`
.tags{
  margin: 5px 10px;
  display: inline-block;
  .tag{
    margin: 5px;
    cursor: pointer;
    &:hover{
      color: black;
    }
  }
}
`