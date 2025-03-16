export class Criteria {
	private constructor(private readonly props: CriteriaProps) {}

	static create(params: CriteriaCreateParams) {
		return new Criteria(params);
	}

	get name() {
		return this.props.name;
	}

	get type() {
		return this.props.type;
	}

	get weight() {
		return this.props.weight;
	}
}

export enum CriteriaType {
	min = "min",
	max = "max",
}

export type CriteriaProps = {
	name: string;
	weight: number;
	type: CriteriaType;
};

export type CriteriaCreateParams = CriteriaProps;
