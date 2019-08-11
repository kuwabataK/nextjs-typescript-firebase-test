import { observable } from 'mobx'

export class Auth {
    @observable user: firebase.User | null | InitUser = new InitUser()
}

class InitUser {
    uid = ''
}