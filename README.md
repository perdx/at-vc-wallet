# Auckland Transport Verifiable Credential Wallet

Sample mobile device wallet application to demonstrate that VC holder capability can be built into any mobile application.

* React Native

## Getting Started ##

Assume

* Uses React Native CLI, not the Expo CLI. This is so we can more easily bind native or gomobile libraries.
* Developer is using a Mac.

### Pre-requisites ###

See https://reactnative.dev/docs/environment-setup, using the React Native CLI options.

1. Install latest node: `brew install node`
2. Install latest watchman: `brew install watchman`
3. Ensure latest version of Xcode command line tools: Xcode -> Preferences -> Locations.
4. Install iOS simulator in Xcode: Xcode -> Preferences -> Components.
5. Install CocoaPods dependency manager for Swift: `sudo gem install cocoapods`

### Project Directory ###

**Important Note**
Mobile app names must be in medial capitals (camel case with first letter capitalised). This does not match our github repo naming convention so the repository root is an empty wrapper. The essential source code is in the ATWallet directory. Make sure to `cd ATWallet` for working with npm/npx.

### Dependencies ###

```
cd ATWallet
npm install
cd ios
pod install
```

### Environment Variables ###

Mobile apps do not have a reliable access to system environment variables. For environment-specific configurations we use [react-native-config](https://github.com/luggit/react-native-config).

If you change .env file entries only, it will not force a rebuild - only changes to the .js files that use the .env entries will do that. This can cause some caching issues that can be resolved using
[these nuclear options](https://medium.com/@abhisheknalwaya/how-to-clear-react-native-cache-c435c258834e).

TODO: Evaluate an alternative to react-native-config - [ideas](https://stackoverflow.com/questions/33117227/setting-environment-variable-in-react-native)

.env files should never contain sensitive keys and should not be checked in to github. Check with the team to get an up-to-date starting .env file for local development.

### Run IOS Simulator ###

Inside project folder (ATWallet) start up the Metro bundler

```
npx react-native start
```

Then, in another terminal window also inside the ATWallet folder...

```
npx react-native run-ios
```

## Material Design ##

[React Native Paper](https://callstack.github.io/react-native-paper/index.html) provides components and styling consistent with [Material Design](https://material.io/design).

Try to avoid using local component styles as much as possible. Instead override defaults in the custom theme or provide a thin wrapper around Paper components.

## Navigation ##

[React Navigation](https://reactnavigation.org/docs/getting-started) provides routing.

## Onboarding API ##

Mock APIs are being developed in the demo [issuer/verifier service](https://github.com/perdx/at-vc-app) which should be maintained alongside this app. See the README in that repo for running the back-end locally. 

## Developer Tips ##

1. (Mac users) Whenever you install a new npm package, run cocoapods install too in order to get the corresponding native libraries installed for ios builds. For example,

```
npm install react-native-keychain
npx pod-install ios
```
