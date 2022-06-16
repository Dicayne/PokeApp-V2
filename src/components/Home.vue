<script>
import axios from 'axios'

export default {
	data() {
		return {
			pokeList: [],
			pokeInfo:{
				id: 0,
				name: "",
				type: [],
				taille: 0,
				poid: 0,
				image: "",
				comp: [],
			},
			pokeInfoList: []
		}
	},
	mounted(){
		axios.get("https://pokeapi.co/api/v2/pokemon")
			.then(response =>{
				this.pokeList = response.data.results;
				for (let i = 0; i < this.pokeList.length; i++) {
					this.getInfo(this.pokeList[i]?.url)
				}
			})
			.catch(error =>{
				console.log(error);
			})
	},
	computed: {
		sortedPoke: function (key) {
			return this.pokeInfoList.sort(((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)))
		},
		sortedPokeID: function () {
			return this.pokeInfoList.sort(((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
		},
		sortedPokeName: function () {
			return this.pokeInfoList.sort(((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
		},
		sortedPokeType: function () {
			return this.pokeInfoList.sort(((a,b) => (a.type[0]?.type?.name > b.type[0]?.type?.name) ? 1 : ((b.type[0]?.type?.name > a.type[0]?.type?.name) ? -1 : 0)))
		}
	},
	methods:{
		async getInfo(url){
			await axios.get(url)
						.then(response =>{
							this.pokeInfo = new Object;
							this.pokeInfo.id = response.data.id;
							this.pokeInfo.name = response.data.name;
							this.pokeInfo.type = response.data.types;
							this.pokeInfo.taille = response.data.height;
							this.pokeInfo.poid = response.data.weight;
							this.pokeInfo.image = response.data.sprites.front_default;
							this.pokeInfo.comp = response.data.abilities;

							this.pokeInfoList.push(this.pokeInfo);
						})
						.catch(error =>{
							console.log(error);
						})
		},
	}
}

</script>

<template>
	<div class="row justify-content-center ms-0 me-0">
		<div class="col-auto">
			<div class="d-flex mt-4 align-items-center justify-content-center">
				<table class="table table-responsive">
					<tbody>
						<tr v-for="pokemon in sortedPokeID">
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
									<div class="pokeName"> {{ pokemon?.name }} </div>
									</router-link>
								</td>
								<br>
								<div class="pokeType" v-for="type in pokemon?.type" >
									{{ type?.type?.name }} &nbsp;
								</div>
							</td>
							<td class="pokeID"> {{ pokemon?.id }}</td>
							<td class="item"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
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
</style>
