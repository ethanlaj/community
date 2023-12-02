import { format } from 'date-fns';
import formatDateOnly from '@/utils/formatDate';

const formatDate = (date) => (date ? format(new Date(date), 'PPpp') : '');

export const locationColumns = [
  { title: 'Address', field: 'address' },
  { title: 'Name', field: 'name' },
  { title: 'Created At', field: 'createdAt', render: (location) => formatDate(location.createdAt) },
  { title: 'Last Updated', field: 'updatedAt', render: (location) => formatDate(location.updatedAt) },
];

export const contactColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'OrganizationContacts.email' },
  { title: 'Phone', field: 'OrganizationContacts.phone' },
  { title: 'Created At', field: 'createdAt', render: (contact) => formatDate(contact.createdAt) },
  { title: 'Last Updated', field: 'updatedAt', render: (contact) => formatDate(contact.updatedAt) },
];

export const communicationColumns = [
  { title: 'Date', field: 'date', render: (communication) => formatDateOnly(communication.date) },
  { title: 'Type', field: 'type' },
  { title: 'Note', field: 'note' },
  { title: 'Created At', field: 'createdAt', render: (communication) => formatDate(communication.createdAt) },
  { title: 'Last Updated', field: 'updatedAt', render: (communication) => formatDate(communication.updatedAt) },
];
