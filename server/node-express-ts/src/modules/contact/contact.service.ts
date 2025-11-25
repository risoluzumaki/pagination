import ContactRepository from "./contact.repository";
import { Contact } from "./contact";

export default class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  async getAllContacts(page: number, limit: number): Promise<{ total: number; totalPages: number; page: number; limit: number; data: Contact[] }> {
    try {
      const [contacts, total] = await Promise.all([
        this.contactRepository.getPaginatedContacts(page, limit),
        this.contactRepository.getTotallContacts()
      ]);

      const totalPages = Math.max(1, Math.ceil(total / limit));
      return { total, totalPages, page, limit, data: contacts };
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }
}
