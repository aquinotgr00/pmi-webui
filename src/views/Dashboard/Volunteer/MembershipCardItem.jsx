import React from 'react'
import { Row, Col, Card, CardBody, Button } from 'reactstrap'

export function MembershipCardItem(props) {
    const { title, amount, index, shown } = props
    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col md="7">
                            <label>{title}</label>
                            <h1 className="my-1">{amount}</h1>
                            <Button
                                type="button"
                                className="btn-top-card"
                                color="link"
                                data-toggle="collapse"
                                aria-expanded={shown[index] ? true : false}
                                aria-controls="multiCollapseExample1"
                                onClick={() => props.toggle(index)}
                                >
                                Lihat Selengkapnya
                                <i className="fa-arrow"></i>
                            </Button>
                        </Col>
                        <Col>
                            <img src={require('assets/images/people.svg')} alt="people icon"/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}