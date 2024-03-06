import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, Grid, Loader } from 'semantic-ui-react'
import { db, storage } from '../firebase'
import { userParms, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
const initialState = {
    name: "",
    email: "",
    company_name: "",
    country: "",
    info: ""

}

const AddEditUser = () => {
    // const initialState data
    const [data, setData] = useState(initialState);

    //create state to set img or update img
    const [file, setFile] = useState(null);

    //check the img is uplod or not on firebase
    const [progress, setProgress] = useState(null);

    //error or not any kind of form feild form validation
    const [errors, setErrors] = useState({});
    //check to form is submit or not
    const [isSubmit, setIsSubmit] = useState(false);

    //Destructure of data
    const { name, email, company_name, country, info } = data;

    const navigate = useNavigate();

    //useEffect is used to run and upload a img to Firebase dependancy depend upon file
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                switch (snapshot.state) {
                    case 'pause':
                        console.log('Upload is Pause');
                        break;
                    case 'running':
                        console.log('Upload is Running');
                        break
                    default:
                        break;
                }
            }, (error) => {
                console.log(error);
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setData((prev) => ({ ...prev, img: downloadURL }));
                        });
                }
            );
        }
        file && uploadFile()
    }, [file])

    const handelChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };
    const validate = () => {
        let errors = {};
        if (!name) {
            errors.name = "Name is Require"
        }
        if (!email) {
            errors.email = "Email is Require"
        }
        if (!company_name) {
            errors.company_name = "Company_Name is Require"
        }
        if (!country) {
            errors.country = "country is Require"
        }
        if (!info) {
            errors.info = "Info is Require"
        }
        return errors;
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length)
            return setErrors(errors)
        setIsSubmit(true);
        await addDoc(collection(db, 'users'), {
            ...data,
            timestamp: serverTimestamp()
        })
        navigate('/');
    }
    return (

        <div>
            <Grid centered varticalAlign='middle' columns='3' style={{ height: '80vh' }}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <div>
                            {isSubmit ? (<Loader active inline='centerd' size='huge' />) :
                                (<>
                                    <h2>Add user</h2>
                                    <Form onSubmit={handelSubmit}>
                                        <Form.Input label='Name'
                                            error={errors.name ? { content: errors.name } : null}
                                            placeholder='Enter Your Name'
                                            name='name' onChange={handelChange}
                                            value={name} autoFocus />

                                        <Form.Input label='Email'
                                            error={errors.email ? { content: errors.email } : null}
                                            placeholder='Enter Your Email'
                                            name='email' onChange={handelChange}
                                            value={email} autoFocus />

                                        <Form.Input label='Company_Name'
                                            error={errors.company_name ? { content: errors.company_name } : null}
                                            placeholder='Enter Your Company Name'
                                            name='company_name' onChange={handelChange}
                                            value={company_name} autoFocus />

                                        <Form.Input label='Country'
                                            error={errors.country ? { content: errors.country } : null}
                                            placeholder='Enter Your Contry Name'
                                            name='country' onChange={handelChange}
                                            value={country} autoFocus />

                                        <Form.TextArea label='Info'
                                            error={errors.info ? { content: errors.info } : null}
                                            placeholder='Enter Your Info'
                                            name='info' onChange={handelChange}
                                            value={info} autoFocus />

                                        <Form.Input label='Upload'
                                            type='file' onChange={(e) => setFile(e.target.files[0])} />
                                        <Button primary type='submit'
                                            disabled={progress !== null && progress < 100}>Submit</Button>
                                    </Form>
                                </>)}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default AddEditUser