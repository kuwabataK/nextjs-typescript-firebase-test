import Layout from '../components/Layout'
import { childStore } from '../store/store'
import { observer } from 'mobx-react'
import { Fuga } from '../store/ChildStore';
import { useState, useEffect } from 'react';


const FugaPage: React.FunctionComponent = observer(() => {

    const [name, setName] = useState()

    useEffect(() => {
        console.log('fugaが変更されました')
    }, [childStore.fuga])

    const addFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = name
        newFuga.isActive = true
        childStore.addFuga(newFuga)
    }

    const addDisableFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = name
        newFuga.isActive = false
        childStore.addFuga(newFuga)
    }

    const onChangeInput = (e: any) => {
        setName(e.target.value)
    }

    const filtered = () => {
        childStore.filteredFuga()
    }

    const changeName = () => {
        childStore.changeFirstFugaName()
    }

    const changeState = (id: string) => {
        childStore.changeState(id)
    }


    return (
        <Layout>
            {[...childStore.fuga.values()].map(f => (
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
