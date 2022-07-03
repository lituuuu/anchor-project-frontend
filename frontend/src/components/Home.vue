<template>
	<div class="album" v-if="alert.show">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div v-bind:class="{alert: true, 'alert-danger': !alert.success, 'alert-success': alert.success}" role="alert">{{ message }}</div>
				</div>
			</div>
		</div>
	</div>
		
	<div class="album py-2">
		<div class="container">
			<div class="row">		
				<div class="col-md-3"></div>
				<div class="col-md-6" >
					<div class="card mb-4 box-shadow">
						<div class="card-header text-center">
							Upload Photo (.jpg or .jpeg)
						</div>
						<div class="card-body">
							<div class="form-group text-center">
								<label class="btn btn-default">
									<input type="file" ref="file" @change="selectFile" />
								</label>
							</div>
							
							<div class="form-group text-center">
								<button class="btn" :disabled="!selectedFiles" @click="upload">
									Upload
								</button>
							</div>
						
						
							<div v-if="currentFile" class="progress">
								<div
									class="progress-bar progress-bar-info progress-bar-striped"
									role="progressbar"
									:aria-valuenow="progress"
									aria-valuemin="0"
									aria-valuemax="100"
									:style="{ width: progress + '%' }"
								>
									{{ progress }}%
								</div>
							</div>							
						</div>						
					</div>
				</div>
				
			</div>
		</div>
	</div>

	<div class="album py-5 bg-light">
		<div class="container">
		  <div class="row">
			<div class="col-md-12">
				<button class="btn" style="width: 100%" @click="morePhotos" v-if="!maxImage">
					More
				</button>
			</div>
			
		  </div>
		</div>
	  </div>


	<div class="album">
		<div class="container">
			<div class="row">						
				<div class="col-md-12" >
					<div class="card mb-4 box-shadow">
						<div class="card-header text-center">
							Uploaded Photos (.jpg or .jpeg)
						</div>
						<div class="row">
							<div class="col-md-3" v-for="(file, index) in fileInfos" :key="index">
							  <div class="card mb-3 box-shadow" style="margin-top:10px;">
								<img class="card-img-top" :src="file.photo_bucket" alt="Card image cap" v-bind:class="(file.pendent)?'opacity_pendent':''">
								<div class="card-body">
								  <div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
									  <a :href="'/photo/' + file._id.$oid" class="btn btn-sm">View</a>
									  <button @click="removePhoto(file._id.$oid)" class="btn btn-sm">Remove</button>								  
									</div>
								  </div>
								</div>
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
	import ApiService from "../services/ApiService"
		
    export default {
		name: "upload-files",
		data() {
			return {
				loading: true,
				selectedFiles: undefined,
				currentFile: undefined,
				progress: 0,
				message: "",
				fileInfos: [],
				divPhotoExpand: false,
				photoExpanded: null,
				photoId: null,				
				alert: {
					success: true,
					show: false,
				},
				photoNotApproved: false,
				skip: 0,
				limit: 12,
				maxImage: false
			};
		},
		methods: {
			selectFile() {
			  this.selectedFiles = this.$refs.file.files;
			},
			upload() {
				this.alert.show = false
				this.progress = 0;
				this.currentFile = this.selectedFiles.item(0);
				ApiService.upload(this.currentFile, event => {
					this.progress = Math.round((100 * event.loaded) / event.total);
				})
				.then(response => {
					this.message = "Image uploaded with success";
					this.alert.show = true
					this.alert.success = true
					this.skip = 0
					document.location.reload(true)
				})
				.catch((e) => {					
					this.progress = 0;
					this.message = e;
					this.alert.show = true
					this.alert.success = false
					this.currentFile = undefined;
				});
				this.selectedFiles = undefined;
				
			},
			morePhotos(){
				this.loading = true
				ApiService.getPhotos(this.limit, this.skip).then(response => {
					if (response.data.length < this.limit)
						this.maxImage = true
					this.fileInfos = this.fileInfos.concat(response.data)
					this.skip++
					this.loading = false
				});
			},
			removePhoto(id){
				ApiService.removePhoto(id).then(response => {
					document.location.reload(true);
				}).catch((e)=> {
				console.log(e)
					this.message = e.response.statusText;
					this.alert.show = true
					this.alert.success = false
				});;	
			}
		},
		mounted() {
			ApiService.getPhotos(this.limit, this.skip).then(response => {
				if (response.data.length < this.limit)
					this.maxImage = true
				this.fileInfos = response.data
				this.skip++
				this.loading = false
			});
		}
	};
</script>