import { initializeApp } from "firebase/app"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCEPQxh0Ztianw5HWsSOJjNuMlt0Re5Q8Q",
  authDomain: "testing-98cd8.firebaseapp.com",
  projectId: "testing-98cd8",
  storageBucket: "testing-98cd8.appspot.com",
  messagingSenderId: "497818280751",
  appId: "1:497818280751:web:5d619044a10b6f8f16b7da",
  measurementId: "G-FG7BJ610XD"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
