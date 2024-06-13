# Adding a new exporter

You can add new exporter to lodex.
Exporter are added in the `src/api/exporters` directory.

```js
const exporter = (config, fields, characteristics, stream, query) => {
    const defaultDocument = getDefaultDocuments(fields);
    const getCharacteristicByName = name => characteristics[0][name];
    const getCsvField = getCsvFieldFactory(getCharacteristicByName);

    const jsoncsvStream = csvTransformStreamFactory({
        fields: fields.map(getCsvField),
        fieldSeparator: ';',
    });

    return stream
        .pipe(through(getLastVersionFactory(defaultDocument)))
        .pipe(jsoncsvStream);
}

// Required: this will be used as the translation key to get the exporter label
// If no translation is provided for this key, the key itself will be used for the label
exporter.label = 'csv';

// Required: this will be the exported file extension
exporter.extension = 'csv';

// Required: this will be the exported file mime type
exporter.mimeType = 'text/csv';

// Required: this define wether this exporter will output a file or a string (for widgets)
// Accepted types are `file` or `string`
exporter.type = 'file';

export default exporter;

```

It receives:

- `config`: The configuration provided through the `config.json` file

- `fields`
        The list of fields

```js
{
    "cover" : "collection", // either dataset, collection or document
    "label" : "uri", // label of the field
    "name" : "uri", // technical name of the field
    "transformers" : [], // list of transformers used to compute the field from the original dataset
    "format" : { // the format used to display the field
        "name" : "uri"
    },
    "scheme": "http://uri4uri.net/vocab#URI"
}
```

or

```json
{
    "contribution" : true,
    "name" : "note",
    "cover" : "document",
    "label" : "Contribution",
    "scheme" : "http://www.w3.org/2004/02/skos/core#note",
    "contributors" : [
        {
            "name" : "john",
            "mail" : "john@doe.com"
        }
    ]
}
```

- `characteristics`: The list of all version of the characteristics sorted by their publicationDate (newer to oldest)

```json
{
    "title" : "My title",
    "Author" : "Myself",
    "publicationDate" : "2017-02-22T09:56:07.765Z"
}
```

- `stream`: A stream of all document in the published dataset.

```js
{
    "uri" : "HKPNG4WD",
    "versions" : [ // list of all versions for the document (oldest to newest)
        {
            "key" : "value",
                ...
        },
        {
            "key" : "value",
            "contribution" : "other value"
            ...
        }
    ],
    "contributions" : [
        {
            "fieldName" : "contribution",
            "contributor" : {
            "name" : "john",
            "mail" : "john@doe.com"
        },
            "status" : 'proposed'
        }
    ]
}
```

- `query`: the request query

You also need to declare the exporter in `src/api/exporters/index.js`.

```js
import newExporter from './newExporter';
export default {
    //...
    'new': newExporter,
};
```

note that the key determine the name of the exporter
The exporters must be declared on a per instance basis in the config file.
Simply add your exporter name in the exporters array, and it will appear in the export menu.

```json
// config.json
{
    ...
    "exporters": [
        "new",
        ...
    ]
}
```
