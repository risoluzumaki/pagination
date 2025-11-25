import express from "express";
import cors from "cors";
import poolPg from "../config/pg.raw";

import PgRawContactRepository from "../repository/raw/pg.contact";
import ContactService from "../modules/contact/contact.service";
import ContactController from "../modules/contact/contact.controller";

function bootstrapp(){
  // dotEnv.config();
  const app = express();
  
  const contactRepository = new PgRawContactRepository(poolPg);
  const contactService = new ContactService(contactRepository);
  const contactController = new ContactController(contactService);

  app.use(cors());

  app.get("/api/v1/contacts", contactController.getAllContacts.bind(contactController));

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export default bootstrapp;