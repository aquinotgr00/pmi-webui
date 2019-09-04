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
import Rsvp from 'views/RSVP'
import RsvpForm from 'views/RSVP/RsvpForm'
import RsvpDetail from 'views/RSVP/RsvpDetail'
import DashboardVolunteer from 'views/Dashboard/Volunteer'
import SettingsArea from 'views/Settings/Area'
import AreaForm from 'views/Settings/Area/AreaForm'
import MembershipList from 'views/Settings/Membership/MembershipList'
import MembershipForm from 'views/Settings/Membership/MembershipForm'
import UnitList from 'views/Settings/Unit/UnitList'
import UnitForm from 'views/Settings/Unit/UnitForm'
import Profile from 'views/Settings/Profile'

var routes = [
  {
    path: '/settings/profile',
    name: 'Settings Profile',
    component: Profile
  },{
    path: '/dashboard/volunteer',
    name: 'Dashboard Relawan',
    component: DashboardVolunteer
  },{
    path: '/settings/units',
    name: 'Unit',
    component: UnitList
  },
  {
    path: '/settings/units/create',
    name: 'Create Unit',
    component: UnitForm
  },
  {
    path: '/settings/units/:unitId/edit',
    name: 'Edit Unit',
    component: UnitForm
  },
  {
    path: '/settings/membership',
    name: 'Membership',
    component: MembershipList
  },
  {
    path: '/settings/membership/create',
    name: 'Create Membership',
    component: MembershipForm
  },
  {
    path: '/settings/membership/:memberId/edit',
    name: 'Edit Membership',
    component: MembershipForm
  },
  {
    path: '/settings/regions/:area',
    name: 'Setting Area',
    component: SettingsArea
  },
  {
    path: '/settings/regions/:area/create',
    name: 'Create Area',
    component: AreaForm
  },
  {
    path: '/settings/regions/:area/:areaId/edit',
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
    path: '/campaigns/:campaign/:campaignId',
    name: 'View Campaign',
    component: CampaignView
  },
  {
    path: '/donations/:donation',
    name: 'Donations',
    component: Donations
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
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/rsvp/:category(list-rsvp|moderasi|arsip)',
    name: 'RSVP',
    component: Rsvp
  },
  {
    path: '/rsvp/:editMode(create|edit|approval)?/:rsvpId?',
    name: 'Form RSVP',
    component: RsvpForm
  },
  {
    path: '/rsvp/:viewMode(detail|archive)/:rsvpId',
    name: 'Detail RSVP',
    component: RsvpDetail
  }
]
export default routes
