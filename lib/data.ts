import { TeamMember, Publication, ResearchProject } from './types';

// Lab information
export const LAB_NAME = 'Advanced Materials & Systems Lab';
export const LAB_ACRONYM = 'AMS Lab';
export const LAB_DESCRIPTION = 'Pioneering research at the intersection of materials science, nanotechnology, and biomimetic systems';
export const LAB_INSTITUTION = 'Institute of Advanced Research';
export const LAB_EMAIL = 'contact@amslab.edu';

// Team members
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'pi',
    title: 'Principal Investigator',
    bio: 'PhD in Materials Science from MIT. Specialized in self-assembling polymers and sustainable materials.',
    image: '/images/team/sarah.jpg',
    email: 'sarah.chen@institution.edu',
    website: 'https://scholar.google.com/citations?user=sarahchen',
    specialization: 'Self-assembling polymers',
  },
  {
    id: '2',
    name: 'Dr. James Rodriguez',
    role: 'phd',
    title: 'Post-Doctoral Researcher',
    bio: 'PhD in Nanotechnology. Currently leading research on bio-inspired adhesives.',
    image: '/images/team/james.jpg',
    email: 'j.rodriguez@institution.edu',
    specialization: 'Bio-inspired adhesives',
  },
  {
    id: '3',
    name: 'Dr. Akira Tanaka',
    role: 'phd',
    title: 'PhD Candidate',
    bio: 'Working on computational modeling of material properties using machine learning.',
    image: '/images/team/akira.jpg',
    email: 'a.tanaka@institution.edu',
    specialization: 'ML for materials science',
  },
  {
    id: '4',
    name: 'Emily Winters',
    role: 'phd',
    title: 'PhD Candidate',
    bio: 'Developing novel synthesis methods for nanocomposites with enhanced properties.',
    image: '/images/team/emily.jpg',
    email: 'e.winters@institution.edu',
    specialization: 'Nanocomposite synthesis',
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    role: 'undergrad',
    title: 'Undergraduate Researcher',
    bio: 'Senior year student investigating polymer crystallization phenomena.',
    image: '/images/team/marcus.jpg',
    email: 'm.johnson@institution.edu',
  },
  {
    id: '6',
    name: 'Prof. Lisa Wang',
    role: 'collaborator',
    title: 'Collaborating Researcher',
    bio: 'From Department of Chemistry. Collaborating on protein-material interactions.',
    image: '/images/team/lisa.jpg',
    website: 'https://chemistry.institution.edu/wang',
  },
];

