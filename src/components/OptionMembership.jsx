import React from 'react'

export function OptionMembership(props) {
    const { membership, mode } = props
    let data = membership
    if(mode === '1'){
        data = membership.filter(function (member) {
            return member.parent_id === null
        })
    }

    if(mode === '2'){
        data = membership.filter(function (member) {
            return (member.parent_id)
        })
    }

    return (
        <>
            {data.map((member, key) => {
                const { parent_member } = member
                return (
                    <option key={key} value={member.id}>
                        {(parent_member) && parent_member.name+" >> " }
                        {member.name}
                    </option>
                )
            })
            }
        </>
    )
}