import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

// Reducer
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
  apiKey: 'AIzaSyCMP7C_P51heDHUgDIPD0UpesS-w5B0uns',
  authDomain: 'reactclientpanel-7198a.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-7198a.firebaseio.com',
  projectId: 'reactclientpanel-7198a',
  storageBucket: 'reactclientpanel-7198a.appspot.com',
  messagingSenderId: '485783344982'
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)
// Init firestore
// const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
})

// Check for settings in localstorage
if (localStorage.getItem('settings') == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }
  // Set to local storage
  localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

// Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
