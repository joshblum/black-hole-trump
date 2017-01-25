#! /bin/bash

#update the manifest count
version=`python deploy/deploy.py`
ROOT=`pwd`
DIRNAME=${PWD##*/}

# Remove old zips and add new one.
cd ../
rm $DIRNAME.zip
zip -r $DIRNAME.zip $DIRNAME/ -x \*.git\* \*.DS_Store\*

# Clean git.
cd $ROOT
git add manifest.json
git commit -m "Webstore deploy $version"
git push origin master
