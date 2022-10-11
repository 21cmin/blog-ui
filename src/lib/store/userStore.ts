import type { User } from "$lib/model/User";
import { writable, type Writable } from "svelte/store";

export const appUser: Writable<User | null> = writable(null)