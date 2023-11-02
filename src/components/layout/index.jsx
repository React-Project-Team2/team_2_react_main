import React from 'react'
import Header from './header'
import Body from './body'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <Body>
        {children}
      </Body>
    </>
  )
}

export default Layout