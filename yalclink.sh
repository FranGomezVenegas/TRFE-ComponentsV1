#!/usr/bin/env bash

# make sure we have fresh link
npm cache clean --force
yalcDir=`yalc dir`
rm -rf $yalcDir/packages/@trazit

find . \( -name 'node_modules' \) -or \( -name 'package-lock.json' \) -or \( -name 'yalc.lock' \) -or \( -name '.yalc' \) | xargs rm -rf
requirements="common-core tr-dialog platform-login relogin-dialog procedure-management my-incidents my-certifications user-profile video-tutorial platform-notif procedures-core samples-sampling plate-reading"
for r in $requirements; do
  pushd $r;
  ./install.sh $0;
  yalc publish;
  popd
done