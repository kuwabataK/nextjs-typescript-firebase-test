import { AuthStore } from "./AuthStore";
import { CounterStore } from "./CounterStore";

export const authStore = new AuthStore()
export const counterStore = new CounterStore()

// 同じStoreで別の状態をもつこともできる
export const aboutCounterStore = new CounterStore()