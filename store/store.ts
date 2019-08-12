import { AuthStore } from "./AuthStore";
import { CounterStore } from "./CounterStore";
import { ChildStore } from "./ChildStore";
import { configure } from "mobx";

configure({ enforceActions: 'always' });

export const authStore = new AuthStore()
export const counterStore = new CounterStore()

// 同じStoreで別の状態をもつこともできる
export const aboutCounterStore = new CounterStore()

// 自身を参照するようなStoreも追加できる
export const childStore = new ChildStore()