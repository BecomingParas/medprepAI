export type SyllabusGroup = 1 | 2 | 3 | 4;

export type SyllabusTopic = {
  name: string;
  questions?: number;
  coverage: string;
};

export type SyllabusSubject = {
  name: string;
  questions: number;
  color: 'blue' | 'green' | 'violet' | 'amber' | 'rose' | 'slate';
  topics: SyllabusTopic[];
};

export type CourseEntranceSyllabus = {
  title: string;
  programs: string;
  subjects: SyllabusSubject[];
};

const zoologyTopics: SyllabusTopic[] = [
  {
    name: 'Evolutionary biology',
    questions: 3,
    coverage:
      'Origin-of-life theories, evidence for evolution, Lamarckism, Darwinism, Neo-Darwinism and human evolution.',
  },
  {
    name: 'Animal diversity and classification',
    questions: 4,
    coverage: 'Diagnostic features and classification from Protozoa to Chordata.',
  },
  {
    name: 'Animal tissues and histology',
    questions: 4,
    coverage:
      'Structure, location and function of epithelial, connective, muscular and nervous tissues.',
  },
  {
    name: 'Study of selected animals',
    questions: 6,
    coverage:
      'Plasmodium and malaria; earthworm (Pheretima); frog (Rana); their morphology, life cycles or body systems, physiology and significance.',
  },
  {
    name: 'Human biology and physiology',
    questions: 15,
    coverage:
      'Digestive, respiratory, circulatory, excretory, nervous, sensory, endocrine and reproductive systems; their functions and related disorders.',
  },
  {
    name: 'Microbial diseases and immunology',
    questions: 4,
    coverage:
      'Typhoid, tuberculosis, HIV, cholera, influenza, hepatitis and candidiasis; innate and acquired immunity, antigens, antibodies and vaccines.',
  },
  {
    name: 'Medical technology and applied biology',
    questions: 2,
    coverage:
      'Transplantation, IVF, amniocentesis, transgenic animals, applied microbiology, water treatment and biological control.',
  },
  {
    name: 'Biota, environment and conservation',
    questions: 2,
    coverage:
      'Animal behaviour and adaptation, pollution, biodiversity conservation, protected areas, hotspots, Ramsar sites and endangered species of Nepal.',
  },
];

const botanyTopics: SyllabusTopic[] = [
  {
    name: 'Basic components of life',
    questions: 2,
    coverage:
      'Structure, types and biological roles of carbohydrates, lipids, minerals, proteins and enzymes.',
  },
  {
    name: 'Biodiversity',
    questions: 9,
    coverage:
      'Classification; Monera and viruses; fungi and lichens; algae; bryophytes; pteridophytes; gymnosperms; angiosperm morphology and selected families; economic and medicinal plants of Nepal.',
  },
  {
    name: 'Ecology and vegetation',
    questions: 4,
    coverage:
      'Pond and forest ecosystems, biotic interactions, carbon and nitrogen cycles, climate impacts, vegetation types of Nepal, invasion, succession, hydrosere and xerosere.',
  },
  {
    name: 'Cell biology',
    questions: 5,
    coverage:
      'Prokaryotic and eukaryotic cells; cell structures and organelles; cell cycle, amitosis, mitosis and meiosis.',
  },
  {
    name: 'Genetics',
    questions: 6,
    coverage:
      'DNA and RNA, replication and genetic code; Mendelian inheritance, linkage and crossing over; sex-linked inheritance, mutation, polyploidy and genetic disorders.',
  },
  {
    name: 'Plant anatomy',
    questions: 3,
    coverage:
      'Plant tissues and vascular bundles; internal structure of monocot and dicot roots, stems and leaves.',
  },
  {
    name: 'Plant physiology',
    questions: 6,
    coverage:
      'Water relations and transport; photosynthesis and respiration; plant growth regulators, germination and seed dormancy.',
  },
  {
    name: 'Developmental botany',
    questions: 2,
    coverage:
      'Asexual reproduction, sporogenesis, gametogenesis, pollination, fertilization, embryos and endosperm.',
  },
  {
    name: 'Applied botany',
    questions: 3,
    coverage:
      'Plant tissue culture, genetic engineering, biofertilizers, green manures, plant breeding, bio-engineering, food safety and security.',
  },
];

