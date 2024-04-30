# Harmony_Habitat (branch => )

## Architecture Folder scss
    - Components
        - Bout de code réutilisable dans toute l'appli

    - General
        - Pour le reset, variables, mixins...

    - Layout
        - Page de l'appli

> [!Important]
> Pour le nommage des classes mettre le nom de la page 
>        - Soit au début ????
>        - Soit à la fin ????

### Création d'un nouveau fichier
    1. Mettre _nameFile.scss
    2. Importer le new file dans index.scss sans _name.scss et sans extension

```scss
Ex:
@import './general/variables';

```

> [!WARNING]
> Mettre l'import au bon endroit.

### Créer une Variable
```scss
Création:
$nameVariable: value;

Ex:
$grey: #978a8a;

Apel: 
body {
    background-color: $grey;
}
```

### Imbrication

L'imbrication se fait en function de la sémantique de html

```scss
.header {
    .enfant-1A {
        //code here...
        .enfant1 de enfant-1A{
            @include btnCustom($dark, $white, $white, $dark);
            margin: 15px auto;
            &:hover {  -> au survol sur enfant1
                border: 1px solid $dark;
                font-weight: bolder;
            }
        }
    }
    .enfant-2B {
        border: 1px solid $dark;
        @include btnCustom($white, $dark, $dark, $white);
    }
}
```

#### Mixin

```scss
Création:
@mixin btnCustom($bgc, $fgc, $bgcH,
$fgcH) {
    background-color: $bgc;
    color: $fgc;
    ...
    text-decoration: none;
    border-radius: 0%;
    transition: 0.6s;
    transition-property: background-color, color;
    &:hover {
        background-color: $bgcH;
        color: $fgcH;
        cursor: pointer;
    }
}

Apel:
.btnCustom {
    @include btnCustom($white, $warning, $dark, $white);
    ...
        }

```


### MediaQuery
Création de la mixin media-breakpoint pour la partie responsive -> voir file ./general/mixins.scss

Pour les tailles des écrans -> ./general/variables.scss

```scss
// Media query 
// Tjs commencer à styliser en firstMobil
@mixin media-breakpoint($size) {
    @media screen and (min-width: map-get($breakpoints, $size)) {
        @content;
    }
}

```

```scss
Pour l'appel dans les autres files:

/********MEDIA QUERY POUR ECRAN 768px***********/
/******min-width 768px**************/
@include media-breakpoint("md") {
    .exemple {
        //code here
    }
    .autreExemple {
        //code here
    }
}

```

