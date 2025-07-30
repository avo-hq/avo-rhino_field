#!/bin/bash

set -e

yarn build
gem build -o avo-rhino_field.gem
gem push --key github --host https://rubygems.pkg.github.com/avo-hq ./avo-rhino_field.gem
rm avo-rhino_field.gem
