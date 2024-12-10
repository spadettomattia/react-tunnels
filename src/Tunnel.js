import React from 'react'
import PropTypes from 'prop-types'
import uniqueId from './uniqueId'
import { TunnelContext } from './TunnelProvider'

Tunnel.propTypes = {
  id: PropTypes.string,
}

export default function Tunnel({ id, ...props }) {
  const { tunnelState } = React.useContext(TunnelContext)

  const itemId = React.useMemo(() => uniqueId(), [])

  React.useEffect(
    () => {
      tunnelState.setTunnelProps(id, itemId, props)

      return () => {
        tunnelState.setTunnelProps(id, itemId, null)
      }
    },
    [id, itemId, props, tunnelState],
  )

  return null
}
