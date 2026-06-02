#!/bin/bash

set -e

yarn prod:build
gem build -o avo-rhino_field.gem
gem push ./avo-rhino_field.gem
