import React, { useEffect, useState } from 'react';
import axios from "axios";
import contactStyle from '../CSS/contact.module.css';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPen, faTrash, faUserPlus, faPhone, faEnvelope, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

const Contacts = () => {
  // To store all contacts
  const [data, setData] = useState([]);
  // To stores search input
  const [searchTerm, setSearchTerm] = useState("");
  // to stores filtered contacts
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigate = useNavigate();

  // Fetch contacts from API
  useEffect(() => {
    axios.get("http://localhost:5000/contact")
      .then((res) => {
        setData(res.data);
        // Initially, show all contacts
        setFilteredContacts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter contacts based on search input
    if (value.trim() !== "") {
      const filtered = data.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(data); // Reset to all contacts when input is empty
    }
  };

  // Handle delete action
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/contact/${id}`)
    .then(() => axios.get("http://localhost:5000/contact"))
    .then((res) => {
      setData(res.data);
      setFilteredContacts(res.data);
      navigate("/"); // Navigate to contacts page after refresh
    })
    .catch(err => console.error("Error deleting contact:", err));
  };

  return (
    <div className={contactStyle.container}>
      <div className={contactStyle.contactbook}>
        <div id={contactStyle.createnewBtnHolder}>

          {/* Header */}
          <h3>Your Contacts</h3>

          {/* Search Box */}
          <div className={contactStyle.searchResult}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" className={contactStyle.search}  />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Create Contact Button */}
          <button id={contactStyle.createnew}>
            <Link to="/createcontact" style={{ textDecoration: 'none' }}>
              <span className={contactStyle.createText}>Create new Contact</span>
              <FontAwesomeIcon icon={faUserPlus} size="1x" className={contactStyle.createnewbtn} />
            </Link>
          </button>
        </div>

        {/* Contacts List */}
        <div id={contactStyle.contact}>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((content) => (
              <div className={contactStyle['contact-card']} key={content.id}>
                <img src={content.pic} alt={content.name} />
                <div className={contactStyle['contact-details']} onClick={() => navigate(`/contact/${content.id}`)}>
                  <div className={contactStyle.about}>
                    <h2>{content.name}</h2>
                    <p>{content.about}</p>
                  </div>
                  <div className={contactStyle.info}>
                    <h3><FontAwesomeIcon icon={faPhone} className={contactStyle.mobile} /> {content.contact_number}</h3>
                    <h3><FontAwesomeIcon icon={faEnvelope} className={contactStyle.email} /> {content.email}</h3>
                  </div>
                </div>
                <div className={contactStyle.btn}>
                  <button><Link to={`/edit/${content.id}`}><FontAwesomeIcon icon={faUserPen} size='lg' className={contactStyle.editBtn} /></Link></button>
                  <button onClick={() => handleDelete(content.id)}> <FontAwesomeIcon icon={faTrash} size='lg' className={contactStyle.deleteBtn} /></button>
                </div>
              </div>
            ))
          ) : (
            <p className={contactStyle.noResults}>No contacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;

