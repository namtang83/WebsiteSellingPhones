<template>
    <div class="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3  row-cols-2">
      <ProductGridItem
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
</template>

<script>
import ProductGridItem from "./ProductGridItem.vue";
export default {
  name: "ProductGrid",
  props: {
    products: [Array, Object],
  },
  components: {
    ProductGridItem,
  },
};
</script>
