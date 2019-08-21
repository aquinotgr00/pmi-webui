import React from 'react'
import { Row, Col, Collapse, Card, CardBody } from 'reactstrap'
import { MembershipCardItem } from './MembershipCardItem'

export function MembershipCard(props) {
    const { membership, collapse, shown } = props
    const { sub_member } = membership || {}

    return (
        <>
            <Row>
                {membership.map((member, key) => {
                    return (
                        <Col key={key} className="col-md-3 mb-3">
                            <MembershipCardItem
                                title={member.name}
                                collapseTo={member.id}
                                amount={member.amount}
                                collapse={collapse}
                                toggle={props.toggle}
                                index={key}
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
saa
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
            </Row>
        </>
    )
}