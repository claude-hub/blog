<template>
	<div class="p-2">123123</div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
	try {
		console.log('AdUnit loaded');
	} catch (e) {
		console.log(e);
	}
});
</script>

<style scoped>
div {
	color: red;
}
</style>
