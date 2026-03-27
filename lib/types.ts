// Core type definitions for the research lab website

export interface TeamMember {
  id: string;
  name: string;
  role: 'pi' | 'phd' | 'undergrad' | 'collaborator';
  title: string;
  bio: string;
  image: string;
  email?: string;
  website?: string;
  specialization?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  tags: string[];
  abstract: string;
  doi?: string;
  url?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  publications: string[]; // publication IDs
  status: 'active' | 'completed' | 'planned';
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  tags: string[];
  year: number;
  pdfUrl: string;
  uploadedDate: string;
  createdBy: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'researcher';
}
