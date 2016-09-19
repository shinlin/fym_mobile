export const CHANGE_TYPES = {
  NEXT: 'next',
  PREV: 'prev',
}

export const PLAY_STATUS = {
  INIT: 'init',
  PLAYING: 'playing',
  PAUSED: 'paused',
  END: 'end'
}

export const LOGIN_STATUS = {
  READY: 'ready',     // state that user didn't try logging in or out
  LOGIN: 'login',     // state that user successfully logged in
  LOGOUT: 'logout',  // state that user failed to log in
  INVALID: 'invalid', // state that user failed during login/our process
}
