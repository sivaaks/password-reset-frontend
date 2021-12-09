import {Container,Row,Button} from 'react-bootstrap';
import { useHistory } from 'react-router';


export default function Home(){

    const history=useHistory();

    return (
        <Container>
            <Row>
            <h1>Home</h1>
            
            </Row>
            <Button onClick={()=>history.push('/login')}>Login to continue</Button>
            <br/>
            <Button onClick={()=>history.push('/register')}>Resgister here</Button>
        </Container>
    )   
}