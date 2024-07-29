import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reciept, setReciept] = useState('');
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [price3, setPrice3] = useState(0);
  const data = { name, email, reciept, price1, price2, price3 };
  
  const SubmitForm = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/createPdf', data)
      .then(() => 
        axios.get('http://localhost:5000/fetchPdf', { responseType: 'blob' })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'invoice.pdf');
            setName('');
            setEmail('');
            setReciept('');
            setPrice1(0);
            setPrice2(0);
            setPrice3(0);
            alert('PDF generated successfully');
          })
          .then(() => {
            axios.post('http://localhost:5000/sendPdf', { email: email })
              .then((res) => {
                console.log(res.data);
                alert('Email sent successfully');
              })
              .catch((error) => {
                console.error('Error sending email:', error);
              });
          })
      )
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <div className='main-block'>
      <h1>Generate and download pdf</h1>
      <form onSubmit={SubmitForm}>
        <div className='info'>
          <input type='text' name='name' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
          <input type='email' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <input type='text' name='reciept' placeholder='Reciept' value={reciept} onChange={(e) => setReciept(e.target.value)} /><br />
          <input type='text' name='price1' placeholder='price1' value={price1} onChange={(e) => setPrice1(e.target.value)} /><br />
          <input type='text' name='price2' placeholder='price2' value={price2} onChange={(e) => setPrice2(e.target.value)} /><br />
          <input type='text' name='price3' placeholder='price3' value={price3} onChange={(e) => setPrice3(e.target.value)} /><br />
        </div>
        <button type='submit'>Generate PDF</button>
      </form>
      <div>
        <Link to='/view'>View PDF</Link>
      </div>
    </div>
  );
}

export default App;