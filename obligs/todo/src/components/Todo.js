import Title from './Title';

export default function TodoCard({todo, index, setComplete}) {
    //Verdens enkleste komponent: Tar imot en rad fra todos-state-arrayen og skriver ut verdiene lagret i den.
    return(
        <article className={`todo ${todo.complete ? "completed" : ""}`}>
            <Title title={todo.title} />
            <p>{todo.description}</p>
            <p><button onClick={() => setComplete(index)} disabled={todo.complete ? true : false} >{todo.complete ? "Utført!" : "Sett som utført"}</button></p>
        </article>
    );
}