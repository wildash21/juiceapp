import Skeleton from 'react-loading-skeleton'

import { useDispatch, useSelector } from 'react-redux'
import { updateState, type State } from '@/redux/slice'
import type { AppDispatch } from '@/redux/store'

import ThemeSwitcher from '@/components/ThemeSwitcher'
import ProfileGroup from '@/components/ProfileGroup'

import {
    Avatar,
    CellButton,
    Footer,
    Group,
    Header,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Spacing,
    Switch,
    View,
    calcInitialsAvatarColor,
} from '@vkontakte/vkui'

import { Icon28LightbulbOutline, Icon28AddOutline } from '@vkontakte/icons'

import bridge from '@vkontakte/vk-bridge'

import getInitials from '@/utils/getInitials'
import loadFriends from '@/utils/loadFriends'
import type User from '@/types/User'

import lang from '@/lang'

const FriendsSkeletons = (
    <>
        {new Array(4).fill(0).map((_, key) => (
            <SimpleCell
                key={key}
                disabled
                before={
                    <Avatar size={48} withBorder={false}>
                        <Skeleton circle width={48} height={48} />
                    </Avatar>
                }
                subtitle={<Skeleton width={100} />}
                extraSubtitle={<Skeleton width={120} />}
            >
                <Skeleton width={150} />
            </SimpleCell>
        ))}
    </>
)

const Skeletons = (
    <>
        <ProfileGroup />
        <Spacing />
        <Group mode='card'>
            <SimpleCell
                disabled
                subtitle={<Skeleton width={250} />}
                before={<Skeleton width={20} style={{ margin: '0 20px 0 8px' }} />}
            >
                <Skeleton width={150} />
            </SimpleCell>
        </Group>
        <Group
            mode='card'
            header={
                <Header mode='primary' indicator={<Skeleton width={20} />}>
                    <Skeleton width={60} />
                </Header>
            }
        >
            {FriendsSkeletons}
            <CellButton
                disabled
                style={{ height: 48 }}
                centered
                before={<Skeleton width={16} style={{ margin: '0 20px 0 8px' }} />}
            >
                <Skeleton width={150} />
            </CellButton>
        </Group>
    </>
)

function Friends({ friends, limit }: { friends: User[]; limit?: number }) {
    const friendList = limit ? friends.slice(0, limit) : friends
    return (
        <>
            {friendList.map((friend) => (
                <SimpleCell
                    key={friend.id}
                    before={
                        <Avatar
                            withBorder={false}
                            gradientColor={calcInitialsAvatarColor(friend.id)}
                            initials={getInitials(friend.name)}
                        />
                    }
                    subtitle={friend.email}
                    extraSubtitle={friend.phone}
                >
                    {friend.name}
                </SimpleCell>
            ))}
            {!limit && <Footer>{lang.numOfFriends(friendList.length)}</Footer>}
        </>
    )
}

export default function Profile({ id }: { id: string }) {
    const { activeProfilePanel, friends, currentUser, flashlightData } = useSelector<
        State,
        State['data']
    >(({ data }) => data)
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    const isLoading = !friends || friends === 'loading' || !currentUser || !flashlightData

    if (!currentUser) {
        bridge.send('VKWebAppGetUserInfo').then((currentUser) => set({ currentUser }))
    }

    if (!flashlightData) {
        bridge.send('VKWebAppFlashGetInfo').then((flashlightData) => set({ flashlightData }))
    }

    if (!friends) {
        set({ friends: 'loading' })
        loadFriends((friends) => set({ friends }))
    }

    const panelContent = isLoading ? (
        Skeletons
    ) : (
        <>
            <ProfileGroup user={currentUser} />
            <Spacing />
            <Group mode='card'>
                <SimpleCell
                    style={flashlightData.is_available ? {} : { opacity: 0.5 }}
                    subtitle={
                        flashlightData.is_available
                            ? lang.thisTogglesFlashlight
                            : lang.functionNotSupported
                    }
                    before={<Icon28LightbulbOutline />}
                    after={
                        <Switch
                            disabled={!flashlightData.is_available}
                            onChange={({ target }) => {
                                bridge.send('VKWebAppFlashSetLevel', {
                                    level: Number(target.checked),
                                })
                            }}
                        />
                    }
                    disabled
                >
                    {lang.moreLight}
                </SimpleCell>
            </Group>
            <Group
                mode='card'
                header={
                    <Header mode='primary' indicator={friends.length}>
                        {lang.friends}
                    </Header>
                }
            >
                <Friends friends={friends} limit={4} />
                <CellButton
                    centered
                    before={<Icon28AddOutline />}
                    onClick={() => set({ activeProfilePanel: 'friends' })}
                >
                    {lang.showMoreFriends}
                </CellButton>
            </Group>
        </>
    )

    return (
        <View id={id} activePanel={activeProfilePanel}>
            <Panel id={id}>
                <PanelHeader separator={false} before={<ThemeSwitcher />}>
                    VKUI
                </PanelHeader>
                {panelContent}
            </Panel>
            <Panel className='vkuiPanelPlain' id='friends'>
                <PanelHeader
                    before={<PanelHeaderBack onClick={() => set({ activeProfilePanel: id })} />}
                >
                    {lang.friends}
                </PanelHeader>
                <Group>{isLoading ? FriendsSkeletons : <Friends friends={friends} />}</Group>
            </Panel>
        </View>
    )
}
