setTimeout(() => {
    const run = () => {
        window.intent = window.intent || {};
        window.intent.dataLayer = window.intent.dataLayer || [];
        window.intent.config = {
            ingestionId: 'mwit-wq86kvx7vtrk-a1',
        };

        var scriptToLoad="https://intentclientscriptslon.s3.eu-west-2.amazonaws.com/intent-v3.js";

        try{!function(){var t,e,c;t=scriptToLoad,e=function(){},(c=document.createElement("script")).setAttribute("src",t),c.setAttribute("async",!0),c.onload=e,document.body.appendChild(c)}()}catch(t){}
    };

    run();
}, 100);
