"use strict";

if (process.argv.length < 4) {
    console.error("arguments required!");
    process.exit(1);
}

const fetch = require("node-fetch");
const encrypt = require("./encrypt.js");

const pid = process.argv[2];
const MUSIC_U = process.argv[3];

const referrer = "http://music.163.com/discover/recommend/taste";
const headers = {
    Host: "music.163.com",
    Origin: "http://music.163.com",
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7",
    Cookie: "MUSIC_U=" + MUSIC_U,
    "Content-Type": "application/x-www-form-urlencoded",
};

fetch("http://music.163.com/weapi/v2/discovery/recommend/songs", {
    referrer,
    headers,
    method: "POST",
    body: encrypt({
        offset: 0,
        total: true,
        limit: 30,
        csrf_token: "",
    }),
})
    .then((response) => response.json())
    .then((result) => {
        return result.recommend.map((t) => t.id).reverse();
    })
    .then((tracks_id) =>
        fetch("http://music.163.com/weapi/playlist/manipulate/tracks", {
            referrer,
            headers,
            method: "POST",
            body: encrypt({
                csrf_token: "",
                op: "add",
                pid,
                trackIds: JSON.stringify(tracks_id),
                tracks:
                    "[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]",
            }),
        })
    )
    .then((res) => res.text())
    .then((text) => console.info(text));
