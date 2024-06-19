import type {HTMLButtonAttributes} from 'svelte/elements';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    namespace svelteHTML {
        interface IntrinsicElements {
            // Add rel="prev" to button, because PicoCSS uses it (even
            // though it's not in HTML standard)
            button: HTMLButtonAttributes & {rel?: 'prev'};
        }
    }
}

export {};
