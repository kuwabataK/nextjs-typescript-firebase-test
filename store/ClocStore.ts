import { observable, action, computed, autorun } from "mobx";
import { sleep } from "../utils/util";
import moment from "moment"

export class ClocStore {
    @observable time: Date = new Date()

    @observable elapsedTime: number = 0

    timeoutId: NodeJS.Timeout | null = null

    constructor() {
        (async () => {
            while (true) {
                this.updateTime()
                await sleep(1000)
            }
        })()

        autorun(
            () => {
                if (this.elapsedTime !== 0 && this.elapsedTime % 10 === 0) {
                    alert(this.elapsedTime + ' sec passed !!')

                }
            }
        )
    }

    @action
    updateTime() {
        this.time = new Date()
    }

    @action
    addElapsedTime() {
        this.elapsedTime++
    }

    startTimer() {
        if (this.timeoutId) clearInterval(this.timeoutId)
        this.timeoutId = setInterval(() => {
            this.addElapsedTime()
        }, 1000)
    }

    @action
    stopTimer() {
        if (this.timeoutId) clearInterval(this.timeoutId)
    }

    @action
    resetTimer() {
        if (this.timeoutId) clearInterval(this.timeoutId)
        this.elapsedTime = 0
    }

    @computed
    get now() {
        return moment(this.time).toLocaleString()
    }

}