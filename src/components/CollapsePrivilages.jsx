import React from 'react'
import CollapsePrivilagesItem from './CollapsePrivilagesItem'

export function CollapsePrivilages(props) {
	return (
		<ul className="flex-column privilage-item">
			{this.props.privilages.map((values, index) => <CollapsePrivilagesItem key={index} name={values.name} list={values.list} />)}
		</ul>
	)
}