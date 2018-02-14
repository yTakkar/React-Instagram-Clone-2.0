# React-Instagram-Clone-2.0
A reactive Single-Page Instagram-Clone with some new features developed with MERN stack!! 

# Another Version
**[PHP Version](https://github.com/yTakkar/Instagram-Clone)**

# Quick liks
1. [Requirements](#requirements)
2. [Usage](#usage)
3. [Todo](#todo)
4. [Contribute](#contribute)
5. [Image Copyright Claims](#image-copyright-claims)

Here's a video which will take you on a tour of this project!!

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/peuGRGGxSHI/0.jpg)](https://youtu.be/peuGRGGxSHI)

# Requirements
1. [GraphicsMagick](http://www.graphicsmagick.org/) for Image-processing.

# Usage
1. First install all dependencies:
    ```bash
    # with npm
    npm install
    
    # or with yarn
    yarn
    ```

2. Open PHPMyAdmin, create a DB & import `db.sql` file.
3. Create a `.env` file and insert the following code. Replace values with yours!!

    ```javascript
    PORT=YOUR_PORT
    SESSION_SECRET_LETTER="anything-secret"
    MYSQL_HOST="host"
    MYSQL_USER="user"
    MYSQL_PASSWORD="password"
    MYSQL_DATABASE="db"
    MAIL="your-email-for-sending email-verification-link"
    MAIL_PASSWORD="password-for-email"
    GOOGLE_GEOLOCATION_KEY='google-geolocation-key'
    ```

4. Start the server
    ```javascript
    npm start [OR] yarn start
    ```

5. Now run the app
    ```javacript
    localhost:[PORT] PORT=4300 (By default)
    ```

6. For front-end layer of this app to get access to `env` variables, uncomment line nos. `7, 8, 9` of `/app.js` and restart the app by typing `npm start` or `yarn start` in the terminal. Once the app is restarted and a new file `/browser-env.js` is created, comment the above mentioned lines of `/app.js`because it makes the app run slowly.

7. Enjoy!!

# TODO
1. Admin Panel

# Contribute
Show your support by 🌟 the project!!

Feel free to contribute!

# Image Copyright Claims
Many images used in the project belong to their respective creators/authors. No claim by me & those who use this project!!

**Thanks for reading**
