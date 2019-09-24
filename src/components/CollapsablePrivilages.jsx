import React from 'react'
import CollapsablePrivilagesItem  from './CollapsablePrivilagesItem'

export function CollapsablePrivilages(props) {
	const { checkboxes, values } = props
	const data = (checkboxes.length > 0) ? checkboxes : []
	
	return (
		<ul className="flex-column privilage-item">
			{data.map((opsi, index) => {
				return (
					<CollapsablePrivilagesItem
						key={index}
						name={opsi[0].privilege_category}
						list={opsi}
						values={values}
					/>
				)
			}
			)}
		</ul>
	)
}