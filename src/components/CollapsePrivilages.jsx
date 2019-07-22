import React from 'react'
import { CollapsePrivilagesItem } from 'components'

export function CollapsePrivilages(props) {
	return (
		<ul className="flex-column privilage-item">
			{props.privilages.map((privilage, index) => <CollapsePrivilagesItem key={index} name={privilage.name} list={privilage.list} isOpen={privilage.isOpen} />)}
		</ul>
	)
}