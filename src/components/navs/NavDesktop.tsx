import { useDispatch } from 'react-redux'
import { updateState } from '@/redux/slice'
import { type AppDispatch } from '@/redux/store'

import { Group, Panel, PanelHeader, SimpleCell, SplitCol } from '@vkontakte/vkui'
import { Icon28CheckSquareOutline, Icon28ArticleOutline } from '@vkontakte/icons'

import lang from '@/lang'

export default function NavDesktop() {
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    return (
        <SplitCol fixed width={280} maxWidth={280}>
            <Panel>
                <PanelHeader />
                <Group>
                    <SimpleCell
                        onClick={() => set({ activeStory: 'placeholder' })}
                        before={<Icon28ArticleOutline />}
                    >
                        {lang.placeholder}
                    </SimpleCell>
                    <SimpleCell
                        onClick={() => set({ activeStory: 'profile' })}
                        before={<Icon28CheckSquareOutline />}
                    >
                        {lang.profile}
                    </SimpleCell>
                </Group>
            </Panel>
        </SplitCol>
    )
}
