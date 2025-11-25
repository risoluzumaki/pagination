import { Contact } from "./contact";

export default interface ContactRepository{
  getPaginatedContacts(page: number, limit: number): Promise<Contact[]>;
}