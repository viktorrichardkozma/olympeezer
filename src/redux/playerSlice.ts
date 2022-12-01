import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Songs from '@api/songs'

import { Song } from '@entityTypes/song'

export interface PlayerState {
  isPlaying: boolean
  currentSongIndex: number,
  currentSongMetaData: {
    duration: number,
    elapsed: number,
    seek: number
  },
  songs: Song[],
}

const initialState: PlayerState = {
  songs: Songs(),
  currentSongIndex: 0,
  currentSongMetaData: {
    duration: 0,
    elapsed: 0,
    seek: 0
  },
  isPlaying: false
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state) => ({
      ...state,
      isPlaying: true
    }),
    pause: (state) => ({
      ...state,
      isPlaying: false
    }),
    next: (state) => ({
      ...state,
      currentSongIndex : state.currentSongIndex + 1
    }),
    previous: (state) => ({
      ...state,
      currentSongIndex : state.currentSongIndex - 1
    }),
    select: (state, action: PayloadAction<number>) => ({
      ...state,
      currentSongIndex: action.payload
    }),
    setDuration: (state, action: PayloadAction<{duration: number}>) => ({
      ...state,
      currentSongMetaData: {
        ...state.currentSongMetaData,
        duration: action.payload.duration
      }
    }),
    setElapsed: (state, action: PayloadAction<{elapsed: number}>) => ({
      ...state,
      currentSongMetaData: {
        ...state.currentSongMetaData,
        elapsed: action.payload.elapsed,
      }
    }),
    setSeek: (state, action: PayloadAction<{seek: number}>) => ({
      ...state,
      currentSongMetaData: {
        ...state.currentSongMetaData,
        seek: action.payload.seek,
      }
    })
  },
})

export const { play, pause, next, previous, select, setElapsed, setDuration, setSeek} = playerSlice.actions

export default playerSlice.reducer 