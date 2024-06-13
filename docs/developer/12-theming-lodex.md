# Theming LODEX

LODEX has always allowed theming, but since LODEX 14.0.27, a dynamic system has been added to allow easy theme creation.
To allow this, a `themes` folder is available in
the [src/app/custom/](https://github.com/Inist-CNRS/lodex/tree/master/src/app/custom) directory.
And a `themes' configuration to enable or disable themes is available in
the [config.json](https://github.com/Inist-CNRS/lodex/blob/master/config.json) file.

## Terminology

- Public Panel: Page generated with the dataset and model
- Admin Panel: Page used to add a dataset and model
- Root Panel: Page used to create instances

## How it works

### Theme structure

A theme requires at least one file; this file must be a json file called `lodex-theme.json`.
LODEX will not load the theme without this file.

Any other file is optional, and if you want to override the default main theme palette and index file, you must declare
it in the theme file.

```
themes
├── myTheme
│   ├── lodex-theme.json
│   ├── index.ejs
│   ├── theme.js
│   └── theme.css
└── otherTheme
    └── ...
```

#### LODEX theme file

The theme file is the declaration of a theme, containing the name, description and other metadata required to load and
apply it correctly.

The `version` corresponds to the LODEX theme system version, if the theme is a different version,
a message will be shown in the console and an outdated text will be added to the description.
To see all the changes, you can consult the
changelog [bellow](#Changelog).

The `name` and `description` are used to localise and describe the theme in LODEX Admin Panel.

The `configuration` are optional but allow you to override the `index.ejs` file and the theme palette,
these files must be in the same directory as the theme file.
This object also allows you
to add custom variables into the ejs template to give access to a better customisation in the
Public Panel (e.g.: custom title and summary to reflect the corpus dataset)

```json5
{
  "version": "4",
  "name": {
    "fr": "Système",
    "en": "System"
  },
  "description": {
    "fr": "Thème système",
    "en": "System theme"
  },
  "configuration": {
    // Optional files to replace the default mui theme and the index
    "files": {
      "index": "index.ejs",
      "palette": "systemTheme.js"
    },
    // Optional Record<string, string> list all default value for custom variables
    // to be used in the EJS template
    "variables": {}
  }
}
```

### Index EJS

This html index is an EJS files, we use ejs to provide templating to allow dynamic modification of the html inner
content.

In the EJS template you have access to the following variables:

- `lodex`
    - `version` (string) access to the current LODEX version
    - `tenant` (string) access to the current tenant
    - `istexApi` (url or an empty string if non-pertinent) access to the ISTEX api url if available
    - `preload` (json as string) access to the preload stats of lodex
    - `base`
        - `href` (host with port, or an empty string if non-pertinent) access to the LODEX api host
- `theme`
    - `cssVariables` (string containing css) access to all css variables
    - `base`
        - `href` (host with port, or an empty string if non-pertinent) access to the lodex front host (pertinent in
          development environment)
- `custom` custom is an object use as a key value map containing all variables declared in `configuration.variables` and
  in the Admin Panel.

### CSS Minification

If you want to minify css you need to install clean-css-cli via the following command `npm install -g clean-css-cli`.

To minify css files, you can use the following command with your
files `cleancss -o ./src/app/custom/themes/theme-name/css-file.min.css ./src/app/custom/themes/theme-name/css-file.css`.

## Changelog

### Version 4

### Change

- Update theme file to have a future-proof structure
    - Remove `files.theme` and replace it to `configuration.files`
    - Add a `configuration.variables` to allow adding custom variables to EJS template
    - Replace `main` (js color theme from `files.theme`) to `palette` (js color theme from `configuration.files`)
- Remove root configuration variables used in EJS template

#### Documentation

This version changes only the custom variables system and allows a more user-friendly implementation of this system.
The default values are now declared in the theme files with change in the file structure.
The values are now editable via the instance configuration in the Admin Panel.

**Old theme file**

```json5
{
  "version": "3",
  "name": {
    "fr": "Système",
    "en": "System"
  },
  "description": {
    "fr": "Thème système",
    "en": "System theme"
  },
  "files": {
    "theme": {
      "main": "systemTheme.js",
      "index": "index.ejs"
    }
  }
}
```

**New theme file**

```json5
{
  "version": "4",
  "name": {
    "fr": "Système",
    "en": "System"
  },
  "description": {
    "fr": "Thème système",
    "en": "System theme"
  },
  "configuration": {
    "files": {
      "index": "index.ejs",
      "palette": "systemTheme.js"
    }
  }
}
```

### Version 3

*Available since [14.0.52](https://github.com/Inist-CNRS/lodex/releases/tag/v14.0.52)*

#### Change

- Remove `restricted` from the LODEX theme file
- Update color palette system
- Admin Panel now uses the file from System Theme (default)
- Public Panel, Admin Panel and Root Panel now use the same css file as
  base `src/app/custom/themes/default/css/styles.css`
- Default background change from `#fff` to `#fafafa`
- Paper background change from `#fff` to `#fafafa`
- Update rendering system to fully use ejs

#### Documentation

- The index html need to have the `ejs` extension and not the classic `html`, this is to show the usage of ejs.
- Every other change does not have a major impact on the theme creation, but we recommend you to create a new theme with
  the default as a base.

### Version 2bisbis (un-versioned)

*Warning: This version in un-versioned, this means you need to use the version `2`, the theme system works differently
from the previous version.*

*Available since [14.0.48](https://github.com/Inist-CNRS/lodex/releases/tag/v14.0.48)*

#### Change

- Default theme is now a proper theme
- Now using `ejs` instead of regex for HTML template

#### Documentation

EJS available variable:

- `lodex.version`: LODEX Version
- `lodex.base.href`: replace `{|__JS_HOST__|}`
- `theme.base.href`: replace `{|__THEMES_HOST__|}`

Example of EJS Call:

`<%= theme.base.href %>`

### Version 2bis (un-versioned)

*Warning: This version in un-versioned, this means you need to use the version `2`, the theme system works differently
from the previous version.*

*Available since [14.0.45](https://github.com/Inist-CNRS/lodex/releases/tag/v14.0.45)*

#### Change

- Theme folder move from `src/themes` to `src/app/custom/themes`
- Symlink create from `src/app/custom/themes` to `src/themes`

#### Documentation

Theme folder: `src/app/custom/themes` and `src/themes`

### Version 2

*Available since [14.0.34](https://github.com/Inist-CNRS/lodex/releases/tag/v14.0.34)*

#### Change

- Theme import system updated

### Version 1

*Available since [14.0.27](https://github.com/Inist-CNRS/lodex/releases/tag/v14.0.27)*

#### Documentation

Theme folder: `src/themes`

- `{|__JS_HOST__|}`: Allow access to application files (relevant in dev mode, this allows access to webpack)
- `{|__THEMES_HOST__|}`: Allow access to theme files (always in dev mode, this allows access to the API)
