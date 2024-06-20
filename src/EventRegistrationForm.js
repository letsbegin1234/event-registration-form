import React, { useState } from 'react';
import useForm from './hooks/useForm';
import useValidation from './hooks/useValidation';

const validate = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.age) {
        errors.age = 'Age is required';
    } else if (isNaN(values.age) || values.age <= 0) {
        errors.age = 'Age must be a number greater than 0';
    }

    if (values.attendingWithGuest === 'yes' && !values.guestName) {
        errors.guestName = 'Guest name is required if attending with a guest';
    }

    return errors;
};

const EventRegistrationForm = () => {
    const initialValues = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'no',
        guestName: '',
    };

    const [values, handleChange] = useForm(initialValues);
    const [submitted, setSubmitted] = useState(false);
    const [errors, handleSubmit] = useValidation(values, validate, setSubmitted);

    const displaySummary = (values) => {
        return (
            <div className="summary">
                <h3>Summary</h3>
                <p>Name: <span className="highlight">{values.name}</span></p>
                <p>Email: <span className="highlight">{values.email}</span></p>
                <p>Age: <span className="highlight">{values.age}</span></p>
                <p>Attending with a guest: <span className="highlight">{values.attendingWithGuest === 'yes' ? 'Yes' : 'No'}</span></p>
                {values.attendingWithGuest === 'yes' && <p>Guest Name: <span className="highlight">{values.guestName}</span></p>}
            </div>
        );
    };

    return (
        <div>
            <h1>Event Registration Form</h1>
            {submitted ? (
                displaySummary(values)
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                        />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <div>
                        <label>Are you attending with a guest?</label>
                        <select
                            name="attendingWithGuest"
                            value={values.attendingWithGuest}
                            onChange={handleChange}
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>
                    {values.attendingWithGuest === 'yes' && (
                        <div>
                            <label>Guest Name:</label>
                            <input
                                type="text"
                                name="guestName"
                                value={values.guestName}
                                onChange={handleChange}
                            />
                            {errors.guestName && <p className="error">{errors.guestName}</p>}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default EventRegistrationForm;
