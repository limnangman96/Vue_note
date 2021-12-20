<template>
    <div class="weather">
        <div class="weather__wrapper">
            <div class="weather__place">
                <button type="button" @click="searchAreaOpen()" class="weather__place__open">검색영역 열기</button>
                <span class="weather__place__info">{{ addressName ? addressName : "현재주소" }}</span> //@TODO 현재 lat,lon > 키워드로 검색하기
            </div>

            <!-- 날씨 검색 영역 -->
            <template v-if="searchArea">
                <div class="weather__search">
                    <label class="weather__search__label">
                        <input type="text" v-model.trim="searchInput" @keyup.enter="searchPlace()" class="weather__search__input" placeholder="'시/동/읍/면/리'를 검색하여 주세요.">
                    </label>

                    <button type="button" @click="searchPlace()" class="weather__search__button">검색하기</button>
                </div>
            </template>

            <div class="weather__info">
                    <figure class="weather__thumb">
                        <template v-if="weatherIcon">
                            <img :src="require('../assets/images/icon-weather-'+ weatherIcon +'.png')" alt="날씨 아이콘" class="weather__image">
                        </template>
                    </figure>
                <span class="weather__text">{{ this.weather }}</span>
                <em class="weather__temperature">{{ this.temperature }}</em>
            </div>

            <!-- test -->
            <div id="map"></div>
        </div>
    </div>
</template>
<!-- 카카오맵 api -->
<script>
import axios from 'axios';
export default {
    data() {
        return {
            weatherApiKey: "fd7c41f2f4b0f197d5b5618bea235fb8",
            lon: "", //경도
            lat: "", //위도
            weather: "",
            temperature: "",
            weatherIcon: "",
            searchArea: false,
            searchInput: "",
            addressName: "",
        }
    },
    created() {
        if (!(window.kakao && window.kakao.maps)) {
            const script = document.createElement('script');
            script.onload = () => kakao.maps.load(this.getLocation);
            script.src =`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d9fafc8c8b97f0bccf627ef7afb9cb8d&libraries=services`;
            document.head.appendChild(script);
        }
    },
    methods: {
        getLocation() { 
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.lon = position.coords.longitude.toFixed(2);
                    this.lat = position.coords.latitude.toFixed(2);
                    this.getCoordsFromAddress();
                })
            }
        },
        linkToApiWeather() { //날씨Api 연동
            return axios(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.weatherApiKey}&units=metric`); //&units=metric 켈빈 > 섭씨
        },
        async getWeatherInfo() { //날씨Api 연동 후 정보 가져오기
            try {
                const response = await this.linkToApiWeather();
                this.afterFetchedWeather(response);
            }
            catch (error) {
                console.error(error);
            }
        },
        afterFetchedWeather(data) {  //날씨Api 연동 후 실행하는 함수
            this.temperature = data.data.main.temp;
            this.weather = data.data.weather[0].main;
            this.weatherIcon = data.data.weather[0].icon;
        },
        searchAreaOpen() {
            this.searchArea = true;
        },
        getCoordsFromAddress () {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(this.lon, this.lat, this.currentAddress);
        },
        currentAddress(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                this.addressName = result[0].address.address_name;
                this.getWeatherInfo(); 
            } 
        },
        searchPlace() { 
            if (!this.searchInput.length) {
                alert("입력한 값이 없습니다.");
                return ;
            }
            if (!window?.kakao?.maps) return;

            let test = new kakao.maps.services.Places(); 
            test.keywordSearch(this.searchInput, this.getAddressFromCoords);
        },
        getAddressFromCoords (data, status) { //주소를 좌표로 바꾸어 검색하기
            if (status === kakao.maps.services.Status.OK) {
                this.lon = Math.round(data[0].x);
                this.lat = Math.round(data[0].y);
                this.addressName = data[0].address_name;

                this.getWeatherInfo();
                this.searchArea = false;

            } else {
                alert("검색결과가 없습니다. 입력한 주소를 확인해주세요!");
            }
        },
    }
}
</script>




/**
    초기 진입 >
        현재 위치구해온다 
        > 날씨 api 구하는 함수 태운다

    검색 >
        검색된 위치 구해온다 >
        > 날씨 api 구하는 함수 태운다

    https://openweathermap.org/weather-conditions  //날씨 아이콘
    https://ko.javascript.info/optional-chaining  //방어코드 옵셔널 체이닝
    https://e8ch.tistory.com/7  //카카오맵 옵션 ?autoload=false

    01d 맑은 하늘
    02d 약간 구름
    03d 구름
    04d 구름 많이
    09d 소나기 비
    10d 비 조금
    11d 뇌우
    13d 눈
    50d 안개

 */