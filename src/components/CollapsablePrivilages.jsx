import React from 'react'
import { CollapsablePrivilagesItem } from 'components'

export function CollapsablePrivilages(props) {
	const { options, handleCheckbox } = props
	const data = (options.length > 0) ? options : []
	
	return (
		<ul className="flex-column privilage-item">
			{data.map((opsi, index) => {
				return (
					<CollapsablePrivilagesItem
						key={index}
						name={opsi[0].privilege_category}
						list={opsi}
						handleCheckbox={handleCheckbox}
					/>
				)
			}
			)}
		</ul>
	)
}