import React from "react"
import {FILTER} from "../global"

interface IProps {
	toggleCompleted: (args: any) => any;
}

const Footer: React.FC<IProps> = ({toggleCompleted}): JSX.Element => {
	return (
		<>
			<span>Show:</span>
			<button onClick={() => toggleCompleted({variables: {filter: FILTER.SHOW_ALL}})}>
				ALL
			</button>
			<button onClick={() => toggleCompleted({variables: {filter: FILTER.SHOW_COMPLETED}})}>
				Completed
			</button>
			<button onClick={() => toggleCompleted({variables: {filter: FILTER.SHOW_ACTIVE}})}>
				Active
			</button>
		</>
	)
}

export default Footer