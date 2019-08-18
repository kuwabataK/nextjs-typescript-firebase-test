import Layout from '../components/Layout'
import store from '../store/store'
import { observer } from 'mobx-react'
import { Fuga } from '../store/ChildStore';
import { useState, useEffect } from 'react';


const FugaPage: React.FunctionComponent = observer(() => {

    const [name, setName] = useState('')

    useEffect(() => {
        console.log('fugaが変更されました')
    }, [store.childStore.fuga])

    const addFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = name
        newFuga.isActive = true
        store.childStore.addFuga(newFuga)
    }

    const addDisableFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = name
        newFuga.isActive = false
        store.childStore.addFuga(newFuga)
    }

    const onChangeInput = (e: any) => {
        setName(e.target.value)
    }

    const filtered = () => {
        store.childStore.filteredFuga()
    }

    const changeName = () => {
        store.childStore.changeFirstFugaName()
    }

    const changeState = (id: string) => {
        store.childStore.changeState(id)
    }


    return (
        <Layout>
            {[...store.childStore.fuga.values()].map(f => (
                <div key={f.id}>
                    <p>
                        {f.name}
                    </p>
                    <p>
                        {f.address.states}
                    </p>
                    <button onClick={() => changeState(f.id)}>国を変える</button>
                </div>
            ))}
            <input value={name} onChange={onChangeInput}></input>
            <button onClick={addFuga}>add</button>
            <button onClick={addDisableFuga}>addDisable</button>
            <button onClick={filtered}>deleteDisable</button>
            <button onClick={changeName}>change First Name</button>
        </Layout>
    )

})

export default FugaPage
