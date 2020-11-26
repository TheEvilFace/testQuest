import Vue from 'vue'

function is_empty_array(arr) {
  return !(typeof arr !== 'undefined' && arr.length > 0);
}
function delete_from_cache(cached_data, removable_item_id) {
  for (let i = 0; i < cached_data.length; i++) {
    if (cached_data[i].id === removable_item_id) {
      cached_data.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cached_data))
}

function verify_cache(cachable_id) {
  let cached = JSON.parse(localStorage.getItem('cart'));
  if (!is_empty_array(cached)) {
    for (let i = 0; i < cached.length; i++) {
      if (cached[i].id == cachable_id) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

function addProduct(product) {
  let products = JSON.parse(localStorage.getItem('cart'));
  if (products != null) {
    if (verify_cache(product.id)) {
      delete_from_cache(products, product.id);
      return false;
    }else {
      products.push(product);
      localStorage.setItem('cart', JSON.stringify(products));
      return true;
    }
  } else {
    localStorage.setItem('cart', JSON.stringify(products));
  }
}


Vue.prototype.$is_empty_array = is_empty_array;
Vue.prototype.$addProduct = addProduct;
Vue.prototype.$verify_cache = verify_cache;
Vue.prototype.$delete_from_cache = delete_from_cache;

