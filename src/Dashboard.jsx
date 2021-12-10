import {Container, Button,Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function Dashboard(){

    const history=useHistory();

    const logout=()=>{
        localStorage.setItem("auth-token","");
        history.push('/login');
    }

    return (
        <Container style={{padding:'10px'}}>
            <h2>Dashboard</h2> 
                <Row>
            <Row style={{padding:'10px'}}>
                <Button variant="danger" style={{width:'10rem',marginRight:'10px'}} onClick={()=>logout()}>Logout</Button>
            </Row>
        </Row>
        </Container>
    )
}