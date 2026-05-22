document.addEventListener('DOMContentLoaded', function () {
  /**
   * 过滤逻辑说明：
   * any = 选择多个过滤按钮时，只要色卡命中其中任意一个标签就显示，适合 Browns + Greys 这类多色系同时展示。
   * all = 选择多个过滤按钮时，色卡必须同时命中全部标签才显示，适合 Popular + Browns 这类逐步缩小范围。
   */
  var FILTER_MATCH_MODE = 'any';

  /**
   * 过滤按钮配置
   * color：只用于按钮前面的小圆点颜色，不影响真正筛选逻辑。
   */
  var deckFilterOptions = [
    { id: 'all', name: 'All', isAll: true },
    { id: 'suncomfortable', name: 'SunComfortable' },
    { id: 'fire-rated', name: 'Fire-Rated' },
    { id: 'popular', name: 'Popular' },
    { id: 'browns', name: 'Browns', color: '#7a4b2f' },
    { id: 'greys', name: 'Greys', color: '#909090' },
    { id: 'neutrals', name: 'Neutrals', color: '#d8b996' },
    { id: 'reds', name: 'Reds', color: '#bd2f2f' }
  ];

  /**
   * 图片数据配置
   * swatch：右侧色卡图片
   * images：左侧对应的场景大图
   * filters：该色卡所属的过滤标签，可按真实产品属性自行调整
   */
  var deckGalleryData = [
    {
      id: 'ash-wood',
      name: 'Ash Wood',
      filters: ['popular', 'neutrals'],
      swatch: 'images/swatches/ash-wood.svg',
      images: [
        'images/scenes/ash-wood-1.svg',
        'images/scenes/ash-wood-2.svg',
        'images/scenes/ash-wood-3.svg',
        'images/scenes/ash-wood-4.svg'
      ]
    },
    {
      id: 'blue-black',
      name: 'Blue Black',
      filters: ['fire-rated', 'greys', 'neutrals'],
      swatch: 'images/swatches/blue-black.svg',
      images: [
        'images/scenes/blue-black-1.svg',
        'images/scenes/blue-black-2.svg',
        'images/scenes/blue-black-3.svg',
        'images/scenes/blue-black-4.svg'
      ]
    },
    {
      id: 'cedar',
      name: 'Cedar',
      filters: ['suncomfortable', 'popular', 'browns'],
      swatch: 'images/swatches/cedar.svg',
      images: [
        'images/scenes/cedar-1.svg',
        'images/scenes/cedar-2.svg',
        'images/scenes/cedar-3.svg',
        'images/scenes/cedar-4.svg'
      ]
    },
    {
      id: 'coffee',
      name: 'Coffee',
      filters: ['popular', 'fire-rated', 'browns'],
      swatch: 'images/swatches/coffee.svg',
      images: [
        'images/scenes/coffee-1.svg',
        'images/scenes/coffee-2.svg',
        'images/scenes/coffee-3.svg',
        'images/scenes/coffee-4.svg'
      ]
    },
    {
      id: 'red-brown',
      name: 'Red Brown',
      filters: ['browns', 'reds', 'fire-rated'],
      swatch: 'images/swatches/red-brown.svg',
      images: [
        'images/scenes/red-brown-1.svg',
        'images/scenes/red-brown-2.svg',
        'images/scenes/red-brown-3.svg',
        'images/scenes/red-brown-4.svg'
      ]
    },
    {
      id: 'red-wood',
      name: 'Red Wood',
      filters: ['suncomfortable', 'reds'],
      swatch: 'images/swatches/red-wood.svg',
      images: [
        'images/scenes/red-wood-1.svg',
        'images/scenes/red-wood-2.svg',
        'images/scenes/red-wood-3.svg',
        'images/scenes/red-wood-4.svg'
      ]
    },
    {
      id: 'smoke-grey',
      name: 'Smoke Grey',
      filters: ['popular', 'greys', 'neutrals'],
      swatch: 'images/swatches/smoke-grey.svg',
      images: [
        'images/scenes/smoke-grey-1.svg',
        'images/scenes/smoke-grey-2.svg',
        'images/scenes/smoke-grey-3.svg',
        'images/scenes/smoke-grey-4.svg'
      ]
    },
    {
      id: 'stone-grey',
      name: 'Stone Grey',
      filters: ['fire-rated', 'greys', 'neutrals'],
      swatch: 'images/swatches/stone-grey.svg',
      images: [
        'images/scenes/stone-grey-1.svg',
        'images/scenes/stone-grey-2.svg',
        'images/scenes/stone-grey-3.svg',
        'images/scenes/stone-grey-4.svg'
      ]
    },
    {
      id: 'teak',
      name: 'Teak',
      filters: ['suncomfortable', 'popular', 'browns', 'neutrals'],
      swatch: 'images/swatches/teak.svg',
      images: [
        'images/scenes/teak-1.svg',
        'images/scenes/teak-2.svg',
        'images/scenes/teak-3.svg',
        'images/scenes/teak-4.svg'
      ]
    }
  ];

  var activeColorId = deckGalleryData[0].id;
  var activeFilterIds = [];
  var mainSwiper = null;
  var thumbSwiper = null;

  var mainWrapper = document.getElementById('deckMainWrapper');
  var thumbWrapper = document.getElementById('deckThumbWrapper');
  var swatchesEl = document.getElementById('deckSwatches');
  var filterButtonsEl = document.getElementById('deckFilterButtons');
  var filterEmptyEl = document.getElementById('deckFilterEmpty');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 渲染过滤按钮
   */
  function renderFilterButtons() {
    filterButtonsEl.innerHTML = '';

    deckFilterOptions.forEach(function (filter) {
      var button = document.createElement('button');
      var isActive = filter.isAll ? activeFilterIds.length === 0 : activeFilterIds.indexOf(filter.id) !== -1;
      var dotHtml = '';

      button.type = 'button';
      button.className = 'deck-filter-btn' + (isActive ? ' is-active' : '');
      button.setAttribute('data-filter-id', filter.id);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

      if (filter.color) {
        dotHtml = '<span class="deck-filter-dot" style="--filter-color: ' + filter.color + ';"></span>';
      }

      button.innerHTML = dotHtml + escapeHtml(filter.name);
      filterButtonsEl.appendChild(button);
    });
  }

  /**
   * 判断某个色卡是否符合当前过滤条件
   */
  function isColorMatched(item) {
    var itemFilters = item.filters || [];

    if (activeFilterIds.length === 0) {
      return true;
    }

    if (FILTER_MATCH_MODE === 'all') {
      return activeFilterIds.every(function (filterId) {
        return itemFilters.indexOf(filterId) !== -1;
      });
    }

    return activeFilterIds.some(function (filterId) {
      return itemFilters.indexOf(filterId) !== -1;
    });
  }

  /**
   * 获取当前过滤后可见的色卡数据
   */
  function getVisibleGalleryData() {
    return deckGalleryData.filter(isColorMatched);
  }

  /**
   * 根据色卡 ID 获取对应数据
   */
  function getColorData(colorId) {
    return deckGalleryData.find(function (item) {
      return item.id === colorId;
    }) || null;
  }

  /**
   * 当前选中的色卡被过滤隐藏时，自动切换到第一个可见色卡
   */
  function syncActiveColorWithVisibleData() {
    var visibleData = getVisibleGalleryData();
    var isCurrentVisible = visibleData.some(function (item) {
      return item.id === activeColorId;
    });

    if (!visibleData.length) {
      activeColorId = '';
      return visibleData;
    }

    if (!isCurrentVisible) {
      activeColorId = visibleData[0].id;
    }

    return visibleData;
  }

  /**
   * 渲染右侧色卡
   */
  function renderSwatches(visibleData) {
    swatchesEl.innerHTML = '';

    visibleData.forEach(function (item) {
      var button = document.createElement('button');
      var isActive = item.id === activeColorId;

      button.type = 'button';
      button.className = 'deck-swatch' + (isActive ? ' is-active' : '');
      button.setAttribute('data-color-id', item.id);
      button.setAttribute('aria-label', item.name);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

      button.innerHTML =
        '<img src="' + item.swatch + '" alt="' + escapeHtml(item.name) + '">' +
        '<span class="deck-swatch-title">' + escapeHtml(item.name) + '</span>';

      swatchesEl.appendChild(button);
    });
  }

  function destroySwiperInstances() {
    if (mainSwiper) {
      mainSwiper.destroy(true, true);
      mainSwiper = null;
    }

    if (thumbSwiper) {
      thumbSwiper.destroy(true, true);
      thumbSwiper = null;
    }
  }

  /**
   * 没有匹配色卡时，清空左侧轮播
   */
  function renderEmptyGallery() {
    destroySwiperInstances();
    mainWrapper.innerHTML = '<div class="swiper-slide deck-empty-slide">No matching colors.</div>';
    thumbWrapper.innerHTML = '';
  }

  /**
   * 渲染左侧主图和缩略图
   */
  function renderGallery(colorId) {
    var colorData = getColorData(colorId);

    if (!colorData) {
      renderEmptyGallery();
      return;
    }

    mainWrapper.innerHTML = '';
    thumbWrapper.innerHTML = '';

    colorData.images.forEach(function (imgUrl, index) {
      var mainSlide = document.createElement('div');
      mainSlide.className = 'swiper-slide';
      mainSlide.innerHTML =
        '<img class="zoom-img" src="' + imgUrl + '" alt="' + escapeHtml(colorData.name) + ' image ' + (index + 1) + '">' +
        '<span class="deck-zoom-hint"></span>';

      mainWrapper.appendChild(mainSlide);

      var thumbSlide = document.createElement('div');
      thumbSlide.className = 'swiper-slide';
      thumbSlide.innerHTML =
        '<img src="' + imgUrl + '" alt="' + escapeHtml(colorData.name) + ' thumbnail ' + (index + 1) + '">';

      thumbWrapper.appendChild(thumbSlide);
    });

    initSwiper();
    bindZoomEvents();
  }

  /**
   * 初始化或重置 Swiper
   */
  function initSwiper() {
    destroySwiperInstances();

    thumbSwiper = new Swiper('.deck-thumb-swiper', {
      spaceBetween: 8,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesProgress: true,
      centeredSlides: false
    });

    mainSwiper = new Swiper('.deck-main-swiper', {
      spaceBetween: 10,
      loop: false,
      navigation: {
        nextEl: '.deck-main-next',
        prevEl: '.deck-main-prev'
      },
      thumbs: {
        swiper: thumbSwiper
      }
    });

    mainSwiper.on('slideChange', function () {
      resetAllZoom();
    });
  }

  /**
   * 取消所有图片放大状态
   */
  function resetAllZoom() {
    var zoomImages = document.querySelectorAll('.zoom-img');

    zoomImages.forEach(function (img) {
      img.classList.remove('is-zoomed');
      img.style.transformOrigin = 'center center';
    });
  }

  /**
   * 图片点击放大，鼠标移动时调整放大位置
   */
  function bindZoomEvents() {
    var zoomImages = document.querySelectorAll('.zoom-img');

    zoomImages.forEach(function (img) {
      img.addEventListener('click', function () {
        var isZoomed = img.classList.contains('is-zoomed');

        resetAllZoom();

        if (!isZoomed) {
          img.classList.add('is-zoomed');
        }
      });

      img.addEventListener('mousemove', function (event) {
        if (!img.classList.contains('is-zoomed')) {
          return;
        }

        var rect = img.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = x + '% ' + y + '%';
      });

      img.addEventListener('mouseleave', function () {
        if (!img.classList.contains('is-zoomed')) {
          img.style.transformOrigin = 'center center';
        }
      });

      img.addEventListener('touchmove', function (event) {
        if (!img.classList.contains('is-zoomed')) {
          return;
        }

        var touch = event.touches[0];
        var rect = img.getBoundingClientRect();
        var x = ((touch.clientX - rect.left) / rect.width) * 100;
        var y = ((touch.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = x + '% ' + y + '%';
      }, { passive: true });
    });
  }

  /**
   * 统一刷新：过滤按钮、右侧色卡、左侧轮播
   */
  function refreshGalleryByFilters() {
    var visibleData = syncActiveColorWithVisibleData();
    var hasVisibleData = visibleData.length > 0;

    renderFilterButtons();
    renderSwatches(visibleData);

    filterEmptyEl.hidden = hasVisibleData;

    if (hasVisibleData) {
      renderGallery(activeColorId);
    } else {
      renderEmptyGallery();
    }
  }

  /**
   * 点击过滤按钮：All 为重置按钮，其余按钮支持多选
   */
  function bindFilterEvents() {
    filterButtonsEl.addEventListener('click', function (event) {
      var button = event.target.closest('.deck-filter-btn');

      if (!button) {
        return;
      }

      var filterId = button.getAttribute('data-filter-id');

      if (filterId === 'all') {
        activeFilterIds = [];
      } else if (activeFilterIds.indexOf(filterId) === -1) {
        activeFilterIds.push(filterId);
      } else {
        activeFilterIds = activeFilterIds.filter(function (item) {
          return item !== filterId;
        });
      }

      refreshGalleryByFilters();
    });
  }

  /**
   * 点击色卡后切换左侧图片组
   */
  function bindSwatchEvents() {
    swatchesEl.addEventListener('click', function (event) {
      var swatch = event.target.closest('.deck-swatch');

      if (!swatch) {
        return;
      }

      activeColorId = swatch.getAttribute('data-color-id');

      document.querySelectorAll('.deck-swatch').forEach(function (item) {
        item.classList.remove('is-active');
        item.setAttribute('aria-pressed', 'false');
      });

      swatch.classList.add('is-active');
      swatch.setAttribute('aria-pressed', 'true');

      renderGallery(activeColorId);

      // 防止浏览器 button focus 样式影响选中边框显示
      swatch.blur();
    });
  }

  refreshGalleryByFilters();
  bindFilterEvents();
  bindSwatchEvents();
});
