const categories = [
  { value: 'all', label: 'Todas las categorías', color: 'gray' },
  { value: 'opinion', label: 'Opinión', color: 'blue' },
  { value: 'sugerencia', label: 'Sugerencia', color: 'green' },
  { value: 'queja', label: 'Queja', color: 'red' },
  { value: 'vida-universitaria', label: 'Vida Universitaria', color: 'violet' }
];

const mockPosts = [
  {
    id: 1,
    title: "Problema con la biblioteca durante exámenes",
    content: "¿Alguien más ha notado que la biblioteca se llena demasiado rápido durante época de exámenes? Es imposible encontrar un lugar para estudiar. Deberían ampliar las horas de apertura o crear más espacios de estudio.",
    authorName: "María González",
    timeAgo: "hace 2 horas",
    category: "queja",
    upvotes: 23,
    downvotes: 2,
    comments: 8,
    trending: true
  },
  {
    id: 2,
    title: "¡Nuevo food truck en el campus!",
    content: "Acabo de probar el nuevo food truck que está cerca de la facultad de ingeniería. Tienen unos tacos buenísimos y precios súper accesibles. Definitivamente recomendado para el almuerzo.",
    authorName: "Carlos Méndez",
    timeAgo: "hace 4 horas",
    category: "vida-universitaria",
    upvotes: 45,
    downvotes: 1,
    comments: 12,
    trending: false
  },
  {
    id: 3,
    title: "Sugerencia: App para reservar aulas",
    content: "Sería genial tener una aplicación donde podamos ver qué aulas están disponibles y reservarlas para estudios grupales. Muchas veces perdemos tiempo buscando espacios libres.",
    authorName: "Ana Rodríguez",
    timeAgo: "hace 6 horas",
    category: "sugerencia",
    upvotes: 67,
    downvotes: 3,
    comments: 15,
    trending: true
  },
  {
    id: 4,
    title: "Mi experiencia en el intercambio estudiantil",
    content: "Acabo de regresar de mi intercambio en España y quería compartir mi experiencia. Fue increíble tanto académicamente como personalmente. Si alguien está considerando aplicar, les recomiendo 100% que lo hagan.",
    authorName: "Diego Torres",
    timeAgo: "hace 8 horas",
    category: "vida-universitaria",
    upvotes: 89,
    downvotes: 0,
    comments: 24,
    trending: true
  },
  {
    id: 5,
    title: "Los profesores deberían subir material con más anticipación",
    content: "Es frustrante cuando los profesores suben el material de clase el mismo día o pocas horas antes. Necesitamos tiempo para prepararnos y revisar el contenido previamente.",
    authorName: "Sofía Herrera",
    timeAgo: "hace 1 día",
    category: "opinion",
    upvotes: 156,
    downvotes: 12,
    comments: 43,
    trending: false
  },
  {
    id: 6,
    title: "Equipos de laboratorio desactualizados",
    content: "Los equipos del laboratorio de química necesitan urgentemente una actualización. Algunos están fuera de servicio desde hace meses y afecta nuestro aprendizaje práctico.",
    authorName: "Roberto Silva",
    timeAgo: "hace 1 día",
    category: "queja",
    upvotes: 92,
    downvotes: 5,
    comments: 18,
    trending: false
  }
];

const myPosts = [
  {
    id: 101,
    title: "Mi experiencia con el sistema de biblioteca",
    content: "Después de usar el sistema de biblioteca durante todo el semestre, creo que hay varias mejoras que se podrían implementar. El sistema de reservas es confuso y a menudo los libros no están donde dice el catálogo. He hablado con otros estudiantes y todos coinciden en que necesita una actualización urgente.",
    authorName: "Tú",
    timeAgo: "hace 1 hora",
    category: "opinion",
    upvotes: 34,
    downvotes: 2,
    comments: 12,
    views: 156,
    status: "published",
    trending: true
  },
  {
    id: 102,
    title: "Propuesta: Espacios de estudio 24/7",
    content: "Como estudiante de ingeniería, a menudo necesito estudiar durante horarios no convencionales. Propongo que se habiliten al menos 2-3 aulas como espacios de estudio 24/7 durante épocas de exámenes. Esto ayudaría enormemente a estudiantes que trabajan durante el día o tienen horarios complicados.",
    authorName: "Tú",
    timeAgo: "hace 3 horas",
    category: "sugerencia",
    upvotes: 89,
    downvotes: 5,
    comments: 23,
    views: 234,
    status: "published",
    trending: true
  },
  {
    id: 103,
    title: "Problema con la conexión WiFi en edificio A",
    content: "El WiFi en el edificio A es extremadamente lento y se desconecta constantemente. Esto afecta nuestra capacidad de seguir clases online y realizar trabajos que requieren internet. Necesitamos una solución urgente.",
    authorName: "Tú",
    timeAgo: "hace 1 día",
    category: "queja",
    upvotes: 67,
    downvotes: 3,
    comments: 18,
    views: 189,
    status: "published",
    trending: false
  },
  {
    id: 104,
    title: "Guía: Cómo aprovechar al máximo el intercambio estudiantil",
    content: "Después de completar mi intercambio en Alemania, quería compartir algunos tips para futuros estudiantes de intercambio: 1) Aprende el idioma básico antes de ir, 2) Busca alojamiento con tiempo, 3) Únete a grupos de estudiantes internacionales, 4) Viaja los fines de semana...",
    authorName: "Tú",
    timeAgo: "hace 2 días",
    category: "vida-universitaria",
    upvotes: 145,
    downvotes: 1,
    comments: 31,
    views: 456,
    status: "published",
    trending: false
  },
  {
    id: 105,
    title: "Reflexiones sobre el primer año universitario",
    content: "Borrador sobre mis experiencias durante el primer año. Hablar sobre los desafíos, las amistades nuevas, la adaptación a la vida universitaria, consejos para estudiantes de primer ingreso...",
    authorName: "Tú",
    timeAgo: "hace 3 días",
    category: "vida-universitaria",
    upvotes: 0,
    downvotes: 0,
    comments: 0,
    views: 12,
    status: "draft",
    trending: false
  },
  {
    id: 106,
    title: "Los horarios de laboratorio son inconvenientes",
    content: "Los laboratorios de química solo están disponibles en horarios que chocan con otras materias importantes. Deberían ofrecer más franjas horarias o permitir laboratorios en horarios vespertinos.",
    authorName: "Tú",
    timeAgo: "hace 4 días",
    category: "queja",
    upvotes: 23,
    downvotes: 8,
    comments: 7,
    views: 98,
    status: "published",
    trending: false
  },
  {
    id: 107,
    title: "Idea: App de carpooling universitario",
    content: "Borrador de propuesta para crear una app de carpooling entre estudiantes. Esto ayudaría a reducir costos de transporte y sería más ecológico...",
    authorName: "Tú",
    timeAgo: "hace 5 días",
    category: "sugerencia",
    upvotes: 0,
    downvotes: 0,
    comments: 0,
    views: 5,
    status: "draft",
    trending: false
  },
  {
    id: 108,
    title: "Reseña: Nuevo café en el campus",
    content: "El nuevo café que abrió cerca de la biblioteca tiene excelente café y precios razonables. El ambiente es perfecto para estudiar y tienen WiFi gratis. Definitivamente recomendado para sesiones de estudio largas.",
    authorName: "Tú",
    timeAgo: "hace 1 semana",
    category: "vida-universitaria",
    upvotes: 56,
    downvotes: 2,
    comments: 14,
    views: 178,
    status: "published",
    trending: false
  }
];

export { mockPosts, categories, myPosts };