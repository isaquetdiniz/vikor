import { Button } from "@/components/ui/button";
import { VIKORForm } from "@/components/vikor-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="container mx-auto py-10 px-4">
			<Link href="/">
				<Button size="lg" className="gap-2">
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
			</Link>
			<h1 className="text-3xl font-bold mb-6 text-center">
				VIKOR Method Decision Making Tool
			</h1>
			<p className="text-center mb-8 max-w-2xl mx-auto">
				Enter your decision parameters below to calculate the optimal solution
				using the VIKOR method.
			</p>
			<VIKORForm />
		</main>
	);
}
