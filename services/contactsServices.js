import * as fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"

const filePath = path.resolve("db", "contacts.json");

async function readContacts(){
  const data = await fs.readFile( filePath, { encoding: "utf-8"})
  return JSON.parse(data)
}

function writeContacts(contacts){
  return fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
}


async function listContacts() {
  const contacts  = await readContacts()

  return contacts
  }
  async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId)

    if (typeof contact === "undefined"){
        return null
    }

    return contact
  }
  
  async function removeContact(contactId) {
    const contacts = await readContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId)

    if ( index === -1 ){
     return null
    }

    const removedContact = contacts[index]

    contacts.splice(index, 1)
    await writeContacts(contacts)

    return removedContact  }

  
  async function addContact(name, email, phone) {

    const contacts = await readContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);
    
    await writeContacts(contacts);
    return newContact;

  }

  async function updatedContact(id, updateData) {
    const contacts = await readContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex !== -1) {
      contacts[contactIndex] = { ...contacts[contactIndex], ...updateData };
      await writeContacts(contacts);
      return contacts[contactIndex];
    }
    return null;
  }

export {
    listContacts, 
    getContactById, 
    removeContact,
    addContact, 
    updatedContact
}