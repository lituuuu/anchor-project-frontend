<template>
    <div class="card">
            <h3>Sign Up</h3>
 
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg" name="login" v-model="login" placeholder="Login"/>
            </div>
 
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" name="email" v-model="email" placeholder="Email" />
            </div>
 
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" name="password" v-model="password" placeholder="Password"/>
            </div>
 
            <button class="btn btn-primary btn-block" v-on:click="postRegister">Sign Up</button>

			<hr>
			
			<div class="alert alert-danger" role="alert" :style="alertStyle">
				{{alerts.message}}
			</div>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">Sign in</router-link>
            </p>
    </div>
</template>
 
<script>
	import axios from 'axios'
		
    export default {
        data() {
            return {
				login: null,
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
				axios.post("http://127.0.0.1:5000/register", {
					login:this.login,
					email:this.email,
					password:this.password,
				}, { validateStatus: (status) => status === 200 }).then((response)=> 
					window.location.href = '/login'
				).catch((b)=> {
					this.alerts.message = "Error, try another username"
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