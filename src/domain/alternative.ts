export class Alternative {
	private constructor(private readonly props: AlternativeProps) {}

	static create(params: AlternativeCreateParams) {
		return new Alternative(params);
	}

	get name() {
		return this.props.name;
	}
}

export type AlternativeProps = {
	name: string;
};

export type AlternativeCreateParams = AlternativeProps;
