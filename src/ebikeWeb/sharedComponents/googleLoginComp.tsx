// import { useEffect } from 'react';
// import { userSignup } from "@/ebikeWeb/functions/globalFuntions"
// const jsCookie = require('js-cookie');
// import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    googleSDKLoaded: () => void;
    gapi: any;
  }
}

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
//         console.log('Google Auth2 initialized:', auth2);
//         prepareLoginButton(auth2);
//       });
//     };

//     // Load the Google SDK script
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
//     // https://apis.google.com/js/platform.js?onload=googleSDKLoaded
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

//           if(res.token && res.user) {
//             let userObj = JSON.stringify(res.user)
//             jsCookie.set('userInfo_e', userObj, {expires: 1})
//             jsCookie.set('accessToken_e', res.token , {expires: 1})
//             props.showmodal()
//             props.updateAfterLogin()
//           }

//         }).catch((error: any) => {
//           console.error('Error during sign-in:', error);
//         });;
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


"use client";

import { useEffect } from "react";
import { userSignup } from "@/ebikeWeb/functions/globalFuntions"
const jsCookie = require('js-cookie');
import { useRouter } from 'next/navigation'

export default function GoogleSignIn(props:any) {
  useEffect(() => {
    // Load the GIS script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize GIS
      window.google.accounts.id.initialize({
        client_id: "695671409592-1id3ruo8n70o8ugi5k2vvu0sabifan98.apps.googleusercontent.com", // Replace with your client ID
        callback: handleCredentialResponse,
      });

      const buttonDiv = document.getElementById("googleSignInButton");

      // Ensure the button container exists before rendering the button
      if (buttonDiv) {
        window.google.accounts.id.renderButton(buttonDiv, {
          theme: "outline",
          size: "large",
        });
      } else {
        console.error("Google Sign-In button container not found");
      }

      // Display the One Tap prompt
      window.google.accounts.id.prompt();
      
      // // Render the Google Sign-In button
      // window.google.accounts.id.renderButton(
      //   document.getElementById("googleSignInButton"),
      //   { theme: "outline", size: "large" } // Customize the button
      // );

      // Display the One Tap prompt
      window.google.accounts.id.prompt();
    };

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response:any) => {
    // Handle the credential response (e.g., send the ID token to your backend)
    console.log("ID token:", response.credential);
   
    const decodedToken = parseJwt(response.credential);
    console.log("Decoded token:", decodedToken);

    // Extract user info
    const { name, email, picture, sub } = decodedToken;

          // const profile = user.getBasicProfile();
          // const userId = profile.getId(); // User ID
          // const userName = profile.getName(); // User's full name
          // const userEmail = profile.getEmail(); // User's email address
  
          // Log the details
          // console.log('User ID:', userId);
          // console.log('User Name:', userEmail);
          // console.log('User Email:', userEmail);

          let obj = {
              social_uid: response.credential,
              signupType: 'social',
              isVerified : true,
              userFullName: name
          }

          let res = await userSignup(obj)
          console.log('res 111', res)

          if(res.token && res.user) {
            let userObj = JSON.stringify(res.user)
            jsCookie.set('userInfo_e', userObj, {expires: 1})
            jsCookie.set('accessToken_e', res.token , {expires: 1})
            props.showmodal()
            props.updateAfterLogin()
          }

    // You can send the token to your backend for verification
    // fetch("/api/auth/google", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ token: response.credential }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Authentication response:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
}
