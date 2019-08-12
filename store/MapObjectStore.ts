
import { observable, action } from 'mobx'
import uuid from 'uuid/v4'
import _ from 'lodash'
import { arrayToMap } from '../utils/util';

export class MapObjectStore {

    @observable.shallow fugas: { [key: string]: Fuga } = {}

    @action
    addFuga(a: Fuga) {
        // fugasの参照を更新していないが、なぜか変更検知してくれる
        this.fugas[a.id] = a
    }

    @action
    deleteFuga(id: string){
        // fugasの参照を更新していないが、なぜか変更検知してくれる
        delete this.fugas[id]
    }

    @action
    changeFuga(id:string,newFuga: Fuga){
        // fugasの参照を更新していないが、なぜか変更検知してくれる
        this.fugas[id] = newFuga
    }

    @action
    filteredFuga() {
        const active = Object.values(this.fugas).filter(f => f.isActive)
        this.fugas = arrayToMap(active, 'id')
    }

    @action
    changeFirstFugaName(id: string) {
        // これだけでは変更検知してくれない
        this.fugas[id].name = '変わった名前だよ!!'

        // これで変更検知が働いてくれる
        this.fugas = { ...this.fugas }
    }

    @action
    changeState(id: string) {
        // これだけでは変更検知してくれない
        this.fugas[id].address.states = 'America'

        // これで変更検知が働いてくれる
        this.fugas = { ...this.fugas }
    }
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