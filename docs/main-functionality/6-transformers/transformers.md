# Les “transformers”

Les [transformers](https://www.lodex.fr/docs/glossaire/t/transformer/) sont des opérateurs, appliqués en séquence (quand
on en utilise plusieurs pour le même champ) à la valeur initiale du champ au moment du paramétrage de l’affichage de
données. (Pour séparer une liste d’auteur, …)

## ARRAY

Transforme des données séparées par des virgules en un tableau.

Exemple utilisé pour transformer les catégories Inist de niveau 1, qui n’ont pas de classification en un tableau.

\=> PARSE

\=> GET Classification; Nom

\=> ARRAY

## BOOLEAN

Transforme la valeur du champ en un booléen (dont la valeur ne peut être que true ou false, vrai ou faux). Ceci n’est
utile que si la valeur attendue est un booléen (par défaut, la valeur d’un champ est une chaîne de caractères).

Toute chaîne de caractères valant true, 1, on, ok, oui, yes ou true sera vraie, et toute autre chaîne sera fausse.

## CAPITALIZE

Met la première lettre de la chaîne de caractères en majuscule, et toutes les autres en minuscules.

## DEFAULT

Renvoie une valeur par défaut si la valeur par défaut n’existe pas (vaut null, undefined, 0, “”, c’est-à-dire une des
valeurs falsy de Javascript).Remarque : faites attention au type de la valeur de départ (en particulier si vous
manipulez des nombres), car “0” est différent de 0, et sa valeur de vérité différente. C’est pourquoi vous pouvez
vouloir utiliser un opérateur de transtypage, comme BOOLEAN, STRING, ou NUMBER.

## FORMAT

Renvoie une chaîne de caractères incluant la valeur et les caractéristiques données en paramètre.

“hello” =>“\<%s\>” => “\<hello\>”

## GET

*Même fonction que SELECT en plus complexe*

Permet de sélectionner une partie d’un objet JSON, on obtient une chaine de caractère.

Permet d’associer plusieurs sous-champs.

Concatène plusieurs sous-champs pour tous les éléments du tableau.

Pour plusieurs colonnes séparées par “;” \{ a: \{ aa: 1, bb: 1 \}, b: 2 \} utiliser GET et “a.aa;a.bb” comme paramètre ,
récupère \[1, 1\] en sortie

Dans le cas des classification WoS…

Il faut lui donner le nom du ou des objet(s) à sélectionner (=sous-champ JSON) GET Classification;Nom = \* 1 – XXX, 2 –
XXX, 3 – XXX \* 1 – XXX, 2 – XXX, 3 – XXX

\[\{“Nom”:\[“3 – microbiology”\],”Classification”:\[“1 – health sciences”,”2 – biomedical research”\],”Outils”:
\[“multicat”\]\}\] =>path :Classification; Nom => \[\[“1 – health sciences”,”2 – biomedical research”\]\]

Associé au transformer PARSE, il est utilisé pour pointer sur la classification associée à chaque nom d’espèce ou chaque
catégorie d’une ressource.

## JOIN

Rassemble les éléments d’un tableau dans une chaîne de caractères, en les séparant par la chaîne fournie par le
paramètre.

\[ “hello”, “world” \] =>” dear ” => “hello dear world”

## LOWERCASE

Renvoie la valeur en bas de casse (chaîne de caractères ou tableau de chaînes de caractères).

“HELLO” =>“hello”

## MAPPING

Opération permettant le remplacement à partir d’une table (équivalent à l’enchaînement de plusieurs opérations REPLACE)
.Verbalisation des acronymes d’institut, des langues….

field = keywords

list =”hello”:”bonjour”, “hi”:”salut”

## MASK

Permet de filter (rendre null)les valeurs d’un champ qui correspondent à un masque défini avec des expressions
régulières.

Ex1:  
\=> objet en entrée: \{ a: 2, b: ‘trois’, c: true \}  
\=> paramètre: ^\[a-z\]+$  
\=> objet en sortie: \{ a: 2, b: ‘trois’, c: true \}

Ex2:  
\=> objet en entrée: \{ a: 3, b: ‘un quatre’, c: true \}  
\=> paramètre: ^\[a-z\]+$  
\=> objet en sortie: \{ a: 3, b: null, c: true \}

:::warning

*Ne fonctionne que sur des champs SIMPLES et pas sur des champs TABLEAUX de type multivalués comme JSON*

:::

Exemple :

- sélection des identifiants de type **ISSN** (**XXXX**\-XXXX) dans le champ eprint identifiant qui contient aussi des
  ISBN
- supprimer des données vides comme par exemple dans les facettes.

