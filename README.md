# kuka
Share video testimony.

[The Design](https://davidrideout703347.invisionapp.com/console/Kuka-ckdruurhw017s012ln8aupdrs/ckdruus5s01ig014s9qfhhful/play)

## Prerequisites
- [NodeJS](https://nodejs.org/en/download/)
- [Npm](https://www.npmjs.com/package/npm) 
- [`yarn version 1`](https://classic.yarnpkg.com/en/docs/install)

## Deployment Instructions

### Mobile

See nested instructions available in the [KukaApp directory](KukaApp/).

### Website

> Note: This _might_ require a `yarn global add firebase` / `npm install -g firebase`

```
// Deploy firebase functions and web app
$ firebase deploy

// only web app
firebase deploy --only hosting

// only functions
firebase deploy --only functions
```

### Code Design
Please leverage Husky for Code Style Checks (aka "Linting"), 
testing is optional. If you choose to do TDD, please run 
tests manually or feel free to contribute code for the CI/CD 
implementation. Contributions are always welcome!


