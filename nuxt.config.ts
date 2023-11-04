// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Qraft - Minecraft Server Manager",
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ["~/assets/css/main.css"],
    runtimeConfig: {
        version: "0.0.1",
    },
    typescript: {
        shim: false,
    },
    modules: ["@nuxt/ui", "@nuxt/image"],
    devtools: { enabled: true },
});
