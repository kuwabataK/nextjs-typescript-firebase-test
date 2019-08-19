import { observable, action, computed } from "mobx";
import { sleep } from "../utils/util";
import moment from "moment"

export class ClocStore {
    @observable time: Date = new Date()

    constructor() {
        (async () => {
            while (true) {
                this.updateTime()
                await sleep(1000)
            }
        })()
    }

    @action
    updateTime() {
        this.time = new Date()
    }

    @computed
    get now(){
        return moment(this.time).toLocaleString()
    }

}