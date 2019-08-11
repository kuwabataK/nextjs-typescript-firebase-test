import { observable, action } from 'mobx'

export class Auth {
    @observable user: firebase.User | null | InitUser = new InitUser()
    @action
    setUser(user: firebase.User | null) {
        this.user = user
    }
}

class InitUser {
    uid = ''
}