# How to maintain the website

## Add a new Ponthé team
1. Change the members.json in the [Galeries](https://github.com/ENPC-Ponthe/Galeries) repo. The json file is available [here](https://github.com/ENPC-Ponthe/Galeries/tree/testing/web/app/instance/assets/data).
2. Add the new promotion in src/app/constants/Images.scss, with the pictures representing this team in *$PONTHE-PROMO-IMAGES*.
3. Update the *$INDEX-PONTHE-TROMBI* constant in the same file with the index of the trombinoscope (set it to -1 if there is no trombinoscope).
4. Update the *NUMBER_PICS_BY_PONTHE_TEAM* constant in src/app/constants/Images.ts with the number of pics added.
You're done!

## Enable a new promotion of students to access the website
1. All students can log in with CAS (like uPont).
2. Change the value of CURRENT_PROMO in [Constants.ts](https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/Constants.ts).

## Update General terms and conditions of use of the website
Change them directly in the [cgu.json](https://github.com/ENPC-Ponthe/Galeries/blob/testing/web/app/instance/assets/data/cgu.json) file

## Translate the whole website in a new language
1. Add a new json file whose name is the digraph of this language (i.e. *zh.json* for Chinese, *fr.json* for French, *ru.json* for Russian) in [src/app/i18n folder](https://github.com/ENPC-Ponthe/Angular-project/tree/testing/src/assets/i18n).
2. Fill this new file with the correct translations of every key. You can find these keys in the existing files.
3. Go in [Languages file](https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/constants/Languages.ts)
4. Add in both LANGUAGES and FLAGS_BY_LANG the digraph of the language you just added. The first array will use the translations of the file and the second array will display the little flag used for selecting the language.

## Add a sentence on the website
1. Add the sentence and all its translations in the i18n folder.
2. Use the pipe *| translation* after the key every time you need to add this sentence to a component.

## Add external links
1. You can add external links in the footers by adding them to the [External Links file](https://github.com/ENPC-Ponthe/Angular-project/blob/testing/src/app/constants/ExternalLinks.ts)

## Easter eggs
A few Easter eggs can be found in the app.component.ts file ;)