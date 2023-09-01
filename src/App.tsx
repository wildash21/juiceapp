import { useSelector } from 'react-redux'
import { type State } from '@/redux/slice'

import { ModalRoot, PanelHeader, SplitLayout } from '@vkontakte/vkui'

import useDisplayMode from '@/hooks/useDisplayMode'

import NavDesktop from '@/components/navs/NavDesktop'
import NavMobile from '@/components/navs/NavMobile'
import Profile from '@/components/views/Profile'
import Placeholder from '@/components/views/Placeholder'
import MainModal from '@/components/modals/MainModal'

import '@/App.lazy.scss'

function App() {
    const displayMode = useDisplayMode()
    const { activeModal } = useSelector<State, State['data']>(({ data }) => data)

    const modal = (
        <ModalRoot activeModal={activeModal}>
            <MainModal id='main' />
        </ModalRoot>
    )

    return (
        <SplitLayout
            modal={modal}
            header={<PanelHeader separator={false} />}
            style={{ justifyContent: 'center' }}
        >
            {displayMode.computer && <NavDesktop />}
            <NavMobile>
                <Placeholder id='placeholder' />
                <Profile id='profile' />
            </NavMobile>
        </SplitLayout>
    )
}

export default App
