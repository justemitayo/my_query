import React from 'react'
import { useIsFetching } from '@tanstack/react-query'

const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching()

  if (!isFetching) return null
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <span style={styles.text}>Loading...</span>
    </div>
  )
}
const styles = {
  wrapper: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  spinner: {
    width: '16px',
    height: '16px',
    marginRight: '10px',
    border: '3px solid #fff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    fontSize: '14px',
    fontWeight: 500,
  },
} as const
export default GlobalLoadingIndicator