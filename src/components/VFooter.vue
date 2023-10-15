<template>
  <div class="footer">
    <ul class="list">
      <li class="list__item">Copyright 2023 © Pireverdiev Karlen.</li>
      <li class="list__item">All rights reserved.</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: $color--font-65;
  justify-content: space-between;
  transition: border-color 0.5s, color 0.5s;
  border-top: 1px solid $color--border;
  padding: 0.74em 2em;
}
</style>
