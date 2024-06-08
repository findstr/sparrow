#!/bin/sh
cd single
pkill 'etcd'
nohup etcd &
nohup ./kvrocks &
export ETCDCTL_API=3
etcdctl --endpoints=http://127.0.0.1:2379 put /service/db/capacity 1
etcdctl --endpoints=http://127.0.0.1:2379 put /service/db/instance/0 127.0.0.1:6666
etcdctl --endpoints=http://127.0.0.1:2379 put /service/gateway/instance/0 127.0.0.1:10001
etcdctl --endpoints=http://127.0.0.1:2379 put /service/role/capacity 1
etcdctl --endpoints=http://127.0.0.1:2379 put /service/role/instance/0 127.0.0.1:10002
