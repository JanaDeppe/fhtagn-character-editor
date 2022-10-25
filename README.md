# Fhtagn Character Editor

## Git Workflow

1. All feature branches branch off of `master`. They are named in kebab-case, starting with the issue number of the issue they will solve. 
2. The `production` branch is used for deploying new minor (and eventually major) versions of the app. Merging `master` into `production` bumps the minor version up and resets the patch version. 
3. Hotfixes branch off of `master` as well and are cherry-picked into `production`. They bump the patch version up. 

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