// Research projects
export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: '1',
    title: 'Bio-Inspired Self-Healing Materials',
    description: 'Developing polymers that mimic natural healing mechanisms found in biology',
    longDescription:
      'This project focuses on creating synthetic materials that can spontaneously repair damage, inspired by biological systems. We leverage gecko-inspired adhesion principles and reversible cross-linking chemistries to achieve unprecedented self-healing performance. Applications range from structural composites to medical devices.',
    image: '/images/projects/healing-materials.jpg',
    tags: ['polymers', 'self-healing', 'biomimetics'],
    publications: ['1', '2', '5'],
    status: 'active',
  },
  {
    id: '2',
    title: 'Nanoscale Surface Engineering',
    description: 'Creating programmable nanostructures for advanced application domains',
    longDescription:
      'We engineer nanoscale surface patterns that exhibit programmable properties. Using electron-beam lithography and chemical functionalization, we create surfaces with tunable wettability, adhesion, and optical properties for applications in microfluidics and biosensing.',
    image: '/images/projects/nanostructures.jpg',
    tags: ['nanotechnology', 'surface engineering', 'patterning'],
    publications: ['3', '4'],
    status: 'active',
  },
  {
    id: '3',
    title: 'Machine Learning for Material Discovery',
    description: 'Using AI to accelerate discovery of novel materials with optimal properties',
    longDescription:
      'This initiative combines high-throughput computational screening with machine learning models to predict material properties and design novel polymers. We develop algorithms trained on experimental and literature data to guide synthesis and characterization efforts.',
    image: '/images/projects/ml-materials.jpg',
    tags: ['machine learning', 'computational', 'discovery'],
    publications: ['6'],
    status: 'active',
  },
  {
    id: '4',
    title: 'Sustainable Polymer Chemistry',
    description: 'Developing eco-friendly alternatives to conventional plastics and composites',
    longDescription:
      'Research into bio-based and biodegradable polymers that maintain performance characteristics of conventional materials. We explore plant-derived monomers, enzyme-catalyzed polymerization, and circular economy principles.',
    image: '/images/projects/sustainable.jpg',
    tags: ['sustainability', 'green chemistry', 'polymers'],
    publications: ['7', '8'],
    status: 'active',
  },
  {
    id: '5',
    title: 'Nanocomposite Characterization Suite',
    description: 'Advanced multi-technique characterization of nanoparticle-reinforced materials',
    longDescription:
      'Development of integrated characterization workflows combining electron microscopy, spectroscopy, and mechanical testing to understand structure-property relationships in nanocomposites.',
    image: '/images/projects/characterization.jpg',
    tags: ['characterization', 'nanocomposites', 'microscopy'],
    publications: ['4', '9'],
    status: 'completed',
  },
  {
    id: '6',
    title: 'Programmable Hydrogels',
    description: 'Smart hydrogels that respond to environmental stimuli for biomedical applications',
    longDescription:
      'Engineering hydrogels that change properties in response to pH, temperature, light, or chemical stimuli. Applications include drug delivery systems, tissue engineering scaffolds, and biomedical sensors.',
    image: '/images/projects/hydrogels.jpg',
    tags: ['hydrogels', 'biomedical', 'responsive materials'],
    publications: ['10'],
    status: 'planned',
  },
];

