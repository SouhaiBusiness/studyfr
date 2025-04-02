'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FileText } from 'lucide-react';

// Mock data for linguistics modules
const linguisticsModules = [
  // Semester 1 - 7 modules
  {
    id: 1,
    title: 'Initiation aux genres dramatiques',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Cours dInitiation aux Genres Dramatiques.pdf',
        path: '/files/Cours dInitiation aux Genres Dramatiques.pdf',
      },
      {
        id: 2,
        name: 'Le véritable essor de de la dramaturgie moderne commence en Italie au XVI.pdf',
        path: '/files/Le véritable essor de de la dramaturgie moderne commence en Italie au XVI.pdf',
      },
      {
        id: 3,
        name: 'Contrôle-T-2018.pdf',
        path: '/files/Contrôle-T-2018.pdf',
      },
    ],
  },
  {
    id: 2,
    title: 'Grammaire',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Grammaire1-cours 1-Le Nom.pdf',
        path: '/files/Grammaire1-cours 1-Le Nom.pdf',
      },
    ],
  },
  {
    id: 3,
    title: 'Les grands mythes',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Grands Mythes_cours.pdf',
        path: '/files/Grands Mythes_cours.pdf',
      },
      {
        id: 2,
        name: 'Grands Mythes_corrigé TD.pdf',
        path: '/files/Grands Mythes_corrigé TD.pdf',
      },
      {
        id: 3,
        name: 'modèle contrôle_Grands Mythes.pdf',
        path: '/files/modèle contrôle_Grands Mythes.pdf',
      },
    ],
  },
  {
    id: 4,
    title: 'Histoire des idées',
    semester: 1,
    files: [
      { id: 8, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 1,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
      { id: 2, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 3,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
      { id: 4, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 5,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
    ],
  },
  {
    id: 5,
    title: 'Phonétique',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'LaPhonétique cours du semestre 1.pdf',
        path: '/files/1) La Phonétique cours du semestre 1.pdf',
      },
      {
        id: 2,
        name: 'Exercices de la phonétique  S1.pdf',
        path: '/files/Exercices de la phonétique  S1.pdf',
      },
    ],
  },
  {
    id: 6,
    title: 'Typologie des textes narratifs',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Mehdi Cours Typologie.pdf',
        path: '/files/Mehdi Cours Typologie.pdf',
      },
    ],
  },
  {
    id: 7,
    title: 'English',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Meaning in Language.pdf',
        path: '/files/meaning-basics.pdf',
      },
      {
        id: 2,
        name: 'Semantic Relations.pdf',
        path: '/files/semantic-relations.pdf',
      },
    ],
  },

  // Semester 2 - 7 modules
  {
    id: 8,
    title: 'Poésie et Versification',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Éléments de métrique française PDF.pdf',
        path: '/files/Éléments de métrique française PDF.pdf',
      },
      {
        id: 2,
        name: 'Analyse du poème , Le pont Mirabeau.pdf',
        path: '/files/Analyse du poème , Le pont Mirabeau.pdf',
      },
      {
        id: 3,
        name: 'Anthologie de poésie-convertie.pdf',
        path: '/files/Anthologie de poésie-converti.pdf',
      },
    ],
  },
  {
    id: 9,
    title: 'Morphosyntaxe',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Grammaire II Introduction.pdf',
        path: '/files/Grammaire II Introduction.pdf',
      },
      {
        id: 2,
        name: 'le verbe approche syntaxique 2.pdf',
        path: '/files/le verbe approche syntaxique 2.pdf',
      },
      {
        id: 3,
        name: 'II. la morphologie verbale  mode, temps et aspect.pdf',
        path: '/files/II. la morphologie verbale  mode, temps et aspect.pdf',
      },
      {
        id: 4,
        name: 'II De la morphologie verbale suite.pdf',
        path: '/files/II De la morphologie verbale suite.pdf',
      },
      { id: 5, name: 'Série II.pdf', path: '/files/Série II.pdf' },
      {
        id: 6,
        name: 'le verbe approche syntaxique 2.pdf',
        path: '/files/le verbe approche syntaxique 2.pdf',
      },
      { id: 7, name: 'Série III.pdf', path: '/files/Série III.pdf' },
      { id: 8, name: 'serie V.pdf', path: '/files/serie V.pdf' },
      { id: 9, name: 'SERIE IV b.pdf', path: '/files/SERIE IV b.pdf' },
      { id: 10, name: 'SERIE VIII.pdf', path: '/files/SERIE VIII.pdf' },
    ],
  },
  {
    id: 10,
    title: 'Lexicographie',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'td_lexicographie_typologie des  dictionnaires  dictionnaire de langue (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/td_lexicographie_typologie des  dictionnaires  dictionnaire de langue (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 2,
        name: 'lexicologie-histoire des  dictionnaires_cours2 (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/lexicologie-histoire des  dictionnaires_cours2 (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 3,
        name: 'td3_dictionnaire de  langue_cours3.pdf',
        path: '/files/td3_dictionnaire de  langue_cours3.pdf',
      },
      {
        id: 4,
        name: 'lexicographie_article de  dictionnaire_cours3 (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/lexicographie_article de  dictionnaire_cours3 (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 5,
        name: 'lexicographie_la définition-cours4.pdf',
        path: '/files/lexicographie_la définition-cours4.pdf',
      },
      {
        id: 6,
        name: 'lexicographie_td4.pdf',
        path: '/files/lexicographie_td4.pdf',
      },
      {
        id: 7,
        name: 'Exercices_la définition_td5.pdf',
        path: '/files/Exercices_la définition_td5.pdf',
      },
      {
        id: 7,
        name: 'lexicographie_Regroupements et dégroupements_cours5.pdf',
        path: '/files/lexicographie_Regroupements et dégroupements_cours5.pdf',
      },
      {
        id: 8,
        name: 'lexicographie_regroupementsdégroupements_td7.pdf',
        path: '/files/lexicographie_regroupementsdégroupements_td7.pdf',
      },
      {
        id: 9,
        name: 'Examens de lexicographie accompagnés du corrigé.pdf',
        path: '/files/Examens de lexicographie accompagnés du corrigé.pdf',
      },
    ],
  },
  {
    id: 11,
    title: 'Histoire des idées',
    semester: 2,
    files: [
      {
        id: 1,
        name: "L'Histoire des idées et de L'art ,S2.pdf",
        path: "/files/L'Histoire des idées et de L'art ,S2.pdf",
      },
      {
        id: 2,
        name: "L'histoire des idées et de l'art (suite )pdf",
        path: "/files/L'histoire des idées et de l'art (suite ).pdf",
      },
    ],
  },
  {
    id: 12,
    title: 'Catégories du récit',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'ebook-gerard-genette-figures-3.pdf',
        path: '/files/ebook-gerard-genette-figures-3.pdf',
      },
      {
        id: 2,
        name: "Résumé de l'oeuvre  FIGURE 3 de Gerard Genette.pdf",
        path: "/files/Résumé de l'oeuvre  FIGURE 3 de Gerard Genette.pdf",
      },
    ],
  },
  {
    id: 13,
    title: "Introduction à l'interculturel",
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Ait zemzami Introduction à linterculturel S2 (1).pdf',
        path: '/filesAit zemzami Introduction à linterculturel S2 (1).pdf',
      },
    ],
  },
  {
    id: 14,
    title: 'English',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'English , S1 , S2.pdf',
        path: '/files/English , S1 , S2pdf',
      },
    ],
  },

  // Semester 3 - 6 modules
  {
    id: 15,
    title: 'Théâtre classique',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Théâtre classique_S4 le commentaire composé.pdf',
        path: '/files/Théâtre classique_S4 le commentaire composé.pdf',
      },
      { id: 2, name: 'Hugo-Hernani.pdf', path: '/files/Hugo-Hernani.pdf' },
      {
        id: 3,
        name: "résumé de l'oeuvre , le romantisme , analyse de l'oeuvre.pdf",
        path: "/files/résumé de l'oeuvre , le romantisme , analyse de l'oeuvre.pdf",
      },
    ],
  },
  {
    id: 16,
    title: 'Morphosyntaxe',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Morphosyntaxe 1 première partie.pdf',
        path: '/files/Morphosyntaxe 1 première partie.pdf',
      },
      {
        id: 2,
        name: 'Morphosyntaxe deuxième partie.pdf',
        path: '/files/Morphosyntaxe deuxième partie.pdf',
      },
      {
        id: 3,
        name: 'Morphosyntaxe dernière partie du cours.pdf',
        path: '/files/Morphosyntaxe dernière partie du cours.pdf',
      },
    ],
  },
  {
    id: 17,
    title: 'Analyse du roman',
    semester: 3,
    files: [
      {
        id: 1,
        name: "cours d'analyse du roman 2  S3.pdf",
        path: "/files/cours d'analyse du roman 2  S3.pdf",
      },
      {
        id: 2,
        name: 'Le commentaire composé S3.pdf',
        path: '/files/Le commentaire composé S3.pdf',
      },
      {
        id: 3,
        name: "cours de l'analyse du roman 1.pdf",
        path: "/files/cours de l'analyse du roman 1.pdf",
      },
    ],
  },
  {
    id: 18,
    title: 'Histoire des idées',
    semester: 3,
    files: [
      {
        id: 1,
        name: "L'histoire des idées et de L'art S3.pdf",
        path: "/files/L'histoire des idées et de L'art S3.pdf",
      },
    ],
  },
  {
    id: 19,
    title: 'Lexicologie',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'lexicologie dérivation-et-compositionpdf',
        path: '/files/lexicologie dérivation-et-composition.pdf',
      },
      {
        id: 2,
        name: 'les relations sémantiques du lexique.pdf',
        path: '/files/les relations sémantiques du lexique.pdf',
      },
      {
        id: 3,
        name: "Exercices d'application accompagnés du corrigé , lexicologie.pdf",
        path: "/files/Exercices d'application accompagnés du corrigé , lexicologie.pdf",
      },
    ],
  },
  {
    id: 20,
    title: 'Traduction',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Cours traduction  ( épistémologie et théories) S3pdf',
        path: '/files/Cours traduction  ( épistémologie et théories) S3.pdf',
      },
      {
        id: 2,
        name: 'exercices traduction S 3.pdf',
        path: '/files/exercices traduction S 3.pdf',
      },
      {
        id: 3,
        name: 'corrigé exercices traduction.pdf',
        path: '/files/corrigé exercices traduction.pdf',
      },
    ],
  },

  // Semester 4 - 6 modules
  {
    id: 21,
    title: 'initiation à la linguistique',
    semester: 4,
    files: [
      {
        id: 1,
        name: '1) la linguistique object  histoire, Grammaire traditionnelle.pdf',
        path: '/files/2)La linguistique moderne face à la grammaire traditionnelle.pdf',
      },
      {
        id: 2,
        name: '2) La linguistique moderne face à la grammaire traditionnelle.pdf',
        path: '/files/2)La linguistique moderne face à la grammaire traditionnelle.pdf',
      },
      {
        id: 3,
        name: '3) Notions fondamentales Langue parole langage',
        path: '/files/3)Notions fondamentales Langue parole langage.pdf',
      },
      {
        id: 4,
        name: '4) Le signe le signifiant le signifié , arbitraire du signe , linéarité du signe , immutabilité du signe.pdf',
        path: '/files/4) Le signe le signifiant le signifié , arbitraire du signe , linéarité du signe , immutabilité du signe.pdf',
      },
      {
        id: 5,
        name: '5) Structuralisme et Fonctionalisme.pdf',
        path: '/files/5)Structuralisme et Fonctionalisme.pdf',
      },
      {
        id: 6,
        name: '6) La Diachronie et La Synchronie axe paradygmatique et syntagmatique valeur et signification.pdf',
        path: '/files/6)La Diachronie et La Synchronie axe paradygmatique et syntagmatique valeur et signification.pdf',
      },
      {
        id: 7,
        name: '7) Langage humain VS Autres langages la double articulation.pdf',
        path: '/files/7) Langage humain VS Autres langages la double articulation.pdf',
      },
    ],
  },
  {
    id: 22,
    title: 'Morphosyntaxe',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Hidass Morphosyntaxe S 4.pdf',
        path: '/files/Hidass Morphosyntaxe S 4.pdf',
      },
      {
        id: 2,
        name: 'La subordonnée interrogative S4.pdf',
        path: '/files/La subordonnée interrogative S4.pdf',
      },
    ],
  },
  {
    id: 23,
    title: 'initiation à la recherche',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Methodologie de recherche.pdf',
        path: '/files/Methodologie de recherche.pdf',
      },
      { id: 2, name: 'bibliographie.pdf', path: '/files/bibliographie.pdf' },
    ],
  },
  {
    id: 24,
    title: 'Histoire des idées',
    semester: 4,
    files: [
      {
        id: 1,
        name: "L'histoire des idées et de l'art semestre 4.pdf",
        path: "/files/L'histoire des idées et de l'art semestre 4.pdf",
      },
    ],
  },
  {
    id: 25,
    title: 'Poésie',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Poésie du XIXe siècle , Charles Baudlaire.pdf',
        path: '/files/Poésie du XIXe siècle , Charles Baudlaire.pdf',
      },
      {
        id: 2,
        name: 'Le commentaire composé s4.pdf',
        path: '/files/Le commentaire composé s4.pdf',
      },
      {
        id: 3,
        name: 'Commentaire composé du poème Parfum exotique.pdf',
        path: '/files/Commentaire composé du poème Parfum exotique.pdf',
      },
    ],
  },
  {
    id: 26,
    title: 'Théâtre classique',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Cours du théâtre classique S4 , part 2.pdf',
        path: '/files/Cours du théâtre classique S4 , part 2.pdf',
      },
      {
        id: 2,
        name: "RACINE_PHEDRE,  l'oeuvre complet.pdf",
        path: "/files/RACINE_PHEDRE,  l'oeuvre complet.pdf",
      },
      {
        id: 3,
        name: 'Théâtre classique_S4 le commentaire composé.pdf',
        path: '/files/Théâtre classique_S4 le commentaire composé.pdf',
      },
      {
        id: 4,
        name: "Questions analytiques de L'oeuvre.pdf",
        path: "/files/Questions analytiques de L'oeuvre.pdf",
      },
    ],
  },

  // Semester 5 - 6 modules
  {
    id: 27,
    title: 'Phonologie',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Sémantique S5 _ cours 2020 (1).pdf',
        path: '/files/Sémantique S5 _ cours 2020 (1).pdf',
      },
      {
        id: 2,
        name: 'Sémantique S5 _ cours Bezzaa_Partie 2.pdf',
        path: '/files/Sémantique S5 _ cours Bezzaa_Partie 2.pdf',
      },
      {
        id: 3,
        name: 'Sémantique S5 _ Bezzaa_Partie 3.pdf',
        path: '/files/Sémantique S5 _ Bezzaa_Partie 3.pdf',
      },
      {
        id: 4,
        name: 'Sémantique S5 _ cours 2021_Partie 5.pdf',
        path: '/files/Sémantique S5 _ cours 2021_Partie 5.pdf',
      },
      {
        id: 5,
        name: 'Sémantique S5 _ cours 2021_Partie 6.pdf',
        path: '/files/Sémantique S5 _ cours 2021_Partie 6.pdf',
      },
      {
        id: 6,
        name: 'Sémantique S5 _ Corrigé des exercices (2).pdf',
        path: '/files/Sémantique S5 _ Corrigé des exercices (2).pdf',
      },
    ],
  },
  {
    id: 28,
    title: 'Sémantique',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'cours de sémiologie générale - semestre 5.pdf',
        path: '/files/cours de sémiologie générale - semestre 5.pdf',
      },
      {
        id: 2,
        name: "Modalité d'examen.pdf",
        path: "/files/Modalité d'examen.pdf",
      },
    ],
  },
  {
    id: 29,
    title: 'Semiologie générale',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'cours de sémiologie générale - semestre 5.pdf',
        path: '/files/cours de sémiologie générale - semestre 5.pdf',
      },
      {
        id: 2,
        name: "Modalité d'examen.pdf",
        path: "/files/Modalité d'examen.pdf",
      },
    ],
  },
  {
    id: 30,
    title: 'Sociolinguistique',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Cours de Sociolinguistique.pdf',
        path: '/files/Polycopié de cours Sociolinguistique.pdf',
      },
    ],
  },
  {
    id: 31,
    title: 'Grammaire textuelle',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'S 5 grammaire textuelle, suite 1.pdf',
        path: '/files/S 5 grammaire textuelle, suite 1.pdf',
      },
      {
        id: 2,
        name: 'S5 grammaire textuelle, suite 2-converti.pdf',
        path: '/files/S5 grammaire textuelle, suite 2-converti.pdf',
      },
      {
        id: 3,
        name: 'S5 grammaire textuelle, suite 3-converti.pdf',
        path: '/files/S5 grammaire textuelle, suite 3-converti.pdf',
      },
      {
        id: 4,
        name: 'Projet de fin détude Ben Msila-converti (2).pdf',
        path: '/files/Projet de fin détude Ben Msila-converti (2).pdf',
      },
    ],
  },
  {
    id: 32,
    title: 'Linguistique générale',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Cours de linguistique générale (S5).pdf',
        path: '/files/cours de Linguistique générale (S5).pdf',
      },
    ],
  },

  // Semester 6 - 6 modules
  {
    id: 33,
    title: 'Analyse du discours',
    semester: 6,
    files: [
      {
        id: 1,
        name: 'AD, introduction du cours.pdf',
        path: '/files/AD, introduction du cours.pdf',
      },
      {
        id: 2,
        name: 'Corrigé exercices, analyse du discours.pdf',
        path: '/files/Corrigé exercices, analyse du discours.pdf',
      },
      {
        id: 3,
        name: 'Epr. analyse du discours, 2019.pdf',
        path: '/files/Epr. analyse du discours, 2019.pdf',
      },
      {
        id: 4,
        name: 'Exercices , Analyse du discours.pdf',
        path: '/files/Exercices , Analyse du discours.pdf',
      },
      {
        id: 5,
        name: 'Le modèle de Benveniste S6.pdf',
        path: '/files/Le modèle de Benveniste S6.pdf',
      },
      {
        id: 6,
        name: 'Le modèle de Jacobson.pdf',
        path: '/files/Le modèle de Jacobson.pdf',
      },
      {
        id: 7,
        name: "Les modèles d'Antoine Culioli.pdf",
        path: "/files/Les modèles d'Antoine Culioli.pdf",
      },
      {
        id: 8,
        name: "Rattrap.AD 2016.pdf",
        path: "/files/Rattrap.AD 2016.pdf",
      },
    ],
  },
  {
    id: 34,
    title: 'La pragmatique',
    semester: 6,
    files: [
      {
        id: 1,
        name: 'Le cours de pragmatique (S6).pdf',
        path: '/files/ALI FALLOUS Le cours de pragmatique (S6).pdf',
      },
    ],
  },
  {
    id: 35,
    title: 'La Sémiotique narrative',
    semester: 6,
    files: [
      {
        id: 1,
        name: 'Sémiotique narrative.pdf',
        path: '/files/Benmsila Sémiotique narrative.pdf',
      },
      {
        id: 2,
        name: 'Suite sémiotique narrative-converti.pdf',
        path: '/files/Suite sémiotique narrative-converti.pdf',
      },
    ],
  },
  {
    id: 36,
    title: 'Théories linguistiques',
    semester: 6,
    files: [
      {
        id: 1,
        name: 'Cours Théories linguistiques.pdf',
        path: '/files/Cours Théories linguistiques.pdf',
      },
      {
        id: 2,
        name: 'Starets Moshe-Principes linguistiques en pédagogie des langues.pdf',
        path: '/files/Starets Moshe-Principes linguistiques en pédagogie des langues.pdf',
      },
    ],
  },
  {
    id: 37,
    title: "Techniques d'élaboration",
    semester: 6,
    files: [
      {
        id: 1,
        name: 'T.Elaboration-S-VI-BENZINABEZZAA.pdf',
        path: '/files/T.Elaboration-S-VI-BENZINABEZZAA.pdf',
      },
    ],
  },
];

