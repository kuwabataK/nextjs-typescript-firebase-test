import { observable, action, computed } from 'mobx'
import store from './store'
import { CounterStore } from './CounterStore';
import uuid from 'uuid/v4'
import _ from 'lodash'
import { sleep } from '../utils/util';

export class ChildStore {
    @observable hoge = ''

    @action
    setHoge(hoge: string) {
        this.hoge = hoge
    }

    // 別Storeの状態を参照することもできる
    @computed
    get user() {
        return store.authStore.user
    }

    // 別ストアの状態を参照することもできる
    @computed
    get counter() {
        return store.counterStore.counter
    }

    // 別ストアの状態を変更することもできる
    increment() {
        store.counterStore.incrementCnt()
    }

    @observable fuga: Map<string, Fuga> = new Map()

    async addFuga(a: Fuga) {
        await sleep(1000)
        this._addFuga(a)
    }

    @action
    private _addFuga(a: Fuga) {
        // pushはなぜかViewを更新してくれる
        this.fuga.set(a.id, a)
        this.fuga = _.clone(this.fuga)
    }

    @action
    filteredFuga() {
        const active = [...this.fuga.values()].filter(f => f.isActive)
        this.fuga = new Map(active.map(f => [f.id, f]))
    }

    @action
    changeFirstFugaName() {
        // これだけだとViewが更新されない
        const arrayFuga = [...this.fuga.values()]
        arrayFuga[0].name = '変わった名前だよ'
        this.fuga = new Map(arrayFuga.map(f => [f.id, f]))
    }

    @action
    changeState(id: string) {
        const newFuga = this.fuga.get(id)
        if (newFuga) {
            newFuga.address.states = 'America'
            this.fuga.set(id, newFuga)
            this.fuga = _.clone(this.fuga)
        }
    }

    // VuexのModuleのように、下の階層に独自のストアを持ちたければ、
    // このように新たなStoreをnewすれば良い
    counterStore = new CounterStore()
}

export class Fuga {
    readonly id = uuid()
    name: string = ''
    isActive = false
    address = new Address()
}

class Address {
    states: string = 'japan'
    tel = 12345667789
}