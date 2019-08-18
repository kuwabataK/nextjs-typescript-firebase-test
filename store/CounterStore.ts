import { action, computed, observable } from 'mobx'

export class CounterStore {
    @observable private _counter: number = 10

    @computed
    get counter (){
        return this._counter
    }

    @action
    incrementCnt() {
        this._counter = this.counter + 1
    }
    
    @action
    decrement() {
        if (this.counter <= 0) {
            this._counter = 0
            return
        }
        this._counter = this.counter - 1
    }
}