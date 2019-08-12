import { AuthStore } from "./AuthStore";
import { CounterStore } from "./CounterStore";
import { ChildStore } from "./ChildStore";
import { configure } from "mobx";
import { MapObjectStore } from "./MapObjectStore";

configure({ enforceActions: 'always' });

export const authStore = new AuthStore()
export const counterStore = new CounterStore()

// 同じStoreで別の状態をもつこともできる
export const aboutCounterStore = new CounterStore()
export const mapObjectStore = new MapObjectStore()

// 自身を参照するようなStoreも追加できる
export const childStore = new ChildStore()