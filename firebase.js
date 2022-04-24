import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAuX4oh_YOpnNFpgwUOrmNt-vN7vxgDmyI',
  authDomain: 'vocabs-w-sorting.firebaseapp.com',
  projectId: 'vocabs-w-sorting',
  storageBucket: 'vocabs-w-sorting.appspot.com',
  messagingSenderId: '453134952976',
  appId: '1:453134952976:web:a4f23f083ceca44d6bb895',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore()

export const saveVocab = (word) => addDoc(collection(db, 'vocabs'), { word })

export const getVocabs = () => {
  const q = query(collection(db, 'vocabs'), orderBy('word'))
  return getDocs(q)
}

export const deleteVocab = (id) => deleteDoc(doc(db, 'vocabs', id))

export const updateVocab = (id, newWord) =>
  updateDoc(doc(db, 'vocabs', id), { word: newWord })
