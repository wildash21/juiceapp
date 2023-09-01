import { useDispatch, useSelector } from 'react-redux'
import { updateState, type State } from '@/redux/slice'
import type { AppDispatch } from '@/redux/store'

import { Epic, type EpicProps, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui'
import { Icon28CheckSquareOutline, Icon28ArticleOutline } from '@vkontakte/icons'

import useDisplayMode from '@/hooks/useDisplayMode'

import lang from '@/lang'

export default function NavMobile({ children }: { children: EpicProps['children'] }) {
    const { activeStory } = useSelector<State, State['data']>(({ data }) => data)
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    const displayMode = useDisplayMode()

    return (
        <SplitCol width='100%' maxWidth={580} stretchedOnMobile autoSpaced>
            <Epic
                activeStory={activeStory}
                tabbar={
                    (displayMode.mobile || displayMode.tablet) && (
                        <Tabbar>
                            <TabbarItem
                                onClick={() => set({ activeStory: 'placeholder' })}
                                selected={activeStory === 'placeholder'}
                                text={lang.placeholder}
                            >
                                <Icon28CheckSquareOutline />
                            </TabbarItem>
                            <TabbarItem
                                onClick={() => set({ activeStory: 'profile' })}
                                selected={activeStory === 'profile'}
                                text={lang.profile}
                            >
                                <Icon28ArticleOutline />
                            </TabbarItem>
                        </Tabbar>
                    )
                }
            >
                {children}
            </Epic>
        </SplitCol>
    )
}
