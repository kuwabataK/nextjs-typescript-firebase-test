import * as React from 'react'
import Layout from '../components/Layout'
import { childStore } from '../store/store'
import { observer } from 'mobx-react'
import { Fuga } from '../store/ChildStore';


@observer
class FugaPage extends React.Component {

    state = {
        name: ''
    }

    addFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = true
        childStore.addFuga(newFuga)
    }

    addDisableFuga = () => {
        const newFuga = new Fuga()
        newFuga.name = this.state.name
        newFuga.isActive = false
        childStore.addFuga(newFuga)
    }

    onChangeInput = (e: any) => {
        this.setState({ name: e.target.value })
    }

    filtered = () => {
        childStore.filteredFuga()
    }

    changeName = () => {
        childStore.changeFirstFugaName()
    }

    changeState = (id: string) => {
        childStore.changeState(id)
    }

    render() {
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
                        <button onClick={() => this.changeState(f.id)}>国を変える</button>
                    </div>
                ))}
                <input value={this.state.name} onChange={this.onChangeInput}></input>
                <button onClick={this.addFuga}>add</button>
                <button onClick={this.addDisableFuga}>addDisable</button>
                <button onClick={this.filtered}>deleteDisable</button>
                <button onClick={this.changeName}>change First Name</button>
            </Layout>
        )
    }
}

export default FugaPage
