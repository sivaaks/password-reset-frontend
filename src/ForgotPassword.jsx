import {Container, Button,Form,Row,Col,Spinner } from 'react-bootstrap';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { API_FORGOT_PASSWORD } from './Utils';
import { ToastContainer,toast } from 'react-toastify';

export default function ForgotPassword(){

    const history=useHistory();
    const [email,setEmail]= useState('');
    const [loading,setLoading]=useState(false);

    const handleChange=({target:{name,value}})=>setEmail(value);

    const forgotPassword=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await axios.post(API_FORGOT_PASSWORD,{
           email,
        }).then(function(res){
            if(res.data) if(res.status===200) {
                setLoading(false);
                history.push('/email');
            }
        }).catch(function(err){
                setLoading(false);
                console.log(err.response);
                toast.error(err.response.data);
                if(err.response.data.message) {
                   toast.error(err.response.data.message);
                }
        })

    }
    
    return(

        <Container fluid="md">
        <ToastContainer/>
        <Row>
            <Col md={{span:6,offset:3}}>
                <h1>Forgot password</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Button onClick={forgotPassword} variant="primary" type="submit">
                        {loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />:<></>}
                        Forgot password
                    </Button>
                </Form>
            </Col>
        </Row>
        </Container>

        )
}