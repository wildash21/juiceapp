import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { type AppDispatch } from '@/redux/store'
import { updateState, type State } from '@/redux/slice'

import { AppRoot, ConfigProvider, WebviewType, Platform } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'

import App from '@/App'

import '@vkontakte/vkui/dist/vkui.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/index.css'

bridge.send('VKWebAppInit')

function Main() {
    const { currentAppearance } = useSelector<State, State['data']>(({ data }) => data)
    const dispatch = useDispatch<AppDispatch>()
    const set = (newState: any) => dispatch(updateState(newState))

    document.documentElement.style.colorScheme = currentAppearance

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig' && 'appearance' in data) {
                set({ currentAppearance: data.appearance })
            }
        })
        bridge
            .send('VKWebAppGetConfig')
            .then(({ appearance }) => set({ currentAppearance: appearance }))
    }, [])

    return (
        <React.StrictMode>
            <AppRoot>
                <ConfigProvider
                    platform={Platform.IOS}
                    appearance={currentAppearance}
                    webviewType={WebviewType.VKAPPS}
                >
                    <App />
                </ConfigProvider>
            </AppRoot>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Main />
    </Provider>
)
