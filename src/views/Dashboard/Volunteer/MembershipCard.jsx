import React from 'react'
import { Row, Col, Collapse, Card, CardBody } from 'reactstrap'
import { MembershipCardItem } from './MembershipCardItem'

export function MembershipCard(props) {
    const { membership, collapse, shown, panelNumber, subMembership } = props

    return (
        <>
            <Row>
                {Object.values(membership).map((member, key) => {
                    return (
                        <Col key={key} className="col-md-3 mb-3">
                            <MembershipCardItem
                                title={member.title}
                                amount={member.amount}
                                collapse={collapse}
                                toggle={props.toggle}
                                index={member.id}
                                shown={shown}
                            />
                        </Col>
                    )
                })}
            </Row>
            <Row >
                <Col>
                    <Collapse isOpen={collapse} >
                        <Card>
                            <CardBody>
                                <Row>
                                    {Object.values(subMembership).map((submember, key) => {
                                        return (
                                            <Col key={key} md="4" className="grs-right">
                                                <Row>
                                                    <Col md="3">
                                                        <img src={require('assets/images/mula.svg')} className="img-collapse" />
                                                    </Col>
                                                    <Col md="9" className="pl-0">
                                                        <label className="mb-0">{submember.title}</label>
                                                        <p>{submember.amount}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
            </Row>
        </>
    )
}