import { ref, computed, onMounted } from "vue";
import { ADS_DATA, type Ad } from "../data/adsData";

export function useAds() {
  const ads = ref<Ad[]>(ADS_DATA);

  const currentAdIndex = ref(0);

  const currentAd = computed(() => {
    return ads.value[currentAdIndex.value];
  });

  const rotationInterval = 30000; // 30초

  const rotateAd = () => {
    currentAdIndex.value = (currentAdIndex.value + 1) % ads.value.length;
  };

  const getRandomAdIndex = () => {
    return Math.floor(Math.random() * ads.value.length);
  };

  onMounted(() => {
    // 초기에 랜덤한 광고 표시
    currentAdIndex.value = getRandomAdIndex();

    // 일정 시간 간격으로 광고 로테이션
    const intervalId = setInterval(rotateAd, rotationInterval);

    return () => {
      clearInterval(intervalId);
    };
  });

  const setAdIndex = (index: number) => {
    if (index >= 0 && index < ads.value.length) {
      currentAdIndex.value = index;
    }
  };

  const trackAdClick = (ad: Ad) => {
    console.log("Ad clicked:", ad.title);
  };

  return {
    ads,
    currentAd,
    currentAdIndex,
    rotateAd,
    setAdIndex,
    trackAdClick
  };
}
