import { useDispatch } from 'react-redux'
import { updateState } from '@/redux/slice'
import { type AppDispatch } from '@/redux/store'

import { Button, ModalCard, SimpleCell } from '@vkontakte/vkui'
import { Icon56Stars3Outline, Icon28WorkOutline } from '@vkontakte/icons'

import lang from '@/lang'

export default function MainModal({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))
    return (
        <ModalCard
            id={id}
            onClose={() => {
                set({ activeModal: null })
            }}
            header={lang.modalWindow}
            subheader={lang.modalWindowDescription}
            icon={<Icon56Stars3Outline />}
            actions={
                <Button size='l' stretched onClick={() => set({ activeModal: null })}>
                    {lang.close}
                </Button>
            }
        >
            <SimpleCell
                disabled
                before={<Icon28WorkOutline />}
                subtitle={lang.wantToWorkWithYou}
                style={{ margin: '16px 0' }}
            >
                {lang.insertText}
            </SimpleCell>
        </ModalCard>
    )
}
