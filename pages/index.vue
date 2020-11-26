<template>
  <div class="page">
    <div class="top-page">
      <h1>Каталог</h1>
      <div class="sort-by">
        <p>Сортировать по: </p>
        <div @click="toggle()" class="text-grey clickable" :class="{'openDropDown' : dropDowns}">
          <span class="flex-center">&nbsp;{{sortItem}}<DropIcon/></span>
          <div class="dropdown-content" >
            <a @click="sortBy('цене')">По цене</a>
            <a @click="sortBy('популярности')">По популярности</a>
          </div>
        </div>

      </div>

    </div>
    <div class="col-2">
      <div class="category">
        <ul>
          <li v-for="category in categories" @click="setActive(category.name,category.id)" :class="{'selected': isActive(category.name)}"><a>{{ category.name }}</a></li>
        </ul>
      </div>
      <div class="col-4">
        <div class="card-margin" v-for="product in products" :key="product.id">
          <div class="cardIndex">
            <div class="color-gold starInCard flex-center">
              <Star />
              <p>4.5</p>
            </div>
            <a href="javascript:void(0)" @click="addToCart(product)">
              <Cart class="icon-grey-light cartInCard" />
            </a>

            <img :src="'https://frontend-test.idaproject.com'+product.photo" alt="Avatar" style="width:100%">
            <div>
              <p>{{product.name}}</p>
              <p><b>{{product.price}} ₽</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}){
    const products = await $axios.$get('https://frontend-test.idaproject.com/api/product',{params: {category:1}});
    const categories = await $axios.$get('https://frontend-test.idaproject.com/api/product-category');
    const activeItem = categories[0].name;
    return {products,categories,activeItem};
  },
  data () {
    return {
      sortItem: 'цене',
      dropDowns: false,
      products: [],
      categories:[],
      activeItem:'',
    }
  },
  methods:{
    addToCart(product){
      this.$addProduct(product);
    },
    setActive(item,index){
      this.activeItem = item;
      this.changeProduct(index);
    },
    isActive(item){
      return item === this.activeItem;
    },
    sortBy(type){
      this.sortItem = type;
    },
    toggle() {
      this.dropDowns = !this.dropDowns;
    },
    async changeProduct(index){
      this.products = await this.$axios.$get('https://frontend-test.idaproject.com/api/product',{params: {category:index}});
    }
  }
}
</script>
