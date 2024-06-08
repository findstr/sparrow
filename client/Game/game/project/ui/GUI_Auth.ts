/**
 * 读档界面
 * Created by 黑暗之神KDS on 2020-09-15 12:22:43.
 */
class GUI_Auth extends GUI_1 {

    /**
     * 构造函数
     */
    private loginClick(type: string, data?: any): boolean {
        var account = this.account.text
        var password = this.password.text
        app.module.Account.Save(account, password)

        let auth_r = new gateway.auth_r()
        auth_r.account = account
        auth_r.password = password
        Game.net.send(auth_r)
        return true
    }
    servers_a(data: gateway.servers_a) {
        if (data.code != undefined) {
            GUI_Tips.Show(data.code, null)
            console.error("servers_a:", data.code)
            return
        }
        app.module.ServerList.servers = data.list
        if (data.list.length > 0) {
            app.module.ServerList.selectedServer = data.list[0]
        }
        GUI_Login.Show()
    }
    auth_a(data: gateway.auth_a) {
        console.log("xxxxxxx")
        if (data.code != undefined) {
            GUI_Tips.Show(data.code, null)
            console.error("auth_a:", data.code)
            return
        }
        let server_r = new gateway.servers_r()
        Game.net.send(server_r)
    }
    constructor() {
        super();
        app.module.Account.Load()
        this.account.text = app.module.Account.account
        this.password.text = app.module.Account.password
        Game.net.on("auth_a", this.auth_a)
        Game.net.on("servers_a", this.servers_a)
        console.log("start:", Object.getPrototypeOf(this))
        // 监听事件：当界面显示时
        this.BtnLogin.on("mousedown", this, this.loginClick, null)
    }


}