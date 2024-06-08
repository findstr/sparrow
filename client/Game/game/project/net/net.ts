namespace app {
export class Net {
    IsConnected: boolean;
    websocket: WebSocket;
    constructor() {
        this.IsConnected = false;
        this.websocket = new WebSocket(Conf.gateway);
        this.websocket.onopen = (event) => {
            this.IsConnected = true;
            console.log('WebSocket is connected');
        }
        this.websocket.onmessage = (event) => {
            //event.data layout cmd(uint32),body(blob)
            let dv = new DataView(event.data);
            let cmd = dv.getUint32(0);
            let body = dv.buffer.slice(4);
            let data = new Uint8Array(body, 4);
            let obj = proto.decode(cmd, data);
            console.log('WebSocket message', obj);
        }
        this.websocket.onclose = (event) => {
            this.IsConnected = false;
            console.log('WebSocket is closed');
        }
    }
    send(obj: Object) {

        let buffer = new ArrayBuffer(4 + body.length);
    let view = new DataView(buffer);
    view.setUint32(0, cmd, true);
    let msg = new Uint8Array(buffer);
    msg.set(body, 4);
        //this.websocket.send(obj);
    }
        /*
                    websocket: WebSocket;
    IsConnected: boolean;
    constructor(url: string) {
        this.url = url;
        this.websocket = new WebSocket(url);

        this.websocket.onopen = (event) => {
            console.log('WebSocket is connected');
            this.IsConnected = true;
            //let msg: C2L_Login = {
            //    pass: "1234",
            //    uid: intToLong(1234),
            //};

            //console.log('发送消息', msg.uid.high, msg.uid.low, msg.uid.unsigned);
            //MikuSendMsg(GetID("MSG_C2L_Login"), encodeC2L_Login(msg))
        };

        this.websocket.onmessage = (event) => {
            MikuRecvMsgBody(event.data)
        };

        this.websocket.onclose = (event) => {
            console.log('WebSocket is closed');
            this.IsConnected = false;
        };

        this.websocket.onerror = (event) => {
            console.log('WebSocket error', event);
        };
    }

   
        } */      
}
}