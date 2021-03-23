export const ClevertapReact = {

    initialize: function (accountId) {
        window.clevertap = { event: [], profile: [], account: [], onUserLogin: [], notifications: [], privacy:[] };
        window.clevertap.account.push({'id': accountId});
        window.clevertap.privacy.push({optOut: false});
        window.clevertap.privacy.push({useIP: false});
        (function () {
            var wzrk = document.createElement('script');
            wzrk.type = 'text/javascript';
            wzrk.async = true;
            wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wzrk, s);
        })();
    },

    event: function (name, payload) {
        if (payload) {
            window.clevertap.event.push(name, payload);
        } else {
            window.clevertap.event.push(name);
        }

    },

    profile: function (payload) {
        window.clevertap.profile.push(payload);
    },

    onUserLogin: function (payload) {
        window.clevertap.onUserLogin.push(payload);
    },

    logout: function () {
        window.clevertap.logout();
    }
};