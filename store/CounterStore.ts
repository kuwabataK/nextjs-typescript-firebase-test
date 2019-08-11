import { observable, action } from 'mobx'

export class CounterStore {
    @observable counter: number = 10

    @action
    incrementCnt() {
        this.counter = this.counter + 1
    }
    
    @action
    decrement() {
        if (this.counter <= 0) {
            this.counter = 0
            return
        }
        this.counter = this.counter - 1
    }
}