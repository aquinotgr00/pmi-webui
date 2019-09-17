import React, { Component } from 'react'
import { CheckboxPrivileges } from 'components'
import { Collapse } from 'reactstrap'

export class CollapsablePrivilagesItem extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = { collapse: false }
	}

	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	render() {
		const { name, list } = this.props
		const { collapse } = this.state
		return (
			<li>
				<button type="button" aria-expanded={collapse} className="btn-privilege side" onClick={this.toggle} >{name}</button>
				<hr />
				<Collapse isOpen={collapse} className="collapse list-privilage">
					<ul className="flex-column privilage-item ">
						{list.map((item, index) => {
							return (
								<CheckboxPrivileges
									value={item.id}
									index={index}
									key={index}
									label={item.name}
								/>
							)
						}
						)}
					</ul>
				</Collapse>
			</li>
		)
	}
}