// Mock data for literature modules
const literatureModules = [
  // Semester 1 - 7 modules
  {
    id: 1,
    title: 'Initiation aux genres dramatiques',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Cours dInitiation aux Genres Dramatiques.pdf',
        path: '/files/Cours dInitiation aux Genres Dramatiques.pdf',
      },
      {
        id: 2,
        name: 'Le véritable essor de de la dramaturgie moderne commence en Italie au XVI.pdf',
        path: '/files/Le véritable essor de de la dramaturgie moderne commence en Italie au XVI.pdf',
      },
      {
        id: 3,
        name: 'Contrôle-T-2018.pdf',
        path: '/files/Contrôle-T-2018.pdf',
      },
    ],
  },
  {
    id: 2,
    title: 'Grammaire',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Grammaire1-cours 1-Le Nom.pdf',
        path: '/files/Grammaire1-cours 1-Le Nom.pdf',
      },
    ],
  },
  {
    id: 3,
    title: 'Les grands mythes',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Grands Mythes_cours.pdf',
        path: '/files/Grands Mythes_cours.pdf',
      },
      {
        id: 2,
        name: 'Grands Mythes_corrigé TD.pdf',
        path: '/files/Grands Mythes_corrigé TD.pdf',
      },
      {
        id: 3,
        name: 'modèle contrôle_Grands Mythes.pdf',
        path: '/files/modèle contrôle_Grands Mythes.pdf',
      },
    ],
  },
  {
    id: 4,
    title: 'Histoire des idées',
    semester: 1,
    files: [
      { id: 1, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 2,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
      { id: 3, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 4,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
      { id: 5, name: 'Sound Patterns.pdf', path: '/files/sound-patterns.pdf' },
      {
        id: 6,
        name: 'Phonological Rules.pdf',
        path: '/files/phonological-rules.pdf',
      },
    ],
  },
  {
    id: 5,
    title: 'Phonétique',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'LaPhonétique cours du semestre 1.pdf',
        path: '/files/1) La Phonétique cours du semestre 1.pdf',
      },
      {
        id: 2,
        name: 'Exercices de la phonétique  S1.pdf',
        path: '/files/Exercices de la phonétique  S1.pdf',
      },
    ],
  },
  {
    id: 6,
    title: 'Typologie des textes narratifs',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Mehdi Cours Typologie.pdf',
        path: '/files/Mehdi Cours Typologie.pdf',
      },
    ],
  },
  {
    id: 7,
    title: 'English',
    semester: 1,
    files: [
      {
        id: 1,
        name: 'Meaning in Language.pdf',
        path: '/files/meaning-basics.pdf',
      },
      {
        id: 2,
        name: 'Semantic Relations.pdf',
        path: '/files/semantic-relations.pdf',
      },
    ],
  },

  // Semester 2 - 7 modules
  {
    id: 8,
    title: 'Poésie et Versification',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Éléments de métrique française PDF.pdf',
        path: '/files/Éléments de métrique française PDF.pdf',
      },
      {
        id: 2,
        name: 'Analyse du poème , Le pont Mirabeau.pdf',
        path: '/files/Analyse du poème , Le pont Mirabeau.pdf',
      },
      {
        id: 3,
        name: 'Anthologie de poésie-convertie.pdf',
        path: '/files/Anthologie de poésie-converti.pdf',
      },
    ],
  },
  {
    id: 9,
    title: 'Morphosyntaxe',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Grammaire II Introduction.pdf',
        path: '/files/Grammaire II Introduction.pdf',
      },
      {
        id: 2,
        name: 'le verbe approche syntaxique 2.pdf',
        path: '/files/le verbe approche syntaxique 2.pdf',
      },
      {
        id: 3,
        name: 'II. la morphologie verbale  mode, temps et aspect.pdf',
        path: '/files/II. la morphologie verbale  mode, temps et aspect.pdf',
      },
      {
        id: 4,
        name: 'II De la morphologie verbale suite.pdf',
        path: '/files/II De la morphologie verbale suite.pdf',
      },
      { id: 5, name: 'Série II.pdf', path: '/files/Série II.pdf' },
      {
        id: 6,
        name: 'le verbe approche syntaxique 2.pdf',
        path: '/files/le verbe approche syntaxique 2.pdf',
      },
      { id: 7, name: 'Série III.pdf', path: '/files/Série III.pdf' },
      { id: 8, name: 'serie V.pdf', path: '/files/serie V.pdf' },
      { id: 9, name: 'SERIE IV b.pdf', path: '/files/SERIE IV b.pdf' },
      { id: 10, name: 'SERIE VIII.pdf', path: '/files/SERIE VIII.pdf' },
    ],
  },
  {
    id: 10,
    title: 'Lexicographie',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'td_lexicographie_typologie des  dictionnaires  dictionnaire de langue (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/td_lexicographie_typologie des  dictionnaires  dictionnaire de langue (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 2,
        name: 'lexicologie-histoire des  dictionnaires_cours2 (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/lexicologie-histoire des  dictionnaires_cours2 (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 3,
        name: 'td3_dictionnaire de  langue_cours3.pdf',
        path: '/files/td3_dictionnaire de  langue_cours3.pdf',
      },
      {
        id: 4,
        name: 'lexicographie_article de  dictionnaire_cours3 (Bezzaa, Mehdi, Ziamari).pdf',
        path: '/files/lexicographie_article de  dictionnaire_cours3 (Bezzaa, Mehdi, Ziamari).pdf',
      },
      {
        id: 5,
        name: 'lexicographie_la définition-cours4.pdf',
        path: '/files/lexicographie_la définition-cours4.pdf',
      },
      {
        id: 6,
        name: 'lexicographie_td4.pdf',
        path: '/files/lexicographie_td4.pdf',
      },
      {
        id: 7,
        name: 'Exercices_la définition_td5.pdf',
        path: '/files/Exercices_la définition_td5.pdf',
      },
      {
        id: 8,
        name: 'lexicographie_Regroupements et dégroupements_cours5.pdf',
        path: '/files/lexicographie_Regroupements et dégroupements_cours5.pdf',
      },
      {
        id: 9,
        name: 'lexicographie_regroupementsdégroupements_td7.pdf',
        path: '/files/lexicographie_regroupementsdégroupements_td7.pdf',
      },
      {
        id: 10,
        name: 'Examens de lexicographie accompagnés du corrigé.pdf',
        path: '/files/Examens de lexicographie accompagnés du corrigé.pdf',
      },
    ],
  },
  {
    id: 11,
    title: 'Histoire des idées',
    semester: 2,
    files: [
      {
        id: 1,
        name: "L'Histoire des idées et de L'art ,S2.pdf",
        path: "/files/L'Histoire des idées et de L'art ,S2.pdf",
      },
      {
        id: 2,
        name: "L'histoire des idées et de l'art (suite )pdf",
        path: "/files/L'histoire des idées et de l'art (suite ).pdf",
      },
    ],
  },
  {
    id: 12,
    title: 'Catégories du récit',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'ebook-gerard-genette-figures-3.pdf',
        path: '/files/ebook-gerard-genette-figures-3.pdf',
      },
      {
        id: 2,
        name: "Résumé de l'oeuvre  FIGURE 3 de Gerard Genette.pdf",
        path: "/files/Résumé de l'oeuvre  FIGURE 3 de Gerard Genette.pdf",
      },
    ],
  },
  {
    id: 13,
    title: "Introduction à l'interculturel",
    semester: 2,
    files: [
      {
        id: 1,
        name: 'Ait zemzami Introduction à linterculturel S2 (1).pdf',
        path: '/filesAit zemzami Introduction à linterculturel S2 (1).pdf',
      },
    ],
  },
  {
    id: 14,
    title: 'English',
    semester: 2,
    files: [
      {
        id: 1,
        name: 'English , S1 , S2.pdf',
        path: '/files/English , S1 , S2pdf',
      },
    ],
  },

  // Semester 3 - 6 modules
  {
    id: 15,
    title: 'Théâtre classique',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Théâtre classique_S4 le commentaire composé.pdf',
        path: '/files/Théâtre classique_S4 le commentaire composé.pdf',
      },
      { id: 2, name: 'Hugo-Hernani.pdf', path: '/files/Hugo-Hernani.pdf' },
      {
        id: 3,
        name: "résumé de l'oeuvre , le romantisme , analyse de l'oeuvre.pdf",
        path: "/files/résumé de l'oeuvre , le romantisme , analyse de l'oeuvre.pdf",
      },
    ],
  },
  {
    id: 16,
    title: 'Morphosyntaxe',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Morphosyntaxe 1 première partie.pdf',
        path: '/files/Morphosyntaxe 1 première partie.pdf',
      },
      {
        id: 2,
        name: 'Morphosyntaxe deuxième partie.pdf',
        path: '/files/Morphosyntaxe deuxième partie.pdf',
      },
      {
        id: 3,
        name: 'Morphosyntaxe dernière partie du cours.pdf',
        path: '/files/Morphosyntaxe dernière partie du cours.pdf',
      },
    ],
  },
  {
    id: 17,
    title: 'Analyse du roman',
    semester: 3,
    files: [
      {
        id: 1,
        name: "cours d'analyse du roman 2  S3.pdf",
        path: "/files/cours d'analyse du roman 2  S3.pdf",
      },
      {
        id: 2,
        name: 'Le commentaire composé S3.pdf',
        path: '/files/Le commentaire composé S3.pdf',
      },
      {
        id: 3,
        name: "cours de l'analyse du roman 1.pdf",
        path: "/files/cours de l'analyse du roman 1.pdf",
      },
    ],
  },
  {
    id: 18,
    title: 'Histoire des idées',
    semester: 3,
    files: [
      {
        id: 1,
        name: "L'histoire des idées et de L'art S3.pdf",
        path: "/files/L'histoire des idées et de L'art S3.pdf",
      },
    ],
  },
  {
    id: 19,
    title: 'Lexicologie',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'lexicologie dérivation-et-compositionpdf',
        path: '/files/lexicologie dérivation-et-composition.pdf',
      },
      {
        id: 2,
        name: 'les relations sémantiques du lexique.pdf',
        path: '/files/les relations sémantiques du lexique.pdf',
      },
      {
        id: 3,
        name: "Exercices d'application accompagnés du corrigé , lexicologie.pdf",
        path: "/files/Exercices d'application accompagnés du corrigé , lexicologie.pdf",
      },
    ],
  },
  {
    id: 20,
    title: 'Traduction',
    semester: 3,
    files: [
      {
        id: 1,
        name: 'Cours traduction  ( épistémologie et théories) S3pdf',
        path: '/files/Cours traduction  ( épistémologie et théories) S3.pdf',
      },
      {
        id: 2,
        name: 'exercices traduction S 3.pdf',
        path: '/files/exercices traduction S 3.pdf',
      },
      {
        id: 3,
        name: 'corrigé exercices traduction.pdf',
        path: '/files/corrigé exercices traduction.pdf',
      },
    ],
  },

  // Semester 4 - 6 modules
  {
    id: 21,
    title: 'initiation à la linguistique',
    semester: 4,
    files: [
      {
        id: 1,
        name: '1) la linguistique object  histoire, Grammaire traditionnelle.pdf',
        path: '/files/2)La linguistique moderne face à la grammaire traditionnelle.pdf',
      },
      {
        id: 2,
        name: '2) La linguistique moderne face à la grammaire traditionnelle.pdf',
        path: '/files/2)La linguistique moderne face à la grammaire traditionnelle.pdf',
      },
      {
        id: 3,
        name: '3) Notions fondamentales Langue parole langage',
        path: '/files/3)Notions fondamentales Langue parole langage.pdf',
      },
      {
        id: 4,
        name: '4) Le signe le signifiant le signifié , arbitraire du signe , linéarité du signe , immutabilité du signe.pdf',
        path: '/files/4) Le signe le signifiant le signifié , arbitraire du signe , linéarité du signe , immutabilité du signe.pdf',
      },
      {
        id: 5,
        name: '5) Structuralisme et Fonctionalisme.pdf',
        path: '/files/5)Structuralisme et Fonctionalisme.pdf',
      },
      {
        id: 6,
        name: '6) La Diachronie et La Synchronie axe paradygmatique et syntagmatique valeur et signification.pdf',
        path: '/files/6)La Diachronie et La Synchronie axe paradygmatique et syntagmatique valeur et signification.pdf',
      },
      {
        id: 7,
        name: '7) Langage humain VS Autres langages la double articulation.pdf',
        path: '/files/7) Langage humain VS Autres langages la double articulation.pdf',
      },
    ],
  },
  {
    id: 22,
    title: 'Morphosyntaxe',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Hidass Morphosyntaxe S 4.pdf',
        path: '/files/Hidass Morphosyntaxe S 4.pdf',
      },
      {
        id: 2,
        name: 'La subordonnée interrogative S4.pdf',
        path: '/files/La subordonnée interrogative S4.pdf',
      },
    ],
  },
  {
    id: 23,
    title: 'initiation à la recherche',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Methodologie de recherche.pdf',
        path: '/files/Methodologie de recherche.pdf',
      },
      { id: 2, name: 'bibliographie.pdf', path: '/files/bibliographie.pdf' },
    ],
  },
  {
    id: 24,
    title: 'Histoire des idées',
    semester: 4,
    files: [
      {
        id: 1,
        name: "L'histoire des idées et de l'art semestre 4.pdf",
        path: "/files/L'histoire des idées et de l'art semestre 4.pdf",
      },
    ],
  },
  {
    id: 25,
    title: 'Poésie',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Poésie du XIXe siècle , Charles Baudlaire.pdf',
        path: '/files/Poésie du XIXe siècle , Charles Baudlaire.pdf',
      },
      {
        id: 2,
        name: 'Le commentaire composé s4.pdf',
        path: '/files/Le commentaire composé s4.pdf',
      },
      {
        id: 3,
        name: 'Commentaire composé du poème Parfum exotique.pdf',
        path: '/files/Commentaire composé du poème Parfum exotique.pdf',
      },
    ],
  },
  {
    id: 26,
    title: 'Théâtre classique',
    semester: 4,
    files: [
      {
        id: 1,
        name: 'Cours du théâtre classique S4 , part 2.pdf',
        path: '/files/Cours du théâtre classique S4 , part 2.pdf',
      },
      {
        id: 2,
        name: "RACINE_PHEDRE,  l'oeuvre complet.pdf",
        path: "/files/RACINE_PHEDRE,  l'oeuvre complet.pdf",
      },
      {
        id: 3,
        name: 'Théâtre classique_S4 le commentaire composé.pdf',
        path: '/files/Théâtre classique_S4 le commentaire composé.pdf',
      },
      {
        id: 4,
        name: "Questions analytiques de L'oeuvre.pdf",
        path: "/files/Questions analytiques de L'oeuvre.pdf",
      },
    ],
  },


  // Semester 5 - 6 modules
  {
    id: 27,
    title: 'Théories du texte littéraire 1',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Cours TTL S5 Ait Zemzami.pdf',
        path: '/files/Cours TTL S5 Ait Zemzami.pdf',
      },
    ],
  },
  {
    id: 28,
    title: 'Études postcoloniales',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'S6 Etudes postcoloniales DOC 1.pdf',
        path: '/files/S6 Etudes postcoloniales DOC 1.pdf',
      },
    ],
  },
  {
    id: 29,
    title: 'Littérature comparée',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Plan du cours et Bibliographie.pdf',
        path: '/files/Plan du cours et Bibliographie.pdf',
      },
      {
        id: 2,
        name: 'Introduction.pdf',
        path: '/files/Introduction.pdf',
      },
      {
        id: 3,
        name: 'Quest-ce que le mythe.pdf',
        path: '/files/Quest-ce que le mythe.pdf',
      },
      {
        id: 4,
        name: 'Le mythe de Thésée, approche psychanalytique.pdf',
        path: '/files/Le mythe de Thésée, approche psychanalytique.pdf',
      },
      {
        id: 5,
        name: 'Le mythe en littérature.pdf',
        path: '/files/Le mythe en littérature.pdf',
      },
      {
        id: 6,
        name: 'Le labyrinthe comme thème et structure.pdf',
        path: '/files/Le labyrinthe comme thème et structure.pdf',
      },
      {
        id: 7,
        name: 'Le mythe de thésée chez Gide.pdf',
        path: '/files/Le mythe de thésée chez Gide.pdf',
      },
      {
        id: 8,
        name: 'Le voyage dans Thésée dAndré Gide.pdf',
        path: '/files/Le voyage dans Thésée dAndré Gide.pdf',
      },
      {
        id: 9,
        name: 'Le labyrinthe sous toutes ses formes.pdf',
        path: '/files/Le labyrinthe sous toutes ses formes.pdf',
      },
      {
        id: 10,
        name: 'Tableau de comparaison.pdf',
        path: '/files/Tableau de comparaison.pdf',
      },
    ],
  },
  {
    id: 30,
    title: 'Analyse littéraire 1',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'DOCUMENT 0 - Présentation. doc.pdf',
        path: '/files/DOCUMENT 0 - Présentation. doc.pdf',
      },
      {
        id: 2,
        name: 'Analyse littéraire 1 - Penser avec les mains.pdf',
        path: '/files/Analyse littéraire 1 - Penser avec les mains.pdf',
      },
      {
        id: 3,
        name: 'DOCUMENT 2 - LESSAI.pdf',
        path: '/files/DOCUMENT 2 - LESSAI.pdf',
      },
    ],
  },
  {
    id: 31,
    title: 'Littérature marocaine',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'littérature marocaines , version complète.pdf',
        path: '/files/littérature marocaines , version complète.pdf',
      },
    ],
  },
  {
    id: 32,
    title: 'Rhétorique des images',
    semester: 5,
    files: [
      {
        id: 1,
        name: 'Rhétorique des images M. Belghit.pdf',
        path: '/files/Rhétorique des images M. Belghit.pdf',
      },
      {
        id: 2,
        name: 'Extraits choisis LObvis et lobtus.pdf',
        path: '/files/Extraits choisis LObvis et lobtus.pdf',
      },
      {
        id: 3,
        name: 'Histoire mouvements picturaux.pdf',
        path: '/files/Histoire mouvements picturaux.pdf',
      },
      {
        id: 4,
        name: "Barthes, Rhétorique de l'image.pdf",
        path: '/files/Barthes, Rhétorique de limage.pdf',
      },
      {
        id: 5,
        name: 'Lecture chambre claire Roland Barthes.pdf',
        path: '/files/Lecture chambre claire Roland Barthes.pdf',
      },
      {
        id: 6,
        name: "Cours Belghit Analyse des images.pdf",
        path: "/files/Cours Belghit Analyse de limage.pdf",
      },
      {
        id: 7,
        name: 'Dénotation et Connotation.pdf',
        path: '/files/Dénotation et Connotation.pdf',
      },
      {
        id: 8,
        name: 'Analyse Photo Tadashi Okubo par Belghit.pdf',
        path: '/files/Analyse Photo Tadashi Okubo par Belghit.pdf',
      },
    ],
  },

  // Semester 6 - 6 modules
  {
    id: 33,
    title: "Etudes postcoloniales",
    semester: 6,
    files: [
      { id: 1, name: "S6 Etudes postcoloniales DOC 1.pdf", path: "/files/S6 Etudes postcoloniales DOC 1.pdf" },
    ]
  },
  {
    id: 34,
    title: "Théories du texte littéraire",
    semester: 6,
    files: [
      { id: 1, name: "Stitou Théories du Texte Littéraire_S6(2020).pdf", path: "/files/Stitou Théories du Texte Littéraire_S6(2020).pdf" },
    ]
  },
  {
    id: 35,
    title: "Etude des médias",
    semester: 6,
    files: [
      { id: 1, name: "Etudes des médias_S6.pdf", path: "/files/Etudes des médias_S6.pdf" },
    ]
  },
  {
    id: 36,
    title: "Les écritures de soi",
    semester: 6,
    files: [
      { id: 1, name: "Préalable historique autobiographie.pdf", path: "/files/Préalable historique autobiographie.pdf" },
      { id: 2, name: "Cours Ecriture de Soi S6 2020.pdf", path: "/files/Cours Ecriture de Soi S6 2020.pdf" },
      { id: 3, name: "De lautobiographie à l'autofiction.pdf", path: "/files/De lautobiographie à lautofiction.pdf" },
      { id: 4, name: "L'autobiographie en question Poétique d'un genre.pdf", path: "/files/Lautobiographie en question Poétique d'un genre.pdf" },
      { id: 5, name: "L'autobiographie genre littéraire.pdf", path: "/files/Lautobiographie genre littéraire.pdf" },
      { id: 6, name: "le pact autobigraphique et la photographie.pdf", path: "/files/le pact autobigraphique et la photographie.pdf" },
      { id: 7, name: "RLCautobigraohie, Starobenski.pdf", path: "/files/RLCautobigraohie, Starobenski.pdf" },
      { id: 8, name: "rousseau les confessions.pdf", path: "/files/rousseau les confessions.pdf" }

    ]
  },
  {
    id: 37,
    title: "Analyse des textes littéraires 2",
    semester: 6,
    files: [
      { id: 1, name: "1. Présentation.pdf", path: "/files/1. Présentation.pdf" },
      { id: 2, name: "2. Voir-Ecouter-Lire... sur le Web - sites à visiter.pdf", path: "/files/2. Voir-Ecouter-Lire... sur le Web - sites à visiter.pdf" },
      { id: 3, name: "TEXTE 1 - Honoré de Balzac - Le Chef-douvre inconnu.pdf", path: "/files/TEXTE 1 - Honoré de Balzac - Le Chef-douvre inconnu.pdf" },
      { id: 4, name: "TEXTE 2. Paul Ricour - Sur un autoportrait de Rembrandt.pdf", path: "/files/TEXTE 2. Paul Ricour - Sur un autoportrait de Rembrandt.pdf" },
      { id: 5, name: "TEXTE 3 - Alain Jaubert -Le miroir des paradoxes - Autoportraits (Palettes-Texte).pdf", path: "/files/TEXTE 3 - Alain Jaubert -Le miroir des paradoxes - Autoportraits (Palettes-Texte).pdf" },
      { id: 6, name: "TEXTE 4 - Edmond Amran El Maleh - Loil et la main.pdf", path: "/files/TEXTE 4 - Edmond Amran El Maleh - Loil et la main.pdf" },
      { id: 7, name: "TEXTE 5 - Milan Kundera. Le geste brutal du peintre. Sur Francis Bacon. (1).pdf", path: "/files/TEXTE 5 - Milan Kundera. Le geste brutal du peintre. Sur Francis Bacon. (1).pdf" }
    ]
  },
  {
    id: 38,
    title: "Téchniques d'élaboration",
    semester: 6,
    files: [
      { id: 1, name: "Techniques délaboration Littérature S6.pdf", path: "/files/Techniques délaboration Littérature S6.pdf" },
    ]
  }
];

