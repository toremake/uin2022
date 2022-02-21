import './App.css';
import {useState} from 'react'
import Form from './components/Form';
import TodoCard from './components/Todo';

function App() {

    //TMA: Setter todo-lista som en state, med et test-eksemplar i
    const [todos, setTodos] = useState([{title: "My first Todo", description: "My first todo description"}])
    //TMA: Løfter formData til App for å ha feltdata tilgjengelige for å sette inn i Todo
    const [formData, setFormData] = useState({title: '', description: '', complete: false})

    //TMA: Flytter funksjon fra Form (sammen med løfting av formData-state)
    const handleChange = (event) => {
        const  {name} = event.currentTarget
        const {value} = event.currentTarget
        setFormData((prevState) => ({...prevState, [name]: value}))
    }
    //TMA: Funksjon som oppdaterer todos og tømmer skjema-feltene (og formData-state) for ny input
    const onSubmit = (event) => {
        event.preventDefault();
        setTodos(prevTodos => [...prevTodos, {title: formData['title'], description: formData['description'], complete: false}])
        setFormData({title: '', description: ''});
    }
    //TMA: Funksjon for å sette status på en todo til complete = true
    const setComplete = index => {
        const updatedTodos = [...todos];
        updatedTodos[index].complete = true;
        setTodos(updatedTodos);

    }

    return ( 
        <div className="App">
            {/*TMA: Header og nav kunne vært egne komponenter, men siden de ikke inneholder stort har jeg ikke refaktorert disse, og konsentrert meg om å løse state-løfting og -oppdatering*/}
            <header>
                <h1>TMA Todo</h1>
                <nav>
                    <a href="#">TMA</a>
                </nav>
            </header>
            <section className="addForm">
                {/*TMA: Kaller Form-komponent, sender med funksjoner for input-oppdatering, innsending av skjema og formData-state som props*/}
                <Form onSubmit={onSubmit} handleChange={handleChange} formData={formData} />
            </section>
            <section className="todos">
                {/* TMA: går gjennom todos-state-array med .map, henter TodoCard-komponent for visning av hver todo. Sender key (mandatory) og todo-info som props*/}
                {/* TMA: Lagt til index og setComplete som props for å kunne endre status (utført) per todo */ }
                {todos.map((todo, index) => <TodoCard key={index} index={index} setComplete={setComplete} todo={todo} />)}
            </section>
        </div>
    );
}

export default App;