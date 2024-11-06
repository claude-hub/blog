<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  try {
    window.addAds()
    console.log('AdUnit loaded')
  } catch (e) {
    console.log(e)
  }
})
</script>

<!-- 文章广告单元 -->
<template>
  <div class="gads">
    <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6215606311487003"
     data-ad-slot="9556755034"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  </div>
</template>
