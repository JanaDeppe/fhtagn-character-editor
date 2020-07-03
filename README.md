# 002-fhtagn-character-editor

## Git Workflow

1. All feature branches branch off of `master`. They are named in kebab-case, starting with the issue number of the issue they will solve. 
2. The `production` branch is used for deploying new minor (and eventually major) versions of the app. Merging `master` into `production` bumps the minor version up and resets the patch version. 
3. Hotfixes branch off of `master` as well and are cherry-picked into `production`. They bump the patch version up. 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
