import {Container, Button,Form,Row,Col,Spinner } from 'react-bootstrap';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { API_REGISTER } from './Utils';
import { ToastContainer,toast } from 'react-toastify';

export default function Register(){

    const history=useHistory();
    const userFields={email:'',fname:'',lname:'',password:''};
    const [userDetails,setUserDetails]= useState(userFields);
    const [loading,setLoading]=useState(false);

    const handleChange=({target:{name,value}})=>setUserDetails({...userDetails,[name]:value})
    
    const registerUser=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await axios.post(API_REGISTER,
            {...userDetails}).then(function(res){
            if(res.data) if(res.status===200) {
                setLoading(false); 
                setUserDetails(userFields)
                history.push('/email');
            } }).catch(function(err){
                setLoading(false);
                console.log(err.response);
                toast.error(err.response.data);
                if(err.response.data.message) {
                   toast.error(err.response.data.message);
                }

            });
        }
    
    return(

        <Container fluid="md">
        <ToastContainer/>
        <Row>
            <Col md={{span:6,offset:3}}>
                <h1>Register</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="text">
                        <Form.Label>First name</Form.Label>
                        <Form.Control onChange={handleChange} name="fname" type="text" placeholder="Enter first name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="text">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control onChange={handleChange} name="lname" type="text" placeholder="Enter last name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button onClick={registerUser} variant="primary" type="submit">
                        {loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />:<></>}
                        Register
                    </Button>

                </Form>
            </Col>
        </Row>
        </Container>

        )
}