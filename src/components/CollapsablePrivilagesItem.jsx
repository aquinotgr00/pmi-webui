import React, { Component } from 'react'
import { CheckboxPrivileges } from 'components'
import { Collapse } from 'reactstrap'
import { FieldArray, connect } from 'formik'

class CollapsablePrivilagesItem extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = { collapse: false }
	}

	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	render() {
		const { name, list, values } = this.props
		const { collapse } = this.state
		return (
			<li>
				<button type="button" aria-expanded={collapse} className="btn-privilege side" onClick={this.toggle} >{name}</button>
				<hr />
				<Collapse isOpen={collapse} className="collapse list-privilage">
					<ul className="flex-column privilage-item ">
						<FieldArray
							name="privileges"
							render={arrayHelpers => (
								<>
									{list.map((item, index) => (
										<CheckboxPrivileges
											key={index}
											item={item}
											arrayHelpers={arrayHelpers}
											values={values} />
									))}
								</>
							)}
						/>
					</ul>
				</Collapse>
			</li>
		)
	}
}

export default connect(CollapsablePrivilagesItem)