import { Button, LogInIcon, Pane } from 'evergreen-ui'
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default function SignIn() {
  const auth = getAuth()

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Button padding={24} iconAfter={LogInIcon} onClick={signInWithGoogle}>
        Sign In With Google
      </Button>
    </Pane>
  )
}
