import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'

export function MembershipCardItem(props) {
    const { title, amount, collapse, index, shown } = props
    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col md="7">
                            <label>{title}</label>
                            <h1 className="my-1">{amount}</h1>
                            <a
                                href={`#`+collapse}
                                type="button"
                                className="btn-top-card"
                                data-toggle="collapse"
                                role="button"
                                aria-expanded={shown[index] ? true : false}
                                aria-controls="multiCollapseExample1"
                                onClick={() => props.toggle(index)}
                                >
                                Lihat Selengkapnya
                                <i className="fa-arrow"></i>
                            </a>
                        </Col>
                        <Col>
                            <img src={require('assets/images/people.svg')} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}