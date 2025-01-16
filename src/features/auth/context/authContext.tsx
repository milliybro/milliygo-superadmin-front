// import { auth } from '@/config/firebase'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'

interface AuthContextProps {
  authStore: ReturnType<typeof useAuthStore>
  logOut: () => void
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = useAuthStore()
  const t = useTranslation()
  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider()

  //   signInWithPopup(auth, provider).then((result: any) => {
  //     withGoogleAuth({ auth_token: result.user.accessToken }).then((res) => {
  //       authStore.login(res)
  //       localStorage.setItem('refresh_token', res.refresh)
  //       localStorage.setItem('access_token', res.access)
  //       setCookie('userInfo', res.user)
  //       authStore.login(res.user)
  //       router.push('/account/account-management')
  //       message.success(t('user.login-success'), 2)
  //     })
  //   })
  // }

  // const facebookSignIn = () => {
  //   const provider = new FacebookAuthProvider()

  //   signInWithPopup(auth, provider).then((result: any) => {
  //     withFacebookAuth({ auth_token: result.user.accessToken }).then((res) => {
  //       authStore.login(res)
  //       localStorage.setItem('refresh_token', res.refresh)
  //       localStorage.setItem('access_token', res.access)
  //       setCookie('userInfo', res.user)
  //       authStore.login(res.user)
  //       router.push('/account/account-management')
  //       message.success(t('user.login-success'), 2)
  //     })
  //   })
  // }

  // const oneIdLogin = ({ code }: { code: string }) => {
  //   withOneIdAuth({ code }).then((res) => {
  //     authStore.login(res)
  //     localStorage.setItem('refresh_token', res.refresh)
  //     localStorage.setItem('access_token', res.access)
  //     setCookie('userInfo', res.user)
  //     authStore.login(res.user)
  //     router.push('/account/account-management')
  //     message.success(t('user.login-success'), 2)
  //   })
  // }

  const logOut = () => {
    signOut(auth)
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
  //     if (currentUser) {
  //       // authStore.login(currentUser);
  //     } else {
  //       authStore.logout();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [])

  return (
    <AuthContext.Provider value={{ authStore, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
