import React, { useState } from 'react';
import './ApplicationForm.css';

const ApplicationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        forename: '',
        surname: '',
        dob: '',
        nationalInsurance: '',
        mobile: '',
        address: '',
        nextOfKinAddress: '',
        terms: false,
        documentPath: '',
    });
    const [message, setMessage] = useState('');

    const mobileRegex = /^(07\d{9}|(\+44)\d{10})$/;  // UK mobile number 
    const niRegex = /^[A-CEGHJ-PR-TW-Z]{2}[0-9]{6}[A-D]$/;  // UK National Insurance number format

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.terms) {
            setMessage('You must agree to the terms and conditions.');
            return;
        }

        if (!mobileRegex.test(formData.mobile)) {
            setMessage('Please enter a valid mobile number (starting with 07 or +44).');
            return;
        }

        if (!niRegex.test(formData.nationalInsurance)) {
            setMessage('Please enter a valid National Insurance number.');
            return;
        }

        const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
        let decision = '';
        if (age < 18) decision = "Your application is being considered.";
        else if (age <= 30) decision = "Your application has been accepted.";
        else decision = "Your application is unsuccessful.";

        await fetch('http://localhost:5000/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                decision
            }),
        });

        onSubmit(); 
    };

    return (
        <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <select name="title" value={formData.title} onChange={handleChange} className="input-field">
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                </select>

                <label>Forename</label>
                <input type="text" name="forename" value={formData.forename} onChange={handleChange} className="input-field" required />

                <label>Surname</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="input-field" required />

                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input-field" required/>

                <label>National Insurance Number</label>
                <input type="text" name="nationalInsurance" value={formData.nationalInsurance} onChange={handleChange} className="input-field" required/>

                <label>Mobile Number</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" required/>

                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} className="input-field" required></textarea>

                <label>Next of Kin Address</label>
                <textarea name="nextOfKinAddress" value={formData.nextOfKinAddress} onChange={handleChange} className="input-field" required></textarea>

                <label>
                    <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required/>
                    I agree to the terms and conditions
                </label>

                <label>Upload Document</label>
                <input type="file" name="documentPath" onChange={handleChange} className="input-field" required/>
            </div>

            <button type="submit" className="submit-button">Submit</button>

            {message && <p className="message">{message}</p>}
        </form>
    );
};

export default ApplicationForm;
