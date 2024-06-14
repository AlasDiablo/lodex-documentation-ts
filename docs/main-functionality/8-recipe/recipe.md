# Les recettes

Lodex permet l’enrichissement et le traitement des colonnes du jeu de données à travers l’usage de web service. Cette
fonctionnalité peut également être utilisées en “mode avancé” pour créer de nouvelle colonne à partir des colonnes
existantes, voici quelques recettes prêtes à l’emploi :

## Créer une colonne avec une valeur fixe et identique

```ini
[assign]
path = value
value = fix('OK')
```

Ces instructions créent une colonne où chaque ligne a comme valeur “OK”

## Créer une colonne avec une valeur fixe et identique (bis)

```ini
[assign]
path = value
value = OK
```

Ces instructions créent une colonne où chaque ligne a comme valeur “OK”

## Créer un champ booléen indiquant  la présence de certaines valeurs

```ini
[assign]
path = contientAouB
value = get('value).castArray().some(v =>  ['VAL A', 'VAL B'].includes(v))
```

Ces instructions créent une colonne (contientAouB) contenant une valeur booléenne indiquant si certaines valeurs (VAL A
ou VAL B) sont contenues dans une liste ou un tableau de chaines de caractères (value).

## Créer un champ booléen indiquant  la présence de certaines valeurs (bis)

```ini
[assign]
path = contientPresqueMIL
value = get('value').castArray().some(v => String(v).search(/mil[aeiuo]+/i) !== -1 )
```

