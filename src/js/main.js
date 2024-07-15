// Google Analytics tracking code
(function () {
    const em_version = "7.28.0";
    const em_track_user = true;
    const em_no_track_reason = "";
    const ExactMetricsDefaultLocations = {
        page_location: "https://woodmart.xtemos.com/plants/",
        page_referrer: "https://woodmart.xtemos.com/plants/shop/"
    };
    let ExactMetricsLocations;

    if (typeof ExactMetricsPrivacyGuardFilter === "function") {
        ExactMetricsLocations = typeof ExactMetricsExcludeQuery === "object" ?
            ExactMetricsPrivacyGuardFilter(ExactMetricsExcludeQuery) :
            ExactMetricsPrivacyGuardFilter(ExactMetricsDefaultLocations);
    } else {
        ExactMetricsLocations = typeof ExactMetricsExcludeQuery === "object" ?
            ExactMetricsExcludeQuery :
            ExactMetricsDefaultLocations;
    }

    const disableStrs = ["ga-disable-G-77YTSG5BH0"];

    /* Function to detect opted out users */
    function __gtagTrackerIsOptedOut() {
        for (let index = 0; index < disableStrs.length; index++) {
            if (document.cookie.indexOf(disableStrs[index] + "=true") > -1) {
                return true;
            }
        }
        return false;
    }

    /* Disable tracking if the opt-out cookie exists. */
    if (__gtagTrackerIsOptedOut()) {
        for (let index = 0; index < disableStrs.length; index++) {
            window[disableStrs[index]] = true;
        }
    }

    /* Opt-out function */
    function __gtagTrackerOptout() {
        for (let index = 0; index < disableStrs.length; index++) {
            document.cookie = disableStrs[index] + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
            window[disableStrs[index]] = true;
        }
    }

    if (typeof gaOptout === "undefined") {
        function gaOptout() {
            __gtagTrackerOptout();
        }
    }

    window.dataLayer = window.dataLayer || [];

    window.ExactMetricsDualTracker = {
        helpers: {},
        trackers: {}
    };

    if (em_track_user) {
        function __gtagDataLayer() {
            dataLayer.push(arguments);
        }

        function __gtagTracker(type, name, parameters = {}) {
            if (parameters.send_to) {
                __gtagDataLayer.apply(null, arguments);
                return;
            }

            if (type === "event") {
                parameters.send_to = exactmetrics_frontend.v4_id;
                let hookName = name;
                if (typeof parameters["event_category"] !== "undefined") {
                    hookName = parameters["event_category"] + ":" + name;
                }

                if (typeof ExactMetricsDualTracker.trackers[hookName] !== "undefined") {
                    ExactMetricsDualTracker.trackers[hookName](parameters);
                } else {
                    __gtagDataLayer("event", name, parameters);
                }
            } else {
                __gtagDataLayer.apply(null, arguments);
            }
        }

        __gtagTracker("js", new Date());
        __gtagTracker("set", {
            "developer_id.dNDMyYj": true
        });
        if (ExactMetricsLocations.page_location) {
            __gtagTracker("set", ExactMetricsLocations);
        }
        __gtagTracker("config", "G-77YTSG5BH0", {
            forceSSL: "true",
            link_attribution: "true"
        });
        window.gtag = __gtagTracker;

        (function () {
            /* https://developers.google.com/analytics/devguides/collection/analyticsjs/ */
            /* ga and __gaTracker compatibility shim. */
            const noopfn = function () {
                return null;
            };
            const newtracker = function () {
                return new Tracker();
            };
            const Tracker = function () {
                return null;
            };
            const p = Tracker.prototype;
            p.get = noopfn;
            p.set = noopfn;
            p.send = function () {
                const args = Array.prototype.slice.call(arguments);
                args.unshift("send");
                __gaTracker.apply(null, args);
            };
            const __gaTracker = function () {
                const len = arguments.length;
                if (len === 0) {
                    return;
                }
                const f = arguments[len - 1];
                if (typeof f !== "object" || f === null || typeof f.hitCallback !== "function") {
                    if ("send" === arguments[0]) {
                        let hitConverted, hitObject = false, action;
                        if ("event" === arguments[1]) {
                            if ("undefined" !== typeof arguments[3]) {
                                hitObject = {
                                    eventAction: arguments[3],
                                    eventCategory: arguments[2],
                                    eventLabel: arguments[4],
                                    value: arguments[5] ? arguments[5] : 1
                                };
                            }
                        }
                        if ("pageview" === arguments[1]) {
                            if ("undefined" !== typeof arguments[2]) {
                                hitObject = {
                                    eventAction: "page_view",
                                    page_path: arguments[2]
                                };
                            }
                        }
                        if (typeof arguments[2] === "object") {
                            hitObject = arguments[2];
                        }
                        if (typeof arguments[5] === "object") {
                            Object.assign(hitObject, arguments[5]);
                        }
                        if ("undefined" !== typeof arguments[1].hitType) {
                            hitObject = arguments[1];
                            if ("pageview" === hitObject.hitType) {
                                hitObject.eventAction = "page_view";
                            }
                        }
                        if (hitObject) {
                            action = "timing" === arguments[1].hitType ? "timing_complete" : hitObject.eventAction;
                            hitConverted = mapArgs(hitObject);
                            __gtagTracker("event", action, hitConverted);
                        }
                    }
                    return;
                }

                function mapArgs(args) {
                    const hit = {};
                    const gaMap = {
                        eventCategory: "event_category",
                        eventAction: "event_action",
                        eventLabel: "event_label",
                        eventValue: "event_value",
                        nonInteraction: "non_interaction",
                        timingCategory: "event_category",
                        timingVar: "name",
                        timingValue: "value",
                        timingLabel: "event_label",
                        page: "page_path",
                        location: "page_location",
                        title: "page_title",
                        referrer: "page_referrer"
                    };
                    for (const arg in args) {
                        if (args.hasOwnProperty(arg) && gaMap.hasOwnProperty(arg)) {
                            hit[gaMap[arg]] = args[arg];
                        } else {
                            hit[arg] = args[arg];
                        }
                    }
                    return hit;
                }

                try {
                    f.hitCallback();
                } catch (ex) { }
            };
            __gaTracker.create = newtracker;
            __gaTracker.getByName = newtracker;
            __gaTracker.getAll = function () {
                return [];
            };
            __gaTracker.remove = noopfn;
            __gaTracker.loaded = true;
            window["__gaTracker"] = __gaTracker;
        })();
    } else {
        console.log("");
        (function () {
            function __gtagTracker() {
                return null;
            }
            window["__gtagTracker"] = __gtagTracker;
            window["gtag"] = __gtagTracker;
        })();
    }
})();

