#!/usr/bin/env bash

# make sure we have fresh link
npm cache clean --force
yalcDir=`yalc dir`
rm -rf $yalcDir/packages/@trazit

find . \( -name 'node_modules' \) -or \( -name 'package-lock.json' \) -or \( -name 'yalc.lock' \) -or \( -name '.yalc' \) | xargs rm -rf
requirements="common-core platform-login procedure-management my-incidents user-profile video-tutorial"
for r in $requirements; do
  pushd $r;
  ./install.sh $0;
  yalc publish;
  popd
done