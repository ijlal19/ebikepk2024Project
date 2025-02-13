// import { useEffect } from 'react';
// import { userSignup } from "@/ebikeWeb/functions/globalFuntions"
// const jsCookie = require('js-cookie');
// import { useRouter } from 'next/navigation'

// declare global {
//   interface Window {
//     googleSDKLoaded: () => void;
//     gapi: any;
//   }
// }

// const GoogleLoginButton = (props:any) => {
  
//   const Router = useRouter()

//   useEffect(() => {
//     // Define the global callback function
//     window.googleSDKLoaded = () => {
//       window.gapi.load('auth2', () => {
//         const auth2 = window.gapi.auth2.init({
//           client_id: '695671409592-1id3ruo8n70o8ugi5k2vvu0sabifan98.apps.googleusercontent.com',
//           cookiepolicy: 'single_host_origin',
//           scope: 'profile email',
//         });
//         prepareLoginButton(auth2);
//       });
//     };

//     // Load the Google SDK script
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
//     script.async = true;
//     script.defer = true;
//     script.id = 'google-jssdk';
//     document.body.appendChild(script);

//     // Cleanup function to remove the script
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const prepareLoginButton =  (auth2: any) => {
//     // Your logic to prepare the login button
//     console.log('Auth2 initialized:', auth2);
//     // Example: Attach a click handler to a button
//     const button = document.getElementById('google-login-button');
//     if (button) {
//       button.addEventListener('click', () => {
//         auth2.signIn().then(async(user: any) => {

//           const profile = user.getBasicProfile();
//           const userId = profile.getId(); // User ID
//           const userName = profile.getName(); // User's full name
//           const userEmail = profile.getEmail(); // User's email address
  
//           // Log the details
//           console.log('User ID:', userId);
//           console.log('User Name:', userEmail);
//           console.log('User Email:', userEmail);

//           let obj = {
//               social_uid: userId,
//               signupType: 'social',
//               isVerified : true,
//               userFullName: userName
//           }

//           let res = await userSignup(obj)
//           console.log('res', res)

//         if(res.token && res.user) {
//             let userObj = JSON.stringify(res.user)
//             jsCookie.set('userInfo_e', userObj, {expires: 1})
//             jsCookie.set('accessToken_e', res.token , {expires: 1})
//             props.showmodal()
//             props.updateAfterLogin()
//             // Router.push(`/`);
//             // setTimeout(()=>{
//             //   window?.location?.reload()

//             // },500)
//           }

//         });
//       });
//     }
//   };

//   return (
//     <div>
//       <button id="google-login-button">Login with Google</button>
//     </div>
//   );
// };

// export default GoogleLoginButton;




import { useEffect } from 'react';
import { userSignup } from "@/ebikeWeb/functions/globalFuntions";
const jsCookie = require('js-cookie');
import { useRouter } from 'next/navigation';

const GoogleLoginButton = (props: any) => {
  const Router = useRouter();

  useEffect(() => {
    const initializeGoogleOneTap = () => {
      window?.google?.accounts?.id?.initialize({
        client_id: '695671409592-1id3ruo8n70o8ugi5k2vvu0sabifan98.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window?.google?.accounts?.id?.prompt((notification:any) => {
        if (notification.isNotDisplayed() || notification.isSkipped()) {
          console.log('Google One Tap prompt was not displayed or was skipped.');
        }
      });
    };

    const handleCredentialResponse = async (response: any) => {
      const { credential } = response;
      // Decode the JWT token to get user info
      const decodedToken = JSON.parse(atob(credential.split('.')[1]));
      const userId = decodedToken.sub;
      const userName = decodedToken.name;
      const userEmail = decodedToken.email;

      console.log('User ID:', userId);
      console.log('User Name:', userName);
      console.log('User Email:', userEmail);
      console.log('User Email: aaa');

      let obj = {
        social_uid: userId,
        signupType: 'social',
        isVerified: true,
        userFullName: userName,
      };

      let res = await userSignup(obj);
      console.log('res', res);

      if (res.token && res.user) {
        let userObj = JSON.stringify(res.user);
        jsCookie.set('userInfo_e', userObj, { expires: 1 });
        jsCookie.set('accessToken_e', res.token, { expires: 1 });
        props.showmodal();
        props.updateAfterLogin();
      }
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-jssdk';
    document.body.appendChild(script);

    script.onload = () => {
      initializeGoogleOneTap();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="g_id_onload" data-client_id="695671409592-1id3ruo8n70o8ugi5k2vvu0sabifan98.apps.googleusercontent.com"></div>
      <div className="g_id_signin" data-type="standard"></div>
    </div>
  );
};

export default GoogleLoginButton;