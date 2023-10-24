import { sessionWritable } from "$lib";
import { writable } from "svelte/store";

interface User {
    username: String,
    email: String,
}

export let userStore = sessionWritable<User>({
    username: "Kein Benutzername gefunden",
    email: "",
}, "sessionUserData");

export const loading = writable<boolean>(true);