Ces instructions créent une colonne (contientPresqueMIL) contenant une valeur booléenne indiquant si certaines valeurs
contenues dans une liste ou un tableau de chaines de caractères respectent une expression régulière
particulière ([/mil\[aeiou\]+/i](https://regexr.com/73se0)).

## Créer une colonne à partir de la valeur d’un objet d’une autre colonne

```ini
[assign]
path = value
value = get('value.unpaywall.is_oa')
```

Ces instructions créent une colonne contenant une valeur (is\_oa) contenu dans l’objet d’une autre colonne (unpaywall)

## Créer une colonne à partir de la valeur modifiée d’une autre colonne

```ini
[assign]
path = value
value = get('value.definition@fr', 'VIDE').toLower().prepend('PREFIX>').append('<SUFIXE')
```

Ces instructions créent une colonne où chaque ligne contient la valeur de la colonne “definition@fr” mise en minuscule
et à laquelle est ajouté un préfixe et un suffixe. Si la colonne “definition@fr” est vide ou n’existe pas, la valeur par
défaut sera “VIDE”.

## Remplacer les lignes vides ou inexistantes d’une colonne par un texte prédéfini

```ini
[assign]
path = value
value = get('value.definition@en')

[swing]
test = get('value').isEmpty()

[swing/assign] 
path = value 
value = fix('non renseigné')
```

Ces instructions remplacent les lignes vides ou inexistantes par la chaîne “non renseigné”.

## Modifier le contenu de toutes les lignes d’une colonne sans en créer une nouvelle

```ini
[assign]
path = value
value = get('value.title').capitalize()
```

Ces instructions transforment toutes les valeurs de la colonne “title” en s’assurant que le premier caractère sera en
majuscule et que les suivants seront en minuscule.

IMPORTANT : pour modifier directement une colonne, il est nécessaire de créer un enrichissement ayant le même nom que la
colonne à modifier.

## Remplacer  la colonne URI générée automatiquement par une colonne préexistante

```ini
[assign]
path = value
value = get('value.UT')
```

Ces instructions utilisent la colonne “UT” pour remplacer la colonne “uri” générée automatiquement.

NOTE : pour modifier directement une uri, il est nécessaire de créer un enrichissement ayant comme nom “uri”.

WARNING : la colonne uri doit impérativement contenir des valeurs distinctes. Si ce n’est pas le cas, la publication et
d’autres enrichissements seront impossibles.

## Créer une colonne URI avec valeurs distinctes.

```ini
[identify]
path = value
```

## Ajouter un identifiant pérenne de type ARK

```ini
[assign]
path = value
value = get('value.uri')

[expand]
size = 10
path=value
[expand/URLConnect]
url = https://ark-tools.services.inist.fr/v1/67375/stamp?subpublisher=XXX
```

Ces instructions vont attribuer un identifiant pérenne à chaque ligne. XXX est à remplacer par le code du “subpublisher”
approprié et enregistré dans le registre de
l’Inist : [http://inist-registry.ark.inist.fr/](http://inist-registry.ark.inist.fr/)

WARNING : Chaque identifiant ARK créé par ce web service est créé uniquement une seule fois. Si il n’est pas utilisé,
l’identifiant est perdu.

ASTUCE : Pour remplacer l’uid attribué automatiquement par Lodex, il suffit de créer un enrichissement nommé **uri**.

## Remplacer des UID par des identifiants ARK

```ini
[assign]
path = value
value = get('value.uri')

[swing]
test = get('value').startsWith('uid:/')

[swing/expand]
size = 10
path = value
[swing/expand/URLConnect]
url = https://ark-tools.services.inist.fr/v1/67375/stamp?subpublisher=XXX
```

Ces instructions vont attribuer un identifiant pérenne à chaque ligne si et seulement si elle possède un uid comme uri.
XXX est à remplacer par le code du “subpublisher” approprié et enregistré dans le registre de
l’Inist : [http://inist-registry.ark.inist.fr/](http://inist-registry.ark.inist.fr/)

WARNING : Chaque identifiant ARK créé par ce web service est créé uniquement une seule fois. Si il n’est pas utilisé,
l’identifiant est perdu.

ASTUCE : Pour remplacer l’uid attribué automatiquement par Lodex, il suffit de créer un enrichissement nommé **uri**.

## Créer une colonne avec le préfixe d’un DOI

```ini
[assign]
path = value
value = get('value.DI').split('/').head()
```

## Modifier et/ou corriger certaines valeurs d’une colonne

```ini
[assign]
path = value
value = get('value.Revue').replace('Nature Phys.','Nature Physics.')
```

NOTE : pour modifier directement une colonne, il est nécessaire de créer un enrichissement ayant comme nom le même nom
que la colonne à modifier.

## Modifier et/ou corriger certaines valeurs dans un tableau

```ini
[assign]
path = value
value = get('value.affiliations').map(item=>item.replace("shs","Sciences de l'Homme et Société"))
```

Afin de pouvoir modifier des valeurs au sein d’un tableau sans modifier la structure, il convient d’utiliser ‘replace’ à
l’intérieur de la fonction ‘map’. Cette fonction renvoie un tableau après itération sur chacun de ses éléments.

## Créer une colonne en s’assurant que toutes les lignes contiennent un tableau (même vide)

```ini
[assign]
path = value
value = get("value.Entités nommées (Unitex).placeName", [])
```

Ces instructions créent une colonne à partir du sous champ “placeName” de la colonne “Entités nommées (Unitex). S’il n’y
a pas de valeur, le tableau sera vide.

## Créer une colonne en séparant des champs multivalués (en fonction d’un séparateur) en vue de leur enrichissement

```ini
[assign]
path = value
value = get("value.Keywords").toString().split(';').filter(Boolean)
```

Ces instructions créent une colonne à partir du champ “Keywords” en découpant chaque ligne en fonction du
caractère “;” . Le résultat est un tableau de valeur.

## Créer une colonne à partir de la concaténation de deux autres colonnes

```ini
[assign]
path = value
value = fix(self.value.Title, self.value.Abstract).join('>')

; si il y a des espaces dans le nom des champs, on écrira
value = fix(self.value["Le champ Title"], self.value["Le champ Abstract"]).join('>')
```

Ces instructions créent une colonne à partir des champs “Title” & “Abstract” en les concaténant dans une même colonne.
Dans cet exemple, les 2 valeurs seront collées avec le caractère “>”

## Créer une colonne à partir de la concaténation de deux autres colonnes (bis)

```ini
[assign]
path = value
value = get("value.Title").append(">").append(self.value.Abstract)
```

Ces instructions créent une colonne à partir des champs “Title” & “Abstract” en les concaténant dans une même colonne.
Dans cet exemple, les 2 valeurs seront collées avec le caractère “>”

## Créer un objet par défaut pour toutes les lignes qui contiennent la valeur n/a

```ini
[assign]
path = value
value = get("value.loterre")

[swing]
test = get('value').isEqual('n/a')
[swing/replace]
path = value.information
value = Aucune réponse
```

Ces instructions créent une colonne à partir du champs “loterre” et remplacent toutes cellules contenant la valeur **n/a
** par un objet :

```json
{ information: "Aucune réponse" }
```

## Récupérer dans une liste d’objets deux valeurs simples

```ini
[assign]
path = value
value = get('value.concepts loterre').map(item => _.pick(item, ['prefLabel@en', 'about']))
```

Ces instructions créent une colonne à partir d’une liste d’objets en simplifiant chaque objet pour ne garder que 2
champs différents de chaque objet.  
Dans cet exemple, seules les propriétés ‘prefLabel@en’ et ‘about’ seront conservées. Les autres champs de l’objet sont
ignorés.

## Récupérer dans un valeur dans une liste de  liste d’objets

```ini
[assign]
path = lesAdresses
value = get('auteurs').map('affiliations').flatten().map('address')
```

Ces instructions créent une colonne des adresses contenues dans l’objet affiliation lui-même étant dans l’objet address.
Les champs affiliations et address sont des listes d’objets, on utilisera donc “map” à la place de “get”.

## Transformer une liste d’objets en liste de valeurs simples

```ini
[assign]
path = value
value = get("value.Catégories").map((categorie) =>`${categorie.rang}-${categorie.code.value}`))
```

Ces instructions créent une colonne à partir d’une liste d’objets en créant une chaîne de caractères composée par 2
champs différents de chaque objet.  
Dans cet exemple, “item.rang” et “item.code.value” seront collées avec le caractère “-”. Les autres champs de l’objet
sont ignorés.

## Transformer une liste d’objets en liste de valeurs simples (bis)

```ini
[assign]
path = value
value = get("value.Domaines").map((domaine, i) => `${i+1} - ${domaine.code.value}`)
```

Ces instructions créent une colonne à partir d’une liste d’objets en créant une chaîne de caractères composée par 2
champs différents de chaque objet.  
Contrairement à l’exemple précédent, le rang est calculé automatiquement à partir de l’indice de l’élément dans le
tableau.

## Filtrer une liste de valeurs avec une autre liste (intersection)

```ini
[assign]
path = value
value = get("value.pays").filter(x => ['ITALIE', 'ALLEMAGNE', 'FRANCE', 'BELGIQUE'].includes(x))
```

Ces instructions créent une colonne à partir d’une liste de pays en s’assurant qu’ils ont présents dans une liste
spécifique.  
Dans cet exemple, la liste résultant du traitement contiendra uniquement les pays déclarés dans le liste de 4.

## Filtrer une liste de valeurs avec une autre liste (différence)

```ini
[assign]
path = value
value = get("value.pays").pull('ITALIE', 'ALLEMAGNE', 'FRANCE', 'BELGIQUE')
```

Ces instructions créent une colonne à partir d’une liste de pays en excluant les pays présents dans une liste
spécifique.  
Dans cet exemple, les 4 pays seront exclut de la liste résultant du traitement. La fonction pull ne prend comme
arguments que des valeurs.

## Filtrer une liste de valeurs débutant par…

```ini
[assign]
path = value
value = get("value.affiliations").filter(value=> !value.startsWith("E-mail"))
```

Ces instructions créent une colonne à partir d’une liste d’affiliations en excluant les emails qui se sont glissés dans
le tableau de valeurs des affiliations. Contrairement à ‘pull’, la fonction ‘filter’ permet de déclarer des fonctions
comme arguments. Ici ‘startsWith’ capture toutes les valeurs commencant par “E-mail’ (si Email est situé autre part dans
la chaîne, il ne sera pas filtré) et l’opérateur “!” permet d’inverser le filtre afin de renvoyer tout sauf les valeurs
capturées.

## Remplacer une valeur en fonction d’un dictionnaire de correspondance

```ini
[env]
path = dictionary
value = fix({\
   "deutschland":"germany",\
   ...
   "allemagne":"germany"\
})

[assign]
path = value
value = get("value.Pays").castArray().map(item => _.get(env("dictionary"), item, item)).uniq()
```

Ces instructions créent une colonne à partir d’un champ Pays, contenant une ou plusieurs valeurs. Si une valeur est
trouvée dans le dictionnaire (nommé dictionary), par exemple “allemagne”, cette valeur sera remplacée par la valeur
correspondante dans le dictionnaire, par exemple “germany”.

## Remplacer une valeur en fonction d’un dictionnaire de correspondance via un fichier CSV distant

```ini
[assign]
path = value
; Choix du champ Lodex à rechercher dans le dictionnaire
value = get("value.Type de publication")

[combine]
path = value
; URL vers un fichier CSV accessible via internet
primer = https://publication-type.data.istex.fr/api/export/csv
; nom du fichier temporaire local (facultatif, évite de télécharger le fichier plusieurs fois)
cacheName = istex-publication-type
default = n/a

[combine/URLStream]
path = false

[combine/CSVParse]
; Choix du séparateur : virgule, point-virgule, etc.
separator = fix(";")

[combine/CSVObject]

[combine/replace]
path = id
; Choix de la colonne du fichier CSV à mettre en correspondance 
value = get('titre')
path = value
value = self()
```

Ces instructions créent une colonne à partir d’un champ “Type de publication”. Si une valeur est trouvée dans la colonne
“titre” du fichier CSV distant (https://publication-type.data.istex.fr/api/export/csv), alors cette valeur sera
remplacée par un objet contenant toutes les informations contenues dans la ligne correspondante du fichier CSV.

## Nettoyer une liste de termes (simple)

```ini
[assign]
path = value
value = get('Termes génériques').map(v => String(v).trim())
```

Ces instructions suppriment les caractères parasites au début et en fin de chaque terme de la liste.

## Nettoyer une liste de termes (avancé)

```ini
[assign]
path = value
value = get('Termes génériques').map(v =>_.chain(v).deburr().replace(/[^\w]/, ' ').replace(/\s+/, ' ').trim().lowerCase().value())
```

Ces instructions appliquent une série de transformation sur l’ensemble des termes d’une liste.  
Dans cet exemple *deburr* supprimera les caractère accentués, *replace* supprimera tous les caractères non
alphanumériques et remplacera tous les espaces doubles par des espaces simples, *trim* supprimera les espaces en fin et
début de mot, et *lowerCase* mettra tous les mots en minuscules.

## Nettoyer une liste de termes de toutes ses valeurs ‘falsy’ et/ou de ses doublons

```ini
[assign]
path = value
value = get('Termes génériques').compact().uniq()
```

Ces instructions permettent de retirer toutes les valeurs ‘falsy’ dans un tableau de valeurs. ‘compact’ retire les
valeurs : false, null, 0, “”, undefined et NaN. La fonction ‘uniq’ conserve la 1ère occurence des valeurs présentent
plusieurs fois dans le tableau. \[“A”,”B”,null,”A”,”C”\] devient \[“A”,”B”,”C”\].

## Inverser des valeurs dans un tableau (simple)

```ini
[assign]
path=value
value=get("value.nomdecolonne").reverse()
```

Cette instruction inverse les valeurs à l’intérieur d’un tableau. \[“A”,”B”,”C”\] devient \[“C”,”B”,”A”\]

## Inverser des bouts de chaîne de caractères (avancé)

```ini
[assign]
path=value
value=get("value.nomdecolonne").map(x=>x.split(", ").reverse().join(", "))
```

Cet enchaînement d’instructions transforme, par itération, des chaînes de caractères contenues dans un tableau.  
Dans un tableau de type noms d’auteurs tel que \[“Durand, Jacques”,”Dubois, Daniel”\] on modifie chaque valeur (map) que
l’on transforme en tableau afin d’inverser l’ordre, puis on la restitue en string. Ce qui donne \[“Jacques,
Durand”,”Daniel, Dubois”\].

## Créer une colonne avec une valeur JSON

```ini
[assign]
path = value
value = get('value.jsonValue').thru(JSON.parse)
```

Ces instructions créent une colonne à partir d’une autre colonne (nommée *jsonValue*) contenant des valeurs formatées en
JSON.

## Créer une liste d’objets avec des propriétés issues de différentes colonnes

```ini
[assign]
path = value
value = fix({ark:self.value.EnrichIstex.ark,sourceUidChain:self.value.EnrichConditor['business/sourceUidChain']})
```

Ces instructions créent une colonne contenant une liste d’objets sur la base de valeurs contenues dans 2 colonnes
distinctes (EnrichIstex et EnrichConditor ici). La structure objet est créée gràce à fix(\{\}) , les propriétés sont
créées avec “ark:” et “sourceUidChain:” (on donne le nom que l’on souhaite) et séparées par une virgule. Les valeurs
dynamiques sont récupérés par “self.value” suivi du nom de la colonne, puis du champ en particulier. Cela donne par
exemple : \{“ark”:”ark:/67375/WNG-NVGLRQV3-C”,”sourceUidChain”:”!hal$hal-03566649!”\}

## Créer une matrice où les éléments des tableaux sont associés en fonction de leur position

Cette fonction est notament utile pour rassembler des données issues du dataset de base avec des résultats
d’enrichissement par exemple.

```ini
[assign]
path = value
value = zip(self.value.TableauA, self.value.TableauB)
```

La fonction ‘zip’ va ici créer une matrice en associant les deux tableaux suivants : TableauA : \[“A”,”B”,”C”,”D”,”E”\]
TableauB : \[1,2,1,9,0\]. Tous les éléments possédant le même index dans leur tableau respectif seront alors associés
dans un tableau, renvoyant une matrice telle que : \[\[“A”, 1\], \[“B”, 2\], \[“C”, 1\], \[“D”, 9\], \[“E”, 0\]\]

! Attention, il faut s’assurer que les tableaux aient le même nombre d’éléments. Si l’on avait réalisé un dédoublonnage
avec ‘uniq’ sur le TableauB (ou ‘compact’ si on a des null, false…), alors le TableauB serait \[1,2,9,0\] et le zip
renverrait donc : \[\[“A”, 1\], \[“B”, 2\], \[“C”, 9\], \[“D”, 0\], \[“E”, undefined\]\]

## Réduire une collection (tableau ou objet) à une seule valeur

Nous reprennons ici la collection créée dans **“Créer une liste d’objets avec des propriétés issues de différentes
colonnes”.** Nous voulons savoir si un document est disponible dans Istex, Conditor, les deux bases ou aucune.

```ini
[assign]
path = value
value = fix({ark:self.value.EnrichIstex.ark,sourceUidChain:self.value.EnrichConditor['business/sourceUidChain']}).reduce((result, value, index, collection)=>
{ if(collection.ark && !collection.sourceUidChain){return "Istex"} if(collection.ark && collection.sourceUidChain){return "Istex & Conditor"} 
if(!collection.ark && collection.sourceUidChain){return "Conditor"} return result},"Aucune Base")
```

La fonction ‘reduce’ va ici tester chaque objet selon des conditions et renverra un résultat spécifique en fonction de
la condition satisfaite. “Aucune base” est l’accumulateur de départ (result). Si un objet contient une propriété “ark”
et aucune propriété “sourceUidChain”, alors “Aucune base” est remplacé par “Istex”. A l’inverse, “Conditor” remplacera
“Aucune base”. Si l’objet contient les 2 propriétés à la fois, “Aucune base” sera remplacé par “Istex & Conditor”. Enfin
si aucun cas de figure n’est vérifié (donc si l’objet est vide), la fonction renverra l’accumulateur inchangé “Aucune
Base”. Dans tous les cas l’objet est réduit à une seule valeur.

## Réduire une collection (tableau ou objet) à un tableau de valeurs spécifiques

Un cas plus complexe ici, où nous souhaitons réduire une matrice. Chaque tableau de la matrice débute par un rnsr et est
suivi d’un ou plusieurs instituts. Nous souhaitons dans cet exemple réduire le tableaux seuls rnsr relevant de
l’institut INSHS

```ini
[assign]
path=value
value=get("value.MatriceRnsrInstituts).reduce((result, item) =>{if (item.slice(1).some(element => element === "INSHS")) {result.push(item[0])}return result},[])
```

La fonction ‘reduce’ va ici itérer sur chaque tableau de la matrice. L’accumulteur de départ est un tableau vide,
déclaré en fin de fonction.’slice’ va décomposer chaque tableau en 2 parties, avec en index 0 le rnsr et en index 1 les
instituts. La fonction ‘some’ va parcourir l’index 1 est vérifiera si un ou plusieurs éléments ont pour valeur “INSHS”.
Si la condition est vérifiée, le nouveau résultat est le tableau vide de départ dans lequel est injecté le rnsr
correspondant (item\[0\]) par la fonction ‘push’.

## Pour aller plus loin

Les recettes Lodex sont composées d’une série d’instructions qui s’enchaînent séquentiellement pour chaque ressource du
dataset.  
Les instructions ont un nom entre crochet, exemple :

```ini
[assign]
```

Chaque instruction possède ou non plusieurs paramètres. Chaque paramètre a un nom et une valeur, exemple:

```ini
[assign]
path = doi 
value = 0.1007/s00300-012-1156-9
```

la valeur d’un paramètre peut être dynamique, c’est à dire calculé à partir de chaque ressource, ces calculs sont
réalisés par un enchaînement de fonctions, une fonction se reconnaît par un nom suivi de parenthèses, exemple:

```ini
[assign]
path = doi
value = get("value.crossrefID")
```

La liste des instructions utilisables dans lodex et leurs paramètres associés est disponible
ici : [https://inist-cnrs.github.io/ezs/#/plugin-core](https://inist-cnrs.github.io/ezs/#/plugin-core)

La liste des fonctions utilisables dans les paramètres est disponible
ici: [https://lodash.com/docs/4.17.15](https://lodash.com/docs/4.17.15)
