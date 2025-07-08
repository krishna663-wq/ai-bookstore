interface Book {
  id: string
  title: string
  author: string
  cover: string
  genre: string
  mood: string
  rating: number
  price: number
}

export async function generateMoodRecommendations(mood: string): Promise<Book[]> {
  // Always use mock data for now - no API key required
  console.log(`Generating recommendations for mood: ${mood}`)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return getMockRecommendations(mood)
}

export async function analyzeMoodFromText(text: string): Promise<string> {
  // Simple keyword-based mood analysis as fallback
  const moodKeywords = {
    Happy: ["happy", "joy", "excited", "cheerful", "upbeat", "positive", "good", "great", "wonderful"],
    Sad: ["sad", "depressed", "down", "melancholy", "blue", "upset", "crying", "tears"],
    Anxious: ["anxious", "worried", "nervous", "stressed", "panic", "fear", "scared"],
    Romantic: ["love", "romance", "romantic", "heart", "relationship", "dating", "crush"],
    Adventurous: ["adventure", "travel", "explore", "journey", "quest", "exciting", "bold"],
    Mysterious: ["mystery", "secret", "hidden", "unknown", "curious", "puzzle", "enigma"],
    Thoughtful: ["think", "reflect", "contemplate", "philosophical", "deep", "meaning"],
    Cozy: ["cozy", "comfort", "warm", "peaceful", "calm", "relaxed", "quiet"],
    Energetic: ["energy", "active", "dynamic", "vibrant", "lively", "enthusiastic"],
    Melancholic: ["melancholy", "nostalgic", "wistful", "bittersweet", "longing"],
  }

  const lowerText = text.toLowerCase()

  // Find the mood with the most matching keywords
  let bestMood = "Happy"
  let maxMatches = 0

  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    const matches = keywords.filter((keyword) => lowerText.includes(keyword)).length
    if (matches > maxMatches) {
      maxMatches = matches
      bestMood = mood
    }
  }

  return bestMood
}

