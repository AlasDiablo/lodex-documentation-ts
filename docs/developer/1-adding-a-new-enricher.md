# Adding a new enricher

You can add new enrichers to lodex. Enrichers are listed in `src/app/custom/enrichers/enrichers-catalog.json`. An enricher is defined by an `id` and an `url` which are mandatory and you can also set links to `doc`, `swagger` or `objectifTDM`:

```json
{
  "id": "post-v1-rnsr-json",
  "url": "https://affiliations-tools.services.inist.fr/v1/rnsr/json",
  "doc": "https://gitbucket.inist.fr/tdm/web-services/tree/master/affiliations-tools#v1%252frnsr%252fjson",
  "swagger": "https://openapi.services.inist.fr/?urls.primaryName=Structuration%20%26%20enrichissements%20d%27affiliations#/affiliations/post-v1-rnsr-conditor",
  "objectifTDM": "https://test-objectif-tdm.inist.fr/2021/12/09/identifiants-rnsr-adresse/",
  "type": "other"
}
```

Texts for title and description of the enricher are in `src/app/custom/translations.tsv`. Translations keys must follow this naming pattern: `ws_{enricher id}_title` or `ws_{enricher id}_description`. For example:
```
"ws_post-v1-rnsr-json_title"	"Affiliation to RNSR"	"Affiliation vers RNSR"
"ws_post-v1-rnsr-json_description"	"Finds the identifier of the National Repository of Research Structures for an affiliation address (with name of the structure)"	"Trouve l’identifiant du Référentiel Nationale des Structure de Recherche pour une adresse d’affiliation (avec nom de la structure)"
```
