import { useEffect, useState } from 'react';
import {Container, Button,Form,Row,Modal,Table,Card,Spinner } from 'react-bootstrap';
import { ToastContainer,toast } from 'react-toastify';
import {API_URL,SITE_ADDRESS} from './Utils';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Dashboard(){

    const history=useHistory();
    const authToken=localStorage.getItem('auth-token');
    const [urls,setUrls]=useState([]);
    const [newUrl,setNewUrl]= useState(false);
    const [addUrl,setAddUrl]=useState('');
    const [loading,setLoading]=useState(false);

    const handleShow=()=>setNewUrl(true)
    const handleClose=()=>setNewUrl(false);

    const handleInput=({target:{value}})=>{
      setAddUrl(value);
    }

    const addURL=async(e)=>{
        e.preventDefault();
        setLoading(true);
        await axios.post(API_URL,
            {original:addUrl},{headers:{auth:authToken}}).then(function(res){
            if(res.data) if(res.status===200) {
                setLoading(false); 
                handleClose();
                toast.success('New URL shortend successfully');
                getURLS();
            } }).catch(function(err){
            setLoading(false);
            });
        }

        const getURLS=async()=>{
            setLoading(true);
            await axios.get(API_URL,
                {headers:{auth:authToken}}).then(function(res){
                if(res.data) if(res.status===200) {
                    setLoading(false);
                    setUrls(res.data);
                    handleClose();
                } }).catch(function(err){
                setLoading(false);
                });
        }

        const deleteURL=async(id)=>{
            await axios.delete(`${API_URL}/${id}`,
                {headers:{auth:authToken}}).then(function(res){
                if(res.data) if(res.status===200) {
                    setLoading(false);
                    getURLS();
                    toast.success('Selected url deleted succesfully');
                } }).catch(function(err){
                setLoading(false);
                });
        }

        const logout=()=>{
            localStorage.setItem("auth-token","");
            history.push('/login');
        }

        useEffect(()=>{
           
            async function getURLSFirst() {
            await axios.get(API_URL,
                {headers:{auth:authToken}}).then(function(res){
                if(res.data) if(res.status===200) {
                    setLoading(false);
                    setUrls(res.data);
                    handleClose();
                } }).catch(function(err){
                setLoading(false);
                });
            }

            getURLSFirst();

        },[authToken])

    return (
        <Container style={{padding:'10px'}}>
            <ToastContainer/>
            <h2>Dashboard</h2> 
            <Row style={{padding:'10px'}}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Total URL's shortned</Card.Title>
                        <Card.Title>{urls.length}</Card.Title>
                    </Card.Body>
                </Card>
                </Row >
                <Container>
              
                </Container>
                <Row>
                    <Modal show={newUrl} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <h3>Add url</h3>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                        <Form.Group>
                        <Form.Label>Input url</Form.Label>
                        <Form.Control value={addUrl} name="addUrl" onChange={handleInput}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                        <Row style={{padding:'10px'}}>
                        <Button onClick={addURL} type="submit">
                            {loading?<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />:<></>}
                            Shorten url</Button>
                        </Row>
                        </Form.Group>
                        </Form>
            </Modal.Body>
        </Modal>
        <h4>URL's shortned or generated</h4>
        <Row style={{padding:'10px'}}>
        <Button style={{width:'10rem',marginRight:'10px'}} onClick={handleShow}>Add new</Button>
        <Button style={{width:'10rem',marginRight:'10px'}} onClick={()=>getURLS()}>
            {loading?<Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />:<></>}
            Refresh</Button>
         <Button variant="danger" style={{width:'10rem',marginRight:'10px'}} onClick={()=>logout()}>Logout</Button>
        </Row>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Original url</th>
                    <th>Shortned url</th>
                    <th>Hits</th>
                    <th colSpan="2">Delete</th>
                </tr>
            </thead>
            <tbody>
                {urls.map((url,index)=>{
                    return(
                        <tr key={index}>
                            <th>{url.original}</th>
                            <th><a href={`${SITE_ADDRESS}/${url.shortend}`} rel="noreferrer" target="_blank">{`reus.ml/${url.shortend}`}</a></th>
                            <th>{url.hits}</th>
                            <th><Button onClick={()=>deleteURL(url._id)} variant="danger">Delete</Button></th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
            </Row>
        </Container>
    )
}