import React from 'react';
import './App.css';
import firebase from "./firebase";
import{Button,Row,Container,Col,Form,
  Table} from "react-bootstrap"

function App() {
  const [tasks,setTasks] = React.useState([]);
  const [newTasks,setnewTasks] = React.useState('');
  const [updateTasks,setupdateTasks] = React.useState('');

React.useEffect(() => {
  const fetchData = async () => {
    const db = firebase.firestore();
    db.collection("tasks")
              .onSnapshot(function(data){
                console.log(data)
                setTasks(data.docs.map(doc => ({ ...doc.data(),id:doc.id})));
              });

  
};
fetchData();
},[]);
const onCreate = () => {
  const db =firebase.firestore();
  db.collection("tasks").add({name:newTasks});
};
function onDelete (id) {
  const db=firebase.firestore()
  db.collection('tasks').doc(id).delete()
}
const onUpdate =(id) => {
  const db =firebase.firestore()
  db.collection('tasks').doc(id).set({name:updateTasks})
}
return(
  <div>
    {/* <Navbar bg="dark"variant="dark">
      <Navbar.Brand href="#home">
        <center>Task Manager</center>
      </Navbar.Brand>
    </Navbar>   */}
    <br></br>
    <Container>
      <Row>
        <Col>
        <h3><center>Task Manager</center>
        </h3>
        <Form>
          <Form.Group controlId="formBasicCheckBox">
            <Form.Control type="text" value={newTasks} onChange={e =>setnewTasks(e.target.value)}/>
          </Form.Group>
          <center>
          <Button variant="secondary"onClick={onCreate}>Add Tasks</Button>
          </center>
        </Form>
        </Col>
      </Row>
      <br>
      </br>
      <Row>
        <Col>
        <Table striped bordered hover variant ="dark" >
         
          <tbody>
          <thead >
          <tr>

          <th>ID</th>
          <th>Task Name</th>
          <th>Delete Task</th>
          <th>Update Task</th>
         
          </tr>
          </thead> 
            {tasks.map(spell =>(
              <tr key = {spell.id}>
                <td>{spell.id}</td>
                <td>{spell.name}
                
                </td>
                <td><Button variant="danger" onClick={() => onDelete(spell.id)}>
                  Delete Task</Button></td>
                  <td>
                    <input type = "text" className = " " placeholder={spell.name} onChange=
                    {e =>setupdateTasks(e.target.value)}placeholder={spell.name}></input>
                    <Button className="text-white ml-4"variant="warning"onClick={()=>
                    onUpdate(spell.id)}>Update Task</Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  </div>
);
                    }    
export default App;





































































































































































































































































































































