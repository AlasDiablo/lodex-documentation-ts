# Adding a new format

You can add new formats to lodex.
The formats determine the react component used to display a field on the front.

Formats are added in the `src/app/js/formats` folder, in their own directory.
Eg, to add an uri format create the `src/app/js/formats/uri` directory.
A format is made of three mandatory components and one optional :

1. a view component for the front
1. an optional list view component for the front, will be used instead of the view component for the list if set
1. an edition component for the admin
1. an edition component for the front (editing a resource value once published).
1. An optional icon (used in the graphs menu)

Those components can be any react component. They will all receive the following props:

- `resource`: the resource
- `field`: the field definition in the model
- `fieldStatus`: only for the ViewComponent and if the field is a contribution. Statuses are `PROPOSED`, `ACCEPTED` and `REJECTED`
- `shrink`: only for the ViewComponent, a boolean indicating whether the value should be shrinked if possible. This is useful for the public table where large contents can be shrinked (with ellipsis for example) for easier reading.

The AdminComponent create the component that will set the format args. The args are stored in `field.format.args`.
These args will also be automatically injected as props in the view components.
The Admin component file must also export the defaultArgs variable with the default value for the format args.
This will ensure that view components will always receive the values that they need.

You then add an index in your directory to expose them:

```js
`src/app/formats/uri/index.js`
import Component from './Component';
import ListComponent from './ListComponent';
import AdminComponent, { defaultArgs } from './AdminComponent';
import EditionComponent from './EditionComponent';
import Icon from './IconComponent';

export default {
    Component,
    ListComponent, // optional
    AdminComponent,
    EditionComponent,
    defaultArgs,
    Icon,
};
```

Finally add your new component into `src/app/formats/formats.js`:

```js
import uri from './uri';
import custom from './custom';

export const FORMATS_CATALOG = [
    {
        name: 'formatUri', // translation key for name
        description: 'formatUriDescription', // translation key for description
        componentName: 'uri',
        component: uri,
        type: 'url',
    },
    {
        name: 'formatCustom',
        description: 'formatCustomDescription',
        componentName: 'custom',
        component: custom,
        type: 'other',
    },
    ...
];
```

> **NOTE** If your edition component does not have anything special to do, you can fallback to the default one

```js
`src/app/formats/uri/index.js`
import Component from './Component';
import AdminComponent, { defaultArgs } from './AdminComponent';
import EditionComponent from './EditionComponent';
import DefaultFormat from '../DefaultFormat';

export default {
    Component,
    AdminComponent,
    EditionComponent: DefaultFormat.EditionComponent,
    defaultArgs,
};
```

> **Subformat** If your format will be used as a subformat, parameters are stored in the object  ```js field.format ``` that is imported from the props
>
> example : ``` field.format.args.paragraphWidth ```


To help the creation of format there exists the following higher order component:

## injectData
For the format that need to fetch data. This HOC will automatically fetch the data needed by the format. The data will be available in the formatData props.
By default `injectData` will take the field value as the url to fetch.
injectData take an optional parameter to customize the url to be called.
This can either be a string to set a fixed url, or a function to generate the url you need. The function will receive the field as parameter.
Additionally, for those formats that won't always need data, if you return a null value, then injectData will not fetch anything.

## exportableToPng
This simple hoc will add a `save as png` at the bottom of the format, this button will then export the format html as a png image. Useful for those chart.
