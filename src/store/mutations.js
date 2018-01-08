const version = '2.0.1'
const defaultCGU = {
  version: '1.0',
  accepted: false
}

const defaultPost = {
  isLoading: false,
  file: {}
}
const majeur = false
const showNsfw = false

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

export const SHOW_NSFW = (state) => {
  state.showNsfw = true
}

export const CLEAR_POST = (state) => {
  state.post = defaultPost
}

export const CLEAR_ALL_DATA = (state) => {
  // AppVersion
  state.version = version
  // CGU
  state.cgu = defaultCGU
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null
  // User
  state.user = {}
  // Post
  state.post = defaultPost
  // Age > 18
  state.majeur = majeur
  // show nsfw ?
  state.showNsfw = showNsfw
}
