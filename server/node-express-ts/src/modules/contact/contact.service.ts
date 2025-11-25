import ContactRepository from "./contact.repository";
import { Contact } from "./contact";

export default class ContactService {
  
  constructor(private contactRepository: ContactRepository) {}

  async getAllContacts(page: number, limit: number): Promise<Contact[]> {
    try {
      const contacts = await this.contactRepository.getPaginatedContacts(page, limit);
      return contacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }
}