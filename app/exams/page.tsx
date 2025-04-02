'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FileText } from 'lucide-react';

// Sample modules for Linguistics
const linguisticsModules = [
  {
    id: 1,
    title: 'Lexicographie',
    files: [
      {
        id: 1,
        name: 'examens de lexicographie semestre 2.pdf',
        path: '/files/examens de lexicographie semestre 2.pdf',
      },
      {
        id: 2,
        name: '(II)examens de lexicographie semestre 2.pdf',
        path: '/files/(II)examens de lexicographie semestre 2.pdf',
      },
    ],
  },
  {
    id: 2,
    title: 'Grammaire',
    files: [
      {
        id: 1,
        name: 'examens de grammaire s2.pdf',
        path: '/files/examens de grammaire s2.pdf',
      },
      {
        id: 2,
        name: '(II)examen de grammaire s2.pdf',
        path: '/files/(II)examen de grammaire s2.pdf',
      },
      {
        id: 3,
        name: 'examens de grammaire s2.pdf',
        path: '/files/examens de grammaire s2.pdf',
      },
      {
        id: 4,
        name: 'examen de grammaire 2019-2020.pdf',
        path: '/files/examen de grammaire 2019-2020.pdf',
      },
    ],
  },
  {
    id: 3,
    title: 'Lexicologie',
    files: [
      {
        id: 1,
        name: 'examens de la lexicologie semestre 3.pdf',
        path: '/files/examens de la lexicologie semestre 3.pdf',
      },
      {
        id: 2,
        name: 'examens de lexicologie S3.pdf',
        path: '/files/examens de lexicologie S3.pdf',
      },
    ],
  },
  {
    id: 4,
    title: 'Morphosyntaxe',
    files: [
      {
        id: 1,
        name: 'examens de la morphosyntaxe semestre 3.pdf',
        path: '/files/examens de la morphosyntaxe semestre 3.pdf',
      },
      {
        id: 2,
        name: 'dix examens de morphosyntaxe S4.pdf',
        path: '/files/dix examens de morphosyntaxe S4.pdf',
      },
    ],
  },
  {
    id: 5,
    title: 'Traduction',
    files: [
      {
        id: 1,
        name: 'examen de la traduction semestre 3.pdf',
        path: '/files/examen de la traduction semestre 3.pdf',
      },
     
    ],
  },
  {
    id: 6,
    title: 'Linguistique générale',
    files: [
      {
        id: 1,
        name: 'Six examens de la linguistique générale semestre 4.pdf',
        path: '/files/Six examens de la linguistique générale semestre 4.pdf',
      },
      {
        id: 2,
        name: 'Examen final de la linguistique générale ,semestre 5.pdf',
        path: '/files/Examen final de la linguistique générale ,semestre 5.pdf',
      }, 
    ],
  },
];

// Sample modules for Literature
const literatureModules = [
  {
    id: 1,
    title: 'Catégories du récit',
    files: [
      {
        id: 1,
        name: 'examens du module catégories du semestre 2.pdf',
        path: '/files/examens du module catégories du semestre 2.pdf',
      },
    ],
  },
  {
    id: 2,
    title: 'Histoire des idées',
    files: [
      {
        id: 1,
        name: "examen de l'histoire des idées S2.pdf",
        path: "/files/examen de l'histoire des idées S2.pdf",
      },
      {
        id: 2,
        name: "examens de l'histoire des idées et de l'art semestre 3pdf",
        path: "/files/examens de l'histoire des idées et de l'art semestre 3.pdf",
      },
    ],
  },
  {
    id: 3,
    title: 'Théâtre classique',
    files: [
      {
        id: 1,
        name: 'Examen du module  théâtre classique, semestre 3.pdf',
        path: '/files/Examen du module  théâtre classique, semestre 3.pdf',
      },
      {
        id: 2,
        name: 'examen du théâtre classique semestre 4.pdf',
        path: '/files/examen du théâtre classique semestre 4.pdf',
      },
    ],
  },
  {
    id: 4,
    title: 'Analyse du roman',
    files: [
      {
        id: 1,
        name: 'examen du module analyse du roman S3.pdf',
        path: '/files/examen du module analyse du roman S3.pdf',
      },
    ],
  },
  {
    id: 5,
    title: 'Poésie',
    files: [
      {
        id: 1,
        name: 'examens de la poésie , module du semestre 4.pdf',
        path: '/files/examens de la poésie , module du semestre 4.pdf',
      },
    ],
  },
  {
    id: 6,
    title: 'Etudes postcoloniales',
    files: [
      {
        id: 1,
        name: 'Examens des Etudes Postcoloniales.pdf',
        path: '/files/Examens des Etudes Postcoloniales.pdf',
      },
    ],
  },
  {
    id: 7,
    title: 'Rhétorique des images',
    files: [
      {
        id: 1,
        name: " examen de la Rhétorique de des images.pdf",
        path: "/files/rhétorique de l'image.pdf",
      },
      {
        id: 2,
        name: " examen de la Rhétorique de des images.pdf",
        path: "/files/rhétorique de l'image.pdf",
      },
    ],
  },
  {
    id: 8,
    title: 'Littérature Comparée',
    files: [
      {
        id: 1,
        name: 'Examens de la Littérature Comparée S5 2023.pdf',
        path: '/files/exams s5 de La Rhétorique des images 2023.pdf',
      },
      {
        id: 2,
        name: 'examen de littérature comparée s5 2022.pdf',
        path: '/files/examen de littérature comparée s5 2022.pdf',
      },
    ],
  },
  {
    id: 9,
    title: 'Littérature marocaine',
    files: [
      {
        id: 1,
        name: 'Examens de littérature marocaine.pdf',
        path: '/files/Examens de littérature marocaine.pdf',
      },
    ],
  },
  {
    id: 10,
    title: 'Théories du texte littéraire',
    files: [
      {
        id: 1,
        name: 'Examens de Théories du texte littéraire.pdf',
        path: '/files/Examens de Théories du texte littéraire.pdf',
      },
    ],
  },
  {
    id: 11,
    title: 'Analyse littéraire',
    files: [
      {
        id: 1,
        name: "Examen de l'analyse littéraire1 S5.pdf",
        path: "/files/Examen de l'analyse littéraire1 S5.pdf",
      },
      {
        id: 2,
        name: "exam s5 analyse littéraire 2023.pdf",
        path: "/files/exam s5 analyse littéraire 2023.pdf",
      },
      {
        id: 3,
        name: "Examen de l'analyse  littéraire S6.pdf",
        path: "/files/Examen de l'analyse  littéraire S6.pdf",
      },
    ],
  },
  {
    id: 12,
    title: 'Ecriture de soi',
    files: [
      {
        id: 1,
        name: "écriture du soi S6.pdf",
        path: "/files/écriture du soi S6.pdf",
      },
    ],
  },

];

