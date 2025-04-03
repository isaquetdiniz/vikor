import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	ArrowRight,
	BarChart3,
	BookOpen,
	Calculator,
	CheckCircle2,
	FileSpreadsheet,
	Settings,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-12">
			<header className="text-center mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-4">
					VIKOR Method Decision Making Tool
				</h1>
				<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
					A powerful multi-criteria decision analysis technique for finding
					compromise solutions
				</p>
				<div className="mt-8">
					<Link href="/calculator">
						<Button size="lg" className="cursor-pointer gap-2">
							Go to Calculator <ArrowRight className="h-4 w-4" />
						</Button>
					</Link>
				</div>
			</header>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-6">What is the VIKOR Method?</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<p>
							The VIKOR (VIseKriterijumska Optimizacija I Kompromisno Resenje)
							method is a multi-criteria decision making (MCDM) technique
							developed to solve decision problems with conflicting criteria.
						</p>
						<p>
							Developed by Serafim Opricovic, VIKOR focuses on ranking and
							selecting from a set of alternatives in the presence of
							conflicting criteria, helping decision-makers reach a final
							decision.
						</p>
						<p>
							The method determines a compromise solution that provides maximum
							"group utility" for the "majority" and minimum individual regret
							for the "opponent."
						</p>
					</div>
					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-4">Key Features</h3>
							<ul className="space-y-3">
								<li className="flex gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
									<span>Balances group utility and individual regret</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
									<span>Provides a compromise ranking of alternatives</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
									<span>Considers the relative importance of criteria</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
									<span>Determines acceptable advantage and stability</span>
								</li>
								<li className="flex gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
									<span>
										Widely used in engineering, management, and policy decisions
									</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-6">How the VIKOR Method Works</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<Card className="flex flex-col">
						<CardContent className="p-6 flex-1 flex flex-col">
							<div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
								<FileSpreadsheet className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								1. Problem Definition
							</h3>
							<p className="text-muted-foreground flex-1">
								Define alternatives, criteria, performance values, criteria
								types (max/min), and assign weights to each criterion based on
								their importance.
							</p>
						</CardContent>
					</Card>

					<Card className="flex flex-col">
						<CardContent className="p-6 flex-1 flex flex-col">
							<div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
								<Calculator className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">2. Calculation</h3>
							<p className="text-muted-foreground flex-1">
								Calculate S values (group utility), R values (individual
								regret), and Q values (compromise score) for each alternative
								using normalized weights.
							</p>
						</CardContent>
					</Card>

					<Card className="flex flex-col">
						<CardContent className="p-6 flex-1 flex flex-col">
							<div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
								<BarChart3 className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">3. Ranking</h3>
							<p className="text-muted-foreground flex-1">
								Rank alternatives based on Q values (lower is better) and verify
								if the top-ranked alternative satisfies acceptable advantage and
								stability conditions.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-6">The v Parameter Explained</h2>
				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div>
						<div className="space-y-4">
							<p>
								The v parameter in VIKOR represents the weight of the strategy
								of "maximum group utility," whereas (1-v) is the weight of
								individual regret.
							</p>
							<ul className="space-y-3 mt-6">
								<li className="flex gap-3">
									<div className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-semibold flex-shrink-0">
										v
									</div>
									<div>
										<span className="font-semibold">v = 0</span>: Emphasizes
										minimizing maximum individual regret
									</div>
								</li>
								<li className="flex gap-3">
									<div className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-semibold flex-shrink-0">
										v
									</div>
									<div>
										<span className="font-semibold">v = 0.5</span>: Balances
										group utility and individual regret (default)
									</div>
								</li>
								<li className="flex gap-3">
									<div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold flex-shrink-0">
										v
									</div>
									<div>
										<span className="font-semibold">v = 1</span>: Emphasizes
										maximizing group utility
									</div>
								</li>
							</ul>
						</div>
					</div>
					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-4">When to Adjust v</h3>
							<ul className="space-y-4">
								<li className="flex gap-3">
									<Settings className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
									<div>
										<span className="font-semibold">
											Consensus-driven decisions
										</span>
										<p className="text-muted-foreground">
											Use higher v values when group consensus is more important
										</p>
									</div>
								</li>
								<li className="flex gap-3">
									<Settings className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
									<div>
										<span className="font-semibold">Risk-averse decisions</span>
										<p className="text-muted-foreground">
											Use lower v values when minimizing worst outcomes is
											critical
										</p>
									</div>
								</li>
								<li className="flex gap-3">
									<Settings className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
									<div>
										<span className="font-semibold">Sensitivity analysis</span>
										<p className="text-muted-foreground">
											Try different v values to test the robustness of your
											solution
										</p>
									</div>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-6">How to Use This Tool</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-4">Manual Input</h3>
							<ol className="space-y-3 list-decimal ml-5">
								<li>Define your alternatives (options you're evaluating)</li>
								<li>Define your criteria (factors for evaluation)</li>
								<li>
									Fill in the performance matrix with values for each
									alternative against each criterion
								</li>
								<li>
									Specify whether each criterion should be maximized or
									minimized
								</li>
								<li>Assign weights to each criterion based on importance</li>
								<li>Adjust the v parameter if needed (default is 0.5)</li>
								<li>Click "Calculate VIKOR" to see the results</li>
							</ol>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-4">JSON Input</h3>
							<p className="mb-4">
								For complex problems, you can use the JSON input format. The
								structure should be:
							</p>
							<pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
								{`{
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
}`}
							</pre>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-6">Applications of VIKOR</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<Card className="flex flex-col">
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-3">Engineering</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Material selection</li>
								<li>• Supplier selection</li>
								<li>• Project evaluation</li>
								<li>• Design optimization</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="flex flex-col">
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-3">Business</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Investment decisions</li>
								<li>• Product selection</li>
								<li>• Strategy evaluation</li>
								<li>• Resource allocation</li>
							</ul>
						</CardContent>
					</Card>

					<Card className="flex flex-col">
						<CardContent className="p-6">
							<h3 className="text-xl font-semibold mb-3">Public Policy</h3>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Environmental management</li>
								<li>• Urban planning</li>
								<li>• Healthcare resource allocation</li>
								<li>• Energy policy decisions</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>

			<div className="text-center mb-16">
				<h2 className="text-3xl font-bold mb-6">
					Ready to Make Better Decisions?
				</h2>
				<Link href="/calculator">
					<Button size="lg" className="cursor-pointer gap-2">
						Go to VIKOR Calculator <ArrowRight className="h-4 w-4" />
					</Button>
				</Link>
			</div>

			<footer className="text-center text-muted-foreground border-t pt-8">
				<div className="flex items-center justify-center gap-2 mb-4">
					<BookOpen className="h-5 w-5" />
					<p>VIKOR Method Decision Making Tool</p>
				</div>
				<p className="text-sm">
					Based on the work of Serafim Opricovic and Gwo-Hshiung Tzeng
				</p>
			</footer>
		</div>
	);
}
