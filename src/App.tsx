import React from 'react';
import {useQuery, useMutation} from "@apollo/react-hooks"
import {gql} from "@apollo/client"
import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"
import Footer from "./components/Footer"

export const ALL_TODOS = gql`
  query {
    allTodos {
      id
      text
      completed
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`

const SET_FILTER = gql`
  mutation setFilter($filter: FILTER!) {
    setFilter(filter: $filter)
  }
`

const App: React.FC = () => {

  const {loading, error, data} = useQuery(ALL_TODOS)

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{query: ALL_TODOS}]
  })

  const [toggleCompleted] = useMutation(SET_FILTER, {
    refetchQueries: [{query: ALL_TODOS}]
  })

  if (error) return <p>{error.message}</p>

  return (
    <div className="App">
      <AddTodo addTodo={addTodo} />
      <TodoList {...{loading, data}} />
      <Footer toggleCompleted={toggleCompleted} />
    </div>
  );
}

export default App;
