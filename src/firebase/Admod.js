import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2866880782165460/8364895393';
class AdmodService{
    constructor(){
        this.loadEvent();
    }
    state_admod=false;
    eventListener ;
    interstitial ;
    showFull(){
        if(this.state_admod){
            this.interstitial.show();
            this.state_admod=false;
            this.loadEvent()
        }
        else{
            this.loadEvent()
        }
    }
    loadEvent(){
        this.interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
        });
         this.eventListener = this.interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
              this.state_admod=true;
            }
          });
        this.interstitial.load()
    }
}
export default new AdmodService();