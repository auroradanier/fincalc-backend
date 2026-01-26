export interface ColumnConfig {
  key: string;
  title: string;
  type?: 'text' | 'number' | 'boolean' | 'date' | 'link' | 'relation' | 'image' | 'actions';
  link?: {
    type: 'internal' | 'external';
    path?: string; // For internal links, e.g. '/admin/bots/'
    param?: string; // Which field to use as parameter
    externalUrl?: string; // For external links
  };
  relation?: {
    table: string;
    displayField: string;
    valueField: string;
    filter?: boolean;
  };
  format?: (...args: any[]) => string;
  hoverPreview?: (...args: any[]) => string | null;
  tooltip?: (value: any) => string; // Optional: function to generate tooltip text
  sortable?: boolean;
  sortSubKey?: string; // Optional: custom subkey to use for sorting (e.g., 'en' for JSON fields like name.en)
  sortLower?: boolean; // Optional: enable lowercase sorting for this column (default: false)
  editComponent?: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'multiselect' | 'autocomplete' | 'datepicker' | 'timefield'; // Optional: specifies the component to use for inline editing
}

export interface FilterOption {
  value: string | number | boolean;
  label: string;
}

export interface FilterConfig {
  key: string;
  title: string;
  type: 'select' | 'boolean' | 'text';
  options?: FilterOption[];
}

// New interface for detail page field configuration
export interface DetailFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'datetime' | 'relation' | 'image' | 'json'; // Defines the data type and primary rendering hint
  format?: (...args: any[]) => string;
  hoverPreview?: (...args: any[]) => string | null;
  readOnly?: boolean; // To indicate if the field should be read-only in edit view
  editOnly?: boolean; // To indicate if the field should only be available in edit form, not in create
  required?: boolean; // To indicate if the field is required (not null)
  relation?: {
    table: string;
    displayField: string;
    valueField: "id" | "code";
  };
  rows?: number; // Optional rows property for textarea
  editComponent?: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'multiselect' | 'autocomplete' | 'datepicker' | 'timefield'; // Optional: specifies the component to use for editing this field
  uploadTarget?: string; // Optional: specifies the image target for uploads (for image type fields)
  options?: FilterOption[]; // Options for select/multiselect components
  inlineEdit?: boolean; // For inline editing support
}

export interface ModalFieldConfig {
  key: string;
  type: 'text' | 'number' | 'textarea' | 'checkbox' | 'select';
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  options?: { value: any; label: string }[];
}

export interface ModalConfig {
  title: string;
  fields: ModalFieldConfig[];
  submitText?: string;
  cancelText?: string;
  submittingText?: string;
}

export interface ActionConfig {
  key: string;
  title: string;
  type: 'button';
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: string;
  handler: string; // Function name to call
  confirm?: {
    title: string;
    message: string;
  };
  modal?: ModalConfig; // Modal configuration for actions that need a form
  showInList?: boolean; // Whether to show this action in the list page (default: true)
  showInDetail?: boolean; // Whether to show this action in the detail page (default: true)
}

export interface TableConfig {
  columns: ColumnConfig[];
  defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  searchableFields?: string[];
  perPage?: number;
  filters?: FilterConfig[];
  detailFields?: DetailFieldConfig[]; // New property for detail page fields
  readOnlyFields?: string[]; // New property to specify read-only fields on edit page
  excludeFieldsInDetail?: string[]; // New property to exclude fields from detail, edit, and create forms
  actions?: ActionConfig[]; // New property for row actions
  imageTarget?: string; // New property to specify the image target for uploads
}