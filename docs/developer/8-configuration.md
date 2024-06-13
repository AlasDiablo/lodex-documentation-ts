# Configuration

### Instance configuration

On EzMaster, you can edit the instance configuration:

- `username`: Required - username for admin access
- `password`: Required - password for admin access

- `userAuth: { username, password }`: Optional - add username and password to restrict user access, omit to deactivate.

- `front.breadcrumb`: The list of the items displayed in the breadcrumb trail. The last item is not displayed on root
  page of the site. By default the list is empty.
  Each item contains:
  - label: An object to specify the breadcrumb item label in each language eg: `{ "fr": "Accueil", "en": "Home" }`
  - url: the URL where to go

```json
 {
  "label": {
    "en": "Data Istex",
    "fr": "Données Istex"
  },
  "url": "http://localhost:3000"
}
```

- `front.menu`: The list of item displayed in the site menu. The order of the item in the array is the order of item in
  the menu.
  Each item contains:
  - label: An object to specify the menu label in each language eg: `{ "fr": "Accueil", "en": "Home" }`
  - icon: The icon used in the menu, can be either a [fontAwesome](https://fontawesome.com/icons?d=gallery) icon name.
    Careful the name must be in camel case, so `fa-home` become `faHome`. Or a custom svg file added in the theme. Note
    that an icon loaded from a file will not change color on hover and active.
  - position: `left`, `right` or `advanced`, tell where to display the menu item on the menu. If `advanced` is selected,
    the item will be added in the advanced menu.
  - role: The role of the menu, cab be either:
    - `home`: allow to navigate to the home of the site
    - `resources`: Allow to navigate to the list of resources (`/graph`)
    - `graphs`: Open the list of graph sub menu
    - `search`: Open the search panel
    - `admin`: Navigate to the admin. (This will only appear when logged as an admin)
    - `sign-in`: Link to login to the site. (This will only appear if not logged)
    - `sign-out`: Link to logout from the site. (This will only appear if logged)
    - `custom`: Add a custom link. The url is given by the link key.
    - `link`: The link used when in `custom` role, will be ignored otherwise.
      You can add external link as well as internal link. For internal link, simply point to the html file in the custom
      theme folder. For example to add an about page with a custom icon:

```json
{
  "label": {
    "en": "About",
    "fr": "A propos"
  },
  "icon": "/about.svg",
  "position": "left",
  "role": "custom",
  "link": "/about.html"
}
```

By default the menu is:

```json
[
  {
    "label": {
      "en": "Home",
      "fr": "Accueil"
    },
    "icon": "faHome",
    "position": "left",
    "role": "home"
  },
  {
    "label": {
      "en": "Resources",
      "fr": "Ressources"
    },
    "icon": "faList",
    "position": "left",
    "role": "resources"
  },
  {
    "label": {
      "en": "Graphs",
      "fr": "Graphiques"
    },
    "icon": "faChartArea",
    "position": "advanced",
    "role": "graphs"
  },
  {
    "label": {
      "en": "Search",
      "fr": "recherche"
    },
    "icon": "faSearch",
    "position": "right",
    "role": "search"
  },
  {
    "label": {
      "en": "Admin",
      "fr": "Admin"
    },
    "icon": "faCogs",
    "position": "advanced",
    "role": "admin"
  },
  {
    "label": {
      "en": "Sign in",
      "fr": "Connexion"
    },
    "icon": "faSignInAlt",
    "position": "advanced",
    "role": "sign-in"
  },
  {
    "label": {
      "en": "Sign out",
      "fr": "Déconnexion"
    },
    "icon": "faSignOutAlt",
    "position": "advanced",
    "role": "sign-out"
  }
]
```

- `naan`: Optional - used to autogenerate URIs (see [node-inist-ark](https://github.com/Inist-CNRS/node-inist-ark))
- `subpublisher`: Optional - used to autogenerate URIs (
  see [node-inist-ark](https://github.com/Inist-CNRS/node-inist-ark))

- `languages`: Required - an array of languages defined by a `label` and a `code` which will be proposed when selecting
  a property language

- `collectionClass`: Optional - the class `rdf:type` of each resource

- `datasetClass`: Optional - the class `rdf:type` of the dataset

- `exporters`: Required - an array of the allowed exporters

- `loader`: Required - an array of loaders (which import your data) with their options
- `host`: Optional - the public host which will be used to generate resources URIs. It will fallback on the EzMaster
  environment variable `EZMASTER_PUBLIC_URL`. Format is `http://[host]` (no ending slash)

- `mongo`: Optional - Allow to override the default mongo configuration given by ezMaster. You can override all or part
  of the config, available properties are :

  - `host`: the host and port pointing to the mongo instance eg: `localhost:27017`
  - `dbName`: The name of the database eg: `lodex`

- `perPage`: Optional - the number of item perPage when displaying the dataset. Default to 10

- `topFieldsCount`: Optional - the number of fields displayed in the resource page, before displaying the
  tabs (`DETAILS`, `SHARE/EXPORT`, `ONTOLOGY`)

### Technical documentation

Technical configuration is handled by [node-config](https://github.com/lorenwest/node-config) and is located
inside `./config`:

- `default.js`: contains the default configuration which other files may override
- `development-dist.js`: will be duplicated as `development.js` with `make install` and override the default config with
  values specific to the development environment.
- `production-dist.js`: will be duplicated as `production.js` with `make install` and override the default config with
  values specific to the production environment.
- `test-dist.js`: will be duplicated as `test.js` with `make install` and override the default config with values
  specific to the test environment.

The expected configuration contains:

- `port`: Number - The application port
- `mongo`: Object - How to connect to the mongo server
- `auth`: Object - Configuration of the authentication mechanims
  - `cookieSecret`: String - secret used to encrypt the JWT token inside the authentication cookie
  - `headerSecret`: String - secret used to encrypt the JWT token inside the authentication header
  - `expiresIn`: Number - expiration delay of the JWT token in milliseconds
- `buildFrontend`: Boolean - determines wether the API should build the frontend with webpack. Used to disable build on
  test environment.
