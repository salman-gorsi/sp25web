(function () {
  var scheme = (("https:" == document.location.protocol) ? "https" : "http");
  var adnxs_domain = 'secure.adnxs.com';
  var aol_domain = 'secure.leadback.advertising.com';
  window.adroll_seg_eid = "BJMT4QHCC5BC3H5ALH5D3L";
  window.adroll_sendrolling_cross_device = false;
  window.adroll_form_fields = {};
  window.adroll_third_party_forms = {};
  window.adroll_third_party_detected = {};
  window.adroll_snippet_errors = [];
  if (typeof __adroll._form_attach != 'undefined') {
    __adroll._form_attach();
  }
  if (typeof __adroll._form_tp_attach != 'undefined') {
    __adroll._form_tp_attach();
  }
  window.adroll_rule_type = "p";
  var rule = ["*", "*"];
  if (scheme=='http') { adnxs_domain = 'ib.adnxs.com'; aol_domain = 'leadback.advertising.com';}
  var el = document.createElement("div");
  el.style["width"] = "1px";
  el.style["height"] = "1px";
  el.style["display"] = "inline";
  el.style["position"] = "absolute";
  var content = '';
  var rollcrawl_opts = {
      "regexp": null,
      "blacklist_regexp": null,
      "blocklist_regexp": null,
      "regexp_group": null,
      "product_group_regexp": null,
      "product_group_group": null
  };

  if (__adroll.consent_allowed(__adroll.consent_networks.facebook)) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','//connect.facebook.net/en_US/fbevents.js');
  }

  try {
      try {
          
(function() {
var rtb = document.createElement("div");
rtb.style["width"] = "1px";
rtb.style["height"] = "1px";
rtb.style["display"] = "inline";
rtb.style["position"] = "absolute";
rtb.innerHTML = ["/cm/b/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/bombora/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/experian/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/g/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/index/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/l/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/n/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/o/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/outbrain/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/pubmatic/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/taboola/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/triplelift/out?advertisable=GLECHEAOVJHADDNIA6DND3","/cm/x/out?advertisable=GLECHEAOVJHADDNIA6DND3"].reduce(function (acc, cmURL) {
    return acc + '<img height="1" width="1" style="border-style:none;" alt="" src="' + __adroll._srv(cmURL) + '"/>';
}, '');
__adroll._head().appendChild(rtb);
})();

      } catch(e) {
          window.adroll_snippet_errors['maya_snippet'] = e;
      }
  } catch(e) {}

  __adroll.get_pid(rollcrawl_opts);

  var r = Math.random()*10000000000000000;
  content = content.replace(/\[ord\]/gi, r);
  content = content.replace(/\[protocol\]/gi, scheme);
  content = content.replace(/\[adnxs_domain\]/gi, adnxs_domain);
  content = content.replace(/\[aol_domain\]/gi, aol_domain);
  var adroll_tpc = __adroll._global('adroll_tpc');
  if (adroll_tpc) {
    var srv_parts = __adroll._srv().split('?');
    var srv_host = srv_parts[0].substr(srv_parts[0].indexOf(':') + 1);
    var srv_re = new RegExp(srv_host + '([^\?\"\'\>\#\S]+)\\?*', 'gi');
    content = content.replace(srv_re, srv_host + '$1?' + srv_parts[1] + '&');
  }
  content = __adroll.replace_external_data(content);
  el.innerHTML = content;
  __adroll._head().appendChild(el);
  if (typeof __adroll.set_pixel_cookie != 'undefined') {__adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id, "BJMT4QHCC5BC3H5ALH5D3L");}
}());
