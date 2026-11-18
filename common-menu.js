/*
 * サイト共通メニュー
 * ページを追加するときは、下の SITE_PAGES に1項目追加してください。
 * 公開前のページは available: false、公開したら true に変更します。
 */
(() => {
  'use strict';

  const SITE_PAGES = [
    {
      title: '悪いしりとり',
      href: 'index.html',
      available: true,
      description: 'さまざまな禁止条件で、しりとりを遊ぶページです。'
    },
    {
      title: '文字列同士の関係',
      href: 'relations.html',
      available: true,
      description: '文字列同士の関係を判定し、図で確認するページです。'
    },
    {
      title: 'WQO解説',
      href: 'wqo.html',
      available: false,
      description: '前順序・整列性・WQOなどを解説するページです。'
    },
    {
      title: 'サイトマップ',
      href: 'sitemap.html',
      available: true,
      description: 'このサイトのページ一覧です。'
    }
  ];

  // サイトマップでも同じ一覧を使えるようにする。
  window.SITE_PAGES = SITE_PAGES;

  const menuRoot = document.getElementById('site-menu');
  if (menuRoot) {
    const currentFile = (() => {
      const lastPart = window.location.pathname.split('/').filter(Boolean).pop();
      return !lastPart || !lastPart.includes('.') ? 'index.html' : lastPart;
    })();

    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'サイト内メニュー');

    const inner = document.createElement('div');
    inner.className = 'site-nav__inner';

    const brand = document.createElement('a');
    brand.className = 'site-nav__brand';
    brand.href = './index.html';
    brand.textContent = 'WQO SHIRITORI';
    brand.setAttribute('aria-label', '悪いしりとり トップページ');
    inner.appendChild(brand);

    const list = document.createElement('div');
    list.className = 'site-nav__links';

    SITE_PAGES.forEach((page) => {
      const isCurrent = page.href === currentFile;
      let item;

      if (page.available) {
        item = document.createElement('a');
        item.href = `./${page.href}`;
        item.textContent = page.title;
        if (isCurrent) {
          item.classList.add('is-current');
          item.setAttribute('aria-current', 'page');
        }
      } else {
        item = document.createElement('span');
        item.className = 'is-coming-soon';
        item.textContent = page.title;
        item.setAttribute('aria-disabled', 'true');
        item.title = 'このページは準備中です';
      }

      item.classList.add('site-nav__link');
      list.appendChild(item);
    });

    inner.appendChild(list);
    nav.appendChild(inner);
    menuRoot.replaceChildren(nav);
  }

  // sitemap.html に一覧を自動生成する。
  const sitemapRoot = document.getElementById('sitemap-list');
  if (sitemapRoot) {
    const list = document.createElement('div');
    list.className = 'sitemap-list';

    SITE_PAGES.forEach((page) => {
      const item = document.createElement('section');
      item.className = 'sitemap-item';

      const heading = document.createElement('h2');
      heading.className = 'sitemap-item__title';

      const status = document.createElement('span');
      status.className = page.available
        ? 'sitemap-status sitemap-status--available'
        : 'sitemap-status sitemap-status--planned';
      status.textContent = page.available ? '公開中' : '準備中';

      if (page.available) {
        const link = document.createElement('a');
        link.href = `./${page.href}`;
        link.textContent = page.title;
        heading.appendChild(link);
      } else {
        const label = document.createElement('span');
        label.textContent = page.title;
        heading.appendChild(label);
      }

      heading.appendChild(status);

      const description = document.createElement('p');
      description.className = 'sitemap-item__description';
      description.textContent = page.description;

      item.append(heading, description);
      list.appendChild(item);
    });

    sitemapRoot.replaceChildren(list);
  }
})();
