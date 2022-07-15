import { fetchOrders } from './api';
import './app.css';

export let appElement;

function createApp() {
  const app = document.createElement('div');
  app.className = 'app';
  return app;
}

function createHeader() {
  const header = document.createElement('div');
  header.className = 'header';
  return header;
}

function fetchOrderAndRender(main) {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Loading...';
  main.appendChild(loading);

  fetchOrders().then((orders) => {
    main.removeChild(loading);

    orders.forEach((order) => {
      const listItem = document.createElement('div');
      listItem.style.backgroundColor = '#fafafa';
      listItem.className = 'list-item';
      main.appendChild(listItem);

      const itemTitleWrapper = document.createElement('div');
      listItem.appendChild(itemTitleWrapper);

      const title = document.createElement('div');
      title.className = 'list-item-title';
      title.textContent = order.name;
      itemTitleWrapper.appendChild(title);

      const place = document.createElement('div');
      place.className = 'list-item-place';
      place.textContent = order.city;
      itemTitleWrapper.appendChild(place);

      const price = document.createElement('div');
      price.className = 'list-item-price';
      price.textContent = `${order.price}€`;
      listItem.appendChild(price);
    });
  });
}

function reloadHandler(main) {
  fetchOrderAndRender(main);
}

export function render() {

  const app = createApp();
  const header = createHeader()

  app.appendChild(header);


  const headingWrapper = document.createElement('div');
  headingWrapper.style.display = 'flex';
  header.appendChild(headingWrapper);

  const heading = document.createElement('div');
  heading.className = 'title';
  heading.dataset.testid = 'title';
  heading.textContent = 'Glorders';
  headingWrapper.appendChild(heading);

  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = './assets/logo.svg';
  headingWrapper.appendChild(logo);

  const main = document.createElement('div');
  main.className = 'main';
  app.appendChild(main);

  const reloadButton = document.createElement('div');
  reloadButton.textContent = 'Reload';
  reloadButton.className = 'reload-button';
  reloadButton.addEventListener('click', () => reloadHandler(main));
  header.appendChild(reloadButton);

  fetchOrderAndRender(main);
  return app;
}
