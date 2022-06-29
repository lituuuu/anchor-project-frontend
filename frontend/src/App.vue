<template>	
	<span v-if="isLoggedIn">
		<div class="navbar">
			<a v-on:click="logout">Logout</a>
		</div>		
    </span>
	<router-view></router-view>	
</template>

<script>
	export default {
	  name: 'app',
	  computed : {
		  isLoggedIn : function(){ return localStorage.getItem("token") !== null}
		},
		methods: {
		  logout (){
			localStorage.removeItem("token")
			window.location.href = '/login'
		  }
		},
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>