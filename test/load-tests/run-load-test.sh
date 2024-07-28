#!/bin/bash

#==============================================================================
# File: run.sh
# Author: Thiago Thalison Firmino de Lima (Intelbras)
# Date: 19 jul 2024
# Brief: Commands to programatically manage EKS cluster
#==============================================================================

#==============================================================================
# Commands
#==============================================================================
docker run -it -v $(pwd):/usr/src grafana/k6 run /usr/src/test/load-tests/k6-load-test.js