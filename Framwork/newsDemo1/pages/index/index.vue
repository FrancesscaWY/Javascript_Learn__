<template>
	<!-- //搜索栏 -->
	<ais-instant-search :search-client="searchClient" index-name="demo_ecommerce">
	    <ais-search-box />
		<!-- 滚动封面新闻 -->
		<view class="t_content">
		<a-carousel autoplay>
		    <div><h3>1</h3></div>
		    <div><h3>2</h3></div>
		    <div><h3>3</h3></div>
		    <div><h3>4</h3></div>
		  </a-carousel>	
		</view>
		<!--  -->
		<!-- //具体的新闻框 -->
	    <ais-hits>
	      <template v-slot:item="{ item }">
	        <p>{{ item.name }}</p>
	      </template>
	    </ais-hits>
	  </ais-instant-search>
	
	
</template>

<script>
	
	import algoliasearch from 'algoliasearch/lite';
	import 'instantsearch.css/themes/algolia-min.css';
	export default {
		data() {
			return {
				title: 'Hello',
				 searchClient: algoliasearch(
				        'B1G2GM9NG0',
				        'aadef574be1f9252bb48d4ea09b5cfe5'
				      ),
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	body {
	  font-family: sans-serif;
	  padding: 1em;
	}

	:deep(.slick-slide) {
	  text-align: center;
	  height: 160px;
	  line-height: 160px;
	  background: #364d79;
	  overflow: hidden;
	}	
	:deep(.slick-slide h3) {
	  color: #fff;
	}

</style>
