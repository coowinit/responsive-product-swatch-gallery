document.addEventListener('DOMContentLoaded', function () {
  /**
   * 图片数据配置
   * swatch：右侧色卡图片
   * images：左侧对应的场景大图
   */
  var deckGalleryData = [
    {
      id: 'ash-wood',
      name: 'Ash Wood',
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
      swatch: 'images/swatches/cedar.svg',
      images: [
        'images/scenes/cedar-1.svg',
        'images/scenes/cedar-2.svg',
        'images/scenes/cedar-3.svg',
        'images/scenes/cedar-4.svg',
      ]
    },
    {
      id: 'coffee',
      name: 'Coffee',
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
  var mainSwiper = null;
  var thumbSwiper = null;

  var mainWrapper = document.getElementById('deckMainWrapper');
  var thumbWrapper = document.getElementById('deckThumbWrapper');
  var swatchesEl = document.getElementById('deckSwatches');

  /**
   * 渲染右侧色卡
   */
  function renderSwatches() {
    swatchesEl.innerHTML = '';

    deckGalleryData.forEach(function (item, index) {
      var button = document.createElement('button');

      button.type = 'button';
      button.className = 'deck-swatch' + (index === 0 ? ' is-active' : '');
      button.setAttribute('data-color-id', item.id);
      button.setAttribute('aria-label', item.name);
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

      button.innerHTML =
        '<img src="' + item.swatch + '" alt="' + item.name + '">' +
        '<span class="deck-swatch-title">' + item.name + '</span>';

      swatchesEl.appendChild(button);
    });
  }

  /**
   * 根据色卡 ID 获取对应数据
   */
  function getColorData(colorId) {
    return deckGalleryData.find(function (item) {
      return item.id === colorId;
    }) || deckGalleryData[0];
  }

  /**
   * 渲染左侧主图和缩略图
   */
  function renderGallery(colorId) {
    var colorData = getColorData(colorId);

    mainWrapper.innerHTML = '';
    thumbWrapper.innerHTML = '';

    colorData.images.forEach(function (imgUrl, index) {
      var mainSlide = document.createElement('div');
      mainSlide.className = 'swiper-slide';
      mainSlide.innerHTML =
        '<img class="zoom-img" src="' + imgUrl + '" alt="' + colorData.name + ' image ' + (index + 1) + '">' +
        '<span class="deck-zoom-hint"></span>';

      mainWrapper.appendChild(mainSlide);

      var thumbSlide = document.createElement('div');
      thumbSlide.className = 'swiper-slide';
      thumbSlide.innerHTML =
        '<img src="' + imgUrl + '" alt="' + colorData.name + ' thumbnail ' + (index + 1) + '">';

      thumbWrapper.appendChild(thumbSlide);
    });

    initSwiper();
    bindZoomEvents();
  }

  /**
   * 初始化或重置 Swiper
   */
  function initSwiper() {
    if (mainSwiper) {
      mainSwiper.destroy(true, true);
    }

    if (thumbSwiper) {
      thumbSwiper.destroy(true, true);
    }

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
   * 点击色卡后切换左侧图片组
   */
    function bindSwatchEvents() {
        swatchesEl.addEventListener('click', function (event) {
            var swatch = event.target.closest('.deck-swatch');

            if (!swatch) {
            return;
            }

            var colorId = swatch.getAttribute('data-color-id');

            activeColorId = colorId;

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

  renderSwatches();
  renderGallery(activeColorId);
  bindSwatchEvents();
});
