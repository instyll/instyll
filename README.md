# Development Documentation

`yarn install` for installing required dependencies on a new development environment

`yarn add concurrently` maybe also required separately

## running the application

`yarn run electron-dev`

## building production

`yarn run electron-pack`

Sometimes you need to disable eslint in order to avoid production build fail, in that case create `.env` and write `DISABLE_ESLINT_PLUGIN=true`

