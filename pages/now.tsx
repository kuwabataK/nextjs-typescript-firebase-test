import Layout from "../components/Layout";
import Link from "next/link";
import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ClocStore } from "../store/ClocStore";
import _ from "lodash";

type Props = {
    cloc: ClocStore
}

/**
 * propsでstoreを渡すサンプル
 */
const Nows = observer((props: Props) => {

    const now = props.cloc.now

    useEffect(() => {
        setTimeout(() => {
            console.log(now)
            console.log(props.cloc.now)
        }, 2000)
    })

    return <div>
        <p>{now}</p>
    </div>
})

const Timer = observer(() => {

    const resetTimer = () => {
        store.clocStore.resetTimer()
    }

    const startTimer = () => {
        store.clocStore.startTimer()
    }

    const stopTimer = () =>{
        store.clocStore.stopTimer()
    }

    return <div>
        <p>{store.clocStore.elapsedTime}</p>
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>stop</button>
        <button onClick={resetTimer}>reset</button>
    </div>
})


/**
 * 時計コンポーネント
 */
const Now = observer(() => {

    // const now = store.clocStore.now

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('now: ' + now)
    //         console.log('store.clocStore.now: ' + store.clocStore.now)
    //     }, 2000)
    // }, [store.clocStore.now])

    return <Layout title="About | Next.js + TypeScript Example">
        <h1>現在時刻</h1>
        {/* <p>{store.clocStore.now}</p> */}
        <Nows cloc={store.clocStore} />
        <Timer></Timer>
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
})

export default Now