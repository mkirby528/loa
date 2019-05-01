import { createConnectedStore } from 'undux'


// Create a store with an initial value.
export default createConnectedStore({
  loggedIn: false,
  username: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null
})