interface ModuleListProps {
  category: 'linguistics' | 'literature';
  activeSemester: number | null;
}

export default function ModuleList({
  category,
  activeSemester,
}: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const modules =
    category === 'linguistics' ? linguisticsModules : literatureModules;

  // Filter by semester if provided
  const filteredModules = activeSemester
    ? modules.filter((module) => module.semester === activeSemester)
    : modules;

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className='my-8'>
      <h2 className='text-2xl font-bold mb-6'>Modules</h2>

      {filteredModules.length > 0 ? (
        <div className='space-y-4'>
          {filteredModules.map((module) => (
            <div key={module.id} className='border rounded-md overflow-hidden'>
              <button
                className='w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left'
                onClick={() => toggleModule(module.id)}
              >
                <div>
                  <h3 className='font-medium'>{module.title}</h3>
                  <p className='text-sm text-gray-500'>
                    Semester {module.semester}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedModules.includes(module.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedModules.includes(module.id) && (
                <div className='p-4 bg-white'>
                  <h4 className='font-medium mb-2'>Cours disponibles</h4>
                  <ul className='space-y-2'>
                    {module.files.map((file) => (
                      <li key={file.id}>
                        <Link
                          href={file.path}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center text-blue-600 hover:underline'
                        >
                          <FileText className='h-4 w-4 mr-2' />
                          {file.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center p-8 border rounded-md bg-gray-50'>
          <p className='text-gray-500'>
            No modules found for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
