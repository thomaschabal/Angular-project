export default {
  site: {
    title: 'A propos du site',
    content: [
      {
        question: 'Comment modérer des photos ?',
        answer:
          'La modération de photos n\'est pas encore implémentée sur ce site. Elle l\'était sur la première version et c\'est donc' +
          ' cette première version qu\'il faudra toujours utiliser. <br/>' +
          'Pour modérer, il faut donc cliquer sur le bouton <i>"Modération"</i> de ce tableau de bord, qui redirige vers la page de ' +
          'modération de l\'ancien site web. <br/>' +
          'Il est très important d\'effectuer la modération des photos, sinon les photos des gens ne seront pas visibles sur le site ' +
          'et personne ne voudra plus en poster'
      },
      {
        question: 'Comment mettre en ligne des photos ?',
        answer:
          'Pour mettre en ligne des photos, il est d\'abord important de les exporter dans le bon format. Ce qui ralentit le chargement' +
          ' des photos dans les galeries, c\'est la taille des fichiers. Il faut donc procéder ainsi :<ol>' +
          '<li>Retoucher les photos sous Lightroom (classique)</li>' +
          '<li>Exporter les photos en mettant dans les paramètres <i>"Limiter la taille des fichiers à 500ko"</i> (voire moins) et la ' +
          'qualité à 120ppp.</li>' +
          '<li>Sauvegarder aussi les photos dans leur taille normale pour les stocker sur le DD du club (et on sait jamais les ' +
          'uploader plus tard sur le site, si le réseau est plus rapide, la 5G, toussatoussa).</li>' +
          '<li>Uploader les photos sur le site dans la bonne galerie (easy).</li></ol>' +
          'C\'est tout !'
      }
    ]
  },
  updates: {
    title: 'Mettre à jour les infos du Ponthé (voir le fichier <a href="https://github.com/ENPC-Ponthe/Angular-project/blob/testing/' +
    'Maintain.md"><i>Maintain.md</i></a> pour plus d\'infos)',
    content: [
      {
        question: 'Comment ajouter un appareil réservable ?',
        answer:
          'Si vous avez un nouveau truc à faire emprunter par les gens, il suffit de modifier le fichier Materiel.ts qui se trouve ' +
          'dans <i>src/app/constants/Materiel.ts</i>. 3 petites lignes et le tour est joué !'
      },
      {
        question: 'Comment ajouter une nouvelle promo de Ponthé ?',
        answer:
            'Pour ajouter une nouvelle promo, il suffit de :<ol>' +
            '<li>Modifier le fichier <a href="https://github.com/ENPC-Ponthe/Galeries/tree/testing/web/app/instance/assets/data"><i>' +
            'members.json</i></a> en y ajoutant les nouveaux membres et la nouvelle promo</li>' +
            '<li>Ajouter la nouvelle promotion dans le fichier <a href="https://github.com/ENPC-Ponthe/Angular-project/blob/' +
            'testing/src/app/constants/style/Images.scss"><i>Images.scss</i></a> en y ajoutant des photos représentant l\'équipe, ' +
            'à la fois dans les variables <i>$PONTHE-PROMO-IMAGES-LARGE</i> et <i>$PONTHE-PROMO-IMAGES-SMALL</i> (i.e. pour web et ' +
            'mobile).</li>' +
            '<li>Mettre à jour la constante <i>$INDEX-PONTHE-TROMBI</i> dans le même fichier, en indiquand l\'index du trombi dans ' +
            'les images $PONTHE-PROMO-IMAGES-X (mettre l\'index à -1 s\'il n\'y a pas de trombi).</li>' +
            '<li>Mettre à jour la constante <i>NUMBER_PICS_BY_PONTHE_TEAM</i> présente dans le fichier <a href="https://github.com/' +
            'ENPC-Ponthe/Angular-project/blob/testing/src/app/constants/Images.ts"><i>Images.ts</i></a> avec le nombre de photos ' +
            'ajoutées.</li></ol>' +
            'C\'est bon !'
      },
      {
        question:
          'Comment ajouter des photos pour une promo pour l\'onglet Membres ?',
        answer:
            'Tout simple : <ol>' +
            '<li>Ajouter les photos dans <a href="https://github.com/ENPC-Ponthe/Angular-project/tree/testing/src/assets/images/' +
            'ponthe_teams"><i>ce dossier</i></a></li>' +
            '<li>Ajouter ces photos dans les constantes <i>$PONTHE-PROMO-IMAGES-LARGE</i> et <i>$PONTHE-PROMO-IMAGES-SMALL</i> de ' +
            '<a href="https://github.com/ENPC-Ponthe/Angular-project/blobtesting/src/app/constants/style/Images.scss"><i>Images.scss' +
            '</i></a></li>' +
            '<li>Si besoin, mettre à jour la constante <i>$INDEX-PONTHE-TROMBI</i> dans le même fichier.</li>'
      }
    ]
  },
  donnees: {
    title: 'Modifier les données',
    content: [
      {
        question:
          'Comment changer le statut d\'un utilisateur (admin ou pas, sa promo, etc) ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="https://ponthe-testing.enpc.' +
            'org/phpmyadmin/"><i>Se connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>users</i>.'
      },
      {
        question: 'Comment changer la date d\'une galerie ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="https://ponthe-testing.enpc.' +
            'org/phpmyadmin/"><i>Se connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>resources</i> +' +
            '(en retrouvant la ressource à partir de la table <i>galleries</i>).'
      },
      {
        question:
          'Comment changer la description d\'une galerie (et le message qui apparait sur la page d\'accueil) ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="https://ponthe-testing.enpc.' +
            'org/phpmyadmin/"><i>Se connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>galleries</i>).'
      }
    ]
  },
  ameliorations: {
    title: 'Améliorer le site',
    content: [
      {
        question: 'Comment traduire le site dans une nouvelle langue ?',
        answer:
            'Quelques petites étapes toutes simples pour ce processus, couramment appelé <i>I18N</i> pour Internationalization (I et N ' +
            'sont les première et dernière lettre, et il y a 18 lettres entre. C\'est pas moi qui l\'ai inventé, ça existe vraiment ' +
            '!): <ol>' +
            '<li>Crée un nouveau fichier avec le digraphe de la langue que tu ajoutes (par exemple <i>"zh"</i> pour chinois, <i>"pt"</i> ' +
            'pour portugais, etc), fichier dans lequel tu copies-colles le contenu de <a href="https://github.com/ENPC-Ponthe/Angular-' +
            'project/blob/testing/src/assets/i18n/fr.json">celui-ci</a>.</li>' +
            'Remplace toutes les traductions de ce nouveau fichier par les nouvelles (attention : ne touche pas aux clés de traduction, ' +
            'uniquement aux phrases à traduire !)</li>' +
            '<li>Rajoute dans <a href="https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/constants/Languages.ts">ce ' +
            'fichier</a> le digraphe de la langue que tu as rajoutée dans la constante <i>LANGUAGES</i> et le drapeau de la langue dans ' +
            '<i>FLAGS_BY_LANG</i></li>' +
            'Et le tour est joué !'
      },
      {
        question:
          'Comment rajouter des liens vers des medias sociaux (Fb, Linkedin) dans les footer de page ?',
        answer:
            'Rajoute les lignes qui vont bien dans <a href="https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/constants' +
            '/ExternalLinks.ts">ce fichier</a>.'
      },
      {
        question: 'Comment changer la vidéo de la page d\'authentification ?',
        answer:
            'Change la variable PATH_AUTH_VIDEO dans <a href="https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/' +
            'constants/Images.ts">ce fichier</a> pour la faire pointer vers la bonne vidéo, que tu auras bien sûr mise dans le ' +
            '<a href="https://github.com/ENPC-Ponthe/Angular-project/tree/testing/src/assets/images">bon dossier</a>.'
      },
      {
        question: 'Comment changer les photos des pages reset et new-account ?',
        answer:
            'Modifie les constantes $AUTH-BG-SLIDER-IMAGES-LARGE et $AUTH-BG-SLIDER-IMAGES-SMALL dans <a href="https://github.com/' +
            'ENPC-Ponthe/Angular-project/blob/testing/src/app/constants/style/Images.scss">ce fichier</a> pour les faire pointer ' +
            'vers les bonnes photos, que tu auras bien sûr mises dans le <a href="https://github.com/ENPC-Ponthe/Angular-project/' +
            'tree/testing/src/assets/images/auth_pics">bon dossier</a>.'
      },
      {
        question: 'Comment ajouter des tutos ici ?',
        answer:
            'Il faut convient de (t\'as vu comme je parle bien!) modifier le fichier <a href="https://github.com/ENPC-Ponthe/' +
            'Angular-project/tree/testing/src/app/constants/Tutoriels.ts">Tutoriels.ts</a> (celui dans lequel est écrit cette phrase).'
      },
      {
        question: 'Comment développer le site ?',
        answer: 'Il suffit de produire du code sur l\'un des deux repos suivants:<ul>' +
            '<li><a href="https://github.com/ENPC-Ponthe/Galeries">Galeries</a> : Il s\'agit du site originel, qui contient ' +
            'notamment la partie back-end du site, i.e. la gestion de la base de données et l\'API. C\'est principalement du ' +
            'Python (Flask)</li>' +
            '<li><a href="https://github.com/ENPC-Ponthe/Angular-project">Angular-project</a> : c\'est la partie front-end du ' +
            'site, chargée donc par ton navigateur quand tu te connectes sur le site. C\'est développé en Angular 7, et il faut ' +
            'bien sûr connaître HTML, CSS et éventuellement SCSS;</li>'
      }
    ]
  }
};
