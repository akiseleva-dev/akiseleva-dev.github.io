import {ChangeEvent, useState} from 'react'
import emailjs from '@emailjs/browser'
import {ContactData} from "../data/data";
import 'font-awesome/css/font-awesome.min.css';

const initialState = {
    name: '',
    email: '',
    message: '',
}
export const Contact = (data: ContactData) => {
    const [{ name, email, message }, setState] = useState(initialState)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }
    const clearState = () => setState({ ...initialState })

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(name, email, message)
        emailjs
            .sendForm(
                'service_ng6gx4i', 'template_5yfp45b', e.target, '3HW5brYBfJ4yBqdhd'
            )
            .then(
                (result) => {
                    console.log(result.text)
                    clearState()
                },
                (error) => {
                    console.log(error.text)
                }
            )
    }
    return (
        <div>
            <div id='contact'>
                <div className='container'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='section-title'>
                                <h1>Get In Touch</h1>
                                <p>
                                    Please fill out the form below to send me an email and I will
                                    get back to you as soon as possible.
                                </p>
                            </div>
                            <form name='sentMessage' onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                id='name'
                                                name='name'
                                                className='form-control'
                                                placeholder='Name'
                                                required
                                                onChange={handleChange}
                                            />
                                            <p className='help-block text-danger'></p>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <input
                                                type='email'
                                                id='email'
                                                name='email'
                                                className='form-control'
                                                placeholder='Email'
                                                required
                                                onChange={handleChange}
                                            />
                                            <p className='help-block text-danger'></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                  <textarea name='message' id='message' className='form-control'
                      placeholder='Message' required onChange={handleChange} />
                                    <p className='help-block text-danger'></p>
                                </div>
                                <div id='success'></div>
                                <button type='submit' className='btn btn-custom btn-lg'>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-3 col-md-offset-1 contact-info'>
                        <div className='contact-item'>
                            <h3>Contact Info</h3>
                            <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                                {data ? data.address : 'loading'}
                            </p>
                        </div>
                        <div className='contact-item'>
                            <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                                {data ? data.phone : 'loading'}
                            </p>
                        </div>
                        <div className='contact-item'>
                            <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                                {data ? data.email : 'loading'}
                            </p>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='social'>
                                <ul>
                                    <li>
                                        <a href={data ? data.linkedin : '/'}>
                                            <i className='fa fa-linkedin'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={data ? data.github : '/'}>
                                            <i className='fa fa-github'></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={data ? data.instagram : '/'}>
                                            <i className='fa fa-instagram'></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer'>
                <div className='container text-center'>
                    <p>
                        &copy; 2022
                    </p>
                </div>
            </div>
        </div>
    )
}
