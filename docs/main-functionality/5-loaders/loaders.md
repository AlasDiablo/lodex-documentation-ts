# Les "loaders"

Dans Lodex, un [**loader**](https://www.lodex.fr/docs/glossaire/l/loader/) un fichier de configuration permettant de
charger/importer dans une instance un jeu de données.

Lodex propose différents loaders, qui correspondent à différents formats source pour le jeu de données à charger :

## Loaders d’import d’un fichier CSV

- **CSV – avec des virgules (csv-comma)**

Pour l’import d’un fichier au format CSV de type “comma” : représentation de données tabulaires sous forme de texte, les
valeurs de chaque cellule étant séparées par des virgules.

- **CSV – avec des points virgules (csv-semicolon)**

Pour l’import d’un fichier au format CSV de type “semicolon” : représentation de données tabulaires sous forme de texte,
les valeurs de chaque cellule étant séparées par des points-virgules.

- **CSV – détection automatique du séparateur (csv)**

Pour l’import d’un fichier au format CSV : représentation de données tabulaires sous forme de texte, les valeurs de
chaque cellule étant séparées par des virgules ou des points-virgules

## Loaders d’import d’un fichier TSV

- **TSV – avec des tabulations (tsv)**

Pour l’import d’un fichier au format TSV : représentation de données tabulaires sous forme de texte, les valeurs de
chaque cellule étant séparées par des tabulations.

- **TSV – avec des tabulations et des guillemets (tsv-double-quotes)**

Pour l’import d’un fichier au format TSV : représentation de données tabulaires sous forme de texte, les valeurs de
chaque cellule étant séparées par des tabulations et encadrées de double quote.

- **TSV – Web Of Science (tsv-wos)**

Pour l’import d’un fichier au format TSV exporté suite à une recherche sur le service Web of Science : représentation
des champs regroupés par ligne et séparés par le caractère tabulation.  
Si le nom de certains champs correspond à une valeur prédéfinie, l’import déclenche des enrichissements automatiques (
découpage des adresses, correction des affiliations avec Netscity, etc.)

Exemple : A partir du champs C1 (affiliation des auteurs d’une publication) du Web of Science, un enrichissement des
données est possible (pas encore opérationnel 14/02/2022)

## Loaders d’import d’un fichier TXT

- **TXT – description de corpus (corpus)**

*expérimental* – Pour l’import d’un fichier ou d’un URL au format .corpus, créé pour les besoins du projet ISTEX. Ce
loader est destiné à créer un corpus de documents ISTEX à partir des identifiants qu’il contient*.*

- **TXT (sur lodex) (XML) – triplets RDF (rdf)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la norme RDF.  
Chaque ressource est construite à partir de la balise XML immédiatement en dessous de la balise racine du
type `<rdf:RDF>`. Cette arborescence est paramétrable. \=> Comment ?

## Loaders d’import d’un fichier JSON

- **JSON – avec un tableau (json)**

Pour l’import d’un fichier au format JSON contenant une liste d’objets (tableau d’objets). Chaque objet est interprété
comme une ressource.  
Exemple : `[{…}, …, {…}]`

**Ce format permet d’échanger un dataset entre une version 12.23 et une version antérieure**

- **JSON – compatible API Conditor (json-conditor)**

Pour l’import d’un fichier au format JSON obtenu avec l’**API Conditor** et contenant contenant une liste d’objets
spécifiques (tableau d’objets).  
Ce loader sélectionne et simplifie les objets extraits de la base Conditor. Il conserve uniquement **119** champs pour
chaque notice Conditor. Chaque objet est interprété comme une ressource.  
Exemple : `[{…}, …, {…}]`

- **JSON – compatible API ISTEX (json-istex)**

Pour l’import d’un fichier au format JSON correspondant à celui généré par l’**API Istex**.  
Le fichier JSON doit comporter un objet contenant un champ **hits**, qui est impérativement un tableau d’objets. Chaque
objet est interprété comme une ressource, les champs autres que hits sont ignorés.  
Exemple : `{hits:[{…}, …, {…}]}`

- **JSON – compatible API Lodex (json-lodex)**

Pour l’import d’un fichier au format JSON correspondant à celui généré par l’**API Lodex**.  
Le fichier JSON doit comporter un champ **data**, qui est impérativement un tableau d’objets. Chaque objet est
interprété comme une ressource. Les champs autres que data sont ignorés.  
Exemple : `{data:[{…}, …, {…}]}`

Ce type de format est généré par le programme HarvestCorpus et par certains exporters Lodex. Dans ce dernier cas, il est
possible d’exporter les données d’une instance Lodex pour les importer dans une autre instance.

- **JSON – compatible ontologie OntoTDM (json-protege)**

*expérimental –*Pour l’import d’un fichier au format JSON-LD, qui décrit un graphe de ressources. Le loader transforme
le graphe en une liste de ressources contenant des sous-ressources.  
Par défaut, le loader garde uniquement comme ressource principale les nœuds RDF correspondant à obo:IAO\_0000594. Cette
valeur est paramétrable. =>Comment ?

En JSON-LD il est courant de désigner un champ par une URI (ce qui est incompatible avec une base MongoDB). Le loader
cherche à remplacer toutes les URI pas des URI avec préfixe. La liste est paramétrable. S’il oublie une URI, l’import
échouera.

- **JSON import Lodex (export dataset de Lodex)**

Pour l’import d’un jeu de données exporté depuis l’administration (Exporter le jeu de données). Attention, depuis la
version 12.23.0 cet export est au format [JSON Lines](https://jsonlines.org/) (avec une extension `.jsonl`), et plus au
format JSON.  
Remarque: le format JSON Lines permet d’exporter (et d’importer) de plus gros volumes de données.

**Il ne sera donc possible que pour des instances dans la même version de Lodex (échange entre 2 instances de version
supérieur ou égale à 12.23)**

## Loaders d’import d’un fichier XML

- **XML – détection automatique du chemin (xml)**

Pour l’import d’un fichier ou d’un URL au format XML. Ce loader cherche à détecter automatiquement la norme utilisée.  
Chaque ressource est construite à partir d’une balise XML connue dans une liste prédéfinie, qui est paramétrable.

- **XML – document TEI (tei)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la
norme [TEI](https://fr.wikipedia.org/wiki/Text_Encoding_Initiative). Cette norme est principalement utilisée pour
représenter des textes.  
Chaque ressource est construite à partir d’une balise `<tei>`. Celui-ci doit être immédiatement en dessous de la balise
racine du type `<teiCorpus>`. Cette arborescence est paramétrable.

- **XML – flux ATOM(atom)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la norme de
syndication [ATOM](https://fr.wikipedia.org/wiki/Atom_Syndication_Format). Cette norme est principalement utilisée par
les blogs pour rendre accessible leurs articles dans des sites tiers (syndication).  
Chaque ressource est construite à partir des métadonnées de chaque article contenu dans le flux ATOM. Les métadonnées du
site en lui-même sont ignorées.

- **XML – flux RSS (rss)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la norme de
syndication [RSS](https://fr.wikipedia.org/wiki/RSS). Cette norme est principalement utilisée par les blogs pour rendre
accessible leurs articles dans des sites tiers (syndication).  
Chaque ressource est construite à partir des métadonnées de chaque article contenu dans le flux RSS. Les métadonnées du
site en lui-même sont ignorées.

- **XML – métadonnées MODS (mods)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la
norme [MODS](https://fr.wikipedia.org/wiki/Metadata_Object_Description_Schema). Cette norme est principalement utilisée
pour représenter des données bibliographiques.  
Chaque ressource est construite à partir d’une balise `<mods>`. Celui-ci doit être immédiatement en dessous de la balise
racine du type `<modsCollection>`. Cette arborescence est paramétrable.

- **XML – vocabulaire SKOS (skos)**

Pour l’import d’un fichier ou d’un URL au format XML respectant la
norme [SKOS](https://fr.wikipedia.org/wiki/Simple_Knowledge_Organization_System). Cette norme est principalement
utilisée pour représenter des thésaurus documentaires, classifications ou d’autres types de vocabulaires contrôlés ou de
langages documentaires.  
Chaque ressource est construite à partir d’un concept SKOS. Celui-ci doit être décrit dans une balise XML immédiatement
en dessous de la balise racine du type `<rdf:RDF>`. Cette arborescence est paramétrable.

- **ZIP – résultat de dl.istex.fr (zip)**

Pour l’import d’un répertoire compressé contenant un corpus téléchargé avec ISTEX-DL, en format zip.Ce répertoire
contient, pour chaque document du corpus, un répertoire de fichiers avec a minima le fichier JSON issu de l’API ISTEX
contenant les métadonnées du document.  
Le loader traite 59 champs de métadonnées des fichiers JSON du corpus, afin de pouvoir les exploiter dans LODEX.

## Loader générique

- **AUTO – avec l’extension du nom de fichier**

Le loader détermine automatiquement le format des données selon l’extension du jeu de données, en se fondant sur
l’analyse de la première colonne du fichier à importer.  
Ce loader doit donc pouvoir trouver dans les données explorées un séparateur (tabulation, point virgule) lui permettant
de détecter la structure du jeu de données.
