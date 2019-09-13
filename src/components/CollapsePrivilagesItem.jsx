import React, { Component } from 'react'
import { CheckboxPrivilages } from 'components'
import { Collapse, Button } from 'reactstrap'

export class CollapsePrivilagesItem extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = { collapse: false }
	}

	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	render() {
		const { name, list, checkListItem } = this.props
		const { collapse } = this.state
		return (
			<li>
				<button type="button" aria-expanded={collapse} className="btn-none side" onClick={this.toggle} >{name}</button>
				<hr />
				<Collapse isOpen={collapse} className="collapse list-privilage">
					<ul className="flex-column privilage-item">
						{list.map((item, index) => {
							return (
								<CheckboxPrivilages
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