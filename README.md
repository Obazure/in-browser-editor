# In browser text editor

What most code editors have in common is that at their core they provide developers
with the ability to edit plain text, split text into multiple files, and group files under folders. 

## Start app 

**To run the app** run next command:

``` (cd .deploy && docker-compose up -d)```

then open [http://localhost](http://localhost)

**To stop the api service**, please run:

``` (cd .deploy && docker-compose up -d)```

**Note:** please be sure that you have docker installed on your environment.

**Note:** For current configuration docker will listen 80 port, please be sure that it's available before launch, otherwise restart will be needed.

### Development

Launch the app in development 

```yarn start``` run service in local development mode

```yarn build``` for building js code

```yarn serve``` for hosting built js code with node

```yarn test``` | ```yarn test:coverage``` for running test

```yarn lint``` | ```yarn lint:fix``` for running code linting and syntax errors

#### Additional links

- [Git hub actions Dashboard](https://github.com/Obazure/in-browser-editor/actions)
