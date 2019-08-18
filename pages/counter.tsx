import Layout from "../components/Layout";
import Link from "next/link";
// import { useState } from "react";
import store from '../store/store'
import { observer } from "mobx-react";
import { useEffect, useMemo, useState } from "react";
import { usePrevious } from "../utils/reacthooks";


/**
 * 
 * @param props Vueで言うところのprops。React.FCでは関数の引数として定義する
 */
const GoHome: React.FunctionComponent<Props> = (props) => (
    <Link href="/">
        <a>{props.text}</a>
    </Link>
)

type Props = {
    text?: string
}

const Counter: React.FunctionComponent = observer(() => {

    console.log('カウンターページが再描画されたよ')

    // const [counter, setCount] = useState(0)

    /**
     * useStateを使うことで状態を格納する変数と、
     * その変数を更新するsetState関数をタプルとして返す
     * Vueで言うところの data (state)
     */
    const [counter, setCnt] = useState(0)

    /**
     * Vueで言うところの computed
     * 
     * 第２引数の配列に指定した値が更新されたときのみ再計算される
     * Vueと違って、依存する値を自分で定義しなくてはいけない
     */
    const cnt100 = useMemo(() => {
        console.log('memoが再計算されたよ')
        return counter * 100
    }, [counter])

    /**
     * 前回のレンダリングのときの変数の値を所得できる
     * VueのWatch式の第２引数とかで取れる値と同じ
     * Watch式の外でも取れるので便利
     */
    const prevCount = usePrevious(counter)

    /**
     * Vueのcreated, mounted, watchなどの、特定のタイミングで発火する
     * ライフサイクルメソッドを書くときの書き方。
     * 
     * このコンポーネントが再レンダリングされるされるタイミングで常に発火する
     * 
     * 第２引数の配列に指定した変数が変更されたタイミングだけで発火させることができる（Vueで言うところのWatch式）
     * 
     * 空配列を渡すと最初の一回だけ発火させる事ができる(Vueで言うところのmounted、createdはない)
     * 
     * return で関数を返すことでdestroy時にその関数を発火させることができる(Vueで言うところのdestroy)
     * 
     * useEffectはただの関数のなので、一つのコンポーネントの中でいくつでも発火させることができる
     * 
     */
    useEffect(() => {
        console.log('Effectが発火したよ counter: ' + counter + `  prev count: ${prevCount}`)
    }, [counter])


    // 以下はメソッドたち(Vueで言うところのMethod)

    const incrementStore = () => {
        // ストアのアクションを呼ぶ
        // Mobxのストアはただのクラスなので単純に関数を呼び出すだけ
        // Vuexなどのように間にラッパーが挟まっていないので、型推論も効く
        store.counterStore.incrementCnt()
    }

    const decrementStore = () => {
        // ストアのアクションを呼ぶ
        // Mobxのストアはただのクラスなので単純に関数を呼び出すだけ
        // Vuexなどのように間にラッパーが挟まっていないので、型推論も効く
        store.counterStore.decrement()
    }

    const increment = () => {
        // stateを更新する
        setCnt(counter + 1)
    }

    const decrement = () => {
        // stateを更新する
        setCnt(counter - 1)
    }

    return <Layout title="About | Next.js + TypeScript Example">
        <h1>カウンターのページだよ</h1>
        <p>Stateのカウンター: {counter}</p>
        <p>Stateのカウンターを100倍した値: {cnt100}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement} >-</button>
        <p>Storeのカウンター: {store.counterStore.counter}</p>
        <p />
        <button onClick={incrementStore} >+</button>
        <button onClick={decrementStore} >-</button>

        <p>
            <GoHome text='GO HOME' />
        </p>
    </Layout>
})

export default Counter