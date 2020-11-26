export { default as Cart } from '../..\\components\\Cart.vue'
export { default as DropIcon } from '../..\\components\\DropIcon.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Star } from '../..\\components\\Star.vue'
export { default as Trash } from '../..\\components\\Trash.vue'

export const LazyCart = import('../..\\components\\Cart.vue' /* webpackChunkName: "components_Cart" */).then(c => c.default || c)
export const LazyDropIcon = import('../..\\components\\DropIcon.vue' /* webpackChunkName: "components_DropIcon" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
export const LazyStar = import('../..\\components\\Star.vue' /* webpackChunkName: "components_Star" */).then(c => c.default || c)
export const LazyTrash = import('../..\\components\\Trash.vue' /* webpackChunkName: "components_Trash" */).then(c => c.default || c)
