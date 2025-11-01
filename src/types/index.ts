export interface PortfolioConfig {
  name: string;
  version?: string;
  description?: string;
  url?: string;
  author: {
    name: string;
    email?: string;
    url?: string;
    avatar?: string;
  };
  site?: {
    url?: string;
    title?: string;
    description?: string;
    language?: string;
    favicon?: string;
  };
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    dribbble?: string;
    behance?: string;
    medium?: string;
    dev?: string;
    [key: string]: string | undefined;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    canonical?: string;
  };
  analytics?: {
    google?: string;
    plausible?: string;
    [key: string]: string | undefined;
  };
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    fontFamily?: string;
    [key: string]: string | undefined;
  };
}

export interface PortfolioData {
  projects: Project[];
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  about?: string;
  testimonials?: Testimonial[];
  blog?: BlogPost[];
  contact?: ContactInfo;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  technologies: string[];
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  url?: string;
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  description?: string;
  logo?: string;
}

export interface Skill {
  name: string;
  level?: number;
  category?: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  url: string;
  publishedDate: string;
  tags?: string[];
  image?: string;
  readTime?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
}

export interface BuildOptions {
  config?: string;
  output?: string;
  out?: string;
  minify?: boolean;
  clean?: boolean;
}

export interface InternalBuildOptions extends BuildOptions {
  config?: string;
  output: string;
  out?: string;
  minify: boolean;
  clean: boolean;
}

export interface DevOptions {
  port?: number;
  host?: string;
  open?: boolean;
}

export interface InitOptions {
  theme?: string;
  format?: 'json' | 'yaml' | 'toml';
  template?: string;
  git?: boolean;
  install?: boolean;
}

export interface ConfigLoadResult {
  data: PortfolioConfig | PortfolioData;
  format: string;
  path: string;
}

export interface SEOData {
  title: string;
  description: string;
  url?: string;
  keywords: string[];
  image?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  language?: string;
  favicon?: string;
}

export interface SchemaData {
  '@context': string;
  '@type': string;
  name: string;
  url?: string;
  description?: string;
  author?: {
    '@type': string;
    name: string;
    email?: string;
    url?: string;
  };
  [key: string]: any;
}