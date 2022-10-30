<script lang="ts">
	import { useAxiosPrivate } from "$lib/axios";
	import axios from "axios";


    let users: string[] = []
    async function getUsers() {
        const axiosPrivate = useAxiosPrivate('abc')
        try {
            const result = await axiosPrivate.get('/api/user')
            console.log(result.data);
        } catch(error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message);
            }
            console.log(error);
        }
    }
</script>

<section>
    <ul>
        {#each users as user (user)}
            <li>{user}</li>
        {/each}
    </ul>
    <button class="btn btn-sm" on:click={getUsers}>
        show user
    </button>
</section>