import { observable, action, computed } from 'mobx'
import { authStore, counterStore } from './store'

export class ChildStore {
    @observable hoge = ''
    @action
    setHoge(hoge: string) {
        this.hoge = hoge
    }

    // 別Storeの状態を参照することもできる
    @computed
    get user() {
        return authStore.user
    }

    // 別ストアの状態を参照することもできる
    @computed
    get counter(){
        return counterStore.counter
    }

    // 別ストアの状態を変更することもできる
    increment(){
        counterStore.incrementCnt()
    }
}