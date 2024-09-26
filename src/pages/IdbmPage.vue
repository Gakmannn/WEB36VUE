<template>
  <template v-if="!id">
    <div class="flex jcc aic">
      <form class="flex fdc" @submit.prevent="find">
        <input type="text" v-model="title" placeholder="title">
        <p v-if="error" style="color:red">Введите название!</p>
        <select v-model="type">
          <option value="movie">movie</option>
          <option value="series">series</option>
          <option value="episode">episode</option>
        </select>
        <input type="submit" value="Find!">
      </form>
    </div>

    <div id="content" class="flex jcc">
      <div v-for="el of arr" :key="el.imdbID">
        <img :src="el.Poster" :alt="el.Title">
        <div>
          <p>{{el.Type}}</p>
          <b>{{el.Title}}</b>
          <p>{{el.Year}}</p>
          <RouterLink :to="'/idbm/' + el.imdbID">Details</RouterLink>
        </div>
      </div>
    </div>

    <div id="pagination" class="flex jcc">
      <template v-for="i of Math.ceil(total / 10)" :key="i">
        <template v-if="page < 5 || page > Math.ceil(total / 10) - 4">
          <button v-if="i < 6" @click="page = i">{{i}}</button>
          <p v-else-if="i == 6">...</p>
          <button v-else-if="i > Math.ceil(total / 10)-5" @click="page = i">{{i}}</button>
        </template>
        <template v-if="page >= 5 && page <= Math.ceil(total / 10) - 4">
          <button v-if="i == 1" @click="page = i">{{i}}</button>
          <p v-else-if="i == 2 && page!=5">...</p>
          <button v-if="i > page - 4 && i < page + 4" @click="page = i">{{i}}</button>
          <p v-else-if="i == Math.ceil(total / 10)-1">...</p>
          <button v-if="i == Math.ceil(total / 10)" @click="page = i">{{i}}</button>
        </template>
      </template>
    </div>
  </template>
  <template v-else>
    <h1 v-if="idbmEl.Error">{{idbmEl.Error}}</h1>
    <h1 v-else-if="!idbmEl.Title && !idbmEl.Error">Loading...</h1>
    <div v-else>
      <img :src="idbmEl.Poster" :alt="idbmEl.Title">
      <div>
        <p>{{ idbmEl.Type }}</p>
        <b>{{ idbmEl.Title }}</b>
        <p>{{ idbmEl.Year }}</p>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import axios from 'axios'
import {ref, watch, onMounted} from 'vue'
const props = defineProps(['id'])

type IDBM = {
  imdbID: string,
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
}

type IdbmEl = {
  Actors:string,
  Awards:string, 
  BoxOffice: string,
  Country: string,
  DVD: string,
  Director: string,
  Genre: string,
  Language: string,
  Metascore: string,
  Plot: string,
  Poster: string,
  Production: string,
  Rated: string,
  Ratings: any[],
  Released: string,
  Response: string,
  Runtime: string,
  Title: string,
  Type: string,
  Website: string,
  Writer: string,
  Year: string,
  imdbID: string,
  imdbRating: string,
  imdbVotes: string,
  Error?: string,
}

const idbmEl = ref({} as IdbmEl)
const arr = ref([] as IDBM[])
const title = ref('five')
const total = ref(0)
const page = ref(1)
const type = ref('movie')
const error = ref(false)

watch(()=>page.value, async()=>{
  find()
})

const find = async ()=>{
  if (!title.value) {
    error.value = true
    return
  }
  error.value = false
  const url = `http://www.omdbapi.com/?apikey=a821535d&s=${title.value}&type=${type.value}&page=${page.value}`
  const resp = await axios(url)
  
  total.value = +resp.data.totalResults
  arr.value = resp.data.Search
}

onMounted(async()=>{
  if (props.id) {
    console.log(props.id)
    const url = `http://www.omdbapi.com/?apikey=a821535d&i=${props.id}`
    const resp = await axios(url)
    idbmEl.value = resp.data
  }
})

watch(() => props.id, async()=>{
  if (props.id) {
    console.log(props.id)
    const url = `http://www.omdbapi.com/?apikey=a821535d&i=${props.id}`
    const resp = await axios(url)
    idbmEl.value = resp.data
  } else {
    idbmEl.value = {} as IdbmEl
  }
})

</script>

<style scoped>
.flex {
  display: flex;
  gap: 10px;
}

.fdc {
  flex-direction: column;
}

.jcc {
  justify-content: center;
}

.aic {
  align-items: center;
}

select {
  height: 22px;
}

form {
  background-color: blanchedalmond;
  border: 1px dashed blue;
  border-radius: 10px;
  padding: 20px;
}

#content {
  margin: 20px 0;
  flex-wrap: wrap;
}

#content>div {
  display: flex;
  width: 250px;
  height: 170px;
  gap: 10px;
  background-color: blanchedalmond;
  border: 1px dashed blue;
  border-radius: 10px;
  padding: 20px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}
</style>