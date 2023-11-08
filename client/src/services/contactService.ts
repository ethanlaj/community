import http from './httpService';
import config from '../config';
import { CreateContactDTO, deletedContactIdentifiers } from '@/types/contact';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/contacts`;

export default class ContactService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getAllByOrgId(orgId: number) {
    const response = await http.get(apiEndpoint, { params: { orgId } });
    return response.data;
  }

  static async getById(id: number) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(createContactDTO: CreateContactDTO) {
    // Map the organizations to replace undefined emails and phones with empty strings
    const mappedOrganizations = createContactDTO.organizations.map((org) => ({
      id: org.id,
      email: org.email || '', // Use an empty string if email is undefined
      phone: org.phone || '', // Use an empty string if phone is undefined
      exten: org.exten || '',
    }));

    // Create a new DTO with mapped organizations
    const updatedContactDTO: CreateContactDTO = {
      name: createContactDTO.name,
      organizations: mappedOrganizations,
    };
    const response = await http.post(
      apiEndpoint,
      updatedContactDTO,
    );
    return response.data;
  }

  static async update(id: number, updatedContact: string) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedContact);
    return response.data;
  }

  static async delete(ContactIdentifiers: deletedContactIdentifiers) {
    const { contactIdIncoming, organizationIdIncoming } = ContactIdentifiers;
    const deleteEndpoint = `${apiEndpoint}/${contactIdIncoming}/${organizationIdIncoming}`;
    const response = await http.delete(deleteEndpoint);
    return response.data;
  }
}
