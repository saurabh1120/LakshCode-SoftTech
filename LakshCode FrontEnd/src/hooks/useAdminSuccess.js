import { useState } from 'react'

export function useAdminSuccess() {
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  function showSuccess(msg, options) {
    setSuccessMsg(msg)
    setSuccess(true)

    setTimeout(function() {
      setSuccess(false)

      if (options && options.closeModal) {
        options.closeModal()
      }
      if (options && options.onDone) {
        options.onDone()
      }
    }, 1500)
  }

  return { success, successMsg, showSuccess }
}