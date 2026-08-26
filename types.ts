export type StartupCategory = 
  | 'all'
  | 'management_platform'
  | 'ai_analytics'
  | 'wearables_iot'
  | 'fan_media'
  | 'performance_recovery'
  | 'smart_venues'
  | 'esports_gaming'
  | 'health_nutrition';

export type FundingStage = 
  | 'all'
  | 'Bootstrapped'
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B+'
  | 'Scale-up';

export interface Startup {
  id: string;
  name: string;
  tagLine: string;
  description: string;
  fullStory?: string;
  logo: string;
  coverImage: string;
  category: StartupCategory;
  categoryName: string;
  stage: FundingStage;
  foundedYear: number;
  location: string;
  website: string;
  teamSize: string;
  fundingRaised: string;
  techStack: string[];
  keyMetrics: { label: string; value: string }[];
  founders: { name: string; role: string; avatar?: string }[];
  contactEmail: string;
  isFeatured?: boolean;
  featuredHighlight?: string;
  tags: string[];
}

export type NewsCategory = 
  | 'all'
  | 'ecosystem'
  | 'management_platform'
  | 'community_rating'
  | 'investments'
  | 'ai_data'
  | 'wearables'
  | 'smart_stadium'
  | 'esports'
  | 'global_trends';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: NewsCategory;
  categoryName: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  source?: string;
  isFeatured?: boolean;
  likesCount: number;
  status?: 'active' | 'passive';
}

export type SupporterType = 
  | 'all'
  | 'federation'
  | 'club'
  | 'vc_fund'
  | 'technopark'
  | 'university'
  | 'corporate';

export interface Supporter {
  id: string;
  name: string;
  type: SupporterType;
  typeName: string;
  logo: string;
  description: string;
  website: string;
  role: string;
  location: string;
  stats?: string;
}

export interface EcosystemEvent {
  id: string;
  title: string;
  type: 'Summit' | 'Hackathon' | 'Demo Day' | 'Webinar' | 'Meetup';
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  organizer: string;
  attendees: string;
  registrationOpen: boolean;
}

export interface TechTrend {
  id: string;
  title: string;
  category: string;
  growth: string;
  description: string;
  impact: 'Yüksek' | 'Kritik' | 'Yükselen';
  tags: string[];
}
