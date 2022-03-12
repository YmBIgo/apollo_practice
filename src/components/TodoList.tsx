import React from "react";
import {useApolloClient} from "@apollo/react-hooks"
import {gql} from "@apollo/client"
import {ITodo} from "../global"

import {ALL_TODOS} from "../App"

const TOGGLE_COMPLETED = gql`
	mutation toggleCompleted($id: ID!) {
		toggleCompleted(id: $id) {
			id
			text
			completed
		}
	}
`

interface IProps {
	loading: boolean;
	data: any;
}

const TodoList: React.FC<IProps> = ({loading, data}): JSX.Element => {
	const client = useApolloClient()

	if (loading) {
		return <div>loading</div>
	}

	const toggleCompleted = (id: string) => {
		client.mutate({
			mutation: TOGGLE_COMPLETED,
			variables: {id},
			refetchQueries: [{query: ALL_TODOS}],
		})
	}

	return (
		<ul>
			{data && data.allTodos.map((t: ITodo) => {
				return(
					<li
						key={t.id}
						style={{textDecoration: t.completed ? 'line-through' : 'none'}}
						onClick={() => toggleCompleted(t.id)}
					>
						{t.text}
					</li>
				)
			})}
		</ul>
	)
}

export default TodoList;