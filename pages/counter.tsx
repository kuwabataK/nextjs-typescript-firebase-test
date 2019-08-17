import Layout from "../components/Layout";
import Link from "next/link";
// import { useState } from "react";
import { counterPage } from '../store/store'
import { observer } from "mobx-react";
import { useEffect } from "react";
import { usePrevious } from "../utils/reacthooks";

const Counter: React.FunctionComponent = observer(() => {

    // const [counter, setCount] = useState(0)

    const prevCount = usePrevious(counterPage.counterStore.counter)

    useEffect(() => {
        console.log(prevCount)
        if (prevCount && prevCount < counterPage.counterStore.counter) {
            console.log('increment counter' + counterPage.counterStore.counter)            
        }
    }, [counterPage.counterStore.counter])

    const increment = () => {
        counterPage.counterStore.incrementCnt()
        // setCount(counter + 1)
    }

    const decrement = () => {
        counterPage.counterStore.decrement()
        // setCount(counter - 1)
    }

    return <Layout title="About | Next.js + TypeScript Example">
        <h1>カウンターのページだよ</h1>
        <p>{counterPage.counterStore.counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement} >-</button>
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
})

export default Counter