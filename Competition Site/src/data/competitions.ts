export interface Competition {
  id: string;
  title: string;
  discipline: 'Architecture' | 'Landscape Architecture' | 'Urbanism' | 'Industrial Design';
  teamSize: string;
  prize: string;
  prizeAmount: number;
  deadline: string;
  deadlineDate: Date;
  cost: string;
  costAmount: number;
  imageUrl: string;
  description: string;
  location: string;
  organizer: string;
}

export const competitions: Competition[] = [
  {
    id: '1',
    title: 'Urban Housing Innovation Challenge',
    discipline: 'Architecture',
    teamSize: '2-5 members',
    prize: '$15,000',
    prizeAmount: 15000,
    deadline: 'June 15, 2026',
    deadlineDate: new Date('2026-06-15'),
    cost: '$150',
    costAmount: 150,
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
    description: 'Design innovative housing solutions for rapidly growing urban areas. This competition challenges architects to create sustainable, affordable, and culturally responsive housing that addresses the needs of modern city dwellers while respecting historical context.',
    location: 'Global',
    organizer: 'Buildner',
  },
  {
    id: '2',
    title: 'Sustainable Park Design Competition',
    discipline: 'Landscape Architecture',
    teamSize: '1-4 members',
    prize: '$8,000',
    prizeAmount: 8000,
    deadline: 'May 30, 2026',
    deadlineDate: new Date('2026-05-30'),
    cost: '$75',
    costAmount: 75,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
    description: 'Create a sustainable public park design that promotes biodiversity, handles stormwater naturally, and provides community spaces. Focus on native plantings, ecological corridors, and year-round usability.',
    location: 'North America',
    organizer: 'Landscape Architecture Foundation',
  },
  {
    id: '3',
    title: 'Metro Station Redesign',
    discipline: 'Urbanism',
    teamSize: '3-6 members',
    prize: '$25,000',
    prizeAmount: 25000,
    deadline: 'July 20, 2026',
    deadlineDate: new Date('2026-07-20'),
    cost: '$200',
    costAmount: 200,
    imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
    description: 'Redesign a major metropolitan transit station to improve passenger flow, enhance sustainability, and create vibrant public spaces. Consider integration with surrounding neighborhoods and multi-modal transportation connections.',
    location: 'Europe',
    organizer: 'International Transit Design Awards',
  },
  {
    id: '4',
    title: 'Smart Home Device Concept',
    discipline: 'Industrial Design',
    teamSize: '1-3 members',
    prize: '$5,000',
    prizeAmount: 5000,
    deadline: 'May 10, 2026',
    deadlineDate: new Date('2026-05-10'),
    cost: '$50',
    costAmount: 50,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    description: 'Design a next-generation smart home device that combines functionality with aesthetic excellence. Consider sustainability, user experience, and integration with existing smart home ecosystems.',
    location: 'Global',
    organizer: 'Industrial Design Society',
  },
  {
    id: '5',
    title: 'Cultural Center in Historic District',
    discipline: 'Architecture',
    teamSize: '2-4 members',
    prize: '$12,000',
    prizeAmount: 12000,
    deadline: 'August 1, 2026',
    deadlineDate: new Date('2026-08-01'),
    cost: '$125',
    costAmount: 125,
    imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
    description: 'Design a contemporary cultural center that respects and enhances a historic urban district. The project should include exhibition spaces, a small theater, and community gathering areas while preserving historical character.',
    location: 'Asia',
    organizer: 'World Architecture Festival',
  },
  {
    id: '6',
    title: 'Waterfront Revitalization Master Plan',
    discipline: 'Urbanism',
    teamSize: '4-8 members',
    prize: '$30,000',
    prizeAmount: 30000,
    deadline: 'September 15, 2026',
    deadlineDate: new Date('2026-09-15'),
    cost: '$250',
    costAmount: 250,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    description: 'Create a comprehensive master plan for revitalizing an abandoned industrial waterfront. Address environmental remediation, public access, economic development, and climate resilience.',
    location: 'Global',
    organizer: 'Urban Waterfront Institute',
  },
  {
    id: '7',
    title: 'Modular Furniture System',
    discipline: 'Industrial Design',
    teamSize: '1-2 members',
    prize: '$3,500',
    prizeAmount: 3500,
    deadline: 'April 30, 2026',
    deadlineDate: new Date('2026-04-30'),
    cost: '$40',
    costAmount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    description: 'Design a modular furniture system that can adapt to various living and working spaces. Focus on sustainability, ease of assembly, and aesthetic coherence across different configurations.',
    location: 'Europe',
    organizer: 'Design Museum London',
  },
  {
    id: '8',
    title: 'Community Garden Network',
    discipline: 'Landscape Architecture',
    teamSize: '2-5 members',
    prize: '$6,500',
    prizeAmount: 6500,
    deadline: 'June 1, 2026',
    deadlineDate: new Date('2026-06-01'),
    cost: '$60',
    costAmount: 60,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    description: 'Design a network of community gardens that promotes urban agriculture, social connection, and environmental education. Create spaces that serve diverse community needs while enhancing local biodiversity.',
    location: 'North America',
    organizer: 'American Society of Landscape Architects',
  },
];

export const disciplines = [
  'Architecture',
  'Landscape Architecture',
  'Urbanism',
  'Industrial Design',
] as const;

export const prizeRanges = [
  { label: 'Under $1k', min: 0, max: 1000 },
  { label: '$1k - $5k', min: 1000, max: 5000 },
  { label: '$5k+', min: 5000, max: Infinity },
] as const;

export const deadlineRanges = [
  { label: 'This month', months: 0 },
  { label: 'Next 3 months', months: 3 },
  { label: 'Next 6 months', months: 6 },
] as const;