import React from 'react'
import { CollapsePrivilagesItem } from 'components'

export function CollapsePrivilages(props) {
	return (
		<ul className="flex-column privilage-item">
			{props.privileges.map((privilage, index) => {
				return(
					<CollapsePrivilagesItem 
					key={index} 
					name={privilage.name} 
					list={privilage.privileges}
					checkListItem={props.checkListItem}
					/>
				)
			}
			)}
		</ul>
	)
}