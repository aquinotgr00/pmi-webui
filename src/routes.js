import Users from 'views/Users'
import Donators from 'views/Donators'
import Volunteers from 'views/Volunteers'
import Campaigns from 'views/Campaigns'
import Donations from 'views/Donations'
import CampaignForm from 'views/CampaignForm'

var routes = [
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/donators',
    name: 'Donators',
    component: Donators
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: Volunteers
  },
  {
    path: '/campaigns/:campaign',
    name: 'Campaigns',
    component: Campaigns
  },
  {
    path: '/donations/:donation',
    name: 'Donations',
    component:Donations
  },
  {
    path: '/campaigns/:campaign/create',
    name: 'Create Campaign',
    component: CampaignForm
  },
  {
    path: '/campaigns/:campaign/:campaignId/edit',
    name: 'Edit Campaign',
    component: CampaignForm
  }

]
export default routes
