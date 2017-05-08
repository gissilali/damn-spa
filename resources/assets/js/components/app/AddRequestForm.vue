<template>
	<transition name="fade">
		<div class="dialog" v-if="showForm">
		<button class="btn btn-success" @click="closeForm">close</button>
		<div class="container">
			<div class="row">
	        <div class="col-md-6 col-md-offset-3">
	        	<div class="panel panel-default __card">
	        		<div class="panel-body">
	        			<form method="post" @submit.prevent="submitForm">
		        			<input type="hidden" name="_token">
		        			<div class="form-group">
		        				<label for="name">Name</label>
		        				<input type="name" name="name" id="name" class="form-control __input" v-model="fields.name" @blur="formSubmitable" @keyup="formSubmitable">
		        			</div>
		        			<div class="form-group">
		        				<label for="email">Email</label>
		        				<input type="email" name="email" id="email" class="form-control __input" v-model="fields.email" @blur="formSubmitable" @keyup="formSubmitable" >
		        			</div>
		        			<div class="form-group">
		        				<label for="bloodtype">Blood Type</label>
		        				<select name="bloodgroup" id="bloodgroup" class="form-control __input" v-model="fields.bloodGroupId" @blur="formSubmitable" @click="formSubmitable">
									<option value="">--select a bloodgroup--</option>
									<option v-for="bloodgroup in bloodgroups" :value="bloodgroup.id">{{ bloodgroup.name }}</option>
								</select>
		        			</div>
		        			<div class="form-group">
		        				<button class="btn __button __button-red __button-full-width" :disabled="formNotSubmitable">Register Donor</button>
		        			</div>
	        			</form>
	        		</div>
	        	</div>
	        </div>
	    </div>
		</div>
	</div>
	</transition>
</template>
<script>
	import BloodGroupInput from './partials/BloodGroupInput.vue'
	export default {
			created:function(){
				var context = this;
				Event.$on('add-request', function() {
					context.openForm();
				});
				axios.get('/get-bloodgroups')
				.then(function(response){
					console.log(response.data);
					context.bloodgroups = response.data;
				})
				.catch(function(data){
					console.log(data);
					console.log('this is an error report')
				});
			},
			data() {
				return {
					showForm: false,
					formHidden: true,
					fields: {
						name: '',
						email: '',
						bloodGroupId: '',

					},
					bloodgroups: [],
					formNotSubmitable: true
				}
			},
			methods: {
				emailValid() {
					var re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
					if(!re.test(this.fields.email)){
						return false;
					} else {
						return true;
					}
				},
				openForm() {
					return this.showForm = true;
				},

				closeForm() {
					return this.showForm = false;
				},

				fieldsEmpty() {
					if(this.fields.email == '' || this.fields.name == '' || this.fields.bloodGroupId == '') {
						return true;
					}else {
						return false;
					}
				},

				formSubmitable() {
					if(this.emailValid() && this.fieldsEmpty()==false){
						this.formNotSubmitable = false;
					}
				},

				submitForm() {
					this.isLogingIn = true;
					var context = this;
					axios.post('/register-donor',{
						email: context.fields.email,
						name: context.fields.name,
						blood_group_id: context.fields.bloodGroupId
					}).then(function(data){
						console.log(data);
					}).catch(function(error){
						console.log(error);
					});
				}
			},
		}
</script>
<style scoped>
	.dialog{
		/*display:block !important;*/
		position:absolute;
		top:0;
		bottom:0;
		right:0;
		left:0;
		background:rgba(0,0,0,0.4);
		z-index:10000;
		height:100%;
		overflow:hidden;
		transition:all 300ms;
	}
	.__hidden{
		margin-top:-20px;
	}
	.visible{
		margin-top:20px;
	}
	.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>