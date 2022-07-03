<template>
	<div class="album py-5">
		<div class="container">
			<div class="row">		
				<div class="col-md-3"></div>
				<div class="col-md-6" >
					<div class="card mb-4 box-shadow">
						<div class="card-header text-center">
							Sign Up
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
								<label>Email address</label>
								<input type="email" class="form-control" name="email" v-model="email" placeholder="Email" />
							</div>
				 
				 
							<div class="form-group">								
								<button class="btn btn-block" style="width:100%" v-on:click="postRegister">Sign Up</button>
								<div class="alert alert-danger" role="alert" :style="alertStyle">
									{{alerts.message}}
								</div>
							</div>
						</div>
						<div class="card-footer text-center">
							Has Account? <router-link :to="{name: 'login'}">Sign in</router-link>
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
				email: null,
				password: null,
				alerts: {
					display: "none",
					message: "",
				}
			}
        },
		methods: {
			postRegister(data){
				ApiService.register(this.username, this.password, this.email).then((response)=> 
					window.location.href = '/login'
				).catch((b)=> {
				console.log(b)
					this.alerts.message = b.response.data.message
					this.alerts.display = "inherit"
				});			
			}
		},
		 computed: {
			alertStyle() {
			  return {
				"display": this.alerts.display
			  };
			}
		}
		
    }
</script>