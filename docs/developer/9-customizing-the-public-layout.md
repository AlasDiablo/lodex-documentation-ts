# Customizing the public layout

## Create a new layout

To create a new layout, put at least an `index.html` file into `src/app/custom`.
It is considered as a static web site, except for the `div` containing the LODEX app. Thus, you can use:
- CSS
- JavaScript
- Images
- Subdirectories
as in any static file.

> **Note**: you can even add other pages (which will be only static), that you can link to from the `index.html`, creating more of a theme than a simple layout. Pay attention to your links: don't include domaine names (use `/other_page.html`, not `http://mydomain.com/other_page.html`).

### constraints

The only requirement is to provide an [`index.html`](https://github.com/Inist-CNRS/lodex/blob/master/src/app/custom/index.html) file containing `<div id="root"></div>` (as is).

It is your responsibility to include links to the administration and authentication pages:

- administration: href must target `/admin`
- authentication: href must target `#/login`

> **Note**: `index.html` must contain `</head>` and `</body>`.

## Add your files

### with EzMaster

Use the WebDav upload to put your theme (one or several files/directories) into the instance of the application.

> **Tip**: You can download the original layout from EzMaster to get started.

### without ezmaster

Just copy `index.html` (and optionally all the other files/directories) into [`src/app/custom`](https://github.com/Inist-CNRS/lodex/tree/master/src/app/custom)
