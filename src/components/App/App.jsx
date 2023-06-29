import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactFrom from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import Filter from '../Filter/Filter';
import Notiflix from 'notiflix';

const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts; //Если значение не найдено, устанавливается значение массива phoneContacts.
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase().trim()
    );

    if (isInContacts) {
      Notiflix.Notify.warning(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [
      { id: nanoid(), ...contact }, ...prevContacts,
    ]);
  };

  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactFrom onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
};
export default App;

