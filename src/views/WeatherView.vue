<template>
    <div class="weather">
        <div class="weather__wrapper">
            <div class="weather__place">
                <button type="button" @click="searchAreaOpen()" class="weather__place__open">검색영역 열기</button>
                <span class="weather__place__info">{{ addressName ? cutAddressName : "현재주소" }}</span> 
            </div>

            <!-- 날씨 검색 영역 -->
            <template v-if="searchArea">
                <div class="weather__search">
                    <label class="weather__search__area">
                        <input type="text" v-model.trim="searchInput" @keyup.enter="searchPlace()" class="weather__search__input" placeholder="주소 검색란 (ex. 방배동)">
                    </label>

                    <div class="weather__search__buttonWrap">
                        <button type="button" @click="searchPlace()" class="buttonWrap__enter">검색하기</button>
                        <button type="button" @click="searchClose()" class="buttonWrap__cancel">취소하기</button>
                    </div>
                </div>
            </template>

            <!-- 날씨 정보 영역 -->
            <div class="weather__info">
                    <figure class="weather__thumb">
                        <template v-if="weatherIcon">
                            <img :src="require('../assets/images/icon-weather-'+ weatherIcon +'.png')" alt="날씨 아이콘" class="weather__image">
                        </template>
                    </figure>
                <span class="weather__text">{{ this.weather }}</span>
                <em class="weather__temperature">{{ this.temperature }}</em>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
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
    computed: {
        cutAddressName() {
            return this.addressName.replace(/[\d|-]/gm, "");
        }
    },
    watch: {
        addressName() {
            this.getWeatherInfo(); //날씨 데이터 불러오기
        }
    },
    created() {
        if (!(window.kakao && window.kakao.maps)) {
            const script = document.createElement('script');
            script.onload = () => kakao.maps.load(this.getLocationPc);
            script.src =`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d9fafc8c8b97f0bccf627ef7afb9cb8d&libraries=services`;
            document.head.appendChild(script);
        } else {
            this.getLocationPc();
        }
    },
    methods: {
        isMobile() {
            const userAgent = navigator.userAgent;
            if(userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
                return true; //mobile
            } else {
                return false; //pc
            }
        },
        afterFetchedWeather(data) {  //날씨Api 연동 후 실행하는 함수
            this.temperature = data.data.main.temp;
            this.weather = data.data.weather[0].main;
            this.weatherIcon = data.data.weather[0].icon;
        },
        linkToApiWeather() { //날씨Api 연동
            return axios(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=fd7c41f2f4b0f197d5b5618bea235fb8&units=metric`); //&units=metric 켈빈 > 섭씨
        },
        async getWeatherInfo() { //날씨Api 프로세스 설정
            try {
                const response = await this.linkToApiWeather();
                this.afterFetchedWeather(response);
            }
            catch (error) {
                console.error(error);
            }
        },
        getAddressFromCoords(result, status) { //현재 로컬주소 데이터 저장
            if (status === kakao.maps.services.Status.OK) {
                this.addressName = result[0].address.address_name;
            }
        },
        getLocationPc() { //PC 현재 로컬의 경도와 위도 구하기
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.lon = position.coords.longitude.toFixed(2);
                    this.lat = position.coords.latitude.toFixed(2);
                    if (!window?.kakao?.maps) return;
                    
                    const geocoder = new kakao.maps.services.Geocoder();
                    geocoder.coord2Address(this.lon, this.lat, this.getAddressFromCoords);
                });
            }
        },
        searchAreaOpen() { //검색영역
            this.searchInput = "";
            this.searchArea = true;
        },
        getCoordsFromAddress(data, status) { //검색한 주소 좌표 데이터 저장
            if (status === kakao.maps.services.Status.OK) {
                this.lon = Math.round(data[0].x);
                this.lat = Math.round(data[0].y);
                this.addressName = data[0].address_name;
                this.searchClose();

            } else {
                alert("검색결과가 없습니다. 입력한 주소를 확인해주세요!");
            }
        },
        searchPlace() { //주소 검색하기
            if (!this.searchInput.length) {
                alert("입력한 값이 없습니다.");
                return ;
            }

            if (!window?.kakao?.maps) return;

            const place = new kakao.maps.services.Places(); 
            place.keywordSearch(this.searchInput, this.getCoordsFromAddress);
        },
        searchClose() {
            this.searchArea = false;
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