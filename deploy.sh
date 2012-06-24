#!/bin/bash -e

if [ ! $RELEASE_BASEDIR ]
then
    echo "Fehler, Keine RELEASE_BASEDIR angegeben!"
    exit 1
fi

if [ ! $BUILD_NUMBER ]
then
    echo "Fehler, Keine BUILD_NUMBER angegeben, deploy.sh muss von Hudson ausgeführt werden!"
    exit 1
fi

RELEASE_DIR=${RELEASE_BASEDIR}/Release${BUILD_NUMBER}
echo "Installiere in $RELEASE_DIR"

if [ -d $RELEASE_DIR ]
then
  echo "Fehler, Verzeichnis $RELEASE_DIR exisitiert bereits"
  exit 1
fi

mkdir $RELEASE_DIR
cp -r stylesheets $RELEASE_DIR
cp -r images $RELEASE_DIR
cp .htaccess $RELEASE_DIR
cp index.html $RELEASE_DIR
cp cache.manifest $RELEASE_DIR
cp zeMobile.dart.js $RELEASE_DIR

cd ${RELEASE_DIR}

sed -i "" "s|@@ZE_BUILD_TIME@@|$BUILD_ID|g" zeMobile.dart.js
sed -i "" "s|@@ZE_BUILD_NUMBER@@|$BUILD_NUMBER|g" zeMobile.dart.js

echo "Tausche den symbolischen Link 'current'"
CURRENT=${RELEASE_BASEDIR}/current

if [ -e $CURRENT ]
then
    rm -f $CURRENT
fi
ln -s $RELEASE_DIR $CURRENT

echo "Fertig!"
exit 0