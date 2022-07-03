<template>
	<div class="album py-5">
		<div class="container">
			<div class="row">		
				<div class="col-md-4"></div>
				<div class="col-md-4" >
					<div class="card mb-4 box-shadow">
						<div class="card-header text-center">
							Sign In
						</div>
						<div class="card-body">
							<div class="form-group">
								<label>Username</label>
								<input type="text" class="form-control" name="username" v-model="username" placeholder="Username"/>
							</div>
				 
							<div class="form-group">
								<label>Password</label>
								<input type="password" class="form-control" name="password" v-model="password" placeholder="Password" />
							</div>
				 
				 
							<div class="form-group">								
								<button class="btn" style="width:100%" v-on:click="postLogin">Sign In</button>
								<div class="alert alert-danger" role="alert" :style="alertStyle">
									{{alerts.message}}
								</div>
							</div>
						</div>
						<div class="card-footer text-center">
							<router-link :to="{name: 'register'}">Register</router-link>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	<div class="background-without-login"></div>
</template>
 
<script>
	import ApiService from "../services/ApiService"
		
    export default {
        data() {
            return {
				username: null,
				password: null,
				alerts: {
					display: "none",
					message: "",
				}
			}
        },
		methods: {
			postLogin(data){
				ApiService.login(this.username, this.password).then(response => {
					localStorage.setItem("token", response.data.token)
					window.location.href = '/home'
				}).catch((b)=> {
					this.alerts.message = "Invalid username or password"
					this.alerts.display = "inherit"
				});;
			}
		},
		 computed: {
			alertStyle() {
			  return {
				"display": this.alerts.display
			  };
			}
		},
		mounted() {
			localStorage.removeItem("token")
		}
		
    }
</script>