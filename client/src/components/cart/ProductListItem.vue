<template>
  <div class="m-4" v-if="item">
    <div class="row gy-3 mb-4">
      <div class="col-lg-5">
        <div class="me-lg-5">
          <div class="d-flex">
            <img
              :src="`http://localhost:8081${item.productID.thumbnail}`"
              class="border rounded me-3"
              style="width: 96px; height: 96px"
              alt="..."
            />
            <div class="">
              <h5 class="nav-link">{{ item.productID.title }}</h5>
              <p class="text-muted">{{ item.productID.des }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap"
      >
        <div class="">
          <select @click.prevent="updateQuantity(item.productID._id)" style="width: 100px" class="form-select me-4" v-model="select_number">
            <option :value="number" v-for="number in item.productID.number" :key="number">{{number}}</option>
          </select>
        </div>
        <div class="">
          <text class="h6">{{ formatPrice(totalPriceItem) }}đ</text> <br />
          <small class="text-muted text-nowrap">
            {{ formatPrice(item.productID.new_price) }}đ / sản phẩm
          </small>
        </div>
      </div>
      <div
        class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2"
      >
        <div class="float-md-end">
          <!-- <a
                        href="#!"
                        class="btn btn-light border px-2 icon-hover-primary"
                        ><i class="fas fa-heart fa-lg px-1 text-secondary"></i
                      ></a> -->
          <div
            class="btn btn-light border text-danger icon-hover-danger"
            @click="removeItem(item.productID._id)"
          >
            Xóa</div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/Cart.js";
import axios from "axios";
import { ref, computed} from "vue";
export default {
  name: "ProductListItem",
  props: {
    item: [Object, Array]
  },
  setup(props, context) {

    // function updateCountCart(number){
    //   cartStore.$state.countCart += number;
    // }

    const updateQuantity = async (productID) => {
      await axios.put(`http://localhost:8081/api/cartitem/product/${productID}`, {
        quantity: select_number.value
      })
      cartStore.getItemCart();
    }

    const select_number = ref(props.item.quantity);
    const item = ref(props.item);

    const totalPriceItem = computed(() => {
      return item.value.price * select_number.value;
    });
    const cartStore = useCartStore();
    // Xóa sản phẩm khỏi giỏ hàng
    const removeItem = async (productID) => {
        context.emit('remove-item-from-cart', productID);
    }

    // Định dạng giá sản phẩm
    function formatPrice(value) {
      if (!value) {
        return '';
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return {
      formatPrice, select_number, totalPriceItem, removeItem, updateQuantity
    };
    
  },
};
</script>
