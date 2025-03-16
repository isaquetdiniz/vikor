import type { Alternative } from "./alternative";
import type { Criteria } from "./criteria";

export class VikorMethod {
	private constructor(private readonly props: VikorMethodProps) {}

	static create(params: VikorMethodCreateParams) {
		VikorMethod.validate(params);

		return new VikorMethod(params);
	}

	static validate(params: VikorMethodCreateParams) {
		const { alternatives, criteria } = params;

		if (!alternatives.length) {
			throw new Error("Should exists at least one alternative");
		}

		const alternativesNamesWithoutRepeat = [
			...new Set(alternatives.map((a) => a.name)),
		];

		if (alternativesNamesWithoutRepeat.length !== alternatives.length) {
			throw new Error("Alternatives cannot be repeated");
		}

		if (!criteria.length) {
			throw new Error("Should exists at least one criteria");
		}

		const criteriaNamesWithoutRepeat = [
			...new Set(criteria.map((c) => c.name)),
		];

		if (criteriaNamesWithoutRepeat.length !== criteria.length) {
			throw new Error("Criteria cannot be repeated");
		}
	}
}

export enum Tradeoff {
	utility = 1,
	individual = 1,
	balance = 0.5,
}

export type VikorMethodProps = {
	alternatives: Alternative[];
	criteria: Criteria[];
	performance: {
		alternative: Alternative;
		criteria: Criteria;
		value: number;
	}[];
	tradeoff: Tradeoff;
};

export type VikorMethodCreateParams = {
	alternatives: Alternative[];
	criteria: Criteria[];
	performance: {
		alternative: Alternative;
		criteria: Criteria;
		value: number;
	}[];
	tradeoff: Tradeoff;
};
