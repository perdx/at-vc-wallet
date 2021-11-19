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

### Dependencies ###

```
cd ATWallet
npm install
cd ios
pod install
```

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

## Developer Tips ##

1. (Mac users) Whenever you install a new npm package, run cocoapods install too in order to get the corresponding native libraries installed for ios builds. For example,

```
npm install react-native-keychain
npx pod-install ios
```
