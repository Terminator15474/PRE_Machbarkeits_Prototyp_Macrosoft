import { writable } from "svelte/store";

interface User {
    username: String,
    email: String,
}

export let userStore = writable<User>({
    username: "Kein Benutzername gefunden",
    email: "",
});