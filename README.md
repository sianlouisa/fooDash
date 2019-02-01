# Final Project 

## fooDash
An Augmented Reality game where the user selects any flat surface to play on. The object of the game is for the character to get to a safe zone whilst dodging falling objects and staying on the playing surface. The back end is written in JavaScript using a mobile and web application development platform called Firebase, as well as a flexible and scalable database called Cloud Firestore. The front end is written using a JavaScript framework called React-Native, and an AR/VR platform called Viro Media  The app can currently only be run in a development environment. 

### Getting Started

1. Fork and Clone this repository.
2. Once cloned to your machine, navigate into the project and run `npm install` in your terminal to install all dependencies.
3. Create a file called config.js in your route directory. This is where you will put your Viro Media and firebase configuration settings(see 'Installing' below).
4. Update your '/js/api.js' file (see 'Installing' below).
5. Create a [firebase account](https://console.firebase.google.com) and follow the instructions for setting up a project for your operating system.  
6. Download the Viro Media app to the device you will be using for development.
7. Download a development environment to your machine (see Installing a Development Environment below).
8. Run `npm run start` to start the node server on your local environment.
9. Open the Viro Media app and go to 'Enter Testbed'. Follow the directions.

### Prerequisites

### Installing Viro Media on your device

You will need to have the Viro Media app installed on your device in order to test your code.

Go to the app store on your device, search for 'Viro Media' and download to your device.

### Installing a Development Environment (optional)

For IOS development, please follow the installation and use instructions on the [official apple](https://developer.apple.com/xcode/) webpage. 

For Android development, please follow the installation and use instructions on the [official AndroidStudio](https://developer.android.com/studio/) webpage.

### Installing

Before running the application you will need to set up your database connection in the config.js you previously created. Here is an example configuration: 

```
export const VIRO_API_KEY = 'YourViroApiKeyGoesHere';
export const firebaseConfig = {
apiKey: 'YourFirebaseApiKeyGoesHere',
authDomain: 'yourAuthDomainGoesHere.firebaseapp.com',
databaseURL: 'https://yourDatabaseURLGoesHere.firebaseio.com',
projectId: 'YourProjectIDGoesHere',
storageBucket: 'YourStorageBucketGoesHere.appspot.com',
messagingSenderId: 'YourMessagingSenderIDGoesHere'
};
```

You will also need to update your api.js file (found in js directory), depending on the device you will be using. Please see below examples for ios and android respectively:

#### IOS
```
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import '@firebase/firestore';
```

#### Android
```
import firebase from '@firebase/app';
import { firebaseConfig } from '../config';
import '@firebase/firestore';
```

Once your configuration is set up, you should be able to run the app by using the command: `npm run start`.

You can now either choose to run the app using the Viro Media App, or through Xcode(ios) or Android Studio(android)

### Built With
- Firebase Authentication
- Cloud Firestore
- Node.js
- React Native
- Viro Media

### Versioning
Github has been used for versioning. For the versions available, see the tags on this repository.

### Authors
Nawaar Patel, Sian Lynch, John O’Meara, Daniel Varcas and Britannia Lomax
