<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar>
        <q-btn flat dense round icon="train" aria-label="Menu" class="q-ma-sm" @click="a='leftDrawerOpen = !leftDrawerOpen'"/>

        <q-separator vertical inset />

        <q-toolbar-title>
          铁路服务系统
        </q-toolbar-title>

        <q-tabs v-model="tab" inline-label shrink class="bg-transparent">
          <q-route-tab name="home" icon="home" label="首页" to="/login" exact/>
          <q-route-tab name="mails" icon="credit_card" label="购票" to="/buy-ticket-search" exact/>
          <q-route-tab name="alarms" icon="alarm" label="时刻表" to="/schedule-search"/>
          <q-route-tab hidden name="passenger" to="/passenger"/>
          <q-route-tab name="admin" icon="admin_panel_settings" label="管理员工具" to="/passenger"/>
          <q-route-tab name="develop" icon="code" label="开发者工具" to="/schedule"/>
        </q-tabs>

        <q-separator vertical inset/>

        <q-btn flat dense round icon="account_circle" aria-label="Menu" class="q-ma-sm" @click="rightDrawerOpen = !rightDrawerOpen"/>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered side="left" content-class="bg-white">
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" bordered side="right" content-class="bg-white">
      <q-list>
        <q-item-label header class="text-grey-8">
          用户中心
        </q-item-label>

        <router-link v-for="link in userLinks" :key="link.title" :to="'/'+link.tab">
          <q-item clickable tag="a" target="_blank" @click="tab = link.tab;rightDrawerOpen = false;">
            <q-item-section v-if="link.icon" avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const userLinksData = [
  {
    title: '修改密码',
    caption: 'Change Password',
    icon: 'school',
    tab: 'passenger'
  },
  {
    title: '个人信息',
    caption: 'Personal Information',
    icon: 'code',
    tab: 'passenger'
  },
  {
    title: '乘客管理',
    caption: 'Passengers',
    icon: 'chat',
    tab: 'passenger'
  },
  {
    title: '订单管理',
    caption: 'Orders',
    icon: 'record_voice_over',
    tab: 'passenger'
  }
];

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      essentialLinks: linksData,
      userLinks: userLinksData,
      tab: 'home'
    }
  }
}
</script>

<style scoped>
.q-toolbar{
  padding-left: calc(50% - 512px);
  padding-right: calc(50% - 512px);
  padding-bottom: 0px;
}
</style>
