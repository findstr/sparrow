#!/bin/sh
kubectl apply -f ./volume.yaml
kubectl apply -f ./etcd.yaml
kubectl apply -f ./db.yaml
cat ./dev.yaml | sed s+{{path}}+$(dirname $(pwd))+g | kubectl apply -f -