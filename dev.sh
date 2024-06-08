#!/bin/sh
minikube kubectl -- exec -it dev-pod -- bash -c "cd /app && /bin/bash"
