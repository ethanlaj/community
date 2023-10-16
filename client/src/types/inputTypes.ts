interface ValidatePropertyProps {
	id: string;
	value: string;
}

interface EditableTableProps<T> {
	columns: {
		title: string;
		field: string;
	}[];
	tableData: T;
	tableError: string;
	onUpdate: (row: any) => void;
	onAdd: (row: any) => void;
}

interface RenderSearchProps {
	id: string;
	items: any[];
	keyPath: string;
	valuePath: string;
	headerLabel: string;
	handleChange?: (id: string, value: string) => void;
	resetOnSelect?: boolean;
	selectionLabel?: string;
	onRefresh?: () => void;
}

interface RenderSelectOption {
	value: string | number;
	name: string;
}