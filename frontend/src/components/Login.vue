<template>
    <div class="card">
            <h3>Sign In</h3>
 
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control form-control-lg" name="login" v-model="login" placeholder="Login"/>
            </div>
 
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" name="password" v-model="password" placeholder="Password" />
            </div>
 
			<button class="btn btn-primary btn-block" v-on:click="postLogin">Sign In</button>
			<hr>
 
			<div class="alert alert-danger" role="alert" :style="alertStyle">
				{{alerts.message}}
			</div>
 
            <p class="forgot-password text-right mt-2 mb-4">
				<div class="col-md-12">
					<router-link to="/register">Register</router-link>
				</div>
            </p>
    </div>
</template>
 
<script>
	import axios from 'axios'
		
    export default {
        data() {
            return {
				login: null,
				password: null,
				alerts: {
					display: "none",
					message: "",
				}
			}
        },
		methods: {
			postLogin(data){
				axios.post("http://127.0.0.1:5000/login", {
					login:this.login,
					email:this.email,
					password:this.password,
				}, { validateStatus: (status) => status === 200 }).then(response=>  {
					localStorage.setItem("token", response.data)
					window.location.href = '/'
				}
				).catch((b)=> {
					this.alerts.message = "Invalid username or password"
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