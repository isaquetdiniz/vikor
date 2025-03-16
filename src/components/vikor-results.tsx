"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { VIKORResult } from "@/lib/types"

interface VIKORResultsProps {
  results: VIKORResult
}

export function VIKORResults({ results }: VIKORResultsProps) {
  // Sort alternatives by Q value (ascending)
  const sortedAlternatives = [...results.alternatives].sort((a, b) => {
    return results.Q[a] - results.Q[b]
  })

  // Find the best alternative (lowest Q value)
  const bestAlternative = sortedAlternatives[0]

  // Check if the second best alternative exists
  const secondBestAlternative = sortedAlternatives.length > 1 ? sortedAlternatives[1] : null

  // Calculate DQ for condition 2
  const DQ = 1 / (results.alternatives.length - 1)

  // Check condition 1: Acceptable advantage
  const acceptableAdvantage = secondBestAlternative
    ? results.Q[secondBestAlternative] - results.Q[bestAlternative] >= DQ
    : true

  // Check condition 2: Acceptable stability
  const acceptableStability =
    results.S[bestAlternative] === Math.min(...Object.values(results.S)) ||
    results.R[bestAlternative] === Math.min(...Object.values(results.R))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VIKOR Results</CardTitle>
          <CardDescription>Results of the VIKOR method calculation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alternative</TableHead>
                <TableHead>S (Group Utility)</TableHead>
                <TableHead>R (Individual Regret)</TableHead>
                <TableHead>Q (Compromise Score)</TableHead>
                <TableHead>Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAlternatives.map((alt, index) => (
                <TableRow key={alt} className={alt === bestAlternative ? "bg-green-50" : ""}>
                  <TableCell className="font-medium">{alt}</TableCell>
                  <TableCell>{results.S[alt].toFixed(4)}</TableCell>
                  <TableCell>{results.R[alt].toFixed(4)}</TableCell>
                  <TableCell>{results.Q[alt].toFixed(4)}</TableCell>
                  <TableCell>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compromise Solution</CardTitle>
          <CardDescription>Analysis of the compromise solution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Best Alternative</h3>
            <p className="text-2xl font-bold">{bestAlternative}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Condition 1: Acceptable Advantage</h4>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${acceptableAdvantage ? "bg-green-500" : "bg-red-500"}`}></div>
                <span>{acceptableAdvantage ? "Satisfied" : "Not Satisfied"}</span>
              </div>
              {secondBestAlternative && (
                <p className="text-sm text-muted-foreground mt-2">
                  Q({secondBestAlternative}) - Q({bestAlternative}) ={" "}
                  {(results.Q[secondBestAlternative] - results.Q[bestAlternative]).toFixed(4)}{" "}
                  {acceptableAdvantage ? "≥" : "<"} {DQ.toFixed(4)}
                </p>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Condition 2: Acceptable Stability</h4>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${acceptableStability ? "bg-green-500" : "bg-red-500"}`}></div>
                <span>{acceptableStability ? "Satisfied" : "Not Satisfied"}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {bestAlternative} is also best ranked by{" "}
                {results.S[bestAlternative] === Math.min(...Object.values(results.S)) ? "S" : ""}
                {results.S[bestAlternative] === Math.min(...Object.values(results.S)) &&
                results.R[bestAlternative] === Math.min(...Object.values(results.R))
                  ? " and "
                  : ""}
                {results.R[bestAlternative] === Math.min(...Object.values(results.R)) ? "R" : ""}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Conclusion</h4>
            {acceptableAdvantage && acceptableStability ? (
              <p>
                The alternative <strong>{bestAlternative}</strong> is the compromise solution with acceptable advantage
                and stability.
              </p>
            ) : acceptableAdvantage ? (
              <p>
                The alternative <strong>{bestAlternative}</strong> has acceptable advantage but lacks stability in
                decision making.
              </p>
            ) : acceptableStability ? (
              <p>
                The alternative <strong>{bestAlternative}</strong> is stable but does not have acceptable advantage over
                the next best alternative.
              </p>
            ) : (
              <p>
                The alternative <strong>{bestAlternative}</strong> is ranked best by Q value, but neither acceptable
                advantage nor stability conditions are met.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

