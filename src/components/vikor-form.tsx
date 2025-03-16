"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateVIKOR } from "@/lib/vikor-calculator"
import { VIKORResults } from "@/components/vikor-results"
import { VIKORJsonInput } from "@/components/vikor-json-input"
import type { VIKORParameters } from "@/lib/types"

export function VIKORForm() {
  const [alternatives, setAlternatives] = useState<string[]>(["A1", "A2", "A3"])
  const [criteria, setCriteria] = useState<string[]>(["C1", "C2", "C3"])
  const [performanceMatrix, setPerformanceMatrix] = useState<Record<string, number[]>>({
    A1: [0.7, 0.5, 0.8],
    A2: [0.6, 0.7, 0.6],
    A3: [0.8, 0.6, 0.7],
  })
  const [criteriaTypes, setCriteriaTypes] = useState<Record<string, string>>({
    C1: "max",
    C2: "min",
    C3: "max",
  })
  const [weights, setWeights] = useState<Record<string, number>>({
    C1: 0.4,
    C2: 0.3,
    C3: 0.3,
  })
  const [v, setV] = useState<number>(0.5)
  const [results, setResults] = useState<any>(null)

  const addAlternative = () => {
    const newAlt = `A${alternatives.length + 1}`
    setAlternatives([...alternatives, newAlt])
    setPerformanceMatrix({
      ...performanceMatrix,
      [newAlt]: criteria.map(() => 0),
    })
  }

  const removeAlternative = (index: number) => {
    if (alternatives.length <= 2) return

    const newAlternatives = alternatives.filter((_, i) => i !== index)
    const newPerformanceMatrix = { ...performanceMatrix }
    delete newPerformanceMatrix[alternatives[index]]

    setAlternatives(newAlternatives)
    setPerformanceMatrix(newPerformanceMatrix)
  }

  const addCriterion = () => {
    const newCrit = `C${criteria.length + 1}`
    setCriteria([...criteria, newCrit])

    // Update performance matrix
    const newPerformanceMatrix = { ...performanceMatrix }
    alternatives.forEach((alt) => {
      newPerformanceMatrix[alt] = [...(newPerformanceMatrix[alt] || []), 0]
    })

    // Update criteria types and weights
    setCriteriaTypes({
      ...criteriaTypes,
      [newCrit]: "max",
    })

    // Calculate equal weights
    const newWeightValue = 1 / (criteria.length + 1)
    const newWeights: Record<string, number> = {}
    ;[...criteria, newCrit].forEach((crit) => {
      newWeights[crit] = newWeightValue
    })

    setWeights(newWeights)
    setPerformanceMatrix(newPerformanceMatrix)
  }

  const removeCriterion = (index: number) => {
    if (criteria.length <= 2) return

    const newCriteria = criteria.filter((_, i) => i !== index)

    // Update performance matrix
    const newPerformanceMatrix = { ...performanceMatrix }
    alternatives.forEach((alt) => {
      newPerformanceMatrix[alt] = newPerformanceMatrix[alt].filter((_, i) => i !== index)
    })

    // Update criteria types and weights
    const newCriteriaTypes = { ...criteriaTypes }
    delete newCriteriaTypes[criteria[index]]

    const newWeights: Record<string, number> = {}
    const newWeightValue = 1 / newCriteria.length
    newCriteria.forEach((crit) => {
      newWeights[crit] = newWeightValue
    })

    setCriteria(newCriteria)
    setPerformanceMatrix(newPerformanceMatrix)
    setCriteriaTypes(newCriteriaTypes)
    setWeights(newWeights)
  }

  const updatePerformanceMatrix = (alt: string, critIndex: number, value: number) => {
    const newMatrix = { ...performanceMatrix }
    newMatrix[alt][critIndex] = value
    setPerformanceMatrix(newMatrix)
  }

  const updateCriteriaType = (crit: string, type: string) => {
    setCriteriaTypes({
      ...criteriaTypes,
      [crit]: type,
    })
  }

  const updateWeight = (crit: string, value: number) => {
    setWeights({
      ...weights,
      [crit]: value,
    })
  }

  const normalizeWeights = () => {
    const sum = Object.values(weights).reduce((acc, val) => acc + val, 0)
    if (sum === 0) return

    const normalizedWeights: Record<string, number> = {}
    Object.keys(weights).forEach((key) => {
      normalizedWeights[key] = weights[key] / sum
    })

    setWeights(normalizedWeights)
  }

  const handleSubmit = () => {
    normalizeWeights()

    const params: VIKORParameters = {
      alternatives,
      criteria,
      performance_matrix: performanceMatrix,
      criteria_types: criteriaTypes,
      weights,
      v,
    }

    const result = calculateVIKOR(params)
    setResults(result)
  }

  const handleJsonSubmit = (data: VIKORParameters) => {
    setAlternatives(data.alternatives)
    setCriteria(data.criteria)
    setPerformanceMatrix(data.performance_matrix)
    setCriteriaTypes(data.criteria_types)
    setWeights(data.weights)
    setV(data.v)

    const result = calculateVIKOR(data)
    setResults(result)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="form">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="form">Manual Input</TabsTrigger>
          <TabsTrigger value="json">JSON Input</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>VIKOR Parameters</CardTitle>
              <CardDescription>Enter the parameters for your multi-criteria decision problem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Alternatives and Criteria Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Alternatives</Label>
                    <Button variant="outline" size="sm" onClick={addAlternative}>
                      Add Alternative
                    </Button>
                  </div>
                  {alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={alt}
                        onChange={(e) => {
                          const newAlternatives = [...alternatives]
                          const oldAlt = newAlternatives[index]
                          newAlternatives[index] = e.target.value

                          const newPerformanceMatrix = { ...performanceMatrix }
                          newPerformanceMatrix[e.target.value] = newPerformanceMatrix[oldAlt]
                          delete newPerformanceMatrix[oldAlt]

                          setAlternatives(newAlternatives)
                          setPerformanceMatrix(newPerformanceMatrix)
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAlternative(index)}
                        disabled={alternatives.length <= 2}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Criteria</Label>
                    <Button variant="outline" size="sm" onClick={addCriterion}>
                      Add Criterion
                    </Button>
                  </div>
                  {criteria.map((crit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={crit}
                        onChange={(e) => {
                          const newCriteria = [...criteria]
                          const oldCrit = newCriteria[index]
                          newCriteria[index] = e.target.value

                          const newCriteriaTypes = { ...criteriaTypes }
                          newCriteriaTypes[e.target.value] = newCriteriaTypes[oldCrit]
                          delete newCriteriaTypes[oldCrit]

                          const newWeights = { ...weights }
                          newWeights[e.target.value] = newWeights[oldCrit]
                          delete newWeights[oldCrit]

                          setCriteria(newCriteria)
                          setCriteriaTypes(newCriteriaTypes)
                          setWeights(newWeights)
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCriterion(index)}
                        disabled={criteria.length <= 2}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Matrix */}
              <div className="space-y-4">
                <Label>Performance Matrix</Label>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border"></th>
                        {criteria.map((crit, index) => (
                          <th key={index} className="p-2 border text-center">
                            {crit}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alt, altIndex) => (
                        <tr key={altIndex}>
                          <td className="p-2 border font-medium">{alt}</td>
                          {criteria.map((_, critIndex) => (
                            <td key={critIndex} className="p-2 border">
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="1"
                                value={performanceMatrix[alt][critIndex]}
                                onChange={(e) =>
                                  updatePerformanceMatrix(alt, critIndex, Number.parseFloat(e.target.value) || 0)
                                }
                                className="text-center"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Criteria Types */}
              <div className="space-y-4">
                <Label>Criteria Types</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {criteria.map((crit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Label className="w-1/3">{crit}</Label>
                      <Select value={criteriaTypes[crit]} onValueChange={(value) => updateCriteriaType(crit, value)}>
                        <SelectTrigger className="w-2/3">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="max">Max (Benefit)</SelectItem>
                          <SelectItem value="min">Min (Cost)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weights */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Criteria Weights</Label>
                  <Button variant="outline" size="sm" onClick={normalizeWeights}>
                    Normalize Weights
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {criteria.map((crit, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{crit}</Label>
                        <span className="text-sm">{weights[crit]?.toFixed(2)}</span>
                      </div>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={weights[crit]}
                        onChange={(e) => updateWeight(crit, Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Parameter v */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Parameter v (Trade-off)</Label>
                  <span className="text-sm">{v.toFixed(2)}</span>
                </div>
                <div className="px-1">
                  <Slider value={[v]} min={0} max={1} step={0.01} onValueChange={(values) => setV(values[0])} />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Individual Regret (v=0)</span>
                  <span>Balance (v=0.5)</span>
                  <span>Group Utility (v=1)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">
                Calculate VIKOR
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="json">
          <VIKORJsonInput onSubmit={handleJsonSubmit} />
        </TabsContent>
      </Tabs>

      {results && (
        <div className="mt-8">
          <VIKORResults results={results} />
        </div>
      )}
    </div>
  )
}

