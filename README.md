# P2P Transaction

### A peer to peer financial transaction for the unbanked and underbanked in Nigeria.

### APP SETUP

#### Prerequisites

Things you need to have to setup this app locally:

```
Node v10.13.0 or higher
npm 6.8.0 or higher
Mongodb or mlab Account
Sendgrid Account
Africastalking Account
```

To setup this app locally, you need to do the following:

- Clone the repo: `https://github.com/lytecode/P2P-Transaction.git`
- cd into it and run `npm install`
- Make a new file in the root folder called `.env`
- Copy the contents of `.env.example` to `.env` file
- Fill in the keys in `.env` with your keys
- Then run:

  - `npm run dev` to start development server or
  - `npm start` to run production server

You can now test the endpoints using `postman`.

Here is a sample postman docs: `https://documenter.getpostman.com/view/5863661/SVYowLdt`

#### Built With

- [Nodejs](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [npm](https://www.npmjs.com) - Dependency Management
- [Express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js
- [Sendgrid](https://sendgrid.com) - Send Emails With Confidence
- [Africastalking](https://africastalking.com) - Powering Communications Solutions Across Africa

#### Author

- **Mbonu Chukwudinma** - _Initial work_ - [lytecode](https://github.com/lytecode)

##### License

This project is licensed under the MIT License
