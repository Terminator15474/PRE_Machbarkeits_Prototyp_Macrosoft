// place files you want to import through the `$lib` alias in this folder.

import { browser } from "$app/environment";
import { type Writable, writable } from "svelte/store";


/**
 * Function to make fetch easier to deal with
 * 
 * @param url 
 * @param body 
 * @param headers 
 */
export function get(url: string, headers?: HeadersInit): Promise<Response> {
    return fetch(url, {
        method: "GET",
        credentials: "include",
        headers: headers
    });
}


/**
 * Function to make easily make a post request. If the header is undefined, it will automaticall be set
 * to content-type application/json
 * 
 * @param url 
 * @param body 
 * @param headers 
 */
export function post(url: string, body?: Object, headers: HeadersInit = { "Content-Type": "application/json" }): Promise<Response> {
    return fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: headers
    });
}

export interface TimeSpan {
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number,
}

/**
 * This writable will either persist forever in localStorage or persist until the invalidateAfter Time span has been passed
 * 
 * @param inital The Data you want to write
 * @param key The String key that you want to save the data under
 * @param invalidateAfter  The time that the data should be regarded as invalid, can be undefined
 */
export function persistedWritable<T>(inital: T | undefined, key: string, invalidateAfter: TimeSpan): Writable<T> {
    let persistedStore;
    if (browser) {
        let rawData = localStorage.getItem(key);
        if (rawData == undefined) {
            persistedStore = writable<T>(inital);
        } else {
            let data = atob(rawData);
            let jsonData = JSON.parse(data);
            let expirationDate = new Date(Date.parse(jsonData.expirationDate));
            if (expirationDate != undefined && expirationDate.getTime() < new Date().getTime()) {
                persistedStore = writable<T>(inital);
            } else {
                persistedStore = writable<T>(jsonData.data);
            }
        }

        persistedStore.subscribe((val) => {
            let expirationDate = new Date();
            expirationDate.setTime(new Date().getTime() + (invalidateAfter.milliseconds ?? 0) + (invalidateAfter.seconds ?? 0) * 1000 + (invalidateAfter.minutes ?? 0) * 60000 + (invalidateAfter.hours ?? 0) * 3600000);
            let data = {
                expirationDate: expirationDate,
                data: val,
            }
            localStorage.setItem(key, btoa(JSON.stringify(data)));
        })
    } else {
        persistedStore = writable<T>(inital);
    }

    return persistedStore;
}

/**
 * This writable will persist until the end of the session in the browser -> until the brower tab is closed
 * 
 * @param inital The Data you want to save
 * @param key The String, under which your data should be saved
 */
export function sessionWritable<T>(inital: T | undefined, key: string): Writable<T> {
    let sessionStore;
    if (browser) {
        let rawData = sessionStorage.getItem(key);
        if (rawData == undefined) {
            sessionStore = writable<T>(inital);
        } else {
            let data = atob(rawData);
            let jsonData = JSON.parse(data);
            sessionStore = writable<T>(jsonData);
        }

        sessionStore.subscribe((val) => {
            sessionStorage.setItem(key, btoa(JSON.stringify(val)));
        })
    } else {
        sessionStore = writable<T>(inital);
    }

    return sessionStore;
}