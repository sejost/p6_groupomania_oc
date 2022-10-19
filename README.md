# Projet Groupomania

#### _Par Sébastien Jost_

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le
but de cet outil est de faciliter les interactions entre collègues. Le département RH de
Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

## Langages de programmation utilisée

-   HTML
-   SCSS/CSS
-   React.js
-   Node.js
-   Express

## Mise en place du projet

Télécharger le dépôt github ou cloner le directement depuis un IDE.

### Installation de l'API/BackEnd

#### Préparation de l'environnement Backend

Côté Backend :
Renommer le fichier `dovEnvExample` en `.env`

```sh
DBSERVER = '<Préciser ici l`adresse de votre serveur de base de données et l`authentification>'
PORT = '<Port de connexion de l`API>' : défaut : 8000
RANDOMSTRING = '<Introduire ici une chaîne de caractère aléatoire>'
CLIENT_URL = '<définir ici l`adresse complète (port inclus) du serveur front>' défaut : 'http://localhost:3000'
ADMINID = '<Définir ici l`ID Admin de l`Object ID de votre Base de données>'
```

#### Démarrage du serveur

Ouvrir ensuite le dossier principal du projet dans son IDE, si ce n'est pas encore fait.

-   Faire un `cd backend` depuis le terminal ou ouvrir backend manuellement.
-   Faire `yarn` depuis le terminal pour récupérer l'ensemble des packages Backend
-   Une fois terminé faire `nodemon` pour démarrer le serveur

### Installation de l'Application/FrontEnd

#### Préparation de l'environnement FrontEnd

Côté FrontEnd ou Application :
Renommer le fichier `dovEnvExample` en `.env`

```sh
REACT_APP_API = <'Entrez ici l`adresse de l`API et le port'> défaut : 'http://localhost:8000/'
REACT_APP_ID = <'Indiquez ici la valeure que le ADMINID du `.env` Backend'>
```

### Démarrage de l'Application

Depuis le dossier principal du projet :

-   Faire un `cd application` depuis le terminal ou ouvrir application manuellement.
-   Faire `yarn` depuis le terminal pour récupérer l'ensemble des packages FrontEnd
-   Une fois terminé faire `yarn start` pour démarrer l'application
-   L'application démarre toute seule sinon ouvrir une page web avec l'adresse et le port de votre application par défaut `http://localhost:3000`

## Lien du projet

| Dépôt  | Lien                                        |
| ------ | ------------------------------------------- |
| GitHub | https://github.com/sejost/p7_groupomania_oc |
