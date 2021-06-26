import React,{useState,useEffect} from 'react';
import './App.css';
import {uuid} from 'uuidv4';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const [contacts,setContacts]=useState([]);
  const LOCAL_STORAGE_KEY="contacts";


  const addContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts,{id:uuid(),...contact}]);
  }

  const removeContactHandler=(id)=>{
    const newContactList=contacts.filter((contact) => {
        return contact.id!==id;
    });
    setContacts(newContactList);
  }
  
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]); 

  useEffect(()=>{
    const retrivedContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrivedContacts) setContacts(retrivedContacts);
  },[]);



  return (
    
    <div className="ui container">
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
