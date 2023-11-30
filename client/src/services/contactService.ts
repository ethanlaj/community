import http from './httpService';
import { apiUrl } from '../config';
import {
  Contact, CreateUpdateContactDTO, deletedContactIdentifiers, BulkImportContactsDTO,
} from '@/types/contact';

const apiEndpoint = `${apiUrl}/contacts`;

export default class ContactService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getAllTable() {
    const response = await http.get(`${apiEndpoint}/getbyOrg`);
    return response.data;
  }

  static async getAllByOrgId(orgId: number) {
    const response = await http.get(apiEndpoint, { params: { orgId } });
    return response.data;
  }

  static async getById(id: number): Promise<Contact> {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(createContactDTO: CreateUpdateContactDTO) {
    const updatedContactDTO = this.getUpdatedContactDTO(createContactDTO);

    const response = await http.post(
      apiEndpoint,
      updatedContactDTO,
    );
    return response.data;
  }

  static async update(id: number, updatedContact: CreateUpdateContactDTO) {
    const updatedContactDTO = this.getUpdatedContactDTO(updatedContact);

    const response = await http.put(`${apiEndpoint}/${id}`, updatedContactDTO);
    return response.data;
  }

  static async delete(ContactIdentifiers: deletedContactIdentifiers) {
    const { contactIdIncoming, organizationIdIncoming } = ContactIdentifiers;
    const deleteEndpoint = `${apiEndpoint}/${contactIdIncoming}/${organizationIdIncoming}`;
    const response = await http.delete(deleteEndpoint);
    return response.data;
  }

  static async importContacts(contacts: BulkImportContactsDTO[]) {
    try {
      const response = await http.post(`${apiEndpoint}/bulk-import`, contacts);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  }

  private static getUpdatedContactDTO(contactDTO: CreateUpdateContactDTO) {
    // Map the organizations to replace undefined emails and phones with empty strings
    const mappedOrganizations = contactDTO.organizations.map((org) => ({
      id: org.id,
      email: org.email || '', // Use an empty string if email is undefined
      phone: org.phone || '', // Use an empty string if phone is undefined
      exten: org.exten || '',
    }));

    // Create a new DTO with mapped organizations
    const updatedContactDTO: CreateUpdateContactDTO = {
      first_name: contactDTO.first_name,
      last_name: contactDTO.last_name,
      aliases: contactDTO.aliases,
      organizations: mappedOrganizations,
    };

    return updatedContactDTO;
  }
}
