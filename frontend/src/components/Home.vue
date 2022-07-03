<template>
	<div class="album py-5">
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
							<div class="alert alert-success" role="alert" v-if="alertSuccess">{{ message }}</div>
							<div class="alert alert-danger" role="alert" v-if="alertDanger">{{ message }}</div>
						</div>						
					</div>
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
							Upload Photo (.jpg or .jpeg)
						</div>
						<div class="card-body">
							<div class="row">
								<div
								  class="col-md-2"
								  v-for="(file, index) in fileInfos"
								  :key="index"
								>
									<a :href="'/photo/'+file._id.$oid">
										<img :src="file.photo_bucket" v-bind:class="(file.pendent)?'opacity_pendent':''" class="grid-image" />
									</a>
								</div>	
								
								<div class="col-md-12">
									<br/>
									<button class="btn" style="width: 100%" @click="morePhotos" v-if="!maxImage">
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
				alertDanger: false,
				alertSuccess: false,
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
				this.alertSuccess= false
				this.alertDanger= false
				this.progress = 0;
				this.currentFile = this.selectedFiles.item(0);
				ApiService.upload(this.currentFile, event => {
					this.progress = Math.round((100 * event.loaded) / event.total);
				})
				.then(response => {
					this.message = "Image uploaded with success";
					this.alertSuccess= true
					return ApiService.getPhotos();
				})
				.then(files => {
					this.fileInfos = files.data;
				})
				.catch(() => {
					this.progress = 0;
					this.message = "Could not upload the file!";
					this.alertDanger= true
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