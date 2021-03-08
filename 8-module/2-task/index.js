import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = document.createElement('div');
    this.elem.insertAdjacentHTML('afterbegin', `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.elem.classList.add('.products-grid');

    this.productsInner = this.elem.querySelector('.products-grid__inner');

    this.products.forEach(product => {
      const productCard = new ProductCard(product);
      this.productsInner.append(productCard.elem);
    });
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);

    let filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts === true && product.nuts === true) {
        return false;
      }
      if (this.filters.vegeterianOnly === true && product.vegeterian !== true) {
        return false;
      }
      if (this.filters.maxSpiciness && this.filters.maxSpiciness < product.spiciness) {
        return false;
      }
      return !(this.filters.category && this.filters.category !== product.category);
    });

    this.productsInner.innerHTML = '';

    filteredProducts.forEach(product => {
      const productCard = new ProductCard(product);
      this.productsInner.append(productCard.elem);
    });
  }
}
