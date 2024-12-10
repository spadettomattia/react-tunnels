import React from 'react'
import PropTypes from 'prop-types'
import { TunnelContext } from './TunnelProvider'

TunnelPlaceholder.propTypes = {
  children: PropTypes.func,
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.symbol]),
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
}

export default function TunnelPlaceholder({
  id,
  children,
  Component = React.Fragment,
  multiple,
}) {
  const { tunnelState } = React.useContext(TunnelContext)
  const [tunnelProps, setTunnelProps] = React.useState(() =>
    tunnelState.getTunnelProps(id),
  )

  React.useEffect(
    () => {
      const handlePropsChange = () => {
        setTunnelProps(tunnelState.getTunnelProps(id))
      }

      tunnelState.subscribe(id, handlePropsChange)

      return () => {
        tunnelState.unsubscribe(id, handlePropsChange)
      }
    },
    [id, tunnelState],
  )

  if (children) {
    if (Array.isArray(tunnelProps) || multiple) {
      return !tunnelProps
        ? children({ items: [] })
        : children({
            items: Array.isArray(tunnelProps) ? tunnelProps : [tunnelProps],
          })
    } else {
      return children(tunnelProps || {})
    }
  }

  if (!tunnelProps) {
    return null
  }

  return <Component>{tunnelProps.children}</Component>
}
