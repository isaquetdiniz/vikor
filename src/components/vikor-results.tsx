"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { VIKORResult } from "@/lib/types"
import { BarChart, CheckCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VIKORResultsProps {
  results: VIKORResult
}

export function VIKORResults({ results }: VIKORResultsProps) {
  const { scores, ranking, compromise_solution, weight_stability, distance_to_ideal } = results

  // Get the second best alternative if it exists
  const secondBestAlternative = ranking.length > 1 ? ranking[1] : null

  // Calculate DQ for condition 1
  const DQ = 1 / (ranking.length - 1)

  // Check condition 1: Acceptable advantage
  const acceptableAdvantage = secondBestAlternative
    ? scores[secondBestAlternative].Q - scores[compromise_solution].Q >= DQ
    : true

  // Check condition 2: Acceptable stability
  const bestSValue = Math.min(...Object.values(scores).map((score) => score.S))
  const bestRValue = Math.min(...Object.values(scores).map((score) => score.R))

  const acceptableStability =
    scores[compromise_solution].S === bestSValue || scores[compromise_solution].R === bestRValue

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
                <TableHead>
                  <div className="flex items-center gap-1">
                    S (Group Utility)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Measures the sum of weighted distances from each alternative to the best option across all
                            criteria. Lower values are better.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    R (Individual Regret)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Measures the maximum individual distance between an alternative and the best option in any
                            specific criterion. Lower values are better.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Q (Compromise Score)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Final compromise index that determines the ranking of alternatives based on S and R values.
                            Lower values are better.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.map((alt, index) => (
                <TableRow key={alt} className={alt === compromise_solution ? "bg-green-50" : ""}>
                  <TableCell className="font-medium">{alt}</TableCell>
                  <TableCell>{scores[alt].S.toFixed(4)}</TableCell>
                  <TableCell>{scores[alt].R.toFixed(4)}</TableCell>
                  <TableCell>{scores[alt].Q.toFixed(4)}</TableCell>
                  <TableCell>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compromise Solution</CardTitle>
            <CardDescription>Analysis of the compromise solution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Best Alternative</h3>
              <p className="text-2xl font-bold">{compromise_solution}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Condition 1: Acceptable Advantage</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${acceptableAdvantage ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span>{acceptableAdvantage ? "Satisfied" : "Not Satisfied"}</span>
                </div>
                {secondBestAlternative && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Q({secondBestAlternative}) - Q({compromise_solution}) =
                    {(scores[secondBestAlternative].Q - scores[compromise_solution].Q).toFixed(4)}
                    {acceptableAdvantage ? " ≥ " : " < "}
                    {DQ.toFixed(4)}
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
                  {compromise_solution} is also best ranked by
                  {scores[compromise_solution].S === bestSValue ? " S" : ""}
                  {scores[compromise_solution].S === bestSValue && scores[compromise_solution].R === bestRValue
                    ? " and "
                    : ""}
                  {scores[compromise_solution].R === bestRValue ? " R" : ""}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Conclusion</h4>
              {acceptableAdvantage && acceptableStability ? (
                <p>
                  The alternative <strong className="text-cin-red">{compromise_solution}</strong> is the compromise
                  solution with acceptable advantage and stability.
                </p>
              ) : acceptableAdvantage ? (
                <p>
                  The alternative <strong className="text-cin-red">{compromise_solution}</strong> has acceptable
                  advantage but lacks stability in decision making.
                </p>
              ) : acceptableStability ? (
                <p>
                  The alternative <strong className="text-cin-red">{compromise_solution}</strong> is stable but does not
                  have acceptable advantage over the next best alternative.
                </p>
              ) : (
                <p>
                  The alternative <strong className="text-cin-red">{compromise_solution}</strong> is ranked best by Q
                  value, but neither acceptable advantage nor stability conditions are met.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Weight Stability</CardTitle>
              <CardDescription>Ranges where weights can vary without changing the result</CardDescription>
            </div>
            <BarChart className="h-5 w-5 text-cin-red" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These intervals show the range within which each criterion's weight can vary while maintaining
                <strong> {compromise_solution}</strong> as the compromise solution.
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criterion</TableHead>
                    <TableHead>Min Weight</TableHead>
                    <TableHead>Max Weight</TableHead>
                    <TableHead>Stability Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(weight_stability).map(([criterion, [min, max]]) => (
                    <TableRow key={criterion}>
                      <TableCell className="font-medium">{criterion}</TableCell>
                      <TableCell>{min.toFixed(2)}</TableCell>
                      <TableCell>{max.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(max - min) * 100}%`,
                              marginLeft: `${min * 100}%`,
                            }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>
                  Wider ranges indicate that the solution is more robust to changes in that criterion's weight.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {distance_to_ideal && (
        <Card>
          <CardHeader>
            <CardTitle>Distance to Ideal Solution</CardTitle>
            <CardDescription>How far each alternative is from the ideal solution</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alternative</TableHead>
                  <TableHead>Average Distance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranking.map((alt) => (
                  <TableRow key={alt}>
                    <TableCell className="font-medium">{alt}</TableCell>
                    {distance_to_ideal &&
                      <TableCell key={alt}>{distance_to_ideal[alt].toFixed(4)}</TableCell>
                      }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
