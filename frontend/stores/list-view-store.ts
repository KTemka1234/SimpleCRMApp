import Contact from 'Frontend/generated/com/example/application/data/entity/Contact';
import ContactModel from 'Frontend/generated/com/example/application/data/entity/ContactModel';
import { crmStore } from 'Frontend/stores/app-store';
import { makeAutoObservable, observable } from 'mobx';

class ListViewStore {
    // This is an observable property 
    filterText = '';
    selectedContact: Contact | null = null;
    
    constructor() {
        makeAutoObservable(
            this,
            { selectedContact: observable.ref },
            { autoBind: true }
        )
    }

    setSelectedContact(value: Contact) {
        this.selectedContact = value;
    }
        
    // This is a calculated property
    get filteredContacts() {
        const filter = new RegExp(this.filterText, 'i');
        const contacts = crmStore.contacts;
        return contacts.filter((contact) =>
        filter.test(`${contact.firstName} ${contact.lastName}`)
        );
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    editNew() {
        this.selectedContact = ContactModel.createEmptyValue();
    }

    cancelEdit() {
        this.selectedContact = null;
    }

    async save(contact: Contact) {
        await crmStore.saveContacts(contact);
        this.cancelEdit();
    }

    async delete() {
        if (this.selectedContact) {
            await crmStore.deleteContact(this.selectedContact);
            this.cancelEdit();
        }
    }
}

export const listViewStore = new ListViewStore();
