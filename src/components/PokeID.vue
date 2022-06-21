<script>
	import axios from 'axios'

	export default {
		data(){
			return{
				id: this.$route.params.id,
				pokeInfo: []
			}
		},
		mounted(){
			axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
			.then(response =>{
				this.pokeInfo = response.data;
				console.log(response);
			})
			.catch(error =>{
				console.log(error);
			})
		}
	}
</script>

<template>
	<h1 class="row justify-content-center mt-3 ms-0 me-0 fs-1 text-uppercase fw-bold text-decoration-underline">
		{{ pokeInfo?.name}}
	</h1>
	<div class="flex_box">
		<div class="item-box">
			<ul class="list-group">
				<li class="list-group-item text-capitalize">
					<u><b>ID</b></u>: {{ pokeInfo?.id}}
				</li>
				<li class="list-group-item text-capitalize">
					<u><b>Type</b></u>: <div style="display: inline-block;" v-for="type in pokeInfo?.types" > {{ type?.type?.name }} &nbsp; </div>
				</li>
				<li class="list-group-item">
					<u><b>Height</b></u>: {{ pokeInfo?.height}} dm
				</li>
				<li class="list-group-item">
					<u><b>Weight</b></u>: {{ pokeInfo?.weight}} hg
				</li>
				<li class="list-group-item text-capitalize" v-for="cap in pokeInfo?.abilities">
					<u><b>Capacity</b></u>: {{ cap?.ability?.name }} &nbsp;
				</li>
			</ul>
		</div>
		<div class="item-box">
			<img v-bind:src="pokeInfo?.sprites?.front_default" alt="avatar" style="min-width: 300%;">
		</div>
	</div>
</template>

<style>

.flex_box{
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: center;
}
</style>
