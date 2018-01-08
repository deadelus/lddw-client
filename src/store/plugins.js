import { STORAGE_KEY } from './state'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = {
      auth: state.auth,
      user: state.user,
      post: state.post,
      cgu: state.cgu,
      majeur: state.majeur,
      showNsfw: state.showNsfw
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedData))

    if (mutation.type === 'CLEAR_ALL_DATA') {
      localStorage.removeItem(STORAGE_KEY)
    }
  })
}

export default [localStoragePlugin]
