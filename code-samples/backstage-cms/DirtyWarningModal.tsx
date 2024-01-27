import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useFormState } from 'react-final-form'

import Modal from 'components/Molecules/Modal'

const DirtyWarningModal = () => {
  const router = useRouter()
  const { dirty } = useFormState()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const leaveUrl = useRef<string | undefined>()

  const routerDirtyCheckEnabled = useRef<boolean>(true)

  /**
   * Handle most native browser functionality (closing tab, closing browser, etc.)
   */
  useEffect(() => {
    const handleBeforeUnload = (e: { returnValue: boolean }) => {
      // eslint-disable-next-line no-param-reassign
      e.returnValue = true
    }

    // While Chrome consistently respects `e.returnValue` in our handler,
    // Firefox only behaves consistently if we only set the event handler
    // when necessary.
    if (dirty) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirty])

  /**
   * Handle client-side / router navigation
   */
  useEffect(() => {
    const handleRouteChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow && dirty && routerDirtyCheckEnabled.current) {
        leaveUrl.current = url

        setModalOpen(true)

        // Force halt router behavior to prevent navigation
        // eslint-disable-next-line no-throw-literal
        throw 'Abort route change. Please ignore this error.'
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => router.events.off('routeChangeStart', handleRouteChangeStart)
  }, [dirty, router])

  /**
   * Handle browser back button
   */
  useEffect(() => {
    /**
     * Returning false from `beforePopState` will halt all router navigation.
     * In which case the `routeChangeStart` event will NOT fire.
     * However, native browser functionality will continue so this handler
     * contains logic to "repair" the browser state (see below)
     */
    router.beforePopState(({ as }) => {
      if (dirty && routerDirtyCheckEnabled.current) {
        // If the browser's url has changed, repair the native browser state
        // so that it's back inline with our router state.
        if (as !== router.asPath) {
          // Warning: This will retrigger `beforePopState`
          // so make sure the logic in this handler doesn't break if it's inadvertently run twice.
          window.history.forward()
        }

        setModalOpen(true)

        return false
      }
      return true
    })

    return () => router.beforePopState(() => true)
  }, [dirty, router])

  const handleLeave = () => {
    // Navigating with the router will trigger 'routeChangeStart' so tell
    // our `useEffect` above to ignore the navigation we're about to run.
    routerDirtyCheckEnabled.current = false

    if (!leaveUrl.current) {
      router.back()
    } else {
      router.push(leaveUrl.current)
    }
  }

  const handleStay = () => {
    leaveUrl.current = undefined
    setModalOpen(false)
  }

  return (
    <Modal
      title="Leave this Post?"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      primaryButton={{
        type: 'primary',
        text: 'Yes, leave',
        onClick: handleLeave,
      }}
      secondaryButton={{
        text: 'Stay on page',
        onClick: handleStay,
      }}
    >
      You have unsaved changes. Do you want to leave the page without saving?
    </Modal>
  )
}

export default DirtyWarningModal