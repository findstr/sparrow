#!/bin/sh
kubectl delete --all sts
kubectl delete --all pvc
kubectl delete --all pv
kubectl delete --all pod
sudo rm -rf volume
sudo mkdir -p volume

