<template>
  <nav>

    <router-link to="/">Logout</router-link> 
  </nav>
    <div class="Logged">
      <form class="d-flex" role="search">
      <input  v-model="searchTerm" class="form-control me-2" type="search" placeholder="Dodaj kolejne Miasto" aria-label="Search">
      <button @click="addCity" class="btn btn-outline-success" type="submit">Dodaj</button>
      </form>
    <h1>Obserwowane miasta</h1>
    <ul>
      <li v-for="city in cities" :key="city.id">
        {{ city.name }} ({{ city.temp }}°C, {{ city.humidity }}%)
        <button @click="showChart(city.id)">Wykres</button>
        <button @click="deleteCity(city)">Usuń</button>
        <button @click="hideChart">Zamknij wykres</button>
      </li>
    </ul>
    <div v-if="showChartForCity" class="charts">
      <h1 v-if="showCurrentCityH">Wykres temperatury i wilgotności w mieście {{ currentCityName }}</h1>
      <!-- kod wykresu -->
      <div class="chart-container">
        <canvas id="temp"></canvas>
      </div>
      <div class="chart-container">
        <canvas  id="humidity"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
  data() {
    return {
      cities: [
      { id: 2643743, name: "London" },
        { id: 5128581, name: "New York" },
        { id: 2968815, name: "Paris" },
      ],
      showChartForCity: false,
      showCurrentCityH:true,
      currentCityName: "",
      currentCityData: [],
      searchTerm:"",
      tempChart: null,
      humidityChart: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura',
            backgroundColor: '#f87979',
            data: []
          },
          {
            label: 'Wilgotność',
            backgroundColor: '#7ac5cd',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
                y: {
                    beginAtZero: false
                }
            },
      }
      
      
    };
  },
  created() {
    this.fetchWeatherData();
    setInterval(() => {
      this.fetchWeatherData();
    }, 60000);
  },
  watch:{
    cities:{
      deep:true,
      handler(){
        this.fetchWeatherData();
      }
    }
  },
  methods: {
    async fetchWeatherData() {
      const API_KEY='9b2403ddb324ffabf1c05f8b056b9b71'
      for (let city of this.cities) {
        let response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${API_KEY}&units=metric&lang=pl`
          );
          city.temp = response.data.main.temp;
          city.humidity = response.data.main.humidity;
      }
    },
    showChart(cityId) {
      this.currentCityName = this.cities.find((city) => city.id === cityId).name;
this.currentCityData = this.cities.find((city) => city.id === cityId);
this.chartData.labels = [];
this.chartData.datasets[0].data = [];
this.chartData.datasets[1].data = [];
this.chartData.labels.push("Temp");
this.chartData.datasets[0].data.push({x: new Date(), y: this.currentCityData.temp});
this.chartData.datasets[1].data.push({x: new Date(), y: this.currentCityData.humidity});
this.showChartForCity = true;
this.showCurrentCityH=true;
setTimeout(() => {
this.createCharts();
}, 0);
  },
  createCharts() {
let tempCtx = document.getElementById("temp").getContext("2d");
let humidityCtx = document.getElementById("humidity").getContext("2d");
this.tempChart = new Chart(tempCtx, {
type: 'bar',
data: this.chartData,
options: this.chartOptions,
});
this.humidityChart = new Chart(humidityCtx, {
type: "bar",
data: this.chartData,
options: this.chartOptions,
});

},
  deleteCity(city) {
    let index = this.cities.findIndex(c => c.id === city.id);
    this.cities.splice(index, 1);
  },
  
  addCity() {
    const jsonFile = require('./city.list.json');
      // // Konwersja pliku JSON na tablicę
      const jsonArray = Object.values(jsonFile);
     let newCity=jsonArray.find(city=>city.name===this.searchTerm);
     if (newCity) {
  // Sprawdzenie czy miasto jest juz w tablicy
  let cityExists = this.cities.find(city => city.name === this.searchTerm);
  if (!cityExists) {
    this.cities.push({ id: newCity.id, name: this.searchTerm });
    this.searchTerm=""
  } else {
    console.log(`Error: City ${this.searchTerm} is already in the list.`);
  }
}
  },
  hideChart(){
    if (this.tempChart || this.humidityChart) {
        this.tempChart.destroy();
        this.humidityChart.destroy();
        this.showCurrentCityH=false;
      }
  },
  
  
  }
};
</script>

<style lang="scss" scoped>
li{
  list-style-type: none;
}
*,*::after,*::before{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
nav{
  display: flex;
  flex-direction: row-reverse;
  padding: 0;
  margin-right: 2rem;
}
</style>