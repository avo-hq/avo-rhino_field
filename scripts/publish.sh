#!/bin/bash

set -e

yarn prod:build
gem build -o avo-rhino_field.gem
gem push --key github --host https://rubygems.pkg.github.com/avo-hq ./avo-rhino_field.gem
