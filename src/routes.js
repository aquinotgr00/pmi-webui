import Users from 'views/Users'
import Donators from 'views/Donators'
import Volunteers from 'views/Volunteers'
import Campaigns from 'views/Campaigns'
import CampaignForm from 'views/CampaignForm'
import Transactions from 'views/Transactions'
import DetailsTransaction from 'views/DetailsTransaction'

var routes = [
  {
    path: '/users/:user',
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
    path: '/campaigns/:campaign/create',
    name: 'Create Campaign',
    component: CampaignForm
  },
  {
    path: '/campaigns/:campaign/:campaignId/edit',
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
  }
]
export default routes
