import * as React from 'react'
import Layout from '../components/Layout'
import { mapObjectStore } from '../store/store'
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
        mapObjectStore.addFuga(newFuga)
    }

    addDisableFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = false
        mapObjectStore.addFuga(newFuga)
    }

    onChangeInput = (e: any) => {
        this.setState({ name: e.target.value })
    }

    filtered = () => {
        mapObjectStore.filteredFuga()
    }

    changeName = (id: string) => {
        mapObjectStore.changeFirstFugaName(id)
    }

    changeState = (id: string) => {
        mapObjectStore.changeState(id)
    }

    render() {
        return (
            <Layout>
                {Object.values(mapObjectStore.fugas).map(f => (
                    <div key={f.id}>
                        <p>
                            {f.name}
                        </p>
                        <p>
                            {f.address.states}
                        </p>
                        <button onClick={() => this.changeState(f.id)}>国を変える</button>
                        <button onClick={() => this.changeName(f.id)}>名前を変える</button>

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
