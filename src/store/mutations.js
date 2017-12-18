const defaultPost = {
  isLoading: false,
  file: {}
}

const defaultCGU = {
  version: '0.1',
  accepted: false
}

const majeur = false

export const UPDATE_CGU = (state, cgu) => {
  state.cgu = cgu
}

export const UPDATE_POST = (state, post) => {
  state.post = post
}

export const UPDATE_AUTH = (state, auth) => {
  state.auth = auth
}

export const UPDATE_USER = (state, user) => {
  state.user = user
}

export const IS_MAJEUR = (state) => {
  state.majeur = true
}

export const CLEAR_POST = (state) => {
  state.post = defaultPost
}

export const CLEAR_ALL_DATA = (state) => {
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null
  // User
  state.user = {}
  // Post
  state.post = defaultPost
  // CGU
  state.cgu = defaultCGU
  // Age > 18
  state.majeur = majeur
}
