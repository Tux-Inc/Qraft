<script setup lang="ts"></script>

<template>
    <UContainer>
        <div
            class="relative z-10 rounded-xl shadow-lg xl:ml-0 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-30"
        >
            <div class="relative flex text-slate-400 text-xs">
                <div
                    class="mt-2 flex-none text-sky-300 border-t border-b border-t-transparent border-b-sky-300 px-4 py-1 flex items-center"
                >
                    Terminal
                </div>
                <div class="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
                    <div
                        class="flex-auto -mr-px border border-slate-500/30 rounded-tl"
                    ></div>
                </div>
            </div>
            <div class="relative">
                <pre
                    class="text-sm leading-6 text-slate-50 flex ligatures-none overflow-auto"
                ><code class="flex-none min-w-full p-5"><span class="flex"><svg viewBox="0 -9 3 24" aria-hidden="true" class="flex-none overflow-visible text-pink-400 w-auto h-6 mr-3"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="flex-auto">npm install -D tailwindcss</span></span><span class="flex"><svg viewBox="0 -9 3 24" aria-hidden="true" class="flex-none overflow-visible text-pink-400 w-auto h-6 mr-3"><path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="flex-auto">npx tailwindcss init</span></span></code></pre>
            </div>
        </div>
    </UContainer>
</template>

<style scoped></style>