// Publications
export const PUBLICATIONS: Publication[] = [
  {
    id: '1',
    title: 'Thermoreversible Self-Healing Polymers with Dynamic Hydrogen Bonding Networks',
    authors: ['Chen, S.', 'Rodriguez, J.', 'Wang, L.', 'Tanaka, A.'],
    journal: 'Nature Materials',
    year: 2024,
    tags: ['self-healing', 'hydrogen bonding', 'polymers'],
    abstract:
      'We demonstrate a new class of self-healing polymers utilizing dynamic hydrogen bonding networks. The materials exhibit healing efficiencies exceeding 95% at room temperature and maintain mechanical properties across multiple healing cycles.',
    doi: '10.1038/s41563-024-01234-x',
  },
  {
    id: '2',
    title: 'Gecko-Inspired Reversible Adhesion for Medical Device Applications',
    authors: ['Rodriguez, J.', 'Chen, S.', 'Johnson, M.'],
    journal: 'Advanced Functional Materials',
    year: 2024,
    tags: ['adhesion', 'biomimetic', 'medical'],
    abstract:
      'Bio-inspired adhesive surfaces showing reversible attachment without residue. We achieved adhesion strengths of 100 kPa with over 1000 reusable cycles using microstructured polymer arrays.',
    doi: '10.1002/adfm.202301234',
  },
  {
    id: '3',
    title: 'Programmable Nanopatterned Surfaces via Templated Polymerization',
    authors: ['Tanaka, A.', 'Winters, E.', 'Chen, S.'],
    journal: 'Nano Letters',
    year: 2024,
    tags: ['nanotechnology', 'patterning', 'surfaces'],
    abstract:
      'A rapid and scalable method for creating programmable nanopatterned surfaces using block copolymer templating. The approach allows precise control of feature sizes from 10 nm to 1 μm.',
    doi: '10.1021/acs.nanolett.024.x',
  },
  {
    id: '4',
    title: 'Multiscale Characterization Framework for Nanoparticle Composites',
    authors: ['Winters, E.', 'Chen, S.', 'Tanaka, A.', 'Rodriguez, J.'],
    journal: 'Chemistry of Materials',
    year: 2023,
    tags: ['characterization', 'nanocomposites', 'microscopy'],
    abstract:
      'Integrated characterization approach combining SEM, TEM, AFM, and mechanical testing to correlate nanostructure with macroscopic properties in nanocomposites.',
    doi: '10.1021/acs.chemmater.3c02345',
  },
  {
    id: '5',
    title: 'Cyclic Healing Efficiency in Thermoreversible Networks: Theory and Experiment',
    authors: ['S. Chen', 'J. Rodriguez'],
    journal: 'Macromolecules',
    year: 2023,
    tags: ['self-healing', 'theory', 'polymers'],
    abstract:
      'Theoretical model and experimental validation of healing kinetics in reversible polymer networks. We identify key factors controlling healing efficiency and predict optimal network architectures.',
    doi: '10.1021/acs.macromol.3c01234',
  },
  {
    id: '6',
    title: 'Machine Learning-Accelerated Discovery of High-Performance Polyesters',
    authors: ['Tanaka, A.', 'Chen, S.', 'Johnson, M.'],
    journal: 'ACS Materials Letters',
    year: 2023,
    tags: ['machine learning', 'discovery', 'polymers'],
    abstract:
      'Deep learning models trained on synthesis and characterization data to predict polyester properties. Validated on 50 novel materials with 87% prediction accuracy.',
    doi: '10.1021/acsmaterialslett.3c00456',
  },
  {
    id: '7',
    title: 'Bio-Based Monomers from Renewable Resources: Synthesis and Polymerization',
    authors: ['Chen, S.', 'Winters, E.', 'Wang, L.'],
    journal: 'Green Chemistry',
    year: 2023,
    tags: ['sustainability', 'green chemistry', 'biomass'],
    abstract:
      'Efficient synthesis of bio-based monomers from agricultural waste and development of new polymerization routes. Achieved 72% overall yield with minimal environmental impact.',
    doi: '10.1039/d3gc01234e',
  },
  {
    id: '8',
    title: 'Biodegradable Composites with Improved Properties: Structure-Property Relationships',
    authors: ['Winters, E.', 'Chen, S.'],
    journal: 'Polymer',
    year: 2023,
    tags: ['biodegradable', 'composites', 'sustainability'],
    abstract:
      'Comprehensive study of structure-property relationships in biodegradable fiber-reinforced composites. Demonstrated mechanical properties comparable to conventional materials.',
    doi: '10.1016/j.polymer.2023.126123',
  },
  {
    id: '9',
    title: 'Advanced Electron Microscopy Techniques for Nanocomposite Quality Assessment',
    authors: ['Rodriguez, J.', 'Tanaka, A.', 'Winters, E.'],
    journal: 'Microscopy Today',
    year: 2023,
    tags: ['electron microscopy', 'characterization', 'nanocomposites'],
    abstract:
      'Review of cutting-edge electron microscopy methods for analyzing nanoparticle dispersion, orientation, and interface quality in composite materials.',
    doi: '10.1017/S1551929523000256',
  },
  {
    id: '10',
    title: 'Stimulus-Responsive Hydrogels: Design Principles and Biomedical Applications',
    authors: ['Chen, S.', 'Rodriguez, J.', 'Wang, L.'],
    journal: 'Biomacromolecules',
    year: 2022,
    tags: ['hydrogels', 'responsive', 'biomedical'],
    abstract:
      'Comprehensive review of stimulus-responsive hydrogel systems and their application in drug delivery, tissue engineering, and diagnostic devices.',
    doi: '10.1021/acs.biomac.2c00789',
  },
];

// Statistics
export const LAB_STATS = [
  { label: 'Publications', value: '25+' },
  { label: 'Active Projects', value: '4' },
  { label: 'Team Members', value: '6' },
  { label: 'Years of Research', value: '8' },
];
