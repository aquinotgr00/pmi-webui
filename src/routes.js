import Users from 'views/Users'
import Donators from 'views/Donators'
import Volunteers from 'views/Volunteers'
import Campaigns from 'views/Campaigns'
import Transactions from 'views/Transactions'
import DetailsTransaction from 'views/Transactions/DetailsTransaction'
import UserForm from 'views/Users/UserForm'
import CampaignForm from 'views/Campaigns/CampaignForm'
import CampaignView from 'views/Campaigns/CampaignView'
import Donations from 'views/Donations'
import Dashboard from 'views/Dashboard'
import SettingsAreas from 'views/SettingsAreas'
import AreaForm from 'views/SettingsAreas/AreaForm'

var routes = [
  {
    path: '/settings/:area',
    name: 'Setting Area',
    component: SettingsAreas
  },
  {
    path: '/settings/:area/create',
    name: 'Create Area',
    component: AreaForm
  },
  {
    path: '/settings/:area/:areaId/edit',
    name: 'Edit Area',
    component: AreaForm
  },
  {
    path: '/users/:user',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:user/create',
    name: 'Create User',
    component: UserForm
  },
  {
    path: '/users/:user/:userId/edit',
    name: 'Edit User',
    component: UserForm
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
    component: Donations
  },
  {
    path: '/campaigns/:campaignType/create',
    name: 'Create Campaign',
    component: CampaignForm
  },
  {
    path: '/campaigns/:campaignType/:campaignId/edit',
    name: 'Edit Campaign',
    component: CampaignForm
  },
  {
    path: '/transactions/:transaction',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/transactions/:transaction/:transactionId',
    name: 'Details Transactions',
    component: DetailsTransaction
  },
  {
    path: '/campaigns/:campaign/:campaignId',
    name: 'View Campaign',
    component: CampaignView
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  }

]
export default routes
