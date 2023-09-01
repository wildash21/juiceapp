import { useDispatch, useSelector } from 'react-redux'
import { updateState, type State } from '@/redux/slice'
import type { AppDispatch } from '@/redux/store'

import { Appearance, PanelHeaderButton } from '@vkontakte/vkui'
import { Icon28MoonOutline } from '@vkontakte/icons'

export default function ThemeSwitcher() {
    const { currentAppearance } = useSelector<State, State['data']>(({ data }) => data)
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    return (
        <PanelHeaderButton
            onClick={() =>
                set({
                    currentAppearance:
                        currentAppearance === Appearance.DARK ? Appearance.LIGHT : Appearance.DARK,
                })
            }
        >
            <Icon28MoonOutline />
        </PanelHeaderButton>
    )
}
