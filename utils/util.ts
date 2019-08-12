
/**
 * 配列を指定したキーのMap Objectに変換します。
 * 
 * @param array 
 * @param key 
 */
export function arrayToMap<T extends MapObj>(array: T[], key: string) {

    const obj: { [key: string]: T } = {}
    array.forEach(t => {
        if (key in t) {
            const _key: string = t[key]
            obj[_key] = t
        }
    })
    return obj
}

type MapObj = { [key: string]: any }