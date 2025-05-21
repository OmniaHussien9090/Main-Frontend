import React from 'react'
import { useAuth } from '../contextAuth/AuthContext.jsx'

function ForTest() {
  const { user } = useAuth();

  return (
    <div>ForTest</div>
  )
}

export default ForTest