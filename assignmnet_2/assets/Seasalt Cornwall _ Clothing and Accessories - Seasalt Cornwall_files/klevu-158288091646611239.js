var klevuLayoutVersion = '-1-1', klevu_filtersEnabled = true, klevu_filtersOnLeft = true, klevu_logoFreeSearch = true, klevu_fluidLayoutEnabled = true, klevu_showPopuralTerms = true, klevu_showPopularSearches = true, klevu_showRecentSerches = true, klevu_showPrices = true, klevu_showOutOfStock = false, klevu_categorySearchEnabled = true, klevu_layoutView = 'grid', klevu_addToCartEnabled = true, klevu_showProductCode = false, klevu_multiSelectFilters = true;var klevu_userSearchDomain = 'eucs18.ksearchnet.com', klevu_userJavascriptDomain = 'js.klevu.com', klevu_userAnalyticsDomain = 'stats.ksearchnet.com', klevu_loadMapFile = true, klevu_showBannerAds = true, klevu_webStoreLanguage = 'en';var klevu_cmsEnabled = true, klevu_cmsApiKey = 'klevu-158288091646611239', klevu_cmsSearchDomain = 'eucs18.ksearchnet.com', klevu_cmsAnalyticsDomain = 'stats.ksearchnet.com', klevu_lookForDataInSameFeed=true;var klevu_layoutType = 'slim';var klevu_productsToShowInSlimLayout = 5;var klevu_isSearchActive = true;var klevu_showPriceSlider=true;var klevu_uc_userOptions = {noImageUrl :klevu_urlProtocol + klevu_javascriptDomain + '/klevu-js-v1/img-1-1/place-holder.jpg', showProductSwatches :false, showRolloverImage :false, enablePersonalisationInSearch :true, enablePersonalisationInCatNav :false, showRatingsOnSearchResultsLandingPage :true, showRatingsOnQuickSearches :true, showRatingsOnCategoryPage :true, showRatingsCountOnSearchResultsLandingPage :false, showRatingsCountOnQuickSearches :false, showRatingsCountOnCategoryPage :false, noResultsOptions : {"showPopularProducts":true,"productsHeading":"YOU MAY LIKE","showPopularKeywords":true,"messages":[{"showForTerms":["shoes"],"message":"We can see you&#39;re searching for shoes. Unfortunately, we no longer sell footwear at Seasalt."},{"showForTerms":null,"message":"Sorry, there are no results for <B>#<&#47;B>. Please try another search."}],"banners":[]}, showSearchBoxOnLandingPage :false, showFiltersInMobile :true, showRecentlyViewedItems :true, showTrendingProductsCaption :'Trending Products', showTrendingProducts :true, showRecentlyViewedItemsCaption :'Recently viewed products', addToCartButton : 'Add to Cart', priceInterval :500};var klevu_abTestActive = false, klevu_apiDomain = 'api.ksearchnet.com';
var klevu_webstorePopularTerms=['Linen', 'Dresses', 'Tunic', 'Socks', 'Trousers'];
var klevu_popularProductsOfSite=[{"name": "Sailor 3\/4 Sleeve Top in GOTS-Certified Organic Cotton Jersey","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm16941-26052_replacee_1_10.jpg?_i=AB","url":"https://www.seasaltcornwall.com/sailor-striped-cotton-breton-top","id":"96812-407085"},{"name": "Larissa Shirt in GOTS-Certified Organic Cotton","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm23525-32663_replacee_1_9.jpg?_i=AB","url":"https://www.seasaltcornwall.com/larissa-printed-cotton-shirt","id":"96758-405219"},{"name": "Organic Cotton Handyband","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-ac17523-35342_1_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/handyband-printed-cotton-headband","id":"96539-402267"},{"name": "Waterdance Trousers","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm33256-13507_replaace_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/washed-denim-waterdance-jeans","id":"14437-274232"},{"name": "Tremayne Quay Jersey Top","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm27602-36290_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/tremayne-quay-jersey-top","id":"206138-403179"},{"name": "Tepel Knitted Vest","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm33648-35493_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/tepel-crew-neck-knitted-organic-cotton-vest","id":"338029-405522"},{"name": "Salt Air Wide Leg Jumpsuit","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm33716-10029_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/salt-air-wide-leg-linen-jumpsuit","id":"217565-406689"},{"name": "Winding Creek Organic Cotton Knit Cardigan","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm34536-19489_replacee_1_9.jpg?_i=AB","url":"https://www.seasaltcornwall.com/winding-creek-organic-cotton-knit-cardigan","id":"333719-332303"},{"name": "Hope Cottage Organic Cotton Blouse","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/-/b-wm37126-35229_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/hope-cottage-organic-cotton-floral-blouse","id":"268995-413269"},{"name": "Hazel Branch Linen Shirt","imageUrl":"https://images.seasaltcornwall.com/image/upload/c_fit,dpr_1.0,f_auto,h_400,q_auto,w_400/v1/media/catalog/product/b/_/b_wm32562_28583_1_1.jpg?_i=AB","url":"https://www.seasaltcornwall.com/hazel-branch-longline-linen-shirt","id":"333626-338177"}];
