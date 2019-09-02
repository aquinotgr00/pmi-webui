import React, { Component } from "react"
import ucwords from "utils/string"
import { Main } from "components"
import { MemberForm } from "./MemberForm"
import { SubMemberForm } from "./SubMemberForm"
import {
  storeMembershipApi,
  detailsMembershipApi,
  updateMembershipApi,
  listMembershipApi
} from "services/api"

export default class MembershipForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      member: {
        name: "",
        parent_id: ""
      },
      parents: []
    }
    this.loadMember = this.loadMember.bind(this)
    this.loadParentMembers = this.loadParentMembers.bind(this)
    this.handleSaveMember = this.handleSaveMember.bind(this)
  }

  componentDidMount() {
    const { memberId } = this.props.match.params
    if (memberId) {
      this.loadMember(memberId)
    }
    this.loadParentMembers(0)
  }

  async loadParentMembers(parentId) {
    try {
      const memberParams = new URLSearchParams()
      memberParams.append('l', parentId)
      const response = await listMembershipApi(memberParams)
      const { status } = response.data
      if (status === "success") {
        const { data: parents } = response.data
        this.setState({ parents })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }

    } catch (error) {
      // TODO : handle error
    }
  }

  async loadMember(memberId) {
    try {
      const response = await detailsMembershipApi(memberId)
      const { status } = response.data

      if (status === "success") {
        const { data: member } = response.data
        this.setState({ member })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  async handleSaveMember(member) {
    try {
      const { memberId } = this.props.match.params
      const response = memberId
        ? await updateMembershipApi(memberId, member)
        : await storeMembershipApi(member)

      const { status } = response.data
      if (status === "success") {
        this.setState({ isLoading: false, error: null })

        const { history } = this.props

        history.push(`/admin/settings/membership`)
      } else {
        // TODO : handle errors
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle errors
      this.setState({ isLoading: false, error: null })
    }
  }

  render() {
    const { memberId } = this.props.match.params
    const heading = memberId ? `Edit Jenis Anggota` : `Tambah Jenis Anggota`
    const { parents } = this.state
    return (
      <Main title={heading}>
        <SubMemberForm
          handleSaveMember={this.handleSaveMember}
          member={this.state.member}
          parents={parents} />
      </Main>
    )
  }
}
