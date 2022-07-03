<template>
	<header v-if="showHeader">
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
				It's a webpage for my friend's wedding by Anchor Code Challenger.
			  </p>
            </div>
            <div v-if="isLoggedIn" class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Welcome</h4>
              <ul class="list-unstyled">
                <li><a href="/" class="text-white">Home</a></li>
                <li><a href="/home" class="text-white">My Gallery</a></li>
				<li><a href="/login" class="text-white">Logout</a></li>
              </ul>
            </div>
			<div v-if="!isLoggedIn" class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Welcome</h4>
              <ul class="list-unstyled">
				<li><a href="/" class="text-white">Home</a></li>
                <li><a href="/login" class="text-white">Login</a></li>
                <li><a href="/register" class="text-white">Register</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="/" class="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path fill="currentColor" d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/>
			</svg>
            <strong>&nbsp; My Friend's Wedding</strong>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>

	<main>
		<router-view></router-view>
	</main>
	
	<footer class="text-muted" v-if="showFooter">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>It's a code challenger!</p>
        <p>Yes! I used bootstrap! Source: <a href="https://getbootstrap.com/docs/4.0/examples/">Code</a></p>
      </div>
    </footer>
</template>

<script>
	import { useRoute } from 'vue-router'
	
	export default {
	  name: 'app',
		data() {
			return {
				custom: {}
			};
		},
		computed: {
			showFooter() {
				const route = useRoute()
				this.custom.url = route.path
				switch (this.custom.url){
					case '/login':
					case '/register':
						return false
					default:
						return true
				}
			},
			showHeader() {
				const route = useRoute()
				this.custom.url = route.path
				switch (this.custom.url){
					case '/login':
					case '/register':
						return false
					default:
						return true
				}
			},
			isLoggedIn() {
				return localStorage.getItem("token") != null;
			},
		},
	}
</script>