## NUMBER

Transforme la valeur du champ en un nombre. Ceci n’est utile que si la valeur attendue du champ est un nombre.

## PARSE

Transforme une chaîne de caractères en un objet JavaScript (JSON)

“\[1,2\]”=> \[1,2\]


:::warning

*Un objet JavaScript peut être aussi*
-   une chaîne de caractères “\\”a\\”” => “a”
-   un nombre “1.0” => 1.0
-   un tableau “\[1,\\”a\\”\]” => \[1, “a”\]
-   un objet “\{ a:1, b: \\”s\\” \}” => \{ a:1, b: “s” \}

:::

## PREFIX

Préfixe une valeur de champ avec une chaîne de caractères. Lorsque la valeur est un tableau, la chaîne de caractères est
insérée au début du tableau.

“dear world” => “hello” => “hello dear world”

## REMOVE

Supprime une sous-chaîne d’une chaîne de caractères, ou un élément d’un tableau.

“hello world” => ” world” =>“hello”

## REPLACE

Remplace une chaîne de caractères par une autre.

(“hello world”)=>remplace un mot par un autre (“world” => “you”)=> (“hello you”)

## REPLACE\_REGEX

Remplace une chaine de caractère à partir d’expression régulière

rechercher tous les “outil\*” remplacer par “outillage”

:::warning

*Les regex sont complexes*

:::

- [pour tester et se documenter](https://regex101.com/#javascript)
- [pour visualiser ses tests](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)

## SELECT

Permet de récupérer différentes valeurs dans différents tableaux et de de conserver le tableau lorsqu’une valeur est
unique. Sélectionne l’éléments du tableau à exploiter.

SELECT 1 (= ligne 1)

Associé au transformer PARSE (qui transforme une chaîne de caractères en un objet JavaScript JSON)

## SHIFT

Décale le début de la valeur du champ vers la droite, en fonction du paramètre donné. Ce faisant, il supprime le début
de la valeur. S’applique sur des chaînes de caractères ou des tableaux.

“The world” => 4 => “world”

## SPLIT

Découpe une chaîne de caractères, en séparant les morceaux grâce à la chaîne de caractères passée en paramètre.

Remarque : ce transformer est l’inverse de JOIN

“hello dear world” => ” dear ” => \[ “hello”, “world” \]

## STRING

Transforme la valeur du champ en une chaîne de caractères. Ceci n’est utile que si elle n’est pas déjà une chaîne (type
par défaut), ou si vous voulez supprimer les espaces au début et à la fin d’une chaîne.

Remarque : on peut appliquer une séquence de transformers sur une valeur de champ, ce qui implique que la valeur en
entrée de STRING peut être autre chose qu’une chaîne de caractères.

” hello ” => “hello”

## SUFFIX

Ajoute une chaîne de caractères à la fin de la valeur du champ. Lorsque la valeur est un tableau, la chaîne est ajoutée
à la fin du tableau.

Remarque : c’est l’opération inverse de PREFIX

“hello dear” => ” world” => “hello dear world”

## TRIM

Supprime les espaces au début et à la fin de la valeur du champ quand c’est une chaîne de caractères. Sinon, renvoie la
valeur sans la toucher.

Remarque : sur une chaîne de caractères, STRING fait la même chose.

” hello ” => “hello”

## TRUNCATE

Supprime le dernier élément de la valeur du champ, en fonction du nombre passé en paramètre.

Le nombre indique la position du caractère (ou de l’élément dans le cas d’un tableau) à partir duquel couper la valeur.
La position la plus à gauche a la valeur zéro (0).

Remarque : c’est la transformation inverse de SHIFT.

“hello world” => 5 => “hello”

\[ 1, 2, 3, 4 \] TRUNCATE 2 => \[ 1, 2 \] Pour un tableau

## TRUNCATE\_WORDS

Permet de garder au maximum n mots ( n étant le paramètre numérique)

“Une maison rouge flamboyante dans un pré” => 3=> “Une maison rouge”

## UNIQ

Dédoublonne les valeurs de la valeur du champ quand c’est un tableau. Retourne la valeur quand c’est une chaîne, un
nombre ou un booléen. Renvoie null sinon.

\[ “hello”, “hello” \] => \[ “hello” \]

## UPPERCASE

Renvoie une chaîne de caractères où tous les caractères sont en majuscules.

“hello” => “HELLO”

## URLENCODE

Permet d’éviter les problèmes d’encodage dans les URL

Transforme en “encodage-pourcent” les url en UTF-8  
%20 pour un espace

:::warning

*Ne pas l’appliquer plusieurs fois sur la même URL*

:::


