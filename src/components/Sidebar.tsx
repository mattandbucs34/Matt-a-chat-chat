import React, { PropsWithChildren } from 'react'

const Sidebar = ({children}: PropsWithChildren<any>) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Sidebar
