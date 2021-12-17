watchman watch-del-all
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/metro-bundler-cache-*
rm -rf node_modules/ 
npm cache clean --force
npm install

# npx react-native start --reset-cache

