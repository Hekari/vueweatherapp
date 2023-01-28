<template>
    <div class="Logged">
      <input type="text" v-model="searchTerm" placeholder="Dodaj miasto">
      <button @click="addCity">Dodaj</button>
    <h1>Obserwowane miasta</h1>
    <ul>
      <li v-for="city in cities" :key="city.id">
        {{ city.name }} ({{ city.temp }}°C, {{ city.humidity }}%)
        <button @click="showChart(city.id)">Wykres</button>
        <button @click="deleteCity(city)">Usuń</button>
      </li>
    </ul>
    <div v-if="showChartForCity">
      <h1>Wykres temperatury i wilgotności w mieście {{ currentCityName }}</h1>
      <canvas v-if="showChartForCity" ref="chart" id="temp"></canvas>
      <!-- kod wykresu -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import chart from "chart.js"
export default {
  data() {
    return {
      cities: [
      { id: 2643743, name: "London" },
        { id: 5128581, name: "New York" },
        { id: 2968815, name: "Paris" },
      
      ],
      showChartForCity: false,
      chartData: {
        labels: [], // labels for the x-axis
        datasets: [
          {
            label: "Temperature",
            data: [], // data for the temperature dataset
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Humidity",
            data: [], // data for the humidity dataset
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      currentCityName: "",
      currentCityData: [],
      searchTerm:""
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
      this.chartData.labels = [];
    this.chartData.datasets[0].data = [];
    this.chartData.datasets[1].data = [];
      const API_KEY='9b2403ddb324ffabf1c05f8b056b9b71'
      for (let city of this.cities) {
        let response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${API_KEY}&units=metric&lang=pl`
          );
          city.temp = response.data.main.temp;
          city.humidity = response.data.main.humidity;
          this.chartData.labels.push(city.name);
          this.chartData.datasets[0].data.push(city.temp);
          this.chartData.datasets[1].data.push(city.humidity);
          localStorage.setItem('cities', JSON.stringify(this.cities));
      }
    },
    showChart(cityId) {
      this.currentCityData = this.cities.find(city => city.id === cityId);
      this.currentCityName = this.currentCityData.name;
      this.showChartForCity = true;
      // tutaj umieść kod do wyświetlenia wykresu
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
  } else {
    console.log(`Error: City ${this.searchTerm} is already in the list.`);
  }
}
console.log(this.cities);
  },
  mounted(){
    this.chart = new chart(this.$refs.chart, {
      type: "bar",
      data: this.chartData,
      options: this.chartOptions,
    });
  }
  }
};
</script>

<style lang="scss" scoped>
li{
  list-style-type: none;
}
</style>