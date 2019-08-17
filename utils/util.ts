import AsyncLock from 'async-lock'

/**
 * 配列を指定したキーのMap Objectに変換する
 * 
 * @param array 
 * @param {string} key 変換後の連想配列のキーに指定する値のキーを指定する。例 'id' / 'innerItem.name'
 */
export function arrayToMap<T>(array: T[], key: string = '') {
    const obj: { [key: string]: T } = Object.create(null)

    const re = /[\.\[\]]/
    const keys = key.split(re).filter(str => str.length !== 0)

    array.forEach((t, i) => {
        if (typeof t === 'string' || typeof t === 'number') {
            obj[t] = t
            return
        }
        const _key = keys.reduce((acc, cur) => acc[cur], t as any)
        if (typeof _key !== 'string' && typeof _key !== 'number') {
            throw new Error(`array[${i}].${key} is ${typeof _key}. not string or number !!`)
        }
        obj[_key] = t
    })
    return obj
}

/**
 * １０秒間解決しないPromiseを提供するsetTimeout
 */
export function infiniteTimeOut() {
    return new Promise(res => {
        setTimeout(res, 10000)
    })
}

/**
 * タイムアウト時にlockを解除するasyncLockクラス
 */
export class PromiseLock {

    asyncLock: AsyncLock
    constructor(option?: AsyncLockOptions) {
        this.asyncLock = new AsyncLock(option)
    }

    acquire<T>(func: () => T, options: AquireOptions = {}) {

        let { resolveTimeout, key } = options
        if (!key) {
            key = '__DEFAULT_KEY__'
        }

        return this.asyncLock.acquire(key, () => {
            return new Promise(async resolve => {
                let isResolved = false
                if (resolveTimeout) {
                    setTimeout(() => {
                        if (!isResolved) {
                            console.error(`${resolveTimeout} ms passed. over resolveTimeout. unlock promiseLock`)
                            resolve()
                        }
                    }, resolveTimeout)
                }
                const response = await func()
                resolve(response)
                isResolved = true
            })
        })
    }

    isBusy(key = '__DEFAULT_KEY__') {
        return this.asyncLock.isBusy(key)
    }
}

interface AsyncLockOptions {
    timeout?: number;
    maxPending?: number;
    domainReentrant?: boolean;
    Promise?: any;
}

interface AquireOptions {
    resolveTimeout?: number
    key?: string | string[]
}