# React-Instagram-Clone-2.0
A reactive Single-Page Instagram-Clone with some new features developed with MERN stack!! 

# Another Version
**[PHP Version](https://github.com/yTakkar/Instagram-Clone)**

# Quick liks
1. [Requirements](#requirements)
2. [Usage](#usage)
3. [Contribute](#contribute)
4. [Image Copyright Claims](#image-copyright-claims)

Here's a video which will take you on a tour of this project!!

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/VBZD5lfvi4U/0.jpg)](https://www.youtube.com/watch?v=VBZD5lfvi4U)

# Requirements
1. [GraphicsMagick](http://www.graphicsmagick.org/) for Image-processing.

# Usage
1. Fork the repo and then clone it or download it.

2. First install all dependencies:
    ```bash
    # with npm
    npm install
    
    # or with yarn
    yarn
    ```

3. Open PHPMyAdmin, create a DB & import `db.sql` file.
4. Create a `.env` file and insert the following code. Replace values with yours!!

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
    ADMIN_PASSWORD='password-for-admin'
    ```

5. Start the server
    ```javascript
    npm start [OR] yarn start
    ```

6. For front-end layer of this app to get access to `env` variables defined in `.env` file, run
    ```bash
    yarn env
    ```

7. Now run the app
    ```javacript
    localhost:[PORT]
    ```

# Contribute
Show your support by 🌟 the project!!

Feel free to contribute!

# Image Copyright Claims
Many images used in the project belong to their respective creators/authors. No claim by me & those who use this project!!

**Thanks for reading**
