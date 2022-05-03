<template>
  <div>
    <div class="circle">
      <nuxt-link to='/create-note'
        class="inline-block smallP12px text-uppercase c-black"
      >
        <img src="../static/images/ic-transact.svg"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.circle {
  position: fixed;
  right: 80px;
  bottom: 35px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  line-height: 0.8;
  letter-spacing: 1.44px;
  z-index: 10;
}

@media (max-width: 768px) {
  .circle {
    right: 10px;
  }
}

.circle__content {
  display: table-cell;
  vertical-align: middle;
}
</style>
