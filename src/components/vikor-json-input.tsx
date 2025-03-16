"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { VIKORParameters } from "@/lib/types"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VIKORJsonInputProps {
  onSubmit: (data: VIKORParameters) => void
}

export function VIKORJsonInput({ onSubmit }: VIKORJsonInputProps) {
  const [jsonInput, setJsonInput] = useState<string>(`{
  "method": "VIKOR",
  "parameters": {
    "alternatives": ["A1", "A2", "A3"],
    "criteria": ["C1", "C2", "C3"],
    "performance_matrix": {
      "A1": [0.7, 0.5, 0.8],
      "A2": [0.6, 0.7, 0.6],
      "A3": [0.8, 0.6, 0.7]
    },
    "criteria_types": {
      "C1": "max",
      "C2": "min",
      "C3": "max"
    },
    "weights": {
      "C1": 0.4,
      "C2": 0.3,
      "C3": 0.3
    },
    "v": 0.5
  }
}`)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = () => {
    try {
      setError(null)
      setSuccess(false)

      const parsed = JSON.parse(jsonInput)
      const parameters = parsed.parameters || parsed

      // Validate the JSON structure
      if (!parameters.alternatives || !Array.isArray(parameters.alternatives)) {
        throw new Error("Missing or invalid 'alternatives' array")
      }

      if (!parameters.criteria || !Array.isArray(parameters.criteria)) {
        throw new Error("Missing or invalid 'criteria' array")
      }

      if (!parameters.performance_matrix || typeof parameters.performance_matrix !== "object") {
        throw new Error("Missing or invalid 'performance_matrix'")
      }

      if (!parameters.criteria_types || typeof parameters.criteria_types !== "object") {
        throw new Error("Missing or invalid 'criteria_types'")
      }

      if (!parameters.weights || typeof parameters.weights !== "object") {
        throw new Error("Missing or invalid 'weights'")
      }

      if (parameters.v === undefined || typeof parameters.v !== "number") {
        throw new Error("Missing or invalid 'v' parameter")
      }

      // Additional validation
      parameters.alternatives.forEach((alt: string) => {
        if (!parameters.performance_matrix[alt]) {
          throw new Error(`Performance matrix missing data for alternative '${alt}'`)
        }

        if (parameters.performance_matrix[alt].length !== parameters.criteria.length) {
          throw new Error(`Performance matrix data for '${alt}' has incorrect length`)
        }
      })

      parameters.criteria.forEach((crit: string) => {
        if (!parameters.criteria_types[crit]) {
          throw new Error(`Criteria type missing for criterion '${crit}'`)
        }

        if (parameters.criteria_types[crit] !== "max" && parameters.criteria_types[crit] !== "min") {
          throw new Error(`Invalid criteria type for '${crit}'. Must be 'max' or 'min'`)
        }

        if (parameters.weights[crit] === undefined) {
          throw new Error(`Weight missing for criterion '${crit}'`)
        }
      })

      setSuccess(true)
      onSubmit(parameters)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Input</CardTitle>
        <CardDescription>Paste your VIKOR parameters in JSON format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="font-mono min-h-[300px]"
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription>Parameters successfully parsed and applied</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Apply JSON Parameters
        </Button>
      </CardFooter>
    </Card>
  )
}

