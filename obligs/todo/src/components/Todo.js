import Title from './Title';

export default function TodoCard({todo}) {
    //Verdens enkleste komponent: Tar imot en rad fra todos-state-arrayen og skriver ut verdiene lagret i den.
    return(
        <article className="todo">
            <Title title={todo.title} />
            <p>{todo.description}</p>
        </article>
    );
}