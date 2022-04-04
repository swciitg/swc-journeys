/* eslint-disable prettier/prettier */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter style={{backgroundColor:"#ECF8F3"}}>
      <div>
      </div>
      <div className="ms-auto">
        <p>Created by <b>SWC</b></p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