export default function ExamsPage() {
  const [expandedLinguisticsModules, setExpandedLinguisticsModules] = useState<
    number[]
  >([]);
  const [expandedLiteratureModules, setExpandedLiteratureModules] = useState<
    number[]
  >([]);

  const toggleLinguisticsModule = (moduleId: number) => {
    setExpandedLinguisticsModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleLiteratureModule = (moduleId: number) => {
    setExpandedLiteratureModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center text-[#0e2d6d]'>
         Session Exams
      </h1>
      <p className='text-center mb-8 max-w-2xl mx-auto'>
      Accédez à des sujets d'examens passés et à des supports d'étude pour vous aider à préparer vos examens de français.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Linguistics Card */}
        <div className='bg-white shadow-2xl rounded-lg overflow-hidden border-b-[1px] border-t-[1px] border-gray-600'>
          <div className='p-6'>
            <h2 className='text-xl font-bold mb-4 text-[#0e2d6d]'>Examens de linguistique</h2>
            <p className='text-gray-600 mb-4'>
            Sujets d'examens passés et réponses modèles pour les examens de linguistique.
            </p>

            <div className='space-y-3 mb-6'>
              {linguisticsModules.map((module) => (
                <div
                  key={module.id}
                  className='border rounded-md overflow-hidden'
                >
                  <button
                    onClick={() => toggleLinguisticsModule(module.id)}
                    className='w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-left'
                  >
                    <span className='font-medium'>{module.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        expandedLinguisticsModules.includes(module.id)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {expandedLinguisticsModules.includes(module.id) && (
                    <div className='p-3 bg-white'>
                      <ul className='space-y-2'>
                        {module.files.map((file) => (
                          <li key={file.id}>
                            <Link
                              href={file.path}
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

            <Link
              href='/quiz'
              className='rounded-btn px-4 py-2 bg-[#0e2d6d]  text-white hover:opacity-90 inline-block'
            >
              Commenter un quiz
            </Link>
          </div>
        </div>

        {/* Literature Card */}
        <div className='bg-white shadow-2xl rounded-lg overflow-hidden border-b-[1px] border-t-[1px] border-gray-600'>
          <div className='p-6'>
            <h2 className='text-xl font-bold mb-4 text-[#0e2d6d]'>Examens de Littérature </h2>
            <p className='text-gray-600 mb-4'>
            Sujets d'examen passés et réponses modèles pour les examens de littérature.
            </p>

            <div className='space-y-3 mb-6'>
              {literatureModules.map((module) => (
                <div
                  key={module.id}
                  className='border rounded-md overflow-hidden'
                >
                  <button
                    onClick={() => toggleLiteratureModule(module.id)}
                    className='w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-left'
                  >
                    <span className='font-medium'>{module.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        expandedLiteratureModules.includes(module.id)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {expandedLiteratureModules.includes(module.id) && (
                    <div className='p-3 bg-white'>
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

            <Link
              href='/quiz'
              className='rounded-btn px-4 py-2 bg-[#0e2d6d] text-white hover:opacity-90 inline-block'
            >
              Commenter un quiz
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
