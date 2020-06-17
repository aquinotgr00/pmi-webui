import React from 'react'
import { Row, Col, Collapse, Card, CardHeader, CardBody } from 'reactstrap'
import { MembershipCardItem } from './MembershipCardItem'

export function MembershipCard(props) {
    const { membership, collapse, shown, subMembership, membershipName } = props

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
                        <Card className="px-3 mb-3">
                            <CardHeader className="header-top pl-0">
                                {membershipName}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {Object.values(subMembership).map((submember, key) => {
                                        let title = submember.title.toLowerCase()
                                        let images = ['mula', 'madya', 'wira']
                                        let thumbnail = 'people'
                                        let find = images.indexOf(title)
                                        if (find >= 0) {
                                            thumbnail = title
                                        }
                                        return (
                                            <Col key={key} md="4" className="grs-right">
                                                <Row>
                                                    <Col md="3">
                                                        <img src={require(`assets/images/${thumbnail}.svg`)} className="img-collapse" alt="" />
                                                    </Col>
                                                    <Col md="9" className="pl-0">
                                                        <label className="mb-0">{submember.title}</label>
                                                        <p>{submember.all}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                    {(subMembership.length === 0) &&
                                        <>
                                            <Col md="4" className="grs-right">
                                                <Row>
                                                    <Col md="3">
                                                        <img src={require(`assets/images/male.svg`)} className="img-collapse" alt="" />
                                                    </Col>
                                                    <Col md="9" className="pl-0">
                                                        <label className="mb-0">Laki-laki</label>
                                                        <p>{(props.m)? props.m : 0}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md="4" className="grs-right">
                                                <Row>
                                                    <Col md="3">
                                                        <img src={require(`assets/images/female.svg`)} className="img-collapse" alt="" />
                                                    </Col>
                                                    <Col md="9" className="pl-0">
                                                        <label className="mb-0">Perempuan</label>
                                                        <p>{(props.f)? props.f : 0}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </>
                                    }
                                </Row>
                            </CardBody>
                        </Card>
                    </Collapse>
                </Col>
            </Row>
        </>
    )
}