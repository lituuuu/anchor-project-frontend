<template>
    <div class="card">
		<h3>Home</h3>

		<button class="btn btn-primary btn-block" v-on:click="postRegister">Test JWT</button>

		<hr>
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
			}
        },
		methods: {
			postRegister(data){
				
				let config = {
				  headers: {
					"x-access-token": localStorage.getItem("token"),
				  }
				}
				
				axios.get("http://127.0.0.1:5000/validatejwt", config).then((response)=> 
					console.log(response)
				).catch((b)=> 
					console.log("erro :/")
				);
			}
		}
		
    }
</script>