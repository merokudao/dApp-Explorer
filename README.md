# Meroku Explorer

Best place to view all apps published on the [Meroku protocol](https://meroku.org)

---

## Available Scripts

### Configure env

`cp .env.example .env`

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Docker Support

Build docker image using

```shell
docker build -t dexp .
```

Run docker image using

```shell
docker run \
  -it \
  --env-file .env \
  -p 3000:3000 \
  dexp
```

Exit the instance by CTRL+C


---

### Config

App secrets can be adjusted via the .env file [Read More](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) about customising
.env files on Next.js official docs

Next.js can be configured using next.config.js [Read More](https://nextjs.org/docs/pages/api-reference/next-config-js)

---

### File Structure

- /src/api/api => Redux Query Setup
- /src/api/constants => API Constant Values

- /src/app/constants => Application constants such as Site title, Menu etc

- /src/components => UI Components

- /src/features => Application Features
- /src/features/dapp => Integration with the dApp registry

- /src/models => Generic Global models

- /src/pages => Public Pages following the Next.js convention [Read More](https://nextjs.org/docs/getting-started/project-structure#pages-routing-conventions)

- /src/store => Redux Store Setup and Middleware Setup
- /src/store/hooks => Typed Hooks for usage within the Application

- /src/theme => Application theme public export, export all theme variable from this file
- /src/theme/fonts => Application fonts using Next/font

- /public => Public files and Static Assets

### Styling

[Tailwind CSS](https://tailwindcss.com/docs/installation) is used to style individual elements

The global config file is `tailwind.config.js`

### Helpful Links

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com)

### Adding new API endpoints

While adding new API endpoints it is important to call `api.injectEndpoints` and register the builder function with
Redux Toolkit an example of this can be seen in `src/features/dapp/dapp_api.ts`

To know more about this [visit](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)
