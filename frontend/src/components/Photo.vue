<template>
	<div v-if="!loading">
		<div class="album py-5">
			<div class="container">
				<div class="row">	
					<!--<div class="col-md-12">
						Back
					</div>-->
					<div class="col-md-9">
						<div class="card mb-4 box-shadow">
							<div class="card-header text-center">
								Photo
							</div>
							<div class="card-body">
								<div style="background-color: #000; width: 100%; height: 100%; text-align: center">
									<img :src="image.url" class="grid-image" />
								</div>
							</div>						
						</div>
					</div>
					<div class="col-md-3" >
						<div class="card mb-4 box-shadow">
							<div class="card-header text-center">
								Details
							</div>
							<div class="card-body">
								<div style="text-align: center" >
									<button @click="like" class="like-button">
										<svg v-if="image.like.hasLike" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
											<path fill="currentColor" d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/>
										</svg>
										<svg v-if="!image.like.hasLike" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
											<path fill="currentColor" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
										</svg>
									</button>
									<br />
									{{image.like.count}}
								</div>
								<hr />
								<div style="text-align: center" >
									<button class="btn" v-if="image.attr.pendent" @click="photoApprove">
										Approve
									</button>
								</div>
							</div>						
						</div>
					</div>
					<div class="col-md-12">
						<div class="card mb-4 box-shadow">
							<div class="card-header text-center">
								Comments
							</div>
							<div class="card-body">
							
								<div class="input-group mb-3" v-if="isLoggedIn">
									<input type="text" class="form-control" name="message" v-model="message" placeholder="Write a comment...">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary" type="button" @click="postComment">Send</button>
									</div>
								</div>
								
								<div class="col-md-12">
									<div class="comment"
									  v-for="(comment, index) in image.comments"
									  :key="index"
									>
										{{comment.message}} <br>
										<small>
											Posted in {{comment.created_at.$date.replace("T", " ").replace("Z", "").substring(0,16)}}
										</small>
									</div>
								</div>
								<div class="col-md-12">
									<br />
									<button class="btn" style="width: 100%" @click="getComment" v-if="!maxImage">
										More
									</button>
								</div>
							
							</div>						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="custom_loading" v-if="loading">
		<img src="../assets/loading.gif"/>
	</div>
</template>

<script>
	import {ref} from "vue"
	import { useRoute } from 'vue-router'
	import ApiService from "../services/ApiService"
		
    export default {
		name: "photo-detail",
		data() {
			return {
				alertDanger: false,
				message: '',
				image: {
					id: null,
					url: null,
					attr: null,
					comments: [],
					like: {
						count: 0,
						hasLike: false,
					}
				},
				loading: true,
				skip: 0,
				limit: 30,
				maxImage: false
			};
		},
		methods: {
			redirectByPhoto(id){
				window.location.href = '/photo/' + id
			},
			like(){
				if(this.isLoggedIn){
					ApiService.postLike(this.image.id).then(response => {
						if (response.data._id == null){
							this.image.like.hasLike = false;
							this.image.like.count--;
						}else{
							this.image.like.hasLike = true;
							this.image.like.count++;
						}
					}).catch((b)=> {
						console.log(b)
					});;
				}
			},
			postComment(){
				if(this.isLoggedIn){
					ApiService.postComment(this.image.id, this.message).then(response => {
						document.location.reload(true);
					}).catch((b)=> {
						console.log(b)
					});;
				}
			},
			getComment(){
				if(this.isLoggedIn){
					ApiService.getComments(this.image.id, this.limit, this.skip).then(response => {
						if (response.data.length < this.limit)
							this.maxImage = true
						this.image.comments = this.image.comments.concat(response.data)
						this.skip++
						this.loading = false
					}).catch((b)=> {
						console.log(b)
					});;
				}
			},
			photoApprove(){
				if(this.isLoggedIn){
					ApiService.confirmPhoto(this.image.id).then(response => {
						document.location.reload(true);
					}).catch((b)=> {
						console.log(b)
					});;					
				}
			}
		},
		mounted() {
			const route = useRoute()
			ApiService.getPhotoAndValues(route.params["id"], this.limit, this.skip).then(response => {
				this.image.id = route.params["id"]
				this.image.url = response.data.gallery.photo_bucket
				this.image.attr = response.data.gallery
				this.image.comments = response.data.comments
				this.image.like.count = response.data.likes.count
				this.image.like.hasLike = response.data.likes.hasLike
				this.loading = false
				this.skip++
				if (response.data.comments.length < this.limit)
					this.maxImage = true
			}).catch((b)=> {
				window.location.href = '/'
			});;
		},
		computed: {
			isLoggedIn() {
				return localStorage.getItem("token") != null;
			},
		},
	};
</script>

