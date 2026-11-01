export const learningTypeDefs = `#graphql
  type LearningQuestion {
    id: ID!
    subject: String!
    chapter: String!
    difficulty: String!
    stem: String!
    options: [String!]!
    correct_index: Int!
    explanation: String!
    image_url: String
    provenance: String!
    source_title: String
    source_url: String
    source_year: Int
    source_notes: String
    visual_prompt: String!
  }

  type LearningAttempt {
    question_id: ID
    is_correct: Boolean!
    created_at: String!
    question: LearningQuestion
  }

  type LearningBookmark {
    question_id: ID!
  }

  type LearningChapter {
    id: ID!
    subject: String!
    name: String!
    overview: String!
  }

  type LearningData {
    questions: [LearningQuestion!]!
    attempts: [LearningAttempt!]!
    bookmarks: [LearningBookmark!]!
    chapters: [LearningChapter!]!
    isAdmin: Boolean!
  }

  input QuestionInput {
    id: ID
    subject: String!
    chapter: String!
    difficulty: String!
    stem: String!
    options: [String!]!
    correct_index: Int!
    explanation: String!
    visual_prompt: String
    provenance: String!
    source_title: String
    source_url: String
    source_year: Int
    source_notes: String
  }

  input ChapterInput {
    id: ID
    subject: String!
    name: String!
    overview: String!
  }

  extend type Query {
    learningData: LearningData!
  }

  extend type Mutation {
    saveAttempt(questionId: ID!, selectedIndex: Int!): Boolean!
    setBookmark(questionId: ID!, saved: Boolean!): Boolean!
    saveQuestion(input: QuestionInput!): Boolean!
    deleteQuestion(id: ID!): Boolean!
    saveChapter(input: ChapterInput!): Boolean!
    deleteChapter(id: ID!): Boolean!
  }
`;

export const LEARNING_DATA_QUERY = `query LearningData {
  learningData {
    questions {
      id subject chapter difficulty stem options correct_index explanation image_url
      provenance source_title source_url source_year source_notes visual_prompt
    }
    attempts {
      question_id is_correct created_at
      question {
        id subject chapter stem
      }
    }
    bookmarks { question_id }
    chapters { id subject name overview }
    isAdmin
  }
}`;

export const SAVE_ATTEMPT_MUTATION = `mutation SaveAttempt($questionId: ID!, $selectedIndex: Int!) {
  saveAttempt(questionId: $questionId, selectedIndex: $selectedIndex)
}`;

export const SET_BOOKMARK_MUTATION = `mutation SetBookmark($questionId: ID!, $saved: Boolean!) {
  setBookmark(questionId: $questionId, saved: $saved)
}`;

export const SAVE_QUESTION_MUTATION = `mutation SaveQuestion($input: QuestionInput!) {
  saveQuestion(input: $input)
}`;

export const DELETE_QUESTION_MUTATION = `mutation DeleteQuestion($id: ID!) {
  deleteQuestion(id: $id)
}`;

export const SAVE_CHAPTER_MUTATION = `mutation SaveChapter($input: ChapterInput!) {
  saveChapter(input: $input)
}`;

export const DELETE_CHAPTER_MUTATION = `mutation DeleteChapter($id: ID!) {
  deleteChapter(id: $id)
}`;
