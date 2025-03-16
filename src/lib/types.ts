export interface VIKORParameters {
    alternatives: string[]
    criteria: string[]
    performance_matrix: Record<string, number[]>
    criteria_types: Record<string, string>
    weights: Record<string, number>
    v: number
}

  export interface VIKORResult {
    alternatives: string[]
    criteria: string[]
    S: Record<string, number>
    R: Record<string, number>
    Q: Record<string, number>
    bestValues: number[]
    worstValues: number[]
    normalizedWeights: Record<string, number>
  }
