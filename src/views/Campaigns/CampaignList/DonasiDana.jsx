import React from 'react'
import ActionButtons from './ActionButtons'
import { Table } from 'reactstrap'
import { ViewActionButton } from './ActionButtons/ViewActionButton'
import { formatCurrency } from 'utils/number'

export function DonasiDana (props) {
  const { data, path } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Judul</th>
          <th>Tipe Donasi</th>
          <th>Rentang Waktu Donasi</th>
          <th>Donasi Terkumpul</th>
          <th>Target Donasi</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((campaign, key) => (
          <tr key={key}>
            <th><img src={campaign.image_url} alt='' /></th>
            <td><ViewActionButton path={`${path}/${campaign.id}`} title={campaign.formatted_title} /></td>
            <td>{campaign.get_type.name}</td>
            <td>{campaign.ranges_donation}</td>
            <td>{ formatCurrency(campaign.amount_real) }</td>
            <td>{ formatCurrency(campaign.amount_goal) }</td>
            <td>{campaign.publish ? 'Terpublikasi' : 'Draft'}</td>
            <td>
              <ActionButtons
                campaignId={campaign.id}
                toggleAttribute={props.toggle}
                editPath={`${path}/${campaign.id}/edit`}
                isClosed={campaign.closed}
                isHidden={campaign.hidden}
                duration={props.duration}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
