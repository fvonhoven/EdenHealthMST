# Installation

### _Prerequisites_

- If you have never run a React native application on your computer before, you will have to [setup your environment.](https://reactnative.dev/docs/environment-setup)

* Clone this repository into a local directory on your computer
  ```
  git clone git@github.com:fvonhoven/EdenHealthMST.git
  ```
* Install local packages with yarn or npm

  - `yarn`
    or
  - `npm i`

* ##### (iOS only) Additional Installation step for Cocoapods!

  - `npx pod-install ios`

## iOS

- Run application with `npx react-native run-ios`

## Android

- Run application with `npx react-native run-android`

# Implementation (a short summary of your approach and why)

- ##### Initialization

  Project initialized with React Native CLI with the TypeScript template as it has become more common practice to use TypeScript for typechecking as a safeguard against errors before runtime and to add code completion suggestions via intellisense.

- ##### State Management

  As a state manager option I opted for Mobx State Tree as it is more lightweight in terms of the amount of code required to perform a comparable redux management tasks. However, redux-toolkit was considered as an alternative (ask me about my other version of this app with redux-toolkit 😕)

- ##### UI Kit

  [react-native-elements](https://reactnativeelements.com/) was chosen as a scalable option for UI development as it has a wide range of component options
  [react-native-paper](https://callstack.github.io/react-native-paper/) was used for its form builder

- ##### i18n

  Added a internationalization library [i18n-js](https://github.com/fnando/i18n) to centralize all strings used in the app's UI and for language support and scalability

- ##### API service

  Used [apisauce](https://github.com/infinitered/apisauce) as it is a nice lightweight helper library for axios calls with good readable error handling

- ##### Expo Modules
  ([Formerly called unimodules](https://blog.expo.dev/whats-new-in-expo-modules-infrastructure-7a7cdda81ebc)), Expo now exports its modules as a stand alone service called [Expo Modules](https://docs.expo.dev/bare/installing-expo-modules/) which allows use of its SDK in React Native bare workflows. This was a dependency for `i18n-js` and also allows for us to utilize their SDK in the future (e.g. SplashScreen was added to this project to control showing the splashscreen until our clinicians are fully loaded and then hiding it when we are ready for presentation to the user)

# Technologies (a list of libraries you installed)

- [React Navigation](https://reactnavigation.org/)
- [apisauce](https://github.com/infinitered/apisauce)
- [expo-modules](https://www.npmjs.com/package/install-expo-modules)
- [i18n-js](https://github.com/fnando/i18n)
- [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome)
- [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service)
- [react-native-elements](https://reactnativeelements.com/)
- [react-native-paper](https://callstack.github.io/react-native-paper/)
- [react-native-paper-form-builder](https://fateh999.github.io/react-native-paper-form-builder)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) dependency of react-native-paper

# Screenshots (gif and/or images of your application)

## iOS

## Android
