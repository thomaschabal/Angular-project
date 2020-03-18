const githubRepo = 'https://github.com/ENPC-Ponthe/Angular-project/';
const githubTree = githubRepo + 'tree/testing/';
const githubBlob = githubRepo + 'blob/testing/';
const githubGaleriesRepo = 'https://github.com/ENPC-Ponthe/Galeries/';
const githubGaleriesTree = githubGaleriesRepo + 'tree/testing/';
const phpMyAdmin = 'https://ponthe.enpc.org/phpmyadmin/index.php';

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
      },
      {
        question: 'Comment mettre en ligne des vidéos ?',
        answer:
          '<li>Exporter d\'abord la vidéo en MP4 (codec H.264) en résolution 1080p (a.k.a. 1920x1080). Une résolution supérieure sera ' +
          'acceptée par le serveur, mais pas convertie en 1080p, donc ce sera inutile (à moins de changer le code).</li>' +
          '<li>Créer une galerie vidéo à partir du tableau de bord, en choisissant <em>Vidéo</em> comme type de galerie.</li>' +
          '<li>La galerie vidéo apparaît dans les galeries privées, il faut donc cliquer dessus.</li>' +
          '<li>Dans les options de la galerie, mettre la vidéo en ligne. Le chargement n\'indiquera pas immédiatement quand la vidéo est ' +
          'en ligne puisqu\'il attend que le serveur ait fini son travail (qui est très long). Pour savoir quand on peut fermer la ' +
          'galerie, aller voir la galerie dans la v1 du site. Quand la vidéo apparaît dedans, c\'est que la vidéo est bien mise en ' +
          'ligne.</li>' +
          '<li>Mettre en ligne également une photo dans la galerie : c\'est cette photo qui sera la photo de couverture de la galerie.' +
          '</li></ol>' +
          'Une fois que tout est mis en ligne, on peut recharger la page. On voit alors qu\'on ne peut plus mettre de photo ou vidéo ' +
          'dans la galerie. Si une mauvaise photo ou vidéo a été uploadée, elle peut être supprimée à partir de la v1, comme d\'habitude,' +
          'et l\'upload est alors à nouveau permis jusqu\'à ce que la galerie soit pleine.<br/>' +
          'Du côté du serveur, la vidéo est stockée et des versions en 720p, 480p et 360p sont générées et également stockées. La vidéo ' +
          'n\'est donc pas visionnable immédiatement car il faut attendre que tout ce calcul soit terminé.<br/>' +
          '<strong>Une fois que la vidéo est disponible en entier et dans tous les formats (vérifier manuellement pour voir si ça ' +
          'convient), la galerie est prête à être rendue publique ! :)</strong>'
      },
      {
        question:
          'Comment rajouter un lien utile pour les admins ?',
        answer:
            'Tout simple : Ajouter les informations en question dans <a href="' + githubBlob + 'src/app/constants/UsefulLinks.ts"><i>' +
            'ce fichier</i></a> en suivant la structure des champs. Le site devrait alors se mettre à jour avec ces nouvelles infos :)'
      }
    ]
  },
  updates: {
    title: 'Mettre à jour les infos du Ponthé (voir le fichier <a href="' + githubBlob + 'Maintain.md"><i>Maintain.md</i></a> pour plus ' +
            'd\'infos)',
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
            '<li>Modifier le fichier <a href="' + githubGaleriesTree + 'web/app/instance/assets/data/members.json"><i>members.json</i>' +
            '</a> en y ajoutant les nouveaux membres et la nouvelle promo</li>' +
            '<li>Ajouter la nouvelle promotion dans le fichier <a href="' + githubBlob + 'src/app/constants/style/Images.scss"><i>' +
            'Images.scss</i></a> en y ajoutant des photos représentant l\'équipe, dans la constante <i>$PONTHE-PROMO-IMAGES</i>.</li>' +
            '<li>Mettre à jour la constante <i>$INDEX-PONTHE-TROMBI</i> dans le même fichier, en indiquand l\'index du trombi dans ' +
            'les images $PONTHE-PROMO-IMAGES (mettre l\'index à -1 s\'il n\'y a pas de trombi).</li>' +
            '<li>Mettre à jour la constante <i>NUMBER_PICS_BY_PONTHE_TEAM</i> présente dans le fichier <a href="' + githubBlob +
            'src/app/constants/Images.ts"><i>Images.ts</i></a> avec le nombre de photos ajoutées.</li></ol>' +
            'C\'est bon !'
      },
      {
        question:
          'Comment ajouter des photos pour une promo pour l\'onglet Membres ?',
        answer:
            'Tout simple : <ol>' +
            '<li>Ajouter les photos dans <a href="' + githubTree + 'src/assets/images/ponthe_teams"><i>ce dossier</i></a></li>' +
            '<li>Ajouter ces photos dans la constante <i>$PONTHE-PROMO-IMAGES</i> de <a href="' + githubBlob + 'src/app/constants/style/' +
            'Images.scss"><i>Images.scss</i></a></li>' +
            '<li>Si besoin, mettre à jour la constante <i>$INDEX-PONTHE-TROMBI</i> dans le même fichier.</li>'
      }
    ]
  },
  donnees: {
    title: 'Modifier les données',
    content: [
      {
        question:
          'Comment se connecter à la base de données ?',
        answer:
            'Aller sur <a href="' + phpMyAdmin + '"><i>cette adresse</i></a>, se connecter avec les bons identifiants, puis faire retour ' +
            'à la page précédente. Vous arrivez alors normalement dans la base de données.'
      },
      {
        question:
          'Comment changer le statut d\'un utilisateur (admin ou pas, sa promo, etc) ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="' + phpMyAdmin + '"><i>Se ' +
            'connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>users</i>.'
      },
      {
        question: 'Comment changer la date d\'une galerie ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="' + phpMyAdmin + '"><i>Se ' +
            'connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>resources</i> (en retrouvant la ressource' +
            ' à partir de la table <i>galleries</i>).'
      },
      {
        question:
          'Comment changer la description d\'une galerie (et le message qui apparait sur la page d\'accueil) ?',
        answer:
            'Ce n\'est pas directement implémenté sur le site, donc il faut le faire brutasse : <a href="' + phpMyAdmin + '"><i>Se ' +
            'connecter à la base de données</i></a> et changer la bonne valeur dans la table <i>galleries</i>).'
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
            'pour portugais, etc), fichier dans lequel tu copies-colles le contenu de <a href="' + githubBlob + 'src/assets/i18n/fr.' +
            'json">celui-ci</a>.</li>' +
            '<li>Remplace toutes les traductions de ce nouveau fichier par les nouvelles (attention : ne touche pas aux clés de ' +
            'traduction, uniquement aux phrases à traduire !)</li>' +
            '<li>Rajoute dans <a href="' + githubBlob + 'src/app/constants/Languages.ts">ce fichier</a> le digraphe de la langue que tu ' +
            'as rajoutée dans la constante <i>LANGUAGES</i> et le drapeau de la langue dans <i>FLAGS_BY_LANG</i></li>' +
            'Et le tour est joué !'
      },
      {
        question:
          'Comment rajouter des liens vers des medias sociaux (Fb, Linkedin) dans les footer de page ?',
        answer:
            'Rajoute les lignes qui vont bien dans <a href="' + githubBlob + 'src/app/constants/ExternalLinks.ts">ce fichier</a>.'
      },
      {
        question: 'Comment changer la vidéo de la page d\'authentification ?',
        answer:
            'Change la variable PATH_AUTH_VIDEO dans <a href="' + githubBlob + 'src/app/' +
            'constants/Images.ts">ce fichier</a> pour la faire pointer vers la bonne vidéo, que tu auras bien sûr mise dans le ' +
            '<a href="' + githubTree + 'src/assets/images">bon dossier</a>.'
      },
      {
        question: 'Comment changer les photos des pages reset et new-account ?',
        answer:
            'Modifie la constante $AUTH-BG-SLIDER-IMAGES dans <a href="' + githubBlob + 'src/app/constants/style/Images.scss">ce fichier' +
            '</a> pour les faire pointer vers les bonnes photos, que tu auras bien sûr mises dans le <a href="' + githubTree +
            'src/assets/images/auth_pics">bon dossier</a>.'
      },
      {
        question: 'Comment ajouter des tutos ici ?',
        answer:
            'Il faut convient de (t\'as vu comme je parle bien!) modifier le fichier <a href="' + githubTree + 'src/app/constants/' +
            'Tutoriels.ts">Tutoriels.ts</a> (celui dans lequel est écrit cette phrase).'
      },
      {
        question: 'Comment développer le site ?',
        answer: 'Il suffit de produire du code sur l\'un des deux repos suivants:<ul>' +
            '<li><a href="' + githubGaleriesRepo + '">Galeries</a> : Il s\'agit du site originel, qui contient notamment la partie ' +
            'back-end du site, i.e. la gestion de la base de données et l\'API. C\'est principalement du Python (Flask)</li>' +
            '<li><a href="' + githubRepo + '">Angular-project</a> : c\'est la partie front-end du site, chargée donc par ton navigateur ' +
            'quand tu te connectes sur le site. C\'est développé en Angular 7, et il faut bien sûr connaître HTML, CSS et éventuellement' +
            ' SCSS;</li>'
      }
    ]
  }
};
