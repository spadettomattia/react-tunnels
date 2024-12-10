export default function useTunnelState() {
  const tunnels = {}
  const listeners = {}
  const tunnelsDict = {}

  const getListeners = id => listeners[id] || []

  const subscribe = (id, fn) => {
    listeners[id] = [...getListeners(id), fn]
  }

  const unsubscribe = (id, fn) => {
    listeners[id] = getListeners(id).filter(listener => listener !== fn)
  }

  const setTunnelProps = (id, itemId, props) => {
    tunnels[id] = tunnels[id] || []
    tunnelsDict[id] = tunnelsDict[id] || {}

    if (props !== null) {
      if (!tunnelsDict[id][itemId]) {
        tunnels[id].push(itemId)
      }
      tunnelsDict[id][itemId] = props
    } else {
      delete tunnelsDict[id][itemId]
      const idx = tunnels[id].indexOf(itemId)
      tunnels[id] = [
        ...tunnels[id].slice(0, idx),
        ...tunnels[id].slice(idx + 1),
      ]
    }

    if (listeners[id]) {
      listeners[id].forEach(fn => fn(props))
    }
  }

  const getTunnelProps = id => {
    if (tunnels[id]) {
      return tunnels[id].length < 2
        ? tunnelsDict[id][tunnels[id][0]]
        : tunnels[id].map(i => tunnelsDict[id][i])
    }
    return null
  }

  return {
    getListeners,
    subscribe,
    unsubscribe,
    setTunnelProps,
    getTunnelProps,
  }
}
