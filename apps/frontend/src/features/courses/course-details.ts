export type CourseDetails = {
  name: string;
  credential: string;
  overview: string;
  studyAreas: string[];
  careerFields: string[];
  entranceGroup?: 1 | 2 | 3;
};

export const courseDetails: Record<string, CourseDetails> = {
  mbbs: {
    name: 'MBBS',
    credential: 'Bachelor of Medicine, Bachelor of Surgery',
    overview:
      'An undergraduate medical degree focused on understanding health and disease, developing clinical skills, and caring for patients.',
    studyAreas: [
      'Foundational medical and biomedical sciences',
      'Clinical assessment and patient care',
      'Medicine, surgery and related clinical disciplines',
    ],
    careerFields: [
      'Clinical practice after meeting applicable registration requirements',
      'Hospital and community healthcare',
      'Further medical training and specialization',
    ],
    entranceGroup: 1,
  },
  bds: {
    name: 'BDS',
    credential: 'Bachelor of Dental Surgery',
    overview:
      'An undergraduate dental degree focused on oral health, prevention and diagnosis of dental conditions, and clinical dental care.',
    studyAreas: [
      'Oral and dental sciences',
      'Preventive and restorative dentistry',
      'Clinical dental practice and patient care',
    ],
    careerFields: [
      'Dental practice after meeting applicable registration requirements',
      'Hospital and community oral-health services',
      'Further study in dental specialties',
    ],
    entranceGroup: 1,
  },
  'bsc-nursing': {
    name: 'BSc Nursing',
    credential: 'Bachelor of Science in Nursing',
    overview:
      'An undergraduate nursing degree combining nursing science, practical clinical learning, and care for individuals and communities.',
    studyAreas: [
      'Nursing foundations and patient assessment',
      'Clinical nursing practice',
      'Community health and health promotion',
    ],
    careerFields: [
      'Nursing services in healthcare settings',
      'Community and public-health services',
      'Further study and nursing specialization',
    ],
    entranceGroup: 1,
  },
  'b-pharmacy': {
    name: 'B Pharmacy',
    credential: 'Bachelor of Pharmacy',
    overview:
      'An undergraduate pharmacy degree focused on medicines, pharmaceutical sciences, and the safe and effective use of medications.',
    studyAreas: [
      'Pharmaceutical and medicinal sciences',
      'Medicines and dosage-form development',
      'Pharmacy practice and medication safety',
    ],
    careerFields: [
      'Pharmacy practice subject to applicable registration',
      'Pharmaceutical industry and quality work',
      'Further study in pharmacy and pharmaceutical sciences',
    ],
    entranceGroup: 2,
  },
  'b-optometry': {
    name: 'B Optometry',
    credential: 'Bachelor of Optometry',
    overview:
      'An undergraduate eye-care degree focused on vision, eye health, assessment, and optometric care.',
    studyAreas: [
      'Visual and ocular sciences',
      'Vision assessment and optical correction',
      'Clinical optometry and eye-health services',
    ],
    careerFields: [
      'Optometric services subject to applicable registration',
      'Eye-care clinics and health services',
      'Further study in vision and eye-care fields',
    ],
    entranceGroup: 2,
  },
  bmlt: {
    name: 'BMLT',
    credential: 'Bachelor of Medical Laboratory Technology',
    overview:
      'An undergraduate laboratory-science degree focused on diagnostic testing and the laboratory methods that support healthcare.',
    studyAreas: [
      'Clinical laboratory methods and diagnostics',
      'Hematology, microbiology and clinical biochemistry',
      'Laboratory quality, safety and data handling',
    ],
    careerFields: [
      'Medical and clinical diagnostic laboratories',
      'Hospital laboratory services',
      'Further study in laboratory and biomedical sciences',
    ],
    entranceGroup: 2,
  },
  bmit: {
    name: 'BMIT',
    credential: 'Bachelor of Medical Imaging Technology',
    overview:
      'An undergraduate imaging-technology degree focused on medical imaging procedures, equipment, and safe patient care.',
    studyAreas: [
      'Medical imaging principles and equipment',
      'Imaging procedures and patient positioning',
      'Radiation safety and patient care',
    ],
    careerFields: [
      'Medical imaging services subject to applicable registration',
      'Hospital and diagnostic imaging departments',
      'Further study in medical imaging fields',
    ],
    entranceGroup: 2,
  },
  bph: {
    name: 'BPH',
    credential: 'Bachelor of Public Health',
    overview:
      'An undergraduate public-health degree focused on health at population level, prevention, and improving community wellbeing.',
    studyAreas: [
      'Public-health foundations and epidemiology',
      'Community health and health promotion',
      'Health systems, research and program planning',
    ],
    careerFields: [
      'Public-health programs and services',
      'Community health and development organizations',
      'Further study in public health and related fields',
    ],
    entranceGroup: 3,
  },
  bpt: {
    name: 'BPT',
    credential: 'Bachelor of Physiotherapy',
    overview:
      'An undergraduate physiotherapy degree focused on movement, physical function, rehabilitation, and helping people manage injury or disability.',
    studyAreas: [
      'Human movement and functional assessment',
      'Therapeutic exercise and rehabilitation',
      'Clinical physiotherapy and patient care',
    ],
    careerFields: [
      'Physiotherapy services subject to applicable registration',
      'Rehabilitation and healthcare services',
      'Further study in physiotherapy specialties',
    ],
    entranceGroup: 2,
  },
  baslp: {
    name: 'BASLP',
    credential: 'Bachelor of Audiology and Speech-Language Pathology',
    overview:
      'An undergraduate allied-health degree focused on hearing, communication, and assessment and support for related disorders.',
    studyAreas: [
      'Audiology and hearing assessment',
      'Speech, language and communication',
      'Clinical assessment and rehabilitation',
    ],
    careerFields: [
      'Audiology and hearing-care services',
      'Speech-language and rehabilitation services',
      'Further study in communication and hearing sciences',
    ],
    entranceGroup: 1,
  },
  'bsc-agriculture': {
    name: 'BSc Agriculture',
    credential: 'Bachelor of Science in Agriculture',
    overview:
      'An undergraduate agriculture degree covering scientific approaches to crops, soils, production systems, and sustainable agriculture.',
    studyAreas: [
      'Crop and soil sciences',
      'Plant health and agricultural production',
      'Agricultural systems and extension',
    ],
    careerFields: [
      'Agricultural services and extension',
      'Farms, agribusiness and related organizations',
      'Further study in agricultural sciences',
    ],
  },
  'veterinary-science': {
    name: 'Veterinary Science',
    credential: 'Bachelor of Veterinary Science & Animal Husbandry',
    overview:
      'An undergraduate veterinary degree focused on animal health, disease prevention, veterinary care, and animal husbandry.',
    studyAreas: [
      'Animal biology and health',
      'Veterinary medicine and disease prevention',
      'Animal production and husbandry',
    ],
    careerFields: [
      'Veterinary services subject to applicable registration',
      'Livestock and animal-health services',
      'Further study in veterinary and animal sciences',
    ],
  },
  'bsc-forestry': {
    name: 'BSc Forestry',
    credential: 'Bachelor of Science in Forestry',
    overview:
      'An undergraduate forestry degree focused on forests, ecosystems, conservation, and sustainable management of forest resources.',
    studyAreas: [
      'Forest ecology and biodiversity',
      'Forest management and conservation',
      'Forest resources and community forestry',
    ],
    careerFields: [
      'Forestry and conservation programs',
      'Forest-resource management and community forestry',
      'Further study in forestry and environmental sciences',
    ],
  },
  'b-technology': {
    name: 'B Technology',
    credential: 'Bachelor of Technology',
    overview:
      'A technology undergraduate pathway. The specific discipline and curriculum depend on the institution and program listed in the current admission notice.',
    studyAreas: [
      'Applied science and technology foundations',
      'Technical methods within the chosen discipline',
      'Practical and project-based learning as defined by the institution',
    ],
    careerFields: [
      'Technology roles relevant to the specific degree discipline',
      'Applied science and technical organizations',
      'Further study in the selected technology field',
    ],
  },
  'food-technology': {
    name: 'Food Technology',
    credential: 'Bachelor of Science in Food Technology',
    overview:
      'An undergraduate food-science degree focused on food composition, processing, quality, safety, and product development.',
    studyAreas: [
      'Food science and processing',
      'Food quality and safety',
      'Product development and food analysis',
    ],
    careerFields: [
      'Food production and processing',
      'Food quality assurance and safety',
      'Further study in food science and technology',
    ],
  },
};

export function getProgramSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
