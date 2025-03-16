import type { VIKORParameters, VIKORResult } from "./types"

export function calculateVIKOR(params: VIKORParameters): VIKORResult {
  const { alternatives, criteria, performance_matrix, criteria_types, weights, v } = params

  // Normalize weights
  const weightSum = Object.values(weights).reduce((sum, w) => sum + w, 0)
  const normalizedWeights: Record<string, number> = {}

  criteria.forEach((crit) => {
    normalizedWeights[crit] = weights[crit] / weightSum
  })

  // Step 1: Determine the best and worst values for each criterion
  const bestValues: number[] = []
  const worstValues: number[] = []

  criteria.forEach((crit, j) => {
    const values = alternatives.map((alt) => performance_matrix[alt][j])

    if (criteria_types[crit] === "max") {
      bestValues[j] = Math.max(...values)
      worstValues[j] = Math.min(...values)
    } else {
      // 'min'
      bestValues[j] = Math.min(...values)
      worstValues[j] = Math.max(...values)
    }
  })

  // Step 2: Calculate S and R values for each alternative
  const S: Record<string, number> = {}
  const R: Record<string, number> = {}

  alternatives.forEach((alt) => {
    let sValue = 0
    let rValue = 0

    criteria.forEach((crit, j) => {
      const fij = performance_matrix[alt][j]
      const fjStar = bestValues[j]
      const fjMinus = worstValues[j]

      // Skip if there's no difference between best and worst
      if (fjStar === fjMinus) return

      // Calculate normalized difference
      const normalizedDiff = Math.abs(fjStar - fij) / Math.abs(fjStar - fjMinus)

      // Weighted normalized difference
      const weightedDiff = normalizedWeights[crit] * normalizedDiff

      // Update S value (sum)
      sValue += weightedDiff

      // Update R value (max)
      rValue = Math.max(rValue, weightedDiff)
    })

    S[alt] = sValue
    R[alt] = rValue
  })

  // Step 3: Calculate Q values for each alternative
  const Q: Record<string, number> = {}

  // Find min and max values for S and R
  const sMin = Math.min(...Object.values(S))
  const sMax = Math.max(...Object.values(S))
  const rMin = Math.min(...Object.values(R))
  const rMax = Math.max(...Object.values(R))

  alternatives.forEach((alt) => {
    // Skip calculation if there's no difference between min and max
    if (sMin === sMax || rMin === rMax) {
      Q[alt] = 0
      return
    }

    // Calculate normalized S
    const normalizedS = (S[alt] - sMin) / (sMax - sMin)

    // Calculate normalized R
    const normalizedR = (R[alt] - rMin) / (rMax - rMin)

    // Calculate Q using the v parameter
    Q[alt] = v * normalizedS + (1 - v) * normalizedR
  })

  return {
    alternatives,
    criteria,
    S,
    R,
    Q,
    bestValues,
    worstValues,
    normalizedWeights,
  }
}

