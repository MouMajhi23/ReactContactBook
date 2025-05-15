import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import contactDetailsStyle from "../CSS/contactDetailsStyle.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faArrowLeft, faMessage,faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from 'react-router-dom';


const Contact = () => {
    const { id } = useParams(); // Get ID from URL
    const [contact, setContact] = useState(null);
    //  let [reload, setReload] = useState(false);
     const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/contact/${id}`)
            .then((res) => {
                setContact(res.data); // Set the fetched contact data
            })
            .catch((err) => {
                console.error("Error fetching contact details:", err);
            });
    }, [id]);

    //for the Delete opertaion
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/contact/${id}`)
          .then((res) => {
            console.log(res);
            alert("Contact Deleted!")
            navigate("/");
            
    
          })
          .catch((err) => {
            console.log(err);
    
          })
      }

    if (!contact) {
        return <h2>Loading...</h2>;
    }


    return (
        <div className={contactDetailsStyle.container}>
            <Link to="/" className={contactDetailsStyle.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Contacts
            </Link>

            <div className={contactDetailsStyle.card}>
                <img src={contact.pic} alt={contact.name} className={contactDetailsStyle.profilePic} />
                <h2>{contact.name}</h2>
                <div className={contactDetailsStyle.options}>

                    <a href={`tel:${contact.contact_number}`} className={contactDetailsStyle.item} title='Call' value={contact.contact_number}><FontAwesomeIcon icon={faPhone} size='2x' /></a>
                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                        target="_blank" className={contactDetailsStyle.item} title='Email'><FontAwesomeIcon icon={faEnvelope} size='2x' /></a>
                    <a href={`sms:${contact.contact_number}`} className={contactDetailsStyle.item} title='Message'><FontAwesomeIcon icon={faMessage} size='2x' /></a>
                    <a href={`https://wa.me/${contact.contact_number}`} target="_blank" rel="noopener noreferrer"
                        className={contactDetailsStyle.item}
                        title="Send WhatsApp Message">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                </div>
                <div className={contactDetailsStyle.info}>
                    <p>Contact info</p>
                    <p><FontAwesomeIcon icon={faPhone} /> {contact.contact_number}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
                    <p><strong>About:</strong> {contact.about}</p>
                </div>

                {/* Edit & delete button section */}
                <div className={contactDetailsStyle.btn}>
                    <button ><Link to={`/edit/${contact.id}`} ><FontAwesomeIcon icon={faUserPen} size='lg' className={contactDetailsStyle.editBtn} title='Edit'/></Link></button>
                    <button onClick={() => handleDelete(contact.id)}> <FontAwesomeIcon icon={faTrash} size='lg' className={contactDetailsStyle.deleteBtn} title='Delte'/></button>
                </div>
            </div>
        </div>
    );
};



export default Contact;
