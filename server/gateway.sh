#!/bin/sh
./silly/silly ./app/main.lua --etcd=etcd-gateway.default.svc.cluster.local:2379 --gateway="127.0.0.1:10000" --listen="127.0.0.1:10001" --service="gateway"
