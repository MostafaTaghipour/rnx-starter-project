import CurrentDevice from "@app/configs/device";
//@ts-ignore
import RNRestart from 'react-native-restart';

export const restartApp=()=>{
    if(CurrentDevice.Platform.isNative){
        RNRestart.Restart();
    }
    else{
        window.location.reload(false); 
    }
}
