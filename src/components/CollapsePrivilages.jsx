import React from 'react'
import { CollapsePrivilagesItem } from 'components'

export function CollapsePrivilages(props) {
	const { setFieldValue, options  } = props

	return (
		<ul className="flex-column privilage-item">
			{options.map((opsi, index) => {
				return(
					<CollapsePrivilagesItem 
					key={index} 
					name={opsi.name} 
					list={opsi.privileges}
					setFieldValue={setFieldValue}
					/>
				)
			}
			)}
		</ul>
	)
}