const chemistryTopics = (
  physical: number,
  inorganic: number,
  organic: number,
): SyllabusTopic[] => [
  {
    name: 'Physical chemistry',
    questions: physical,
    coverage:
      'Basic chemical calculations and stoichiometry; atomic structure and periodicity; bonding; states of matter; equilibrium and ionic equilibrium; volumetric analysis; kinetics; electrochemistry; thermodynamics and nuclear chemistry.',
  },
  {
    name: 'Inorganic chemistry',
    questions: inorganic,
    coverage:
      'Chemistry of non-metals and metals; extraction and properties; coordination compounds; bio-inorganic chemistry and the biological roles or toxicity of selected elements.',
  },
  {
    name: 'Organic chemistry',
    questions: organic,
    coverage:
      'Organic structures, nomenclature and reaction concepts; hydrocarbons; aromatic compounds; haloalkanes; alcohols and phenols; ethers; carbonyl compounds; carboxylic acids and derivatives; nitro compounds, amines and organometallic compounds.',
  },
  {
    name: 'Applied chemistry',
    questions: 3,
    coverage:
      'Chemical industries and manufacturing processes; applications of elements and compounds; polymers, dyes, medicines, pesticides, fertilizers and radioisotopes.',
  },
  {
    name: 'Analytical chemistry',
    questions: 3,
    coverage:
      'Chemical and biomolecule tests; separation techniques; acid-base, redox and complexometric titrations.',
  },
];

const physicsTopics = (
  mechanics: number,
  heat: number,
  waves: number,
  electricity: number,
  electrostatics: number,
  modern: number,
): SyllabusTopic[] => [
  {
    name: 'Mechanics',
    questions: mechanics,
    coverage:
      'Measurements, vectors, kinematics, dynamics, rotation, fluids, circular and periodic motion, gravitation and elasticity.',
  },
  {
    name: 'Heat and thermodynamics',
    questions: heat,
    coverage:
      'Temperature and heat transfer, thermal expansion, heat capacity, ideal gases, thermodynamic laws, heat engines and refrigerators.',
  },
  {
    name: 'Waves and optics',
    questions: waves,
    coverage:
      'Progressive and stationary waves, sound and Doppler effect, reflection, refraction, dispersion, interference, diffraction and polarization.',
  },
  {
    name: 'Current electricity and magnetism',
    questions: electricity,
    coverage:
      'Circuit laws and instruments, thermoelectric effects, AC circuits, magnetic materials and fields, electromagnetic induction, generators and transformers.',
  },
  {
    name: 'Electrostatics and capacitors',
    questions: electrostatics,
    coverage:
      'Electric charge and fields, potential, capacitance, capacitors and their applications.',
  },
  {
    name: 'Modern physics',
    questions: modern,
    coverage:
      'Atomic and nuclear physics, electrons and photons, wave-particle duality, radioactivity, semiconductors and logic gates, particle physics and recent trends.',
  },
];

const matTopics: SyllabusTopic[] = [
  { name: 'Verbal reasoning', questions: 5, coverage: 'Language and verbal reasoning.' },
  { name: 'Numerical reasoning', questions: 5, coverage: 'Quantitative and numerical reasoning.' },
  { name: 'Logical sequencing', questions: 5, coverage: 'Sequences and logical ordering.' },
  {
    name: 'Spatial / abstract reasoning',
    questions: 5,
    coverage: 'Spatial relations and abstract reasoning.',
  },
];

const zoology = (questions: number): SyllabusSubject => ({
  name: 'Zoology',
  questions,
  color: 'blue',
  topics: zoologyTopics,
});

const botany = (questions: number): SyllabusSubject => ({
  name: 'Botany',
  questions,
  color: 'green',
  topics: botanyTopics,
});

const mat: SyllabusSubject = {
  name: 'Mental Agility Test (MAT)',
  questions: 20,
  color: 'slate',
  topics: matTopics,
};

const matForPcbGroup = (): SyllabusSubject => ({ ...mat, topics: matTopics });

