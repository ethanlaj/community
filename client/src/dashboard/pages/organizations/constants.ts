export const importFields = [
  {
    label: 'Name',
    key: 'name',
    alternateMatches: ['first name', 'first'],
    fieldType: {
      type: 'input',
    },
    example: 'Stephanie',
    validations: [
      {
        rule: 'required',
        errorMessage: 'Name is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Location1',
    key: 'location1',
    alternateMatches: ['location 1', 'location1'],
    fieldType: {
      type: 'input',
    },
    example: 'Harriburg',
    validations: [
      {
        rule: 'required',
        errorMessage: 'Location1 is required',
        level: 'error',
      },
    ],
  },
  {
    label: 'Location2',
    key: 'location2',
    alternateMatches: ['location 2', 'location2'],
    fieldType: {
      type: 'input',
    },
    example: 'Lancaster',
  },
  {
    label: 'Location3',
    key: 'location3',
    alternateMatches: ['location 3', 'location3'],
    fieldType: {
      type: 'input',
    },
    example: 'York',
  },
  {
    label: 'Location4',
    key: 'location4',
    alternateMatches: ['location 4', 'location4'],
    fieldType: {
      type: 'input',
    },
    example: 'Palmyra',
  },
  {
    label: 'Location5',
    key: 'location5',
    alternateMatches: ['location 5', 'location5'],
    fieldType: {
      type: 'input',
    },
    example: 'Hershey',
  },
  {
    label: 'Address1',
    key: 'address1',
    alternateMatches: ['address 1', 'address1'],
    fieldType: {
      type: 'input',
    },
    example: '123 Main St',
  },
  {
    label: 'Address2',
    key: 'address2',
    alternateMatches: ['address 2', 'address2'],
    fieldType: {
      type: 'input',
    },
    example: '432 East Willow St',
  },
  {
    label: 'Address3',
    key: 'address3',
    alternateMatches: ['address 3', 'address3'],
    fieldType: {
      type: 'input',
    },
    example: '567 West Main St',
  },
  {
    label: 'Address4',
    key: 'address4',
    alternateMatches: ['address 4', 'address4'],
    fieldType: {
      type: 'input',
    },
    example: '142 Oak St',
  },
  {
    label: 'Address5',
    key: 'address5',
    alternateMatches: ['address 5', 'address5'],
    fieldType: {
      type: 'input',
    },
    example: '332 Orange St',
  },

];

export const importTemplate = [
  'Name,Location1,Location2,Location3,Location4,Location5,Address1,Address2,Address3,Address4,Address5',
  'Sample Company,Harrisburg,Lancaster,York,Reading,Philadelphia,123 Main St,432 East Willow St,567 West Main St,142 Oak St,332 Orange St',
].join('\n');

export const exportColumns = [
  { title: '', field: 'flag' },
  { title: 'Name', field: 'name' },
  { title: 'Last Communication Date', field: 'lastComDate' },
  { title: 'Last Communication Office', field: 'lastComOffice' },
];
