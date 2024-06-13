# Adding a new routine

You can add new routine to the catalogue use by lodex. 
Lodex-routine are defined here: https://github.com/Inist-CNRS/lodex-extended/blob/master/public/routines/README.md
For use them, you need to list them in `src/app/custom/routines/routines-catalog.json`. An routines is defined by an `id` and an `url` which are mandatory and you can also set links to `doc`, `recommendedWith`:

```json
{
   "id": "r-classif-by",
   "url": "/api/run/classif-by/",
   "doc": "https://user-doc.lodex.inist.fr/lodex-user-documentation/configuration/routines/classifby",
    "recommendedWith": ["StreamGraph", "AreaGraph"]
}
```

Texts for title and description of the routines are in `src/app/custom/translations.tsv`. Translations keys must follow this naming pattern: `{routine id}_title` or `{routine id}_description`. For example:
```
"r-classif-by_title"	"Classif by"	"Classifier par"
"r-classif-by_description"	"A small description..."   "Une petite description"
```
