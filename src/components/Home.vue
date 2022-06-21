<script>
import axios from 'axios'

export default {
	data() {
		return {
			dataGetPokemon: [],
			pokeInfoList: [],
			sorting: "id",
			count: 0,
			next_apiUrl: "",
			previous_apiUrl: "",
			idSearch: "",
		}
	},
	mounted(){
		axios.get("https://pokeapi.co/api/v2/pokemon")
			.then(response =>{
				this.dataGetPokemon = response.data.results;
				this.count = response.data.count;
				this.next_apiUrl = response.data.next === null ? "" : response.data.next;
				this.previous_apiUrl = response.data.previous === null ? "" : response.data.previous;
				console.log(this.count + "    " + this.next_apiUrl);
				for (let i = 0; i < this.dataGetPokemon.length; i++) {
					axios.get(this.dataGetPokemon[i]?.url)
						.then(response =>{
							this.pokeInfoList.push({
								id: response.data.id,
								name: response.data.name,
								type: response.data.types,
								image: response.data.sprites.front_default,
							})
						})
						.catch(error =>{
							console.log(error);
						})
				}
			})
			.catch(error =>{
				console.log(error);
			})
	},
	methods:{
		sortedPoke(key) {
			if (key != "type")
				return this.pokeInfoList.sort(((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)))
			else
			{
				this.pokeInfoList.sort(((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
				return this.pokeInfoList.sort(function(a, b){
					if (a[key][0]?.type?.name > b[key][0]?.type?.name)
						return 1;
					else if (a[key][0]?.type?.name < b[key][0]?.type?.name)
						return -1;
					else if (a[key]?.length > b[key]?.length)
						return 1;
					else if (a[key]?.length < b[key]?.length)
						return -1;
				})
			}
		},
		filteredPoke(arr, search) {
			return arr.filter(function (el) {
				return  el.id?.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1 ||
						el.type[0]?.type?.name?.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1 ||
						el.name?.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1
			})
		},
		pagiUpdate(NextPrev) {
			const url = NextPrev === "Next" ? this.next_apiUrl : this.previous_apiUrl;
			if (NextPrev === "Previous" && this.previous_apiUrl === "")
				return;
			axios.get(url)
			.then(response =>{
				this.pokeInfoList = [];
				this.dataGetPokemon = response.data.results;
				this.count = response.data.count;
				this.next_apiUrl = response.data.next === null ? "" : response.data.next;
				this.previous_apiUrl = response.data.previous === null ? "" : response.data.previous;
				console.log(response);
				for (let i = 0; i < this.dataGetPokemon.length; i++) {
					axios.get(this.dataGetPokemon[i]?.url)
						.then(response =>{
							this.pokeInfoList.push({
								id: response.data.id,
								name: response.data.name,
								type: response.data.types,
								image: response.data.sprites.front_default,
							})
						})
						.catch(error =>{
							console.log(error);
						})
				}
			})
			.catch(error =>{
				console.log(error);
			})
		},
		search(searchName) {
			console.log(searchName.target.value)
			this.idSearch = searchName;
		},
	}
}
</script>

<template>
	<div class="row justify-content-center mt-3 ms-0 me-0 fs-2">
		Sort your Pokedex By:
	</div>
	<div class="row justify-content-center mt-1 ms-0 me-0">
		<button class="btn btn-light sort_btn m-1" @click="sorting = 'id'">ID</button>
		<button class="btn btn-light sort_btn m-1" @click="sorting = 'name'">Name</button>
		<button class="btn btn-light sort_btn m-1" @click="sorting = 'type'">Type</button>
	</div>
	<div class="row justify-content-center mt-1 ms-0 me-0">
		<input style="max-width: 250px; text-align: center;" class="m-1" v-model="idSearch" placeholder="Search by Id / Name / Type">
	</div>

	<div class="row justify-content-center ms-0 me-0">
		<div class="col-auto"  v-for="index in 4">
			<div class="d-flex mt-5 align-items-center justify-content-center">
				<table class="table table-responsive">
					<tbody>
						<tr v-for="pokemon in filteredPoke(sortedPoke(sorting), idSearch).slice((index - 1) * 5, index * 5)"
							v-bind:style="pokemon?.id === idSearch ? 'background-color: rgb(0, 55, 92)' : 'background-color: none'"
						>
							<th class="item">
								<img v-bind:src="pokemon?.image" alt="avatar">
							</th>
							<td class="item">
								<td class="item-link">
									<router-link :to="{
										name: 'pokeID',
										params:{
											id: pokemon?.id,
										}
									}"
									class="RLUL"
									>
									<div class="pokeName text-capitalize"> {{ pokemon?.name }} </div>
									</router-link>
								</td>
								<br>
								<div class="pokeType text-capitalize" v-for="type in pokemon?.type" >
									{{ type?.type?.name }} &nbsp;
								</div>
							</td>
							<td class="pokeID"><b>{{ pokemon?.id }}</b></td>
							<td class="item"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="d-flex mt-4 align-items-center justify-content-center">
		<button class="btn btn-light m-1" @click="pagiUpdate('Previous')" v-bind:class="{ disabled : previous_apiUrl == '' }">
			Previous
		</button>
		<button class="btn btn-light m-1" @click="pagiUpdate('Next')" v-bind:class="{ disabled : next_apiUrl == ''}">
			Next
		</button>
	</div>
</template>

<style>

.title{
	font-size: x-large;
	font-weight: bold;
	color: white;
}
.item{
	color: grey;
}

.item-link .RLUL{
	color: grey;
	transition: 0.4s;
	text-decoration: none;
	display: inline-block;
}

.item-link:hover .RLUL{
	transform: scale(1.1);
	color: rgb(4,138,189);
}

.index{
	font-size: small;
}

.pokeName{
	font-size: large;
	color: white;
}

.pokeType{
	display: inline-block;
	font-size: small;
}
.pokeID{
	font-size: xx-large;
	color: white;
}

.sort_btn{
		max-width: 100px !important ;
}

</style>
