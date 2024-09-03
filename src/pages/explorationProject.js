// 勘探项目
import React, { useEffect } from 'react'
import { sendPostRequest } from '../utils/utils'

export default function ExplorationProject() {
  useEffect(() => {
    sendPostRequest()
  }, [])
  return (
    <div>explorationProject</div>
  )
}
