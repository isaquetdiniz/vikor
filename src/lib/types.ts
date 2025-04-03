export interface VIKORParameters {
    alternatives: string[]
    criteria: string[]
    performance_matrix: Record<string, number[]>
    criteria_types: Record<string, string>
    weights: Record<string, number>
    v: number
}

export interface AlternativeScores {
  S: number
  R: number
  Q: number
}

  export interface VIKORResult {
    scores: Record<string, AlternativeScores>
    ranking: string[]
    compromise_solution: string
    weight_stability: Record<string, [number, number]>
    distance_to_ideal?: Record<string, number>
  }
