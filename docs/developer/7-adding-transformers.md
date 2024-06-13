# Adding transformers

New transformers can be added in `src/common/transformers`

```js
// src/common/transformers/COLUMN.js
const transformation = (context, args) => {
    const sourceField = args.find(a => a.name === 'column');

    if (!sourceField) {
        throw new Error('Invalid Argument for COLUMN transformation');
    }

    return doc => new Promise((resolve, reject) => {
        try {
            if (!doc) {
                resolve(null);
                return;
            }
            resolve(doc[sourceField.value]);
        } catch (error) {
            reject(error);
        }
    });
};

transformation.getMetas = () => ({
    name: 'COLUMN',
    args: [{
        name: 'column',
        type: 'column',
    }],
});

export default transformation;
```

A transformer can be divided in two parts a transformation function,
and a getMetas method.

### transformation

The transformation function take a context and an array of arguments.

#### Context

The context differ based on the environment.
This context allow to know the environment (context.env):

- node: server side during publication
- browser: client side during preview

Based on the env, the context expose different functionality.
In node:

- dataset: The dataset model that allow to execute mongo queries on the dataset collection.
- fetchLineBy(field, value): That allow to get a raw dataset line where its field equal value.

In browser:

- token: authentification token of the current session
- fetchLineBy(field, value, token): Same as fetchLineBy but also need the token.

##### Extending the context

To add method to the context, you need to edit the code in two place.

- clientSide: in `src/app/lib/getDocumentTransformer`.
- Serverside: in `src/api/services/getDocumentTransformer`, notice that you have access to ctx object from koa.

#### arguments

The array of arguments representing the configuration of the transformer given by the user.

### getMetas

A function that return a meta object describing the transformer and its arguments.

```js
transformation.getMetas = () => ({
    name: 'COLUMN',
    args: [{
        name: 'column',
        type: 'column',
    }],
});
```

The meta object have the following keys

- name: the name of the transformer, as displayed on the admin
- args: Array describing each args needed by the transformer.
- name: The name of the arg as displayed in the admin
- type: The type of the arg, either:
  - column: the value is the name of a column in the original dataset
  - string: a string
