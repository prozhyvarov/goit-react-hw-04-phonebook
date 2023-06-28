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

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.target.value });
//   };

//   addContact = contact => {
//     const isInContacts = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (isInContacts) {
//       Notiflix.Notify.warning(`${contact.name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();
//     const { filter } = this.state;
//     return (
//       <Container>
//         <Title>Phonebook</Title>

//         <ContactFrom onSubmit={this.addContact} />

//         <SubTitle>Contacts</SubTitle>
//         {this.state.contacts.length > 0 ? (
//           <Filter value={filter} onChangeFilter={this.changeFilter} />
//         ) : (
//           <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
//         )}
//         {this.state.contacts.length > 0 && (
//           <ContactList
//             contacts={visibleContacts}
//             onRemoveContact={this.removeContact}
//           />
//         )}
//       </Container>
//     );
//   }
// };

// export default App;
