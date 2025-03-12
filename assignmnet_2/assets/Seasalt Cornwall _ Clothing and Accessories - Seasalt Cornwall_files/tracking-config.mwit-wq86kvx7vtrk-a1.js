window.intent.hostedConfig = (readFromDatalayer) => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  let store = "GB";
  const storeInCookies = getCookie("store");
  if (storeInCookies) {
    store = storeInCookies.replace("en_", "");
  }
  store = store.toUpperCase();

  return {
    hooks: {
      async inference({ inferenceData }) {
        if (!inferenceData) {
          return;
        }

        var matchedSegments =
          inferenceData && inferenceData.segments ? inferenceData.segments : [];

        var segmentString = [];

        for (var index = 0; index < matchedSegments.length; index++) {
          var element = matchedSegments[index];
          var segmentName = element.name;
          segmentString.push(segmentName);
        }

        segmentString = segmentString.join("|");

        var cats = [];
        var skus = [];
        var names = [];

        if (inferenceData.affinities && inferenceData.affinities.all) {
          if (inferenceData.affinities.all.product_category) {
            inferenceData.affinities.all.product_category.forEach(function (a) {
              if (a) {
                cats.push(a);
              }
            });
          }

          if (inferenceData.affinities.all.product_sku) {
            inferenceData.affinities.all.product_sku.forEach(function (a) {
              if (a) {
                skus.push(a);
              }
            });
          }

          if (inferenceData.affinities.all.product_name) {
            inferenceData.affinities.all.product_name.forEach(function (a) {
              if (a) {
                names.push(a);
              }
            });
          }
        }

        cats = cats.slice(0, 5);
        skus = skus.slice(0, 5);
        names = names.slice(0, 5);

        const insiderObject = {
          Current_Purchase_Intent:
            inferenceData?.intent?.xc?.latest_label || "",
          Peak_Purchase_Intent: inferenceData?.intent?.xc?.max_label || "",
          Purchase_Intent_Momentum:
            inferenceData?.momentum?.xc?.momentum_label || "",
          Current_Exit_Intent: inferenceData?.intent?.xe?.latest_label || "",
          Peak_Exit_Intent: inferenceData?.intent?.xe?.max_label || "",
          Exit_Intent_Momentum:
            inferenceData?.momentum?.xe?.momentum_label || "",
          Current_Return_Intent: inferenceData?.intent?.xr?.latest_label || "",
          Peak_Return_Intent: inferenceData?.intent?.xr?.max_label || "",
          Current_AddToCart_Intent:
            inferenceData?.intent?.xatc?.latest_label || "",
          Peak_AddToCart_Intent: inferenceData?.intent?.xatc?.max_label || "",
          AddToCart_Intent_Momentum:
            inferenceData?.momentum?.xatc?.momentum_label || "",
          Current_Buying_Stage: inferenceData?.buying_stage?.label || "",
          Peak_Buying_Stage: inferenceData?.buying_stage?.max_label || "",
          Category_Affinities: cats.join("|"),
          Product_SKU_Affinities: skus.join("|"),
          Product_Name_Affinities: names.join("|"),
          Last_Matched_Segments: segmentString,
          MWI_Timestamp: Math.round(Date.now() / 1000),
        };

        localStorage.setItem(
          "intent.insider.integration",
          JSON.stringify(insiderObject)
        );

        document.dispatchEvent(
          new CustomEvent("intent.insider.integration", {
            detail: insiderObject,
          })
        );
      },
      async click(target) {},
      async pageview(pageType) {},
      async run({ poller, loadCss, loadScript }) {
        const didConsent = await poller(
          () => {
            return window.OptanonActiveGroups?.indexOf("C0002") > -1;
          },
          60000,
          50
        );

        if (!didConsent) {
          return false;
        }

        return true;
      },
    },
    clientId: "seasaltuk",
    iso31661CountryCode: store,
    iso6391LanguageCode: "en",
    blacklistedTextTagPages: [/login/i, /cart/i, /checkout/i, /account/i],
    addToCartSelector: "#product-addtocart-button,#product-addtocart-button",
    pageTypes: [
      [".catalog-product-view", "pdp"],
      [".catalog-category-view", "plp"],
      [/customer\/account\/login/i, "login"],
      [/customer\/account/i, "account"],
      [/seasaltcornwall\.com(\/)?(\?.+)?$/i, "home"],
      [/seasaltcornwall\.com\/checkout\/cart/i, "cart"],
      [/checkout\/onepage\/success/i, "confirmation"],
      [/seasaltcornwall\.com\/checkout\/.*/i, "checkout"],
      [".cms-page-view", "content"],
    ],
    getProductTags: async () => {
      // This returns GBP prices even if another currency selected on site
      const product = readFromDatalayer(
        window.dataLayer,
        "product",
        "event",
        "Product View"
      );

      if (!product) {
        return {};
      }

      const result = {
        product_name: product?.name,
        product_sku: product?.displaySKU,
        product_price: Array(product?.prices || "0.00").flat()[0] || "",
        product_currency: "GBP",
        product_brand: product?.brand || "",
        product_category: product?.magentoDepartment || "",
        product_subcategory: product?.category || "",
        product_availability: 1,
        product_image_url:
          document
            ?.querySelector?.('meta[property="og:image"]')
            ?.getAttribute?.("content") || "",
      };

      return result;
    },
    getConversionTags: () => {
      const order = readFromDatalayer(
        window.dataLayer,
        "ecommerce",
        "ecommerce.purchase"
      );

      if (!order) {
        return {};
      }

      const detail = order.purchase.actionField;

      const result = {
        currency: order?.currencyCode || "GBP",
        shipping_fee: parseFloat(detail?.shipping || "0"),
        voucher_code: detail?.coupon || "",
        tax_value: parseFloat(detail?.tax || "0"),
        order_value: parseFloat(detail?.revenue || "0"),
        order_quantity: order?.purchase?.products?.length || 0,
        order_items: [],
      };

      if (order.purchase.products?.length) {
        order.purchase.products.forEach((items) => {
          const orderItem = {
            product_id: items?.id || "",
            item_value: parseFloat(items?.price || "0"),
            item_quantity: parseInt(items?.quantity || 1),
          };
          result.order_items?.push(orderItem);
        });
      }

      return result;
    },
  };
};
