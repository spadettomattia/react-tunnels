import React from 'react'
import PropTypes from 'prop-types'
import useTunnelState from './useTunnelState'

export const TunnelContext = React.createContext()

export default function TunnelProvider({ children }) {
  const tunnelState = React.useMemo(() => useTunnelState(), [])

  return (
    <TunnelContext.Provider value={{ tunnelState }}>
      {children}
    </TunnelContext.Provider>
  )
}

TunnelProvider.propTypes = {
  children: PropTypes.node,
}
