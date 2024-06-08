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
        cache.Account.Save(account, password)
        return true
    }
    constructor() {
        super();
        cache.Account.Load()
        this.account.text = cache.Account.account
        this.password.text = cache.Account.password
        console.log("start:", Object.getPrototypeOf(this))
        // 监听事件：当界面显示时
        this.BtnLogin.on("mousedown", this, this.loginClick, null)
    }


}