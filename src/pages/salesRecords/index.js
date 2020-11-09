import React, { memo } from 'react'
import Orders from './orders'
import Search from './search'

export default memo(function () {
  return (
    <div>
      <Search/>
      <Orders/>
    </div>
  )
})
