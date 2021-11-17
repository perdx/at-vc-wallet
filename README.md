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

### Visual Studio Code ###

React Native uses JavaScript with the [Flow](https://flow.org/en/) static type checker. You will need to install the [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) extension.

Then disable the built-in JavaScript validation. Code -> Preferences -> Settings, search for `javascript.validate.enable` and switch off (disable) for this **workspace**.

![Visual Studio Code javascript.validate.enable setting](vscode_js.png)