// Add to cart parameters
const wc_add_to_cart_params = {
    ajax_url: "/plants/wp-admin/admin-ajax.php",
    wc_ajax_url: "/plants/?wc-ajax=%%endpoint%%",
    i18n_view_cart: "View cart",
    cart_url: "https://woodmart.xtemos.com/plants/cart/",
    is_cart: "",
    cart_redirect_after_add: "no"
};

// Woocommerce parameters
const woocommerce_params = {
    ajax_url: "/plants/wp-admin/admin-ajax.php",
    wc_ajax_url: "/plants/?wc-ajax=%%endpoint%%"
};

// Google Analytics by ExactMetrics
function setREVStartSize(e) {
    window.RSIW = window.RSIW === undefined ? window.innerWidth : window.RSIW;
    window.RSIH = window.RSIH === undefined ? window.innerHeight : window.RSIH;
    try {
        let pw = document.getElementById(e.c).parentNode.offsetWidth,
            newh;
        pw = pw === 0 || isNaN(pw) || e.l == "fullwidth" || e.layout == "fullwidth" ? window.RSIW : pw;
        e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
        e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
        e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
        e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
        e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
        e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
        e.mh = e.mh === undefined || e.mh == "" ? 0 : e.mh;

        if (e.layout === "fullscreen" || e.l === "fullscreen") {
            newh = Math.max(e.mh, window.RSIH);
        } else {
            e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
            for (let i in e.rl)
                if (e.rl[i] === undefined || e.rl[i] === null)
                    e.rl[i] = e.gw[i];
            newh = Math.max(
                e.mh,
                window.RSIH - e.tabhide - e.thumbhide
            );
            for (let i in e.rl) {
                let iw = e.rl[i] + e.tabw + e.thumbw,
                    ic = pw / iw;
                ic = ic > 1 ? 1 : ic;
                if (e.gw[i] * ic < e.min_height)
                    newh = e.gw[i] * ic + e.tabh + e.thumbh;
            }
        }
        const stickyBanner = document.querySelector('.woodmart-sticky-banner');
        if (stickyBanner) {
            stickyBanner.style.height = `${newh}px`;
        }
    } catch (e) {
        console.log(e);
    }
}

// Add to cart form handling
jQuery(function ($) {
    if (typeof wc_add_to_cart_params === 'undefined') {
        return false;
    }

    $(document.body)
        .on('click', '.add_to_cart_button', function () {
            const $thisbutton = $(this);

            if ($thisbutton.is('.ajax_add_to_cart')) {
                if (!($thisbutton.closest('.single_add_to_cart_button').length)) {
                    $thisbutton.closest('.add_to_cart_form').submit();
                }
            }
        })
        .on('submit', '.cart', function (e) {
            e.preventDefault();
            const $form = $(this);

            const $thisbutton = $form.find('.single_add_to_cart_button');

            if ($thisbutton.is('.ajax_add_to_cart')) {
                $.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), $form.serialize(), function (response) {
                    if (!response) {
                        return;
                    }

                    if (response.error && response.product_url) {
                        window.location = response.product_url;
                        return;
                    }

                    if (wc_add_to_cart_params.cart_redirect_after_add === 'yes' && response.error !== true) {
                        window.location = wc_add_to_cart_params.cart_url;
                        return;
                    }

                    $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);

                    $thisbutton.removeClass('loading');

                });
            }
        });

    if ($('form.cart').find('.qty').length) {
        $('form.cart')
            .on('change', 'input.qty', function () {
                const $button = $(this);
                $button.closest('form.cart').find('.single_add_to_cart_button').removeClass('disabled');
            });
    }
});
