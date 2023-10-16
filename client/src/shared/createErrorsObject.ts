type TopLevelErrorProps<T> = {
	[K in keyof T]: string;
};

export function generateTopLevelErrors<T>(formProps: T): TopLevelErrorProps<T> {
	let errors: Partial<Record<keyof T, string>> = {};

	for (const key in formProps) {
		const value = formProps[key as keyof T];

		if (typeof value === "string") {
			errors[key as keyof T] = "";
		}
	}

	return errors as TopLevelErrorProps<T>;
}
