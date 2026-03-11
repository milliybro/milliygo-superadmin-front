import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBvgsI2oDXlipqBNn2qfS_mt0i1RXyCjI8',
  authDomain: 'emehmon-7607a.firebaseapp.com',
  projectId: 'emehmon-7607a',
  storageBucket: 'emehmon-7607a.appspot.com',
  messagingSenderId: '667296256799',
  appId: '1:667296256799:web:2bafab6c466f3f7fd2d62a',
  measurementId: 'G-N1MYW6MV0Q',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
