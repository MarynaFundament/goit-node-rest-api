import { application } from "express";
import { listContacts, getContactById, removeContact, addContact, updatedContact } from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {

    try{
        const contacts = await listContacts();


        if (error) {
            return res.status(404).json({ "message": "Not found" });
        }


        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {

    try{
        const contact = await getContactById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async(req, res, next ) => {

    try{
        const contact = await removeContact(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};


export const createContact = async (req, res, next) => {
    const { name, email, phone } = req.body
    try {
        const { error } = createContactSchema.validate({ name, email, phone });
        if (error) {
            return res.status(400).json({"message": "Please check the input" });
        }

        const newContact = await addContact(name, email, phone);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {

    try {
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw new HttpError(400, error.message);
        }
        const { id } = req.params;
        const updatedContact = await updateContact(id, req.body);
        if (!updatedContact) {
            throw new HttpError(404, "Not found");
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};