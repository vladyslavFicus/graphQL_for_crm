# Backoffice GraphQL
### GraphQL API for backoffice

You should have local file with Kubernetes ConfigMap (platform-config) for each environment.

The path to the local file defined in `.env.*` files and looks like this:
```yaml
PLATFORM_CONFIG=../nas/dev01.yml
```


# Development

`yarn start` - Run application, but it's require to provide some ENV variables.

`yarn start:dev` - Run application on `DEV` environment.

`yarn start:staging` - Run application on `STAGING` environment.

`yarn start:production` - Run application on `PRODUCTION` environment.
