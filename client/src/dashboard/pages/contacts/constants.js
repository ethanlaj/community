export const importFields = [
  {
    label: 'First Name',
    key: 'first_name',
    alternateMatches: ['first name', 'fname'],
    fieldType: {
      type: 'input',
    },
    example: 'John',
    validations: [
      {
        rule: 'required',
        errorMessage: 'First Name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Last Name',
    key: 'last_name',
    alternateMatches: ['last name', 'lname'],
    fieldType: {
      type: 'input',
    },
    example: 'Doe',
    validations: [
      {
        rule: 'required',
        errorMessage: 'Last Name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Email',
    key: 'email',
    alternateMatches: ['email', 'email address'],
    fieldType: {
      type: 'input',
    },
    example: 'johndoe@example.com',
  },
  {
    label: 'Phone Number',
    key: 'phone',
    alternateMatches: ['phone', 'phone number'],
    fieldType: {
      type: 'input',
    },
    example: '123-456-7890',
  },
  {
    label: 'Organization Name',
    key: 'organizationName',
    alternateMatches: ['organization', 'company'],
    fieldType: {
      type: 'input',
    },
    example: 'Acme Corp',
  },
  {
    label: 'Extension',
    key: 'exten',
    alternateMatches: ['ext', 'extension'],
    fieldType: {
      type: 'input',
    },
    example: '123',
  },
];

export const importTemplate = [
  'First Name,Last Name,Organization Name,Email,Phone Number,Extension',
  'John,Doe,Acme Corp,johndoe@example.com,123-456-7890,123',
].join('\n');

export const exportColumns = [
  { title: 'First Name', field: 'first_name' },
  { title: 'Last Name', field: 'last_name' },
  { title: 'Organization', field: 'organizationName' },
  { title: 'Email', field: 'email' },
  { title: 'Phone Number', field: 'phone' },
  { title: 'Extension', field: 'exten' },
];
