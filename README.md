# RSS Reader

Built with React Native and Expo. Uses Yle's RSS feeds.

## Building
To build development build do the following:

- Rename `.env.example` to `.env`
- Create a LocationIQ account (https://locationiq.com/). We're using LocationIQ's Reverse Geocoding API to get user's region from location coordinates.
- Find LocationIQ API key [here](https://my.locationiq.com/dashboard#accesstoken) and copy paste it to `LOCATION_API_KEY` variable in `.env` file.
- Run `npm install` in terminal to install dependencies.
- Run `npm start` in terminal to start the development server.
- Install Expo Go app to your phone and scan the QR code with it to run the app. For more information see the [Expo docs](https://docs.expo.dev/).