import useUiStore from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async(to, from) => {
    useUiStore().setPageLoader(true)
})