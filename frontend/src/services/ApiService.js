import http from "../http-common";
class ApiService {
	upload(file, onUploadProgress) {
		let formData = new FormData();
		formData.append("file", file);
		return http.post("/gallery", formData, {
			headers: {
				"x-access-token": localStorage.getItem("token"),
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress
		});
	}
	getPhotos(limit, skip) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.get("/gallery?limit="+limit+"&page="+skip, config);
	}
	confirmPhoto(id) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.post("/gallery/confirm", {
			id: id
		},config);
	}	
	removePhoto(id) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.delete("/gallery/"+id, config);
	}	
	getConfirmedPhotos(limit, page) {
		return http.get("/gallery/confirmed?limit="+limit+"&page="+page);
	}
	getLikeCount(photo_id) {
		return http.get("/like/" + photo_id);
	}
	postLike(photo_id) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.post("/like", {
			gallery_id: photo_id
		}, config);
	}
	postComment(photo_id, message) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.post("/comment", {
			gallery_id: photo_id,
			message: message,
		}, config);
	}
	getComments(photo_id, limit, skip) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.get("/comment/" +photo_id+"?limit="+limit+"&page="+skip, config);
	}
	getPhotoAndValues(photo_id, limit, skip) {
		let config = {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			}
		}
		return http.get("/gallery/" +photo_id+"?limit="+limit+"&page="+skip, config);
	}
	login(username, password){
		return http.post("/login", {
			username:username,
			password:password,
		}, { validateStatus: (status) => status === 200 });
	}
	register(username, password, email){
		return http.post("/register", {
			username:username,			
			password:password,
			email:email,
		}, { validateStatus: (status) => status === 201});
	}
}
export default new ApiService();