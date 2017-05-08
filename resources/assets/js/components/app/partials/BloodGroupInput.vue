<template>
	<select name="bloodgroup" id="bloodgroup" class="form-control __input" v-model="selectedblood" @click="">
		<option value="">--select a bloodgroup--</option>
		<option v-for="bloodgroup in bloodgroups" :value="bloodgroup.id">{{ bloodgroup.name }}</option>
	</select>
</template>
<script>
	export default{
		data(){
			return {
				bloodgroups:[],
				selectedblood:''
			}
		},
		props:['selected'],
		created() {
			var context = this;
			axios.get('/get-bloodgroups')
			.then(function(response){
				console.log(response.data);
				context.bloodgroups = response.data;
			})
			.catch(function(data){
				console.log(data);
				console.log('this is an error report')
			});
		}
	}
</script>
<style></style>