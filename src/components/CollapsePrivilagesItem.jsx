import React,{ Component } from 'react'
import { CheckboxPrivilages } from 'components'
import { Collapse } from 'reactstrap'

export class CollapsePrivilagesItem extends Component{
	constructor (props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = { collapse: false }
	}

	toggle(){
		this.setState(state => ({ collapse: !state.collapse }));
	}

	render(){
		return (
			<li>
			<a href="#" aria-expanded="true" className="side" className="side" onClick={this.toggle} >{this.props.name}</a>
			<hr />
			<Collapse isOpen={this.state.collapse} className="collapse list-privilage">
			<ul className="flex-column privilage-item">
			{this.props.list.map(values => <CheckboxPrivilages value={values.id} key={values.id} label={values.text} />)}
			</ul>
			</Collapse>
			</li>
			)
	}
}