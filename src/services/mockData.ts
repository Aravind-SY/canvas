
// Mock data for sketches
export const sketches = [
  {
    id: '1',
    title: 'Sunset on Canvas',
    content: 'Experimenting with new gradient techniques to capture the perfect sunset colors. What do you think of this digital brushwork?',
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    creator: {
      name: 'Marina Abrams',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    likes: 124,
    comments: 18,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Abstract Thoughts',
    content: 'When the mind wanders, colors flow. This piece represents the chaos and beauty of creative thinking.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    creator: {
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    likes: 89,
    comments: 7,
    createdAt: '5 hours ago',
  },
  {
    id: '3',
    title: 'Digital Exploration',
    content: 'Pushing the boundaries of what\'s possible with digital art tools. Created this piece using a combination of techniques I\'ve been developing.',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    creator: {
      name: 'Sofia Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    likes: 216,
    comments: 32,
    createdAt: 'Yesterday',
  },
  {
    id: '4',
    title: 'Coding Art',
    content: 'The beauty of code can also be art. This generative piece was created using custom algorithms and a touch of randomness.',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    creator: {
      name: 'Alex Turner',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    likes: 76,
    comments: 14,
    createdAt: '2 days ago',
  },
];

// Mock data for studios
export const studios = [
  {
    id: '1',
    name: 'Digital Dreamers',
    description: 'A collective of artists exploring the boundaries of digital art and creativity.',
    bannerUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    memberCount: 128,
    sketchCount: 342,
    theme: 'impressionist' as const,
  },
  {
    id: '2',
    name: 'Abstract Visions',
    description: 'Dedicated to pushing the boundaries of form, color, and composition in abstract art.',
    bannerUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    memberCount: 56,
    sketchCount: 189,
    theme: 'surrealist' as const,
  },
  {
    id: '3',
    name: 'Color Theory Lab',
    description: 'Experimenting with color relationships, psychology, and application in various media.',
    bannerUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    memberCount: 94,
    sketchCount: 271,
    theme: 'popart' as const,
  },
];

// Mock trending tags
export const trendingTags = [
  { id: '1', name: 'DigitalArt', count: 2345 },
  { id: '2', name: 'AbstractExpression', count: 1822 },
  { id: '3', name: 'CreativeCoding', count: 1456 },
  { id: '4', name: 'ConceptualArt', count: 1102 },
  { id: '5', name: 'MixedMedia', count: 987 },
];

// Mock featured artists
export const featuredArtists = [
  { 
    id: '1', 
    name: 'Maya Johnson', 
    avatar: 'https://i.pravatar.cc/150?img=10',
    specialty: 'Digital Painting',
    followers: 12500 
  },
  { 
    id: '2', 
    name: 'Kenji Tanaka', 
    avatar: 'https://i.pravatar.cc/150?img=12',
    specialty: 'Abstract Composition',
    followers: 8700 
  },
  { 
    id: '3', 
    name: 'Zoe Williams', 
    avatar: 'https://i.pravatar.cc/150?img=15',
    specialty: 'Conceptual Art',
    followers: 15300 
  },
];
