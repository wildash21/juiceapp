import { useDispatch } from 'react-redux'
import { updateState } from '@/redux/slice'
import type { AppDispatch } from '@/redux/store'

import ThemeSwitcher from '@/components/ThemeSwitcher'

import { Button, Group, Panel, PanelHeader, Placeholder, Spacing, View } from '@vkontakte/vkui'
import { Icon56Hearts2CircleFillTwilight } from '@vkontakte/icons'

import lang from '@/lang'

export default function Profile({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    return (
        <View id={id} activePanel={id}>
            <Panel className='vkuiPanelPlain full' id={id}>
                <PanelHeader before={<ThemeSwitcher />}>VKUI</PanelHeader>
                <Group>
                    <Spacing size={200} />
                    <Placeholder
                        header={lang.placeholder}
                        icon={<Icon56Hearts2CircleFillTwilight />}
                        action={
                            <Button onClick={() => set({ activeModal: 'main' })}>
                                {lang.clickMe}
                            </Button>
                        }
                    >
                        {lang.placeholderDescription}
                    </Placeholder>
                    <Spacing size={200} />
                </Group>
            </Panel>
        </View>
    )
}
