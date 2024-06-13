# Adding a new loader

You can add new loaders to lodex.
Loaders are added in the `src/api/loaders` directory.
A loader receives a config and the uploaded file as a stream, and returns the modified stream.
Example of a csv parser:

```js
// src/api/loaders/parseCsv.js
import parseCsv from 'csv-parse';

export default config => stream =>
    stream.pipe(parseCsv({
        columns: true,
        ...config,
    }));
```

Once the loader created, you also need to declare it in `src/api/loaders/index.js`

```js
import parseCsv from './parseCsv'; // eslint-disable-line


export default {
    // ...
    'csv': parseCsv,
};

```

Notice how the key will determine the name of the loader.
This name must match the extension of the target file.
This is how we determine which loader to use.
Thus, a loader for `.csv` file must be exported as `csv`.

The config is taken from config.json, in `loader.<file extension>`, and allow to configure your loader on an instance basis.
For example for the loader csv:

```json
...
    "loader": {
        "csv": {
            "quote": "\"",
            "delimiter": ";"
        },
...
```
