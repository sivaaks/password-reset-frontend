import {Container, Button,Form,Row,Col,Spinner } from 'react-bootstrap';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { API_RESET_PASSWORD } from './Utils';
import { ToastContainer,toast } from 'react-toastify';


export default function ResetPassword(props){

    const token=props.match.params.token;
    const history=useHistory();
    const [password,setPassword]= useState('');
    const [loading,setLoading]=useState(false);

    const handleChange=({target:{name,value}})=>setPassword(value);

    const resetPassword=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await axios.post(`${API_RESET_PASSWORD}/${token}`,{
           password,
        }).then(function(res){
            if(res.data) if(res.status===200) {
                setLoading(false);
                history.push('/login');
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
                <h1>Update password</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm password" />
                    </Form.Group>
                    
                    <Button onClick={resetPassword} variant="primary" type="submit">
                        {loading?<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />:<></>}
                        Update password
                    </Button>
                </Form>
            </Col>
        </Row>
        </Container>

        )
}