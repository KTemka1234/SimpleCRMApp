import Contact from 'Frontend/generated/com/example/application/data/entity/Contact';
import ContactModel from 'Frontend/generated/com/example/application/data/entity/ContactModel';
import { crmStore } from 'Frontend/stores/app-store';
import { makeAutoObservable, observable } from 'mobx';

class ListViewStore {
    // This is an observable property 
    private _filterText = '';
    _selectedContact: Contact | null = null;
    
    constructor() {
        makeAutoObservable(
            this,
            { _selectedContact: observable.ref },
            { autoBind: true }
        )
    }
        
    public get filterText() {
        return this._filterText;
    }
    
    public set filterText(value: string) {
        this._filterText = value;
    }
    
    public get selectedContact(): Contact | null {
        return this._selectedContact;
    }

    public set selectedContact(value: Contact) {
        this._selectedContact = value;
    }
        
    // This is a calculated property
    public get filteredContacts() {
        const filter = new RegExp(this._filterText, 'i');
        const contacts = crmStore.contacts;
        return contacts.filter((contact) =>
        filter.test(`${contact.firstName} ${contact.lastName}`)
        );
    }

    public updateFilter(filterText: string) {
        this._filterText = filterText;
    }

    public editNew() {
        this._selectedContact = ContactModel.createEmptyValue();
    }

    public cancelEdit() {
        this._selectedContact = null;
    }
}

export const listViewStore = new ListViewStore();
