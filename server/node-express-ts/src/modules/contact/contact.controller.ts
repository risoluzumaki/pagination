import {Request, Response, NextFunction} from "express";
import ContactService from "./contact.service";

export default class ContactController {
  constructor(private contactService: ContactService) {}
  async getAllContacts(req: Request, res: Response, next: NextFunction){
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const contacts = await this.contactService.getAllContacts(page, limit);
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  }
}