const fs = require("fs/promises");
const path = require("path");
const { mainModule } = require("process");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactToAdd = { id: uuidv4(), name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
