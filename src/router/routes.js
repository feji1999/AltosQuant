import MainLayout from 'layouts/MainLayout.vue'
import Dashboard from 'pages/Dashboard.vue'
import TeamChat from 'pages/TeamChat.vue'
import Calculator from 'pages/Calculator.vue'
import Indicator from 'pages/Indicator.vue'
import TradesBoard from 'pages/TradesBoard.vue'
import Login from 'pages/Login.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'chat', component: TeamChat },
      { path: 'calculator', component: Calculator },
      { path: 'indicator', component: Indicator },
      { path: 'trades', component: TradesBoard }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
