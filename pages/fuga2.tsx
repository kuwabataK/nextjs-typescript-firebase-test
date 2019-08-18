import * as React from 'react'
import Layout from '../components/Layout'
import store from '../store/store'
import { observer } from 'mobx-react'
import { Fuga } from '../store/MapObjectStore';


@observer
class Fuga2Page extends React.Component {

    state = {
        name: ''
    }

    addFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = true
        store.mapObjectStore.addFuga(newFuga)
    }

    deleteFuga = (id: string) => {
        store.mapObjectStore.deleteFuga(id)
    }

    changeFuga = (id: string) =>{
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = false
        store.mapObjectStore.changeFuga(id,newFuga)
    }

    addDisableFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = false
        store.mapObjectStore.addFuga(newFuga)
    }

    onChangeInput = (e: any) => {
        this.setState({ name: e.target.value })
    }

    filtered = () => {
        store.mapObjectStore.filteredFuga()
    }

    changeName = (id: string) => {
        store.mapObjectStore.changeFirstFugaName(id)
    }

    changeState = (id: string) => {
        store.mapObjectStore.changeState(id)
    }

    render() {
        return (
            <Layout>
                {Object.values(store.mapObjectStore.fugas).map(f => (
                    <div key={f.id}>
                        <p>
                            {f.name}
                        </p>
                        <p>
                            {f.address.states}
                        </p>
                        <button onClick={() => this.changeState(f.id)}>国を変える</button>
                        <button onClick={() => this.changeName(f.id)}>名前を変える</button>
                        <button onClick={() => this.deleteFuga(f.id)}>削除する</button>
                        <button onClick={() => this.changeFuga(f.id)}>変更する</button>

                    </div>
                ))}
                <input value={this.state.name} onChange={this.onChangeInput}></input>
                <button onClick={this.addFuga}>add</button>
                <button onClick={this.addDisableFuga}>addDisable</button>
                <button onClick={this.filtered}>deleteDisable</button>
            </Layout>
        )
    }
}

export default Fuga2Page
