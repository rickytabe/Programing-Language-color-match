export interface ProgrammingLanguage {
  name: string;
  color: string;
  logo: string;
}

export interface GameResult {
  language: string;
  selectedColor: string;
  correctColor: string;
  isCorrect: boolean;
}

export interface GameState {
  currentLanguage: ProgrammingLanguage | null;
  attempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  consecutiveFailures: number;
  gameOver: boolean;
  gameStarted: boolean;
  results: GameResult[];
}