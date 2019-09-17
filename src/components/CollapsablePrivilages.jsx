import React from 'react'
import { CollapsablePrivilagesItem } from 'components'

export function CollapsablePrivilages(props) {
	const { options } = props
	
	return (
		<ul className="flex-column privilage-item">
			{options.map((opsi, index) => {
				return(
					<CollapsablePrivilagesItem 
					key={index} 
					name={opsi.name} 
					list={opsi.privileges}					
					/>
				)
			}
			)}
		</ul>
	)
}