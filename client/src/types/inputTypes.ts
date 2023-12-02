import Joi from 'joi';
import { ChangeEvent } from 'react';

export type Errors<T> = Partial<Record<keyof T, string>>;

export interface UseFormProps<T> {
    fields: T;
    schema: Joi.Schema;
    doSubmit: () => void;
}

export interface UseFormReturn<T> {
    data: T;
    errors: Errors<T>;
    setErrors: (errors: Errors<T>) => void;
    setData: (data: T) => void;
    handleSubmit: (event: SubmitEvent) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDataChange: (id: string, value: any) => void;
    renderChildForm: (form: UseFormReturn<T>, id: string, ChildFormComponent: React.ComponentType<any>, childData: any, props?: any) => JSX.Element;
    renderEditableTable: (props: EditableTableProps) => JSX.Element;
    renderButton: (label: string) => JSX.Element;
    renderSearch: (props: RenderSearchProps) => JSX.Element;
    renderSelect: (id: keyof T, label: string, options: RenderSelectOption[], blankOption?: boolean) => JSX.Element;
    renderInput: (props: RenderInputProps<T>) => JSX.Element;
}

export interface ValidatePropertyProps {
    id: string;
    value: string;
}

export interface EditableTableProps {
    columns: EditableTableColumn[];
    tableData?: any;
    tableError: string;
    onUpdate: (row: any) => void;
    onAdd: (row: any) => void;
}

export interface EditableTableColumn {
    title: string;
    field: string;
}

export interface RenderSearchProps {
    id: string;
    items: any[];
    keyPath: string;
    valuePath: string;
    headerLabel?: string;
    handleChange?: (id: string, value: any) => void;
    resetOnSelect?: boolean;
    selectionLabel?: string;
    onRefresh?: () => void;
}

export interface RenderInputProps<T> {
    id: keyof T;
    label: string;
    placeholder?: string;
    type?: string;
}

export interface RenderSelectOption {
    value: string | number;
    name: string;
}
