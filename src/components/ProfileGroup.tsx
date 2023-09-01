import { type State } from '@/redux/slice'
import Skeleton from 'react-loading-skeleton'

import { Avatar, Group, Link, MiniInfoCell, Title } from '@vkontakte/vkui'
import { Icon20HomeOutline, Icon20UserOutline } from '@vkontakte/icons'

import lang from '@/lang'

import styles from '@/components/ProfileGroup.module.scss'

const Skeletons = (
    <Group mode='card' separator='hide' className={styles.ProfileGroup}>
        <Avatar withBorder={false} size={96}>
            <Skeleton circle width={96} height={96} />
        </Avatar>
        <Title style={{ margin: '8px 0' }}>
            <Skeleton width={200} />
        </Title>
        <div style={{ display: 'flex' }}>
            <MiniInfoCell before={<Skeleton width={20} />}>
                <Skeleton width={50} />
            </MiniInfoCell>
            <MiniInfoCell before={<Skeleton width={20} />}>
                <Skeleton width={100} />
            </MiniInfoCell>
        </div>
    </Group>
)

export default function ProfileGroup({ user }: { user?: State['data']['currentUser'] }) {
    if (!user) {
        return Skeletons
    }
    return (
        <Group mode='card' separator='hide' className={styles.ProfileGroup}>
            <Avatar withBorder={false} size={96} src={user.photo_200} />
            <Title style={{ margin: '8px 0' }}>
                {user.first_name} {user.last_name}
            </Title>
            <div style={{ display: 'flex' }}>
                {user.city && (
                    <MiniInfoCell before={<Icon20HomeOutline />}>{user.city.title}</MiniInfoCell>
                )}
                <MiniInfoCell
                    style={{ color: 'var(--vkui--color_accent_blue)' }}
                    onClick={() => {}}
                    before={
                        <Icon20UserOutline style={{ color: 'var(--vkui--color_accent_blue)' }} />
                    }
                    mode='add'
                >
                    <Link href={`https://vk.com/id${user.id}`}>{lang.openProfile}</Link>
                </MiniInfoCell>
            </div>
        </Group>
    )
}
