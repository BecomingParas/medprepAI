import { Atom, Dna, FlaskConical } from 'lucide-react';

export const subjects = [
  {
    name: 'Physics',
    icon: Atom,
    tone: 'text-phy',
    surface: 'bg-phy/8',
    number: '01',
    description: 'Make sense of the forces that shape our world.',
    topics: [
      'Mechanics',
      'Optics',
      'Electricity & magnetism',
      'Waves & thermodynamics',
    ],
  },
  {
    name: 'Chemistry',
    icon: FlaskConical,
    tone: 'text-chem',
    surface: 'bg-chem/8',
    number: '02',
    description: 'Connect the reactions. Understand the why.',
    topics: [
      'Organic chemistry',
      'Chemical bonding',
      'Physical chemistry',
      'Inorganic chemistry',
    ],
  },
  {
    name: 'Biology',
    icon: Dna,
    tone: 'text-bio',
    surface: 'bg-bio/8',
    number: '03',
    description: 'Discover the extraordinary science of life.',
    topics: [
      'Human physiology',
      'Cell biology',
      'Genetics',
      'Botany & zoology',
    ],
  },
];
