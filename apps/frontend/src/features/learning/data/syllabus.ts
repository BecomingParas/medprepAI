export type LearningSubject = 'Physics' | 'Chemistry' | 'Biology';

export type LearningTopic = {
  id: string;
  name: string;
  chapter: string;
  questionChapterAliases?: string[];
  description: string;
};

export type LearningSection = {
  id: string;
  name: string;
  topics: LearningTopic[];
};

export type LearningSyllabusSubject = {
  id: LearningSubject;
  name: LearningSubject;
  sections: LearningSection[];
};

export const learningSyllabus: LearningSyllabusSubject[] = [
  {
    id: 'Physics',
    name: 'Physics',
    sections: [
      {
        id: 'PHYSICS_MECHANICS',
        name: 'Mechanics',
        topics: [
          {
            id: 'PHYSICS_MECHANICS_KINEMATICS',
            name: 'Kinematics',
            chapter: 'Kinematics',
            description: 'Describe motion using position, velocity and acceleration.',
          },
          {
            id: 'PHYSICS_MECHANICS_NEWTONS_LAWS',
            name: "Newton's Laws",
            chapter: "Newton's Laws",
            questionChapterAliases: ["Newton's second law", 'Newton’s second law'],
            description: 'Explain how forces influence the motion of objects.',
          },
          {
            id: 'PHYSICS_MECHANICS_WORK_ENERGY',
            name: 'Work & Energy',
            chapter: 'Work and Energy',
            description: 'Connect work, energy and changes in motion.',
          },
          {
            id: 'PHYSICS_MECHANICS_ROTATION',
            name: 'Rotational Motion',
            chapter: 'Rotational Motion',
            description: 'Explore angular motion, torque and rotational dynamics.',
          },
        ],
      },
    ],
  },
  {
    id: 'Chemistry',
    name: 'Chemistry',
    sections: [
      {
        id: 'CHEMISTRY_FOUNDATIONS',
        name: 'Chemistry',
        topics: [
          {
            id: 'CHEMISTRY_BONDING',
            name: 'Chemical Bonding',
            chapter: 'Chemical bonds',
            description: 'Explore how atoms share or transfer electrons to form bonds.',
          },
          {
            id: 'CHEMISTRY_PHYSICAL',
            name: 'Physical Chemistry',
            chapter: 'Physical chemistry',
            description: 'Study chemical calculations, states of matter and reactions.',
          },
          {
            id: 'CHEMISTRY_ORGANIC',
            name: 'Organic Chemistry',
            chapter: 'Organic chemistry',
            description: 'Explore the structures and reactions of carbon compounds.',
          },
        ],
      },
    ],
  },
  {
    id: 'Biology',
    name: 'Biology',
    sections: [
      {
        id: 'BIOLOGY_FOUNDATIONS',
        name: 'Biology',
        topics: [
          {
            id: 'BIOLOGY_CELLS',
            name: 'Cell Biology',
            chapter: 'Cell biology',
            description: 'Explore cell structures, organelles and cell division.',
          },
          {
            id: 'BIOLOGY_HUMAN_PHYSIOLOGY',
            name: 'Human Physiology',
            chapter: 'Human physiology',
            questionChapterAliases: ['Human biology and physiology'],
            description: 'Study the systems that support the function of the human body.',
          },
          {
            id: 'BIOLOGY_HEART_CIRCULATION',
            name: 'Heart & Circulation',
            chapter: 'Heart and circulation',
            questionChapterAliases: ['Heart & circulation'],
            description: 'Trace how blood moves through the pulmonary and systemic circuits.',
          },
        ],
      },
    ],
  },
];

export const defaultTopic = learningSyllabus[0].sections[0].topics[1];
