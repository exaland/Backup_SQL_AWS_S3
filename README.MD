# BackupS3

BackupS3 est un projet conçu pour faciliter la sauvegarde et la gestion des fichiers sur Amazon S3.

# Auteur
**Alexandre MAGNIER - Exaland Concept**

## Fonctionnalités

- Sauvegarde automatique des fichiers vers un bucket S3.
- Gestion des versions des fichiers sauvegardés.
- Restauration facile des fichiers depuis S3.
- Configuration simple et personnalisable.

## Prérequis

- PHP >= 7.4
- Composer
- Un compte AWS avec un bucket S3 configuré.

## Installation

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/exaland/backupS3.git
    ```
2. Installez les dépendances avec Node :
    ```bash
    npm install
    ```
3. Configurez vos identifiants AWS dans le fichier `.env` :
    ```
    AWS_ACCESS_KEY_ID=your-access-key
    AWS_SECRET_ACCESS_KEY=your-secret-key
    AWS_BUCKET=your-bucket-name
    AWS_REGION=your-region
    ```

## Utilisation

- Pour lancer une sauvegarde :
  ```bash
  node index.js
  ```

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour toute suggestion ou problème.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.