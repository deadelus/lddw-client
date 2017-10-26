export const STORAGE_KEY = 'la-dechetterie-du-web'

let syncedData = {
  auth: {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
  },
  user: {
    name: '',
    avatar: '',
    email: '',
    links: {},
    actions: {},
    roles: {}
  }
}

// Sync with local storage.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export const state = syncedData
