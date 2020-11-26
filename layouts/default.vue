<template>
  <div>
    <div class="sidenav" :style="{width: width}">
      <div class="rowJustifyBetween">
        <a href="javascript:void(0)" class="closebtn" @click="closeCart()">&times;</a>
        <a>Корзина</a>
      </div>
      <div v-if="myCarts.length !== 0 && !success">
        <p>Товары в корзине</p>
        <div class="cardDrawer col-2-3-1" v-for="product in myCarts">
          <img style="width: 100%" :src="'https://frontend-test.idaproject.com'+product.photo" alt="Avatar">
          <div>
            <p class="text-grey">{{product.name}}</p>
            <p><b>{{product.price}} ₽</b></p>
            <div class="color-gold flex-center">
              <Star />
              <span>4.5</span>
            </div>
          </div>
          <a href="javascript:void(0)" @click="deleteFromCart(product.id)"><Trash /></a>
        </div>
        <div class="col-full form">
          <p>Оформить заказ</p>
          <input v-model="form.name" placeholder="Ваше имя" type="text">
          <input v-model="form.phone" placeholder="Телефон" type="text">
          <input v-model="form.address" placeholder="Адрес" type="text">
          <button @click="sendQuery()" class="customButton">Отправить</button>
        </div>
      </div>
      <div class="successForm" v-else-if="success">
        <img src="https://s3-alpha-sig.figma.com/img/52a3/0d6f/3ffaad4f7ea8d74012e7562ac2119d17?Expires=1607299200&Signature=TFutDXeNRDOiUDyRrjgQfGA9DRj9KPIpOObJR4AtWQlGJW3rkPg1gR71TPHx7nO6uB4b1aOP7jer~ezqv-7tKGpd4mqosSMOVBbqvpIsn~qypHEl8Umlj4-vU0TVgawPJl2bUEXmFf8dBemMZ-KOE2mrTM~dB3MQZEu9DVEaanwZ1Nv9iZAgmvLr192l1-Pw2sEWKtO6Wg~kQe2kxNbzehRX2~KodqJ2rxAw337-jQwejy9tSByRSO6nBvnOobZ8NrA32JXM-pT1nevf14lUxG3iUNg5NAqVE-Rmu4UAClmRnPVOj2COFXQcxzCqAc05iR8Uem0tgueVbw6oYGcrZQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="">
        <p><b>Заявка успешно отправлена</b></p>
        <p>Вскоре с вами свяжется наш менеджер</p>
      </div>
      <div v-else>
        <p>Пока что вы ничего не добавили
          в корзину.</p>
        <div class="col-full">
          <button @click="closeCart()" class="customButton">Перейти к выбору</button>
        </div>

      </div>

    </div>
    <div :class="{'overlay':isOpen}">
      <div class="header">
        <a href="/" class="logo">TestList</a>
        <div class="header-right">
          <a style="position: relative" @click="openCart()">
            <Cart/>
            <span ref="cartLength" class="badge">{{ myCarts.length }}</span></a>
        </div>
      </div>
      <Nuxt/>
    </div>
  </div>
</template>
<script>
import localStorage from 'reactive-localstorage';
export default {
  data() {
    return {
      width: '0',
      isOpen:false,
      myCarts: [],
      form:{
        name:'',
        phone:'',
        address: ''
      },
      success:false
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    // Упрощение работы с localstorage
    localStorage.on('change', (key, value) => {
      this.loadData();
    });
  },
  methods: {
    sendQuery(){
      this.success = true;
      localStorage.setItem('cart', JSON.stringify([]));
    },
    loadData(){
      this.myCarts = JSON.parse(localStorage.getItem('cart'));
    },
    openCart() {
      this.width = '30vw';
      this.isOpen = true;
    },
    closeCart() {
      this.width = '0';
      this.isOpen = false;
      this.success = false;
    },
    deleteFromCart(product){
      this.$delete_from_cache(this.myCarts,product);
    }
  },
}
</script>

