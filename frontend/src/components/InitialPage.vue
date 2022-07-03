<template>
  <section class="jumbotron text-center">
	<div class="container">
	  <h1 class="jumbotron-heading">My Friend's Wedding</h1>
	  <p class="lead text-muted">It's a pleasure to me do this website for my friend! Joke! It's a real code challenger for the Anchor interview.</p>
	  <p>
		<a href="https://www.instagram.com/carlosleonciopinheiro/" target="_blank" class="btn my-2">
			Follow us in Instagram!
		</a>
	  </p>
	</div>
  </section>

  <div class="album py-5 bg-light">
	<div class="container">

	  <div class="row">
	  
		<div class="col-md-4" v-for="(file, index) in fileInfos" :key="index">
		  <div class="card mb-4 box-shadow">
			<img class="card-img-top" :src="file.photo_bucket" alt="Card image cap">
			<div class="card-body">
			  <p class="card-text"><b>Photo by:</b> {{ file.user_id.$oid }}</p>
			  <div class="d-flex justify-content-between align-items-center">
				<div class="btn-group">
				  <a :href="'/photo/' + file._id.$oid" class="btn btn-sm btn-outline-secondary">View</a>
				</div>
				<small class="text-muted">{{ file.created_at.$date.replace("T", " ").replace("Z", "").substring(0,16) }}</small>
			  </div>
			</div>
		  </div>
		</div>
		
		<div class="col-md-12">
			<button class="btn" style="width: 100%" @click="morePhotos" v-if="!maxImage">
				More
			</button>
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
	import ApiService from "../services/ApiService"
		
    export default {
		name: "initial-page",
		data() {
			return {
				fileInfos: [],
				divPhotoExpand: false,
				photoExpanded: null,
				photoId: null,
				alertDanger: false,
				alertSuccess: false,
				skip: 0,
				limit: 3,
				loading: true,
				maxImage: false,
			};
		},
		methods: {
			redirectByPhoto(id){
				window.location.href = '/photo/' + id
			},
			morePhotos(){
				this.loading = true
				ApiService.getConfirmedPhotos(this.limit,this.skip).then(response => {
					if (response.data.length < this.limit)
						this.maxImage = true
					this.fileInfos = this.fileInfos.concat(response.data)
					this.skip++
					this.loading = false
				});
			}
		},
		mounted() {
			ApiService.getConfirmedPhotos(this.limit,this.skip).then(response => {
				if (response.data.length < this.limit)
					this.maxImage = true
				this.fileInfos = response.data
				this.skip++
				this.loading = false
			});
		}
	};
	
</script>

