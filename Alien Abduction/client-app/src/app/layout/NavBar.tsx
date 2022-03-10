import react from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import questionStore from '../stores/questionStore';
import { useStore } from '../stores/store';

export default function NavBar() {
    const {quizStore} = useStore();
    const {questionStore} = useStore();
    return (
        <Menu fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/kahoot.png" style={{width:'100px'}} alt="logo"/>
                </Menu.Item>

                <Menu.Item>
                <Button color='violet' content='Quiz'/>
                </Menu.Item>
                
                <Menu.Item position='right'>
                    <Button onClick={() => quizStore.openForm()} positive content='Create Quiz' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

