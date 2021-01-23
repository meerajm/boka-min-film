# BokaMinFilm

[![Actions Status](https://github.com/meerajm/boka-min-film/workflows/BokaMinFilm%20Frontend/badge.svg)](https://github.com/meerajm/boka-min-film/actions)
[![Actions Status](https://github.com/meerajm/boka-min-film/workflows/Run%20Lint/badge.svg)](https://github.com/meerajm/boka-min-film/actions)

# frontend
A movie ticket booking app built using the MERN stack.

https://bokaminfilm.netlify.app/

### Tech

- [React] - A JavaScript library for building user interfaces.
- [Axios] - Promise based HTTP client for the browser and node.js.
- [Stripe] - A complete payment solution
- [i18Next] - An internationalization-framework.
- [EmailJS] - Send email from Javascript.

### Installation

Install all dependencies and start the project.

```sh
$ cd frontend
$ npm install
$ npm start
```

### Setup

Eslint must be installed globally: `npm install -g eslint`

env variables are only available in node environment and not in the browser and we can access to them via `process.env.[VARIABLE_NAME]`

A `.env.local` file is created at the root directory of the application. Just add the variables to it.

```
REACT_APP_BASE_URL="http://localhost:5000"
REACT_APP_EMAILJS_USER_ID="YOUR_EMAILJS_USER_ID"
REACT_APP_STRIPE_KEY="YOUR_STRIPE_KEY"
```

Since we're using create-react-app, It does some tricks for you and simulates the same behavior inside the browser, only if you put the REACT_APP prefix before your env variables.

Note:

> You must create custom environment variables beginning with REACT_APP. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.

###
Ticket details sent to user through emailjs.

### Special thanks to-
Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>