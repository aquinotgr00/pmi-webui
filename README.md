# pmi-webui

Backend UI for PMI administrators

## Getting Started

### Prerequisites
* [npm](https://www.npmjs.com/get-npm)

* [dotenv](https://github.com/motdotla/dotenv)
```sh
npm install dotenv
```

## Deployment

### Caveat
* This app uses client-side routing. Static server needs to be configured to respond to a request to `/admin/users` by serving index.html
Apache HTTP Server needs an `.htaccess` file in the public folder
Refer to [this documentation](https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing) for more detail
* Modify `.env.dev`, `.env.staging` or `.env.production` variables if necessary

### build folder
run `build:<target>` to build with specific target server environment.  
for example, to build for staging server,
``` bash
npm run build:staging
```

## Testing
Run the tests with:
``` bash
npm run test
```

## Useful links
* Create React App : [Deployment](https://facebook.github.io/create-react-app/docs/deployment)