import ContactRepository from "../../modules/contact/contact.repository";
import { Pool } from "pg";
import { Contact } from "../../modules/contact/contact";

export default class PgRawContactRepository implements ContactRepository {
  constructor(private db: Pool) {}

  async getPaginatedContacts(page: number, limit: number): Promise<Contact[]> {
    const offset = (page - 1) * limit;

    const result = await this.db.query<Contact>(
      `SELECT * FROM contacts ORDER BY id LIMIT $1 OFFSET $2`,
      [limit, offset] 
    );

    return result.rows;
  }

  async getTotallContacts(): Promise<number> {
    const result = await this.db.query(
      `SELECT COUNT(*) FROM contacts`
    );

    const total = parseInt(result.rows[0].count);

    return total;
  }
}
