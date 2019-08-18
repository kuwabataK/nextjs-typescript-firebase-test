import { AuthStore } from "./AuthStore";
import { CounterStore } from "./CounterStore";
import { ChildStore } from "./ChildStore";
import { configure } from "mobx";
import { MapObjectStore } from "./MapObjectStore";
import { CounterPageStore } from "./counter/CounterPageStore";

configure({ enforceActions: 'always' });

export default {
    authStore: new AuthStore(),
    counterStore: new CounterStore(),

    // 同じStoreで別の状態をもつこともできる
    aboutCounterStore: new CounterStore(),
    mapObjectStore: new MapObjectStore(),

    // 自身を参照するようなStoreも追加できる
    childStore: new ChildStore(),

    counterPage: new CounterPageStore()
}