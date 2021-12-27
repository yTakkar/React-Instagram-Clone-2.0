# React-Instagram-Clone-2.0
A reactive Single-Page Instagram-Clone with some new features!! 

**No longer maintained. But it works**

---
### 🛒 Launch your online store with [OwnStore](https://ownstore.dev).
---

# Another Version
**[PHP Version](https://github.com/yTakkar/Instagram-Clone)**

# Quick liks
1. [Requirements](#requirements)
2. [Usage](#usage)
3. [Todo](#todo)
4. [Contribute](#contribute)
5. [Image Copyright Claims](#image-copyright-claims)

Here's a video which will take you on a tour of this project.

Note: Many improvements were done after recording this video.

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
    
5. For front-end layer of this app to get access to `env` variables defined in `.env` file, run
    ```bash
    yarn env
    ```

6. Start the server
    ```javascript
    npm start [OR] yarn start
    ```

7. Now run the app
    ```javacript
    localhost:[PORT] (PORT=defined in .env)
    ```
    
# Todo
- [x] More image filters
- [x] Search
- [x] Block members
- [x] Hashtag feature
- [x] Mention members
- [x] JSDoc & comments
- [x] Admin system
- [x] Show if member is online
- [x] Show all online members (whome you've followed)
- [x] Description with react-helmet for SEO
- [x] Some serious code refactoring
- [x] Crush some bugs
- [x] Remove jQuery
- [x] UI testing
- [ ] Folder restructuring
- [ ] Performance optimization (Code Splitting, Image Lazyload, etc.)
- [ ] Express routes testing
- [ ] Like comments
- [ ] Upgrade packages
- [ ] Story feature
- [ ] Show mutual likes, comments & shares

# Contribute
Show your support by 🌟 the project!!

Feel free to contribute!

# Image Copyright Claims
Many images used in the project belong to their respective creators/authors. No claim by me & those who use this project. :)

**Thanks for reading**

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/yTakkar/React-Instagram-Clone-2.0/graphs/contributors"><img src="https://opencollective.com/react-instagram-clone-20/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/react-instagram-clone-20/contribute)]

#### Individuals

<a href="https://opencollective.com/react-instagram-clone-20"><img src="https://opencollective.com/react-instagram-clone-20/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/react-instagram-clone-20/contribute)]

<a href="https://opencollective.com/react-instagram-clone-20/organization/0/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/1/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/2/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/3/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/4/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/5/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/6/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/7/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/8/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/react-instagram-clone-20/organization/9/website"><img src="https://opencollective.com/react-instagram-clone-20/organization/9/avatar.svg"></a>
