
/**
 * 配列を指定したキーのMap Objectに変換する
 * 
 * @param array 
 * @param {string} key 変換後の連想配列のキーに指定する値のキーを指定する。例 'id' / 'innerItem.name'
 */
export function arrayToMap<T>(array: T[], key: string = '') {
    const obj: { [key: string]: T } = {}

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