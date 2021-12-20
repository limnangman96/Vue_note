/*
*   문제 출처 https://velog.io/@minn602/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EB%82%A0%EC%94%A8-%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0
*   사용자 위치 가져오기 https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
*   날씨 사이트 API https://openweathermap.org/current
*   JSON 파일 보기 쉽게 https://codebeautify.org/jsonviewer
*   카카오 지도 API https://developers.kakao.com/console/app/650162/config/platform
*/

// @TODO 지원
// 미션 0. 클릭한 곳에 마커를 표시한다.
// 미션 1. 클릭한 곳에 인포윈도우를 표시한다. 
// 미션 2. 클릭한 곳의 날씨를 인포윈도우에 표시한다.
// 미션 3. 결괏값 나오기 전까지 loading
// 미션 4. 주소를 검색하여, 검색값이 있으면 지도를 보여주고, 날씨 보여주기
// 미션 5. 새로운 곳 클릭할 때마다 마커 및 인포윈도우 지워주고 새로 그려주기.

/**
 * 작업 포인트
 * 1. 콜백함수
 * 2. 전역함수 선언하는 이유 
 * 3. new 인스턴스
 */

const pcJiwonWeather = () => {
    const $document = $(document);
    const API_DOMAIN = 'https://api.openweathermap.org/data/2.5/weather'; // localhost:8080/ 
    const API_KEY = "fd7c41f2f4b0f197d5b5618bea235fb8";
  
    // 아이콘 이미지 불러오기
    const getIcon = (iconcode) => {
        return iconcode ? `http://openweathermap.org/img/w/${iconcode}.png` : '';
    }

    // 로딩 보여주기
    const showLoading = (loading) => {
        if (loading) {

        } else {
            $(".js__loading").addClass("hide");
            $(".js__loading").removeClass("move");
            $(".js__weather__icon").removeClass("hide");
        }
    };

    // API 연결 후 실행되는 함수
    function ApiSuccessFunc(data, id) {
        const name = data.name;
        const country = data.sys.country;
        const temp = data.main.temp;
        const {main , icon} = data.weather[0]
        // const desc = data.weather[0].main;
        // const weatherIcon = data.weather[0].icon;
        const $infoWindow = $(`#${id}`);
        
        $infoWindow.find(".js__weather__name").text(name);
        $infoWindow.find(".js__weather__country").text(country);
        $infoWindow.find(".js__weather__temperature").text(temp + "℃");
        $infoWindow.find(".js__weather__desc").text(main);

        // 아이콘 가져오기
        const iconImage = getIcon(icon);

        if(iconImage) {
            $infoWindow.find(".js__weather__icon img").attr('src', iconImage);
        }
    }
    
    // API 연결하기
    const linkToApi = (lon, lat, id, callback) => {
        showLoading(true);

        $.ajax({
            url: `${API_DOMAIN}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `,
            type: "get"
        }).done((data) => {
            if(typeof callback === 'function') {
                callback(data, id);
            }
            showLoading(false);
        }).fail(() => {
            showLoading(false);
        });
    }

    // 지도 그리기
    const drawMap = (lon, lat) => {
        // 바뀌는 데이터를 들고 있을 곳
        let count = 0; //각각의 인포윈도우 생성을 위해
        let marker = null; 
        let infowindow = null;

        const mapContainerainer = document.getElementById('map'), //지도를 담을 영역의 DOM 레퍼런스
            mapOption = { 
                center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표는 현재 위치: 위도(latitude), 경도(longitude) 순으로
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

        const map = new kakao.maps.Map(mapContainerainer, mapOption); //지도 생성 및 객체 리턴

        // 컨트롤러
        const mapContorller = () => {
            const mapTypeControl = new kakao.maps.MapTypeControl(); //컨트롤러 생성
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT); //위치 정의
    
            const zoomControl = new kakao.maps.ZoomControl(); //줌 컨트롤을 생성
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); //위치 정의
        }

        // 클릭지점 정보 가져오기
        const getClickedSpotInfo = () => {
            // 마지막 파라미터로 넘어온 함수를 호출
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                const latlng = mouseEvent.latLng; //클릭한 지점의 위도, 경도
                const resultBlank = $(".js__map__latlng");
               
                resultBlank.html(`경도: ${latlng.getLng()}, 위도: ${latlng.getLat()}`);

                makeMarker(latlng);
            });
        } 
        
        // 클릭으로 마커 생성
        const makeMarker = (latlng) => {
            if (marker) {
                marker.setMap(null); //현재 복제하여 들고있는 마커 제거
                infowindow.close(); //마커가 존재하면서 생기는 인포윈도우 제거 
            }

            marker = new kakao.maps.Marker({ 
                positon: latlng,
            }); 
    
            marker.setMap(map);
            marker.setPosition(latlng);
            makeInfolayer(latlng, marker); //마커 위에 인포윈도우
        }

        // 인포윈도우 생성
        const makeInfolayer = (latlng, marker) => {
            const id = `iwId${count}`;
            count += 1;

            const iwContent = `
                    <div class="fb__map__infoLayer" id="${id}">
                        <div class="fb__loading js__loading move">로딩아이콘</div>

                        <div class="fb__map__dataBox">
                            <figure class="fb__weather__icon js__weather__icon hide">
                                <img src="" alt="날씨아이콘">
                            </figure>

                            <div class="fb__map__info">
                                <span class="info__temperature js__weather__temperature"></span>
                                <span class="info__desc js__weather__desc"></span>
                            </div>
                        </div>
                    </div>
                `,
                iwRemoveable = true; // ture > 인포윈도우 닫기버튼 표시

            infowindow = new kakao.maps.InfoWindow({
                map: map,
                position : latlng, 
                content : iwContent,
                removable : iwRemoveable
            });
            
            infowindow.open(map, marker); 
            linkToApi(latlng.getLng(), latlng.getLat(), id, ApiSuccessFunc); //날씨 API
            
        }        

        // 주소 검색하기
        const searchPlace = (inputVal) => {
            var geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(inputVal, function(result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    const id = `iwId${count}`;
                    count += 1;

                    makeInfolayer(coords, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동
                    map.setCenter(coords);
                } 
            });    
        }

        // 검색된 값 가져오기
        const getSearchVal = () => {
            $document.on("click", ".js__map__search", function() {
               const $input = $(".js__map__input");
               
               if (!$input || !$input.val().trim().length) return;

               searchPlace($input.val());
            });
        }

        const drawMapInit = () => {
            mapContorller();
            getClickedSpotInfo();
            getSearchVal();
        }

        drawMapInit();
    }

    // 사용자 위치정보 가져오기
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lon = position.coords.longitude.toFixed(2);
                const lat = position.coords.latitude.toFixed(2);

                // 객체 구조분해할당
                // const info = {
                //     lon,
                //     lat
                // }

                // const { lon, lat } = info;

                drawMap(lon, lat)
            });
        }
    }

    const init = () => {
        getLocation();
    }

    init();
}

export default pcJiwonWeather;