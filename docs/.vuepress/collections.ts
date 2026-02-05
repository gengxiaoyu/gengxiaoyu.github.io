import { defineCollection, defineCollections } from 'vuepress-theme-plume'

const blog = defineCollection({
  type: 'post',
  dir: 'blog',
  title: 'Blog',
  link: '/blog/',
})

const navviewDoc = defineCollection({
  type: 'doc',
  dir: 'navview',
  linkPrefix: '/navview',
  title: '常用站点导航',
  sidebar: ['', 'development', 'learning', 'tools', 'resources'],
})

const webDocViewDoc = defineCollection({
  type: 'doc',
  dir: 'webDocView',
  linkPrefix: '/webDocView',
  title: 'Vue 技术文档与学习指南',
  sidebar: [
    { text: '项目总览', prefix: '00-docs', items: 'auto', collapsed: true },
    { text: '基础模块', prefix: '10-basic', items: 'auto', collapsed: true },
    { text: 'Vue基础', prefix: '15-vue-base', items: 'auto', collapsed: true },
    { text: '面试指南', prefix: '20-interview', items: 'auto', collapsed: true },
    { text: '实战项目', prefix: '30-practice', items: 'auto', collapsed: true },
    { text: '源码解析', prefix: '40-source-code', items: 'auto', collapsed: true },
    { text: '协作维护', prefix: '90-contrib', items: 'auto', collapsed: true },
  ],
  sidebarCollapsed: true,
})

export default defineCollections([
  blog,
  navviewDoc,
  webDocViewDoc
])