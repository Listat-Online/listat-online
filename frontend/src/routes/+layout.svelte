<script lang="ts">
    import {page} from '$app/stores';

    import {authStore, modalIsOpen} from '$lib/stores';

    import './global.scss';

    function onModalIsOpenChange(isOpen: boolean) {
        const htmlElems = document.getElementsByTagName('html');
        if (isOpen) {
            htmlElems[0].classList.add('modal-is-open');
        } else {
            htmlElems[0].classList.remove('modal-is-open');
        }
    }

    $: onModalIsOpenChange($modalIsOpen);
    $: url = $page.route.id;
</script>

<header>
    <nav>
        <ul>
            <li>
                <strong>
                    <a href="/">Listat Online</a>
                    {#if $page.data.title}
                        /
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a href="">
                            {$page.data.title}
                        </a>
                    {/if}
                </strong>
            </li>
        </ul>
        <ul>
            {#if $authStore.isLoggedIn}
                <li>
                    <a href="/lists" aria-current={url == '/lists'}>Lists</a>
                </li>
                <li>
                    <a href="/me" aria-current={url == '/me'}>Me</a>
                </li>
            {:else}
                <li>
                    <a href="/login" aria-current={url == '/login'}>Login</a>
                </li>
            {/if}
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer></footer>
