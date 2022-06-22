# Installation

### _Prerequisites_

- You should have Xcode or Android Studio installed on your computer

* If you have never run a React native application on your computer before, you will have to [setup your environment.](https://reactnative.dev/docs/environment-setup)

- Clone this repository into a local directory on your computer
  ```
  git clone git@github.com:fvonhoven/EdenHealthMST.git
  ```

## iOS

- Install local packages with yarn or npm

  - `yarn` or `npm i`

* `npx pod-install ios`

- Run the app with `npx react-native run-ios`

## Android

- Install local packages with yarn or npm

* `yarn` or `npm i`

- Run the app with `npx react-native run-android`

# Implementation

- ##### Initialization

  Project initialized with React Native CLI with the TypeScript template as it has become more common practice to use TypeScript for typechecking as a safeguard against errors before runtime and to add code completion suggestions via intellisense.

- ##### State Management

  As a state manager option I opted for Mobx State Tree as it is more lightweight in terms of the amount of code required to perform a comparable redux management tasks. However, redux-toolkit was considered as an alternative _(ask me about my other version of this app with redux-toolkit 😕)_

- ##### UI Kit

  [react-native-elements](https://reactnativeelements.com/) was chosen as a scalable option for UI development as it has a wide range of component options
  [react-native-paper](https://callstack.github.io/react-native-paper/) was used for its form builder

- ##### i18n

  Added a internationalization library [i18n-js](https://github.com/fnando/i18n) to centralize all strings used in the app's UI and for language support and scalability

- ##### API service

  Used [apisauce](https://github.com/infinitered/apisauce) as it is a nice lightweight helper library for axios calls with good readable error handling

- ##### Expo Modules

  ([Formerly called unimodules](https://blog.expo.dev/whats-new-in-expo-modules-infrastructure-7a7cdda81ebc)), Expo now exports its modules as a stand alone service called [Expo Modules](https://docs.expo.dev/bare/installing-expo-modules/) which allows use of its SDK in React Native bare workflows. This was a dependency for `i18n-js` and also allows for us to utilize their SDK in the future (e.g. SplashScreen was added to this project to control showing the splashscreen until our clinicians are fully loaded and then hiding it when we are ready for presentation to the user)

- ##### _Developer Comments_

  - This exercise is relatively simple on its face, a favoritable list with login, but a mobile app is more than just a set of features. App architecture and scalability were two of the larger considerations when creating this project - that and choosing a state management option, since redux has changed a bit since the reducer, action, saga paradigm I was used to when we first used it in our clients' React Native apps at Infinite Red. I did like that redux-toolkit addressed many of the shared frustrations with redux over the years, but decided to go with MST because it was more streamlined for the required functionality/features. I did attempt an approach with Ignite, but it was a bit overkill for this exercise and I found myself removing much of what it included. If this was an actual production app, I might consider using it, but in the time allotment it was like putting an oil tanker in a riverbed. I did probably spend more time on UI than I should have, but I didn't have the luxury of being able to iterate on design throughout a typical development process. That said, there is room for improvement 😜. Overall this was a fun exercise that I enjoyed with the freedom to start a project from scratch and add a bit of creativity to with the latest tools available today in the React Native ecosystem.
    <br>
  - Things I would add going forward
    - TESTS - snapshot, unit, and E2E prob with Detox
    - STORYBOOK - Add storybook so feature mockups could be presented and general component use could be explained across the team
    - API - I would give the api calls their own folder and build out namespaced features from there
    - ERROR HANDLING - some kind of app-wide messaging system (popup, toast, etc) to give feedback to the user for network calls, etc.
    - STORE - I would break up the `mst.tsx` file into MST stores separated by feature/model (Clinicians, User, Auth, etc.)
    - ENV - Add an env file to store local info
    - API KEY - Not store it directly in the code - pull from 1P or AWS, etc.
    - DEBUGGING - Integrate Reactotron for Network/MST/general call debugging
    - UI/UX:
      - Add a drawer with a logout button
      - Iron out Image caching in the clinician rows
      - Maybe pick a better palette
      - Add a spinner for network calls, etc.
      - Popup for user messaging
      - Prob more as the app's features were developed more

# Technologies

- [React Navigation](https://reactnavigation.org/)
- [apisauce](https://github.com/infinitered/apisauce)
- [expo-modules](https://www.npmjs.com/package/install-expo-modules)
- [i18n-js](https://github.com/fnando/i18n)
- [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome)
- [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service)
- [react-native-elements](https://reactnativeelements.com/)
- [react-native-paper](https://callstack.github.io/react-native-paper/)
- [react-native-paper-form-builder](https://fateh999.github.io/react-native-paper-form-builder)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

# GIFs

##### App Start

![EH-load](https://user-images.githubusercontent.com/10098988/174912460-052e8f56-1148-4dbb-8666-8b9902806f0e.gif)

##### Login

![EH-login](https://user-images.githubusercontent.com/10098988/174912474-6b65f589-6e64-458d-a026-b9b0d646538f.gif)

##### Login Errors

![EH-login-errors](https://user-images.githubusercontent.com/10098988/174912828-effb8631-0ea1-4c80-b9ea-f25cb478ab7f.gif)

##### Favorite a Clinician

![EH-favorite-1](https://user-images.githubusercontent.com/10098988/174912498-ef4ba8fe-8ce9-48a1-a73b-6700a4c61e78.gif)

##### Favorite a Different Clinician and Replace Current Favorite

![EH-favorite-2](https://user-images.githubusercontent.com/10098988/174912561-8306ee12-9366-4e40-9bc1-2870f6cfc7ea.gif)

##### Unfavorite Clinician on Home Screen

![EH-unfavorite-home](https://user-images.githubusercontent.com/10098988/174912583-0104f543-2880-4140-8275-5566926d24d1.gif)

##### Unfavorite Clinician from Details Screen

![EH-unfavorite](https://user-images.githubusercontent.com/10098988/174912659-791639aa-9e2b-4380-9937-64309f516463.gif)

##### Get user location and filter clinicians by user's state (here mocked to be NY)
![EH-filter](https://user-images.githubusercontent.com/10098988/175093643-17de5e91-58b5-462b-a996-63f8ed2ef285.gif)
