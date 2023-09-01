import type User from '@/types/User'
import { createSlice } from '@reduxjs/toolkit'

import { Appearance } from '@vkontakte/vkui'

interface State {
    data: {
        currentAppearance: Appearance
        activeStory: 'placeholder' | 'profile'
        activeModal: 'main' | null
        activeProfilePanel: 'profile' | 'friends'
        friends: User[] | 'loading' | null
        currentUser: {
            id: number
            first_name: string
            last_name: string
            photo_200: string
            city?: { id: string; title: string }
        } | null
        flashlightData: { is_available: boolean } | null
    }
}

const initialState = () => {
    const isDarkTheme = matchMedia('(prefers-color-scheme: dark)').matches
    return {
        currentAppearance: isDarkTheme ? Appearance.DARK : Appearance.LIGHT,
        activeStory: 'profile',
        activeModal: null,
        activeProfilePanel: 'profile',
        currentUser: null,
        friends: null,
    }
}

const slice = createSlice({
    name: 'data',
    initialState: initialState(),
    reducers: {
        updateState(state, action) {
            for (const [key, value] of Object.entries(action.payload)) {
                ;(state as any)[key] = value
            }
        },
    },
})

export const { updateState } = slice.actions
export { initialState }
export type { State }
export default slice.reducer
