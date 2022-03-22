# kuka
Share video testimony.

[The Design](https://davidrideout703347.invisionapp.com/console/Kuka-ckdruurhw017s012ln8aupdrs/ckdruus5s01ig014s9qfhhful/play)

## Developer Contributions
Please install [`yarn version 1`](https://classic.yarnpkg.com/en/docs/install)

```
$ yarn install
```

### Code Design
Please leverage Husky for Code Style Checks (aka "Linting"), 
testing is optional. If you choose to do TDD, please run 
tests manually or feel free to contribute code for the CI/CD 
implementation. Contributions are always welcome!


### Deploying the web app
Deploy the firebase app.

```
// Deploy firebase functions and web app
$ firebase deploy

// only web app
firebase deploy --only hosting

// only functions
firebase deploy --only functions

```

