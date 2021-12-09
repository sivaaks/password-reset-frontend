import {Container, Button,Form,Row,Col,Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {API_LOGIN} from './Utils';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

export default function Login(){

    const history=useHistory();
    const [userCredentials,setUserCredentials]= useState({email:'',password:''});
    const [loading,setLoading]=useState(false);

    const handleChange=({target:{name,value}})=>setUserCredentials({...userCredentials,[name]:value});

    const login=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await axios.post(API_LOGIN,{
           ...userCredentials,
        }).then(function(res){
            if(res.data) if(res.status===200) {
                localStorage.setItem('auth-token',res.data.authToken);
                toast.success('Login success redirecting...');
                setTimeout(()=>{    
                    setLoading(false);
                    history.push('/dashboard');
                },3000)
            }
        }).catch(function(err){
                setLoading(false);
                toast.error(err.response.data);
                if(err.response.data.message) {
                   toast.error(err.response.data.message)
                }
        })

    }
    
    return(

        <Container fluid="md">
        <Row>
            <ToastContainer/>
            <Col md={{span:6,offset:3}}>
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button onClick={login} variant="primary" type="submit">
                       {loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />:<></>}
                     Submit
                    </Button>
                </Form>
                <br/>
                <h6>Demo credentials:</h6>
                <p>Email: demo@example.com <br/>
                Password: demo123</p>
            </Col>
            
        </Row>
        </Container>

        )
}