export const syllabusGroups: Record<SyllabusGroup, CourseEntranceSyllabus> = {
  1: {
    title: 'Group I',
    programs: 'MBBS, BDS, BSc Nursing / BSc Midwifery, BASLP and B Perfusion Technology',
    subjects: [
      zoology(40),
      botany(40),
      {
        name: 'Chemistry',
        questions: 50,
        color: 'violet',
        topics: chemistryTopics(17, 10, 17),
      },
      {
        name: 'Physics',
        questions: 50,
        color: 'amber',
        topics: physicsTopics(10, 7, 8, 9, 4, 12),
      },
      matForPcbGroup(),
    ],
  },
  2: {
    title: 'Group II',
    programs: 'BAMS, BSc MLT, BSc MIT / BSc Radiotherapy Technology, BPT, B Pharm and B Optometry',
    subjects: [
      zoology(40),
      botany(40),
      {
        name: 'Chemistry',
        questions: 40,
        color: 'violet',
        topics: chemistryTopics(14, 7, 13),
      },
      {
        name: 'Physics',
        questions: 40,
        color: 'amber',
        topics: physicsTopics(8, 6, 6, 7, 3, 10),
      },
      {
        name: 'PCL / diploma-specific subject',
        questions: 20,
        color: 'rose',
        topics: [
          {
            name: 'Relevant PCL / diploma content',
            questions: 20,
            coverage:
              'The syllabus lists questions from the specific subject content of the relevant PCL / diploma program.',
          },
        ],
      },
      matForPcbGroup(),
    ],
  },
  3: {
    title: 'Group III',
    programs: 'BPH (Bachelor in Public Health)',
    subjects: [
      zoology(40),
      botany(40),
      {
        name: 'Chemistry',
        questions: 40,
        color: 'violet',
        topics: chemistryTopics(14, 7, 13),
      },
      {
        name: 'Physics',
        questions: 40,
        color: 'amber',
        topics: physicsTopics(8, 6, 6, 7, 3, 10),
      },
      {
        name: 'Pre-requisite health knowledge',
        questions: 20,
        color: 'rose',
        topics: [
          {
            name: 'Determinants of health and illness',
            questions: 5,
            coverage: 'Basic determinants of health and illness.',
          },
          {
            name: 'Communicable diseases',
            questions: 5,
            coverage: 'Communicable diseases, including vector-borne and zoonotic diseases.',
          },
          {
            name: 'Non-communicable diseases',
            questions: 3,
            coverage: 'Basic concepts of non-communicable diseases.',
          },
          {
            name: 'Water, sanitation and hygiene (WASH)',
            questions: 2,
            coverage: 'Water, sanitation and hygiene.',
          },
          {
            name: 'Biostatistics and epidemiology',
            questions: 5,
            coverage: 'Basic concepts of biostatistics and epidemiology.',
          },
        ],
      },
      matForPcbGroup(),
    ],
  },
  4: {
    title: 'Group IV',
    programs: 'BNS (Bachelor in Nursing Science) / BMS (Bachelor in Midwifery Science)',
    subjects: [
      {
        name: 'Core nursing / midwifery subjects',
        questions: 150,
        color: 'rose',
        topics: [
          {
            name: 'Community health nursing',
            questions: 25,
            coverage: 'Community health nursing.',
          },
          {
            name: 'Adult health nursing',
            questions: 25,
            coverage: 'Adult health nursing.',
          },
          {
            name: 'Child health nursing',
            questions: 25,
            coverage: 'Child health nursing.',
          },
          {
            name: 'Midwifery and gynecological nursing',
            questions: 25,
            coverage: 'Midwifery and gynecological nursing.',
          },
          {
            name: 'Fundamentals of nursing',
            questions: 20,
            coverage: 'Fundamentals of nursing.',
          },
          {
            name: 'Leadership and management',
            questions: 20,
            coverage: 'Leadership and management.',
          },
          {
            name: 'Behavioral science and mental health',
            questions: 10,
            coverage: 'Behavioral science and mental health.',
          },
        ],
      },
      {
        name: 'Basic and integrated health science applied to nursing',
        questions: 30,
        color: 'blue',
        topics: [
          {
            name: 'Biochemistry',
            questions: 5,
            coverage: 'Basic and integrated biochemistry applied to nursing.',
          },
          {
            name: 'Microbiology',
            questions: 5,
            coverage: 'Basic and integrated microbiology applied to nursing.',
          },
          {
            name: 'Pharmacology',
            questions: 6,
            coverage: 'Basic and integrated pharmacology applied to nursing.',
          },
          {
            name: 'Anatomy',
            questions: 7,
            coverage: 'Basic and integrated anatomy applied to nursing.',
          },
          {
            name: 'Physiology',
            questions: 7,
            coverage: 'Basic and integrated physiology applied to nursing.',
          },
        ],
      },
      {
        ...mat,
        topics: [
          ...matTopics.slice(0, 3),
          {
            name: 'Abstract reasoning / spatial relation',
            questions: 5,
            coverage: 'Abstract reasoning and spatial relations.',
          },
        ],
      },
    ],
  },
};

export const commonExamFormat = [
  { label: 'Questions', value: '200 MCQs' },
  { label: 'Duration', value: '3 hours' },
  { label: 'Wrong answer', value: '−0.25 mark' },
  { label: 'Qualifying threshold', value: '50th percentile' },
];
