// import React from 'react'
// import SplashScreen from 'react-native-splash-screen'
// import DeviceInfo from 'react-native-device-info';
// import { getVersion } from '../../api/ListVersion'
// import { useDispatch } from 'react-redux'
// import { checkversion } from '../../ReduxSlice/CheckVersionSlice'
// import { Text } from 'react-native';

// function Splash(props) {
//     const dispatch = useDispatch()
//     React.useEffect(() => {
//         (() => {
//             let deviceId = DeviceInfo.getReadableVersion();
//             getVersion()
//                 .then(result => {
//                     if (result?.data?.data) {
//                         if (deviceId.toString() === result?.data?.data[0].name) return dispatch(checkversion(true))
//                         return dispatch(checkversion(false))
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         })()
//     }, [])

//     return (
//         <>
//             <Text>s</Text>
//         </>
//     )
// }



// export default React.memo(Splash)

import DeviceInfo from 'react-native-device-info';
import { getVersion } from '../../api/ListVersion'
async function Splash() {
    const result = await getVersion()
    if (result.data.status == "success") {
        let deviceId = DeviceInfo.getReadableVersion();

        if (deviceId.toString() === result?.data?.data[0].name) return true
        return false
    }
}
export default Splash

