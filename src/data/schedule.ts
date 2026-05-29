export type ActivityType = 'stands' | 'break' | 'hunt' | 'judging' | 'awards' | 'submissions';

export interface ExperimentStand {
  fieldRo: string;
  fieldEn: string;
  activitiesRo: string[];
  activitiesEn: string[];
  iconColor: string;
  dotColor: string;
  borderColor: string;
  bgColor: string;
  hoverGlow: string;
}

export interface ScheduleEntry {
  time: string;
  titleRo: string;
  titleEn: string;
  descriptionRo?: string;
  descriptionEn?: string;
  type: ActivityType;
}

export const escapeRoomSlots = ['10:30', '11:15', '12:00', '14:15', '15:00', '15:45'];

export const experimentStandsDay1: ExperimentStand[] = [
  {
    fieldRo: 'Biologie',
    fieldEn: 'Biology',
    activitiesRo: [
      'Lumea uimitoare a coloniilor de bacterii (microbiologie)',
      'Realizarea lamelelor din celule proprii prin centrifugare',
      'Vizionarea la microscop a diferitelor preparate',
    ],
    activitiesEn: [
      'The amazing world of bacterial colonies (microbiology)',
      'Making slides from own cells through centrifugation',
      'Viewing various preparations under the microscope',
    ],
    iconColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    borderColor: 'border-emerald-400/30',
    bgColor: 'bg-emerald-400/5',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(52,211,153,0.25)]',
  },
  {
    fieldRo: 'Chimie',
    fieldEn: 'Chemistry',
    activitiesRo: [
      'Titrări reprezentative',
      'Reacții cu identificare de ioni',
      'Variația de culoare a acidului salicilic',
    ],
    activitiesEn: [
      'Representative titrations',
      'Reactions with ion identification',
      'Color variation of salicylic acid',
    ],
    iconColor: 'text-orange-400',
    dotColor: 'bg-orange-400',
    borderColor: 'border-orange-400/30',
    bgColor: 'bg-orange-400/5',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(251,146,60,0.25)]',
  },
  {
    fieldRo: 'Fizică',
    fieldEn: 'Physics',
    activitiesRo: [
      'Lumea motoarelor homopolare',
      'Camera obscură',
      'Alte experimente specifice',
    ],
    activitiesEn: [
      'The world of homopolar motors',
      'Camera obscura',
      'Other specific experiments',
    ],
    iconColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
    borderColor: 'border-blue-400/30',
    bgColor: 'bg-blue-400/5',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(96,165,250,0.25)]',
  },
  {
    fieldRo: 'Fundația SMURD',
    fieldEn: 'SMURD Foundation',
    activitiesRo: [
      'Tehnici de prim ajutor',
      'Folosirea aparaturii medicale',
    ],
    activitiesEn: [
      'First aid techniques',
      'Use of medical equipment',
    ],
    iconColor: 'text-red-400',
    dotColor: 'bg-red-400',
    borderColor: 'border-red-400/30',
    bgColor: 'bg-red-400/5',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(248,113,113,0.25)]',
  },
  {
    fieldRo: 'NextStep',
    fieldEn: 'NextStep',
    activitiesRo: ['Club de orientare în carieră'],
    activitiesEn: ['Career orientation club'],
    iconColor: 'text-nexus-purple',
    dotColor: 'bg-nexus-purple',
    borderColor: 'border-nexus-purple/30',
    bgColor: 'bg-nexus-purple/5',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(176,102,255,0.25)]',
  },
];

export const experimentStandsDay2: ExperimentStand[] = experimentStandsDay1.filter(
  (s) => s.fieldRo !== 'NextStep'
);

export const day1Schedule: ScheduleEntry[] = [
  {
    time: '10:00 – 13:00',
    titleRo: 'Standuri cu experimente deschise',
    titleEn: 'Open Experiment Stands',
    type: 'stands',
  },
  {
    time: '13:00 – 14:00',
    titleRo: 'Pauză de masă',
    titleEn: 'Lunch Break',
    type: 'break',
  },
  {
    time: '14:00 – 16:30',
    titleRo: 'Standuri cu experimente deschise',
    titleEn: 'Open Experiment Stands',
    type: 'stands',
  },
];

export const day2Schedule: ScheduleEntry[] = [
  {
    time: '– 11:30',
    titleRo: 'Aducerea proiectelor',
    titleEn: 'Project Submissions',
    descriptionRo: 'Perioada de înregistrare și prezentare a proiectelor',
    descriptionEn: 'Registration and submission period for projects',
    type: 'submissions',
  },
  {
    time: '10:00 – 13:00',
    titleRo: 'Standuri cu experimente deschise',
    titleEn: 'Open Experiment Stands',
    type: 'stands',
  },
  {
    time: '11:00 – 13:00',
    titleRo: 'Treasure Hunt',
    titleEn: 'Treasure Hunt',
    descriptionRo: '5 puncte în centrul orașului Câmpina — echipa cu cel mai scurt timp câștigă',
    descriptionEn: '5 checkpoints across central Câmpina — fastest team wins',
    type: 'hunt',
  },
  {
    time: '11:30 – 13:00',
    titleRo: 'Jurizare proiecte',
    titleEn: 'Project Judging',
    descriptionRo: 'Evaluarea proiectelor înscrise în concurs',
    descriptionEn: 'Evaluation of submitted competition projects',
    type: 'judging',
  },
  {
    time: '13:00 – 14:00',
    titleRo: 'Pauză de masă',
    titleEn: 'Lunch Break',
    type: 'break',
  },
  {
    time: '14:00 – 16:30',
    titleRo: 'Standuri cu experimente deschise',
    titleEn: 'Open Experiment Stands',
    type: 'stands',
  },
  {
    time: '14:30',
    titleRo: 'Premierea concurenților',
    titleEn: 'Awards Ceremony',
    descriptionRo: 'Locul 1, 2, 3 la concursul de proiecte · Cea mai rapidă echipă la Treasure Hunt',
    descriptionEn: '1st, 2nd, 3rd place in the science project competition · Fastest team in the Treasure Hunt',
    type: 'awards',
  },
];
