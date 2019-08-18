import Layout from "../components/Layout";
import Link from "next/link";
import { infiniteTimeOut, PromiseLock } from "../utils/util";

const promiseLock = new PromiseLock()

const TimeoutPage: React.FC = () => {

    const handler = () => {
        if (promiseLock.isBusy()) {
            console.log('handler is busy. skip exec function')
            return
        }

        promiseLock.acquire(async () => {
            console.log('start')
            await infiniteTimeOut()
            console.log('finish')
        }, { resolveTimeout: 2000 })
    }

    return <Layout title="About | Next.js + TypeScript Example">
        <h1>TimeOutTest</h1>
        <button onClick={handler}>10秒ぐらい実行されるプロミスを発火するよ</button>
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
}

export default TimeoutPage