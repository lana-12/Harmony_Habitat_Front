# Harmony_Habitat (branch => DevMain)

Description: Application pour trouver un lieu d'habitation par critères.

## Aide GitHub

> [!WARNING]
> Ne jamais travailler sur main/master
>
> Toujours vérifier la branche avant de faire une modification ou un commit.

```bash
git status
```

### Changer de branche

```bash
git checkout nomDeLaBranche
```

### Mettre à jour la branche

> [!IMPORTANT]
> Toujours mettre à jour la branche avant de travailler dessus.

```bash
git pull
```

### Créer et changer de branche

```bash
git checkout -b nomDeLaBranche
```

### Push sur GitHub

```bash
git add .
```

```bash
git commit -m "Commentaire de ton commit en anglais"
```

```bash
git push
```

### Supprimer une branche locale avec Git

```bash
git branch -d nom-de-ma-branche
```

## Aide JSON Server

### Lancer le serveur

```bash
json-server --watch db.json --port 3001
```