function getMockRecommendations(mood: string): Book[] {
  const mockBooks: Record<string, Book[]> = {
    Happy: [
      {
        id: "1",
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fantasy",
        mood: "Happy",
        rating: 4.8,
        price: 14.99,
      },
      {
        id: "2",
        title: "Beach Read",
        author: "Emily Henry",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Romance",
        mood: "Happy",
        rating: 4.6,
        price: 13.99,
      },
      {
        id: "3",
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        mood: "Happy",
        rating: 4.7,
        price: 15.99,
      },
      {
        id: "4",
        title: "Anxious People",
        author: "Fredrik Backman",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        mood: "Happy",
        rating: 4.5,
        price: 16.99,
      },
    ],
    Adventurous: [
      {
        id: "5",
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fantasy",
        mood: "Adventurous",
        rating: 4.9,
        price: 17.99,
      },
      {
        id: "6",
        title: "Into the Wild",
        author: "Jon Krakauer",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Non-fiction",
        mood: "Adventurous",
        rating: 4.4,
        price: 14.99,
      },
      {
        id: "7",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fantasy",
        mood: "Adventurous",
        rating: 4.8,
        price: 12.99,
      },
      {
        id: "8",
        title: "Wild",
        author: "Cheryl Strayed",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Memoir",
        mood: "Adventurous",
        rating: 4.3,
        price: 15.99,
      },
    ],
    Romantic: [
      {
        id: "9",
        title: "It Ends with Us",
        author: "Colleen Hoover",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Romance",
        mood: "Romantic",
        rating: 4.7,
        price: 14.99,
      },
      {
        id: "10",
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Historical Fiction",
        mood: "Romantic",
        rating: 4.9,
        price: 15.99,
      },
      {
        id: "11",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Classic",
        mood: "Romantic",
        rating: 4.8,
        price: 11.99,
      },
      {
        id: "12",
        title: "The Hating Game",
        author: "Sally Thorne",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Romance",
        mood: "Romantic",
        rating: 4.5,
        price: 13.99,
      },
    ],
    Mysterious: [
      {
        id: "13",
        title: "Gone Girl",
        author: "Gillian Flynn",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Thriller",
        mood: "Mysterious",
        rating: 4.6,
        price: 16.99,
      },
      {
        id: "14",
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Mystery",
        mood: "Mysterious",
        rating: 4.5,
        price: 15.99,
      },
      {
        id: "15",
        title: "Big Little Lies",
        author: "Liane Moriarty",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Mystery",
        mood: "Mysterious",
        rating: 4.4,
        price: 14.99,
      },
      {
        id: "16",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Thriller",
        mood: "Mysterious",
        rating: 4.3,
        price: 17.99,
      },
    ],
    Thoughtful: [
      {
        id: "17",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Non-fiction",
        mood: "Thoughtful",
        rating: 4.6,
        price: 18.99,
      },
      {
        id: "18",
        title: "The Alchemist",
        author: "Paulo Coelho",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Philosophy",
        mood: "Thoughtful",
        rating: 4.5,
        price: 13.99,
      },
      {
        id: "19",
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Psychology",
        mood: "Thoughtful",
        rating: 4.8,
        price: 14.99,
      },
      {
        id: "20",
        title: "The Power of Now",
        author: "Eckhart Tolle",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Spirituality",
        mood: "Thoughtful",
        rating: 4.4,
        price: 16.99,
      },
    ],
    Cozy: [
      {
        id: "21",
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Cozy Mystery",
        mood: "Cozy",
        rating: 4.5,
        price: 15.99,
      },
      {
        id: "22",
        title: "A Man Called Ove",
        author: "Fredrik Backman",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        mood: "Cozy",
        rating: 4.7,
        price: 14.99,
      },
      {
        id: "23",
        title: "The Guernsey Literary Society",
        author: "Mary Ann Shaffer",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Historical Fiction",
        mood: "Cozy",
        rating: 4.6,
        price: 13.99,
      },
      {
        id: "24",
        title: "Eleanor Oliphant Is Completely Fine",
        author: "Gail Honeyman",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        mood: "Cozy",
        rating: 4.4,
        price: 15.99,
      },
    ],
    Energetic: [
      {
        id: "25",
        title: "Ready Player One",
        author: "Ernest Cline",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Science Fiction",
        mood: "Energetic",
        rating: 4.5,
        price: 16.99,
      },
      {
        id: "26",
        title: "The Hunger Games",
        author: "Suzanne Collins",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Dystopian",
        mood: "Energetic",
        rating: 4.6,
        price: 14.99,
      },
      {
        id: "27",
        title: "Six of Crows",
        author: "Leigh Bardugo",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Fantasy",
        mood: "Energetic",
        rating: 4.7,
        price: 17.99,
      },
      {
        id: "28",
        title: "The Martian",
        author: "Andy Weir",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Science Fiction",
        mood: "Energetic",
        rating: 4.8,
        price: 15.99,
      },
    ],
    Melancholic: [
      {
        id: "29",
        title: "The Book Thief",
        author: "Markus Zusak",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Historical Fiction",
        mood: "Melancholic",
        rating: 4.7,
        price: 16.99,
      },
      {
        id: "30",
        title: "Never Let Me Go",
        author: "Kazuo Ishiguro",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Literary Fiction",
        mood: "Melancholic",
        rating: 4.5,
        price: 15.99,
      },
      {
        id: "31",
        title: "The Remains of the Day",
        author: "Kazuo Ishiguro",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Literary Fiction",
        mood: "Melancholic",
        rating: 4.6,
        price: 14.99,
      },
      {
        id: "32",
        title: "A Little Life",
        author: "Hanya Yanagihara",
        cover: "/placeholder.svg?height=300&width=200",
        genre: "Literary Fiction",
        mood: "Melancholic",
        rating: 4.4,
        price: 18.99,
      },
    ],
  }

  return mockBooks[mood] || mockBooks.Happy
}
