import { createRouter, createWebHistory } from "vue-router";
import About from '@/views/About.vue';
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from '@/views/event/Edit.vue';
import NotFound from '@/views/event/NotFound.vue';
import NetworkError from '@/views/event/NetworkError.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias is not be SEO friendly: same content in two places
    alias: '/about'
  },
  // {
  //   path: '/about',
  //   redirect: {name: 'About'}
  // },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      // THESE WILL LOAD AT ROOT PATH OF PARENT: /EVENT/:ID
      // they inherit the path from parent
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      },
    ]
  },
  // {
  //   // ID AUTOMATICALLY PASSED THROUGH
  //   // NESTED ROUTES BREAK: 
  //   // add children or 
  //   // :afterEvent(.*) added to path
  //   path: '/event/:id',
  //     redirect: () => {
  //       return {name: 'EventDetails'}
  //     },
  //     children: [
  //       {
  //         path: 'register', 
  //         redirect: () => ({name: 'EventRegister'})
  //       },
  //       {
  //         path: 'edit', 
  //         redirect: () => ({name: 'EventEdit'})
  //       }
  //     ]
  // },
  {
    path: '/event/:afterEvent(.*)',
      redirect: to => {
        return {path: '/events/' + to.params.afterEvent}
      }
  },
  {
    // PAGE DOESNT EXIST
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    // RESOURCE DOESNT EXIST
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    // pushing to this page in our API call: LAYOUT.VUE
    props: true
  },
  {
    // RESOURCE DOESNT EXIST
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    // pushing to this page in our API call: LAYOUT.VUE
    props: true
  },
  {
    // NETWORK ERROR
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
    // pushing to this page in our API call: LAYOUT.VUE
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
