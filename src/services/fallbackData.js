// src/services/fallbackData.js
export const fallbackPosts = [
  {
    id: 0,
    title: "Propuesta para mejorar el WiFi del campus",
    content: "He notado que el WiFi en la biblioteca principal tiene problemas de conexión en las horas pico. Propongo instalar más puntos de acceso para mejorar la experiencia de todos los estudiantes.",
    authorName: "0x1234...5678",
    authorAddress: "0x1234567890123456789012345678901234567890",
    timeAgo: "hace 2 horas",
    category: "sugerencia",
    topics: ["wifi", "infraestructura"],
    upvotes: 15,
    downvotes: 2,
    comments: 8,
    trending: true
  },
  {
    id: 1,
    title: "Horarios de la cafetería muy limitados",
    content: "Los horarios de la cafetería no se adaptan a los horarios de clases nocturnas. Sería genial si pudieran extender el horario hasta las 10 PM.",
    authorName: "0x9876...4321",
    authorAddress: "0x9876543210987654321098765432109876543210",
    timeAgo: "hace 4 horas",
    category: "queja",
    topics: ["cafeteria", "horarios"],
    upvotes: 23,
    downvotes: 1,
    comments: 12,
    trending: false
  },
  {
    id: 2,
    title: "Nueva iniciativa de reciclaje en el campus",
    content: "Me parece excelente la nueva iniciativa de reciclaje que implementó la universidad. Es importante que como estudiantes participemos activamente.",
    authorName: "0xabcd...efgh",
    authorAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    timeAgo: "hace 1 día",
    category: "opinion",
    topics: ["reciclaje", "medio ambiente"],
    upvotes: 18,
    downvotes: 0,
    comments: 5,
    trending: false
  }
];

export const getFallbackData = () => {
  return fallbackPosts;
};
