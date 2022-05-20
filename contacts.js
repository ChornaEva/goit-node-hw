// импорт модулей fs и path для работы с файловой системой
const fs = require("fs/promises");
const path = require("path");

// путь к файлу
const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log(contactsPath);

// список контактов
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  //   console.log(contacts);
  return contacts;
}

// получить контакт по ид
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id == contactId);
  if (!result) {
    return null;
  }
  return result;
}

// удалить контакт
function removeContact(contactId) {
  // ...твой код
}

// добавить контакт
function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
};
