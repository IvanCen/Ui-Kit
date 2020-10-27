class CreateCatalogMain extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.renderDrinksCategory = this.renderDrinksCategory.bind(this);
    this.renderFoodCategory = this.renderFoodCategory.bind(this);
    this.renderHitsCategory = this.renderHitsCategory.bind(this);
    this.openSearchPage = this.openSearchPage.bind(this);
  }

  create() {
    this.template = `

        <div class="catalog__header">
        <div class="catalog__title">Каталог</div>
    </div>
    <div class="swiper-container catalog__categories">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="catalog__categories-element catalog__categories-element--active" data-id="34">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M23.4102 16.7976H2.58984C1.74845 16.7976 1.06641 16.1156 1.06641 15.2742C1.06641 14.4328 1.74845 13.7508 2.58984 13.7508H23.4102C24.2516 13.7508 24.9336 14.4328 24.9336 15.2742C24.9336 16.1156 24.2516 16.7976 23.4102 16.7976Z" fill="#7E7E7E"/>
                                <path d="M18.4844 6.18437L19.3911 4.97542C19.338 4.83857 19.2793 4.69887 19.2134 4.55683C18.6291 3.29726 17.3829 1.61259 14.7643 0.739713C14.5457 0.666842 14.3062 0.694721 14.1123 0.819135C13.9185 0.943498 13.7915 1.14683 13.7666 1.37585C13.7654 1.38636 13.6315 2.43819 12.8275 3.63637C11.9045 5.01204 10.5111 6.0202 8.67841 6.64232C15.823 9.58382 18.458 6.21941 18.4844 6.18437Z" fill="#7E7E7E"/>
                                <path d="M8.06508 26.7H10.3377L10.0584 18.3211H7.22719L8.06508 26.7Z" fill="#7E7E7E"/>
                                <path d="M15.6623 26.7H17.9349L18.7728 18.3211H15.9416L15.6623 26.7Z" fill="#7E7E7E"/>
                                <path d="M19.466 26.7H19.8344C20.9561 26.7 21.9041 25.8969 22.0885 24.7905L23.1668 18.3211H20.3039L19.466 26.7Z" fill="#7E7E7E"/>
                                <path d="M11.862 26.7H14.138L14.4173 18.3211H11.5827L11.862 26.7Z" fill="#7E7E7E"/>
                                <path d="M3.91148 24.7905C4.09591 25.8969 5.0439 26.7 6.16555 26.7H6.53402L5.69613 18.3211H2.83324L3.91148 24.7905Z" fill="#7E7E7E"/>
                                <path d="M19.9911 6.71442L19.7031 7.09842C19.6661 7.14783 18.7731 8.31535 16.7878 8.95346C15.9275 9.22997 14.9883 9.36906 13.9859 9.36906C13.6739 9.36906 13.3558 9.35555 13.0319 9.32858C11.3688 9.19 9.54677 8.69153 7.61653 7.84704L6.46826 7.34471C6.01971 7.53981 5.5023 7.81276 4.99439 8.18697C3.97973 8.93467 2.84934 10.2045 2.60345 12.2273H23.6233C23.6252 11.8735 23.5991 11.4845 23.5248 11.0761C23.2783 9.72006 22.4555 7.91047 19.9911 6.71442Z" fill="#7E7E7E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="26" fill="white" transform="translate(0 0.700012)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span>Еда</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="33">
                    <div class="catalog__categories-element-image">
                        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9409 10.4772L17.1783 7.91794H2.57931L2.81545 10.4772H16.9409Z" fill="#7E7E7E"/>
                            <path d="M6.02836 26H6.02933L13.7227 25.9967C14.7371 25.9963 15.5726 25.2343 15.6663 24.2243L15.9589 21.0685H3.79268L4.08407 24.2267C4.17736 25.2377 5.01321 26 6.02836 26V26Z" fill="#7E7E7E"/>
                            <path d="M17.1655 0.370363C17.0081 0.201407 16.7493 0 16.4106 0C16.4105 0 16.4104 0 16.4102 0L3.35259 0.00523068C3.01341 0.00538303 2.75421 0.207298 2.59637 0.37666C2.20514 0.796689 1.99998 1.45794 2.0468 2.14671L2.06066 2.29683H17.6995L17.7141 2.13945C17.7612 1.45073 17.5564 0.789884 17.1655 0.370363V0.370363Z" fill="#7E7E7E"/>
                            <path d="M18.6796 3.82034H1.32035C0.685605 3.82034 0.169189 4.33671 0.169189 4.97145V5.24335C0.169189 5.87809 0.685605 6.39445 1.32035 6.39445H18.6796C19.3144 6.39445 19.8308 5.87809 19.8308 5.24335V4.97145C19.8308 4.33671 19.3144 3.82034 18.6796 3.82034Z" fill="#7E7E7E"/>
                            <path d="M16.7997 12.0007H2.95602L3.65211 19.545H16.1001L16.7997 12.0007Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Напитки</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="hits">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.9627 10.017C25.8731 9.7412 25.6348 9.5402 25.3479 9.49856L17.2878 8.3273L13.6831 1.02361C13.5548 0.763611 13.29 0.59903 13.0001 0.59903C12.7101 0.59903 12.4453 0.763611 12.317 1.02361L8.71216 8.3273L0.652192 9.49856C0.365329 9.5402 0.126912 9.7412 0.0373345 10.0169C-0.052294 10.2927 0.0224557 10.5954 0.230099 10.7978L6.0622 16.4829L4.68563 24.5106C4.63657 24.7964 4.75408 25.0851 4.98864 25.2556C5.12133 25.352 5.2785 25.401 5.43643 25.401C5.55769 25.401 5.67936 25.3721 5.79078 25.3135L13 21.5233L20.2089 25.3135C20.4656 25.4484 20.7766 25.4259 21.0111 25.2555C21.2457 25.0851 21.3632 24.7963 21.3142 24.5105L19.9372 16.4829L25.77 10.7977C25.9776 10.5954 26.0524 10.2927 25.9627 10.017Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Хиты</span>
                </div>
            </div>
            <!--<div class="swiper-slide">
                <div class="catalog__categories-element" data-id="4">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.1579 7.42549L20.941 8.41557L20.7171 5.76144L17.3301 8.84401L18.3112 2.7168L15.4138 3.7344L13 0L10.5862 3.7344L7.68879 2.7168L8.66993 8.84401L5.28293 5.76144L5.05903 8.41557L0.842055 7.42549L2.29927 11.9541L0 13.0498L6.52016 18.126L5.79714 21.0367L12.2383 19.989V26H13.7617V19.989L20.2029 21.0367L19.4798 18.126L26 13.0498L23.7007 11.9541L25.1579 7.42549Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Сезонное меню</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="5">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M21.0932 4.95429C19.0156 2.87668 15.6325 2.87449 13.5519 4.95505C13.4663 5.04077 13.4005 5.14188 13.3213 5.23252C13.4604 5.73307 13.7163 6.19574 14.0912 6.57076C14.9875 7.46639 16.3645 7.71334 17.5137 7.18816C17.7428 7.084 18.0083 7.09817 18.2226 7.22756C18.4383 7.357 18.5759 7.58389 18.5908 7.83455C18.6362 8.57616 18.9508 9.27542 19.4775 9.80207C20.2344 10.5578 21.3011 10.8373 22.2923 10.6173C23.0321 8.67077 22.585 6.44604 21.0932 4.95429Z" fill="#7E7E7E"/>
                                <path d="M18.4004 10.8792C17.8403 10.3191 17.4401 9.62949 17.2303 8.87889C15.7285 9.20471 14.1254 8.76063 13.0141 7.6478C12.7549 7.38887 12.544 7.09586 12.3566 6.78955L9.06345 14.9697C7.00589 20.0808 2.99692 22.817 1.2637 23.9566C0.798801 24.2624 0.463289 24.4833 0.240867 24.693C0.0734924 24.85 -0.0150193 25.0754 0.00209396 25.3037C0.027383 25.6481 0.284793 25.9338 0.623961 25.9978C0.629192 25.9985 0.656715 26 0.705059 26C1.86551 26 15.39 25.1079 21.5552 12.2345L21.5656 12.2129C20.4109 12.1954 19.2681 11.7469 18.4004 10.8792Z" fill="#7E7E7E"/>
                                <path d="M25.9609 0.52014C25.8286 0.121457 25.3979 -0.0920276 24.997 0.0381247C23.5468 0.521156 21.8791 1.78139 20.7997 2.8443C21.2401 3.10521 21.6569 3.40629 22.0357 3.76659C22.9175 2.9451 24.3245 1.86818 25.4789 1.48417C25.8777 1.35102 26.0934 0.919586 25.9609 0.52014Z" fill="#7E7E7E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="26" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <span>Острое</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="6">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M6.1311 21.7928V26H19.8689V21.7928C17.7843 23.0026 15.427 23.7104 13 23.7104C10.5729 23.7104 8.21568 23.0026 6.1311 21.7928Z" fill="#7E7E7E"/>
                                <path d="M0.0253906 8.4462V9.20941C0.0253906 9.98228 0.108123 10.7482 0.263156 11.499H25.7367C25.8918 10.7482 25.9745 9.98228 25.9745 9.20941V8.4462H0.0253906Z" fill="#7E7E7E"/>
                                <path d="M13 22.184C18.439 22.184 23.543 18.1314 25.3151 13.0255H0.684937C2.45706 18.1314 7.56099 22.184 13 22.184Z" fill="#7E7E7E"/>
                                <path d="M9.89624 5.34247H11.4227C11.4227 5.18453 11.454 5.14296 11.6205 4.9487C11.8457 4.686 12.1859 4.28913 12.1859 3.56154C12.1859 2.83405 11.8457 2.43713 11.6206 2.17449C11.4541 1.98017 11.4227 1.9386 11.4227 1.78062C11.4227 1.62279 11.454 1.58122 11.6205 1.38706C11.8457 1.12441 12.1859 0.727491 12.1859 0H10.6595C10.6595 0.157832 10.6281 0.19935 10.4616 0.393562C10.2365 0.656207 9.89624 1.05308 9.89624 1.78062C9.89624 2.50821 10.2364 2.90513 10.4616 3.16783C10.6281 3.36209 10.6595 3.40366 10.6595 3.56154C10.6595 3.71948 10.6281 3.76104 10.4615 3.95531C10.2364 4.218 9.89624 4.61492 9.89624 5.34247Z" fill="#7E7E7E"/>
                                <path d="M13.7123 5.34247H15.2387C15.2387 5.18453 15.27 5.14296 15.4366 4.9487C15.6617 4.686 16.0019 4.28913 16.0019 3.56154C16.0019 2.83405 15.6617 2.43713 15.4366 2.17449C15.2701 1.98017 15.2387 1.9386 15.2387 1.78062C15.2387 1.62279 15.27 1.58122 15.4366 1.38706C15.6617 1.12441 16.0019 0.727491 16.0019 0H14.4755C14.4755 0.157832 14.4441 0.19935 14.2776 0.393562C14.0525 0.656207 13.7123 1.05308 13.7123 1.78062C13.7123 2.50821 14.0525 2.90513 14.2776 3.16783C14.4441 3.36209 14.4755 3.40366 14.4755 3.56154C14.4755 3.71948 14.4441 3.76104 14.2776 3.95531C14.0525 4.218 13.7123 4.61492 13.7123 5.34247Z" fill="#7E7E7E"/>
                                <path d="M17.5283 6.86886H19.0547C19.0547 6.71093 19.0861 6.66936 19.2526 6.4751C19.4778 6.2124 19.8179 5.81553 19.8179 5.08794C19.8179 4.36045 19.4778 3.96353 19.2527 3.70088C19.0861 3.50657 19.0547 3.465 19.0547 3.30702C19.0547 3.14918 19.0861 3.10761 19.2526 2.91345C19.4778 2.65081 19.8179 2.25389 19.8179 1.5264H18.2915C18.2915 1.68423 18.2602 1.72575 18.0937 1.91996C17.8685 2.18261 17.5283 2.57947 17.5283 3.30702C17.5283 4.03461 17.8685 4.43153 18.0937 4.69423C18.2601 4.88849 18.2915 4.93006 18.2915 5.08794C18.2915 5.24587 18.2602 5.28744 18.0937 5.4817C17.8685 5.7444 17.5283 6.14132 17.5283 6.86886Z" fill="#7E7E7E"/>
                                <path d="M6.0802 6.86886H7.60662C7.60662 6.71093 7.63796 6.66936 7.8045 6.4751C8.02964 6.2124 8.36983 5.81553 8.36983 5.08794C8.36983 4.36045 8.02964 3.96353 7.80455 3.70088C7.63801 3.50657 7.60662 3.465 7.60662 3.30702C7.60662 3.14918 7.63796 3.10761 7.8045 2.91345C8.02964 2.65081 8.36983 2.25389 8.36983 1.5264H6.84341C6.84341 1.68423 6.81207 1.72575 6.64554 1.91996C6.42044 2.18261 6.0802 2.57947 6.0802 3.30702C6.0802 4.03461 6.42044 4.43153 6.64554 4.69423C6.81207 4.88849 6.84341 4.93006 6.84341 5.08794C6.84341 5.24587 6.81207 5.28744 6.64548 5.4817C6.42044 5.7444 6.0802 6.14132 6.0802 6.86886Z" fill="#7E7E7E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="26" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <span>Горячее</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="7">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M9.34079 5.42325C10.647 5.42325 11.851 5.86877 12.8092 6.61555L14.716 2.06679C14.1952 1.82909 13.6173 1.69547 13.0084 1.69547C10.8615 1.69547 9.09307 3.34324 8.89929 5.44039C9.04507 5.4291 9.19227 5.42325 9.34079 5.42325Z" fill="#7E7E7E"/>
                                <path d="M14.8336 5.73184C15.4114 5.53212 16.0312 5.42331 16.676 5.42331C17.1879 5.42331 17.6841 5.4921 18.156 5.62023L20.0224 1.16794L17.2364 0L14.8336 5.73184Z" fill="#7E7E7E"/>
                                <path d="M16.6761 6.94864C15.6677 6.94864 14.743 7.31265 14.0254 7.91553C14.5576 8.70182 14.8971 9.62854 14.9759 10.6275H20.7788C20.5544 8.56194 18.8004 6.94864 16.6761 6.94864Z" fill="#7E7E7E"/>
                                <path d="M13.4434 10.6275C13.219 8.56195 11.465 6.9487 9.34072 6.9487C7.21646 6.9487 5.46242 8.562 5.23804 10.6275H13.4434Z" fill="#7E7E7E"/>
                                <path d="M22.2285 12.1529H3.77279L3.77136 14.2274L4.37664 14.3484C5.54915 14.5829 6.42564 15.5389 6.55768 16.7274C6.75009 18.459 7.95789 19.8835 9.6382 20.3574L11.1779 20.7838V22.5716H10.1573C9.44529 22.5716 8.77671 22.8497 8.27471 23.3546C7.7727 23.8596 7.49854 24.5297 7.50271 25.2418L7.50713 26H18.5097L18.5141 25.2417C18.5182 24.5297 18.2441 23.8595 17.7421 23.3546C17.2401 22.8497 16.5714 22.5716 15.8594 22.5716H14.8389V20.7714L16.3731 20.359L16.3821 20.3565C18.0589 19.8836 19.2667 18.4591 19.4591 16.7275C19.5912 15.5391 20.4677 14.583 21.6402 14.3485L22.2285 14.2308V12.1529Z" fill="#7E7E7E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="26" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span>Холодное</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="8">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.7617 6.2756V17.1975C14.6978 16.151 15.7775 15.2423 16.9417 14.4498C17.6682 13.9552 18.1602 13.138 18.2072 12.213C18.2424 11.5193 18.0322 10.8759 17.6559 10.3617C17.2904 9.86218 17.3116 9.18526 17.6723 8.68222C18.0114 8.20945 18.2109 7.62998 18.2109 7.0038C18.2109 5.88138 17.5697 4.90897 16.6336 4.43244C16.1361 4.1792 15.8379 3.64543 15.8769 3.08857C15.8816 3.02103 15.8841 2.95283 15.8841 2.88407C15.8841 1.29127 14.5928 0 13 0C11.4071 0 10.1158 1.29127 10.1158 2.88412C10.1158 2.95288 10.1182 3.02108 10.123 3.08862C10.162 3.64553 9.86386 4.17925 9.36636 4.43249C8.43025 4.90902 7.78899 5.88143 7.78899 7.00385C7.78899 7.63003 7.98856 8.2095 8.32758 8.68227C8.68827 9.18531 8.70955 9.86223 8.34398 10.3618C7.96769 10.8759 7.75761 11.5193 7.79275 12.213C7.83967 13.138 8.33174 13.9552 9.05822 14.4499C10.2224 15.2424 11.3021 16.1511 12.2382 17.1975V6.2756H13.7617Z" fill="#7E7E7E"/>
                            <path d="M24.4962 7.60749C24.1424 7.1756 24.084 6.56704 24.3436 6.07283C24.375 6.01291 24.4046 5.95142 24.4323 5.88845C25.0726 4.42996 24.4094 2.72853 22.9509 2.08818C21.4924 1.44788 19.791 2.11113 19.1506 3.56962C19.123 3.63259 19.0978 3.69597 19.075 3.75975C19.0079 3.94693 18.9024 4.11369 18.7698 4.25299C18.8755 4.38517 18.9743 4.52329 19.0646 4.66761C19.5028 5.36753 19.7344 6.17541 19.7344 7.00391C19.7344 7.91589 19.4586 8.78953 18.9364 9.53342C19.4975 10.3335 19.7784 11.3089 19.7286 12.2902C19.6593 13.6556 18.938 14.9338 17.799 15.7092C16.7994 16.3897 15.9166 17.132 15.1687 17.9193L13.7617 21.124V17.1975C13.5752 17.406 13.3938 17.6195 13.2192 17.8392L13 18.115L12.7808 17.8392C12.6061 17.6195 12.4248 17.406 12.2383 17.1975V21.124L10.8313 17.9192C10.0834 17.1319 9.20054 16.3897 8.20096 15.7091C7.06194 14.9337 6.34059 13.6556 6.27137 12.2902C6.22161 11.3089 6.50253 10.3335 7.06356 9.53337C6.54138 8.78953 6.26558 7.91584 6.26558 7.00386C6.26558 6.17536 6.4972 5.36748 6.93539 4.66756C7.02573 4.52324 7.1245 4.38512 7.23017 4.25294C7.09758 4.11364 6.99206 3.94688 6.92503 3.7597C6.90223 3.69592 6.87699 3.63254 6.84936 3.56957C6.20906 2.11108 4.50759 1.44783 3.0491 2.08813C1.59061 2.72848 0.927357 4.42991 1.56766 5.88845C1.59528 5.95142 1.62489 6.01286 1.65642 6.07283C1.91602 6.56709 1.85757 7.17565 1.50383 7.60749C0.838236 8.4201 0.642017 9.56831 1.09321 10.596C1.34493 11.1694 1.76063 11.6197 2.26108 11.9163C2.79357 12.2319 3.08515 12.8432 2.95124 13.4475C2.81337 14.0696 2.87964 14.7432 3.19073 15.3642C3.60551 16.1923 4.3846 16.7428 5.24859 16.9036C6.63319 17.1613 7.98707 17.5593 9.26488 18.1411L12.2383 24.9136V26H13.7617V24.9136L16.7351 18.1411C18.0129 17.5592 19.3668 17.1613 20.7513 16.9036C21.6153 16.7427 22.3944 16.1923 22.8092 15.3642C23.1203 14.7431 23.1866 14.0696 23.0487 13.4475C22.9148 12.8431 23.2064 12.2319 23.7389 11.9163C24.2393 11.6197 24.655 11.1693 24.9067 10.596C25.358 9.56826 25.1617 8.4201 24.4962 7.60749Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Вегетерианское</span>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="catalog__categories-element" data-id="9">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.4598 19.4975L16.2752 2.61392C14.7996 0.129651 11.2024 0.126351 9.72476 2.61392L0.540662 19.4975C-0.967846 22.036 0.858502 25.2505 3.81514 25.2505H22.1845C25.1387 25.2505 26.9683 22.0386 25.4598 19.4975ZM13 22.2037C12.1602 22.2037 11.4766 21.52 11.4766 20.6802C11.4766 19.8404 12.1602 19.1568 13 19.1568C13.8398 19.1568 14.5234 19.8404 14.5234 20.6802C14.5234 21.52 13.8398 22.2037 13 22.2037ZM14.5234 16.1099C14.5234 16.9497 13.8398 17.6334 13 17.6334C12.1602 17.6334 11.4766 16.9497 11.4766 16.1099V8.49272C11.4766 7.6529 12.1602 6.96928 13 6.96928C13.8398 6.96928 14.5234 7.6529 14.5234 8.49272V16.1099Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Опасное</span>
                </div>
            </div>-->
            <div class="swiper-slide">
                <div class="catalog__categories-element--search">
                    <div class="catalog__categories-element-image">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.40824 18.8155C11.5792 18.8155 13.5749 18.0687 15.1673 16.8304L20.3371 22L22 20.3372L16.8302 15.1676C18.0697 13.5742 18.8165 11.5786 18.8165 9.40774C18.8165 4.22055 14.5957 0 9.40824 0C4.22077 0 0 4.22055 0 9.40774C0 14.5949 4.22077 18.8155 9.40824 18.8155ZM9.40824 2.35193C13.2997 2.35193 16.4644 5.51646 16.4644 9.40774C16.4644 13.299 13.2997 16.4635 9.40824 16.4635C5.51676 16.4635 2.35206 13.299 2.35206 9.40774C2.35206 5.51646 5.51676 2.35193 9.40824 2.35193Z" fill="white"/>
                        </svg>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <div class="catalog__tags catalog__tags--show" data-id="34">
        <div class="swiper-container catalog__tags-container catalog__tags-container-foods">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <button class="catalog__tags-element catalog__tags-element--selected" data-id="34">Все</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="93">Кулинария</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="146">Слойка</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="196">Печенье</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="201">Пирожные</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="234">Сэндвич</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="256">Торты</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="286">Хлеб</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="586">Выпечка</button>
                </div>
            </div>
         </div>
    </div>
    <div class="catalog__tags" data-id="33">
        <div class="swiper-container catalog__tags-container catalog__tags-container-drinks">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <button class="catalog__tags-element catalog__tags-element--selected" data-id="33">Все</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="41">Горячие напитки</button>
                </div>
                <div class="swiper-slide">
                    <button class="catalog__tags-element" data-id="324">Холодные напитки</button>
                </div>
            </div>
         </div>
    </div>
    <div class="catalog__content">
        <div class="catalog__list catalog__list--show catalog__list-food" data-id="34"></div>
        <div class="catalog__list catalog__list-drinks" data-id="33"></div>
        <div class="catalog__list catalog__list-hit" data-id="hits"></div>
    </div>

    `;

    this.element.insertAdjacentHTML('beforeend', this.template);

    const card = new CreateCardItemProductCardNew();
    const drinksContainer = this.element.querySelector('.catalog__list-drinks');
    const foodContainer = this.element.querySelector('.catalog__list-food');
    const hitContainer = this.element.querySelector('.catalog__list-hit');
    const searchButton = this.element.querySelector('.catalog__categories-element--search');

    searchButton.addEventListener('click', this.openSearchPage);

    this.renderFoodCategory(foodContainer, card);
    this.renderDrinksCategory(drinksContainer, card);
    this.renderHitsCategory(hitContainer, card);

    return super.create(this.element);
  }

  openSearchPage() {
    toggleModalPageOrderSearch.rendering();
  }

  renderFoodCategory(container, el) {
    Object.entries(dataProductApi.successData.categoriesTree[4].children[34].children).forEach(([key, value]) => {
      this.catalogContent = this.element.querySelector('.catalog__content');
      this.catalogList = document.createElement('div');
      this.catalogList.classList.add('catalog__list');
      this.catalogList.setAttribute('data-id', key);
      this.catalogContent.append(this.catalogList);
      this.containerCat = this.element.querySelector(`.catalog__list[data-id='${key}']`);
      value.items.forEach((i) => {
        this.containerCat.append(el.create(dataProductApi.successData.items[i]));
        container.append(el.create(dataProductApi.successData.items[i]));
      });
    });
  }

  renderDrinksCategory(container, el) {
    Object.entries(dataProductApi.successData.categoriesTree[4].children[33].children).forEach(([key, value]) => {
      this.catalogContent = this.element.querySelector('.catalog__content');
      this.catalogList = document.createElement('div');
      this.catalogList.classList.add('catalog__list');
      this.catalogList.setAttribute('data-id', key);
      this.catalogContent.append(this.catalogList);
      this.containerCat = this.element.querySelector(`.catalog__list[data-id='${key}']`);
      value.items.forEach((i) => {
        this.containerCat.append(el.create(dataProductApi.successData.items[i]));
        container.append(el.create(dataProductApi.successData.items[i]));
      });
    });
  }

  renderHitsCategory(container, el) {
    Object.values(dataProductApi.successData.hits).forEach((item) => {
      container.append(el.create(dataProductApi.successData.items[item]));
    });
  